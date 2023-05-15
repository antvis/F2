import { createRef, jsx } from '@antv/f-engine';
import { deepMix } from '@antv/util';

function concatPoints(children) {
  let result = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    result = result.concat(child.points);
  }
  return result;
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
                  ref={ref}
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
                style={{
                  offset: ref,
                }}
                animation={deepMix(
                  {
                    appear: {
                      easing: 'quadraticOut',
                      duration: 450,
                      property: ['offsetDistance'],
                      start: {
                        offsetDistance: 0,
                      },
                      end: {
                        offsetDistance: 1,
                      },
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
