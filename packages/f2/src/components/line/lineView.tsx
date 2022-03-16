import { deepMix, isArray } from '@antv/util';
import { jsx } from '../../jsx';
import { LineViewProps } from './types';

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

function AnimationEndView(props) {
  const { record, appear, EndView } = props;
  const { children } = record;
  const points = concatPoints(children);
  const { origin } = points[0];

  return (
    <group
      animation={{
        appear: {
          easing: appear.easing,
          duration: appear.duration,
          onFrame: function(t) {
            // 这段逻辑有点恶心。。
            const { element } = this;
            const children = element.get('children');
            const point = getPoint(points, t);
            children.forEach((child) => {
              child.moveTo(point.x, point.y);
            });
          },
        },
      }}
    >
      <EndView origin={origin} />
    </group>
  );
}

export default (props: LineViewProps) => {
  const { records, coord, animation, endView: EndView } = props;
  const { left, top, width, height } = coord;

  const appear = {
    easing: 'linear',
    duration: 450,
    clip: {
      type: 'rect',
      property: ['width'],
      attrs: {
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
    <group>
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((child) => {
              const { points, color, size, shape } = child;
              return (
                <polyline
                  attrs={{
                    points: points.map((point) => {
                      return { x: point.x, y: point.y };
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
              <AnimationEndView record={record} EndView={EndView} appear={appear} />
            ) : null}
          </group>
        );
      })}
    </group>
  );
};
