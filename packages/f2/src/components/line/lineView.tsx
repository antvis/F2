import { createRef, jsx } from '@antv/f-engine';
import { deepMix, isArray } from '@antv/util';

function concatPoints(children) {
  let result = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    result = result.concat(child.points);
  }
  return result;
}

function formatPoint(point) {
  const { y } = point;
  return {
    x: point.x,
    y: isArray(y) ? y[1] : y,
  };
}

function getPoint(points, t: number) {
  const formatedPoints = points.map((p) => formatPoint(p));
  const firstPoint = formatedPoints[0];
  const lastPoint = formatedPoints[formatedPoints.length - 1];
  const xOffset = lastPoint.x - firstPoint.x;
  const x = firstPoint.x + xOffset * t;

  for (let i = 1; i < formatedPoints.length; i++) {
    const point = formatedPoints[i];
    const prevPoint = formatedPoints[i - 1];
    if (x >= prevPoint.x && x <= point.x) {
      // x 在 2 点之间的比例，根据比例再算出 y 的值
      const ratio = (x - prevPoint.x) / (point.x - prevPoint.x);
      return {
        x,
        y: prevPoint.y + (point.y - prevPoint.y) * ratio,
      };
    }
  }
}

export default (props) => {
  const { records, coord, animation, endView: EndView, clip } = props;

  const { left, top, width, height, center, startAngle, endAngle, radius } = coord as any;

  const appear = coord.isPolar
    ? {
        easing: 'quadraticOut',
        duration: 450,
        clip: {
          type: 'sector',
          property: ['endAngle'],
          style: {
            cx: center.x,
            cy: center.y,
            startAngle: `${startAngle}rad`,
            r: radius,
          },
          start: {
            endAngle: `${startAngle}rad`,
          },
          end: {
            endAngle: `${endAngle}rad`,
          },
        },
      }
    : {
        easing: 'quadraticOut',
        duration: 450,
        clip: {
          type: 'rect',
          property: ['width'],
          style: {
            x: left,
            y: top,
            height: height,
          },
          start: {
            width: 0,
          },
          end: {
            width: width,
          },
        },
      };
  return (
    <group
      style={{
        clip,
      }}
    >
      {records.map((record) => {
        const { key, children } = record;
        const points = concatPoints(children);

        const ref = createRef();
        return (
          <group key={key}>
            {children.map((child) => {
              const { points, color, size, shape } = child;
              const fliterPoints = points.filter((point) => !isNaN(point.x) && !isNaN(point.y));
              if (fliterPoints.length === 0) return;

              return (
                <polyline
                  key={key}
                  // ref={ref}
                  style={{
                    points: fliterPoints.map((point) => {
                      return [point.x, point.y];
                    }),
                    stroke: color,
                    ...shape,
                    lineWidth: size || shape.lineWidth,
                  }}
                  animation={deepMix(
                    {
                      update: {
                        easing: 'linear',
                        duration: 450,
                        property: ['points'],
                      },
                      appear,
                    },
                    animation
                  )}
                />
              );
            })}

            {EndView ? (
              <group
                ref={ref}
                // style={{
                //   offset: ref,
                // }}
                animation={deepMix(
                  {
                    appear: {
                      easing: 'quadraticOut',
                      duration: 450,
                      onFrame: function(t) {
                        // 这段逻辑TODO:修改为offsetDistance
                        const children = ref.current.getChildren();
                        const point = getPoint(points, t);
                        children.forEach((child) => {
                          child.moveTo(point.x, point.y);
                        });
                      },
                      // property: ['offsetDistance'],
                      // start: {
                      //   offsetDistance: 0,
                      // },
                      // end: {
                      //   offsetDistance: 1,
                      // },
                    },
                  },
                  animation
                )}
              >
                <EndView origin={points[0]?.origin} />
              </group>
            ) : null}
          </group>
        );
      })}
    </group>
  );
};
