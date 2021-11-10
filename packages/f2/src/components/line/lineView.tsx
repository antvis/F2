import { isArray } from '@antv/util';
import { jsx } from '../../jsx';

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
  const { record, points, appear, EndView } = props;
  const { children } = record;
  const { origin } = children[0];

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

export default (props: any) => {
  const { records, nestedPoints, coord, animation, endView: EndView } = props;
  const { left, top, width, height } = coord;

  const appear = {
    easing: 'linear',
    duration: 450,
    clip: {
      type: 'Rect',
      property: ['width'],
      start: {
        x: left,
        y: top,
        height: height,
        width: 0,
      },
      end: {
        width: width,
      },
    },
    ...animation,
  };

  return (
    <group>
      {records.map((record, index) => {
        const { key, children } = record;
        // nestedPoints 是一个三位数组
        const flatPoints = nestedPoints.flat().flat();
        const pointsArray = nestedPoints[index];
        const { color, size, shape } = children[0];
        return (
          <group key={key}>
            {pointsArray.map((points) => {
              return (
                <polyline
                  attrs={{
                    points,
                    stroke: color,
                    lineWidth: size,
                    ...shape,
                  }}
                  animation={{
                    update: {
                      easing: 'linear',
                      duration: 450,
                      property: ['points'],
                    },
                    appear,
                  }}
                />
              );
            })}
            {EndView ? (
              <AnimationEndView
                record={record}
                points={flatPoints}
                EndView={EndView}
                appear={appear}
              />
            ) : null}
          </group>
        );
      })}
    </group>
  );
};
