import { jsx } from '../../jsx';

function concat(dataArray) {
  let result = [];
  for (let i = 0; i < dataArray.length; i++) {
    const item = dataArray[i];
    result = result.concat(item);
  }
  return result;
}

function getPoint(points, t: number) {
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const xOffset = lastPoint.x - firstPoint.x;
  const x = firstPoint.x + xOffset * t;

  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    const prevPoint = points[i - 1];
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

export default (props: any) => {
  const { mappedArray, coord, animation, endView: EndView } = props;
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
      {mappedArray.map((item) => {
        const { color, dataArray, size, shape } = item;
        return (
          <group>
            {dataArray.map((data) => (
              <polyline
                attrs={{
                  points: data.map((item) => {
                    return { x: item.x, y: item.y };
                  }),
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
            ))}
            {EndView ? (
              <group
                animation={{
                  appear: {
                    easing: appear.easing,
                    duration: appear.duration,
                    onFrame: function (t) {
                      // 这段逻辑有点恶心。。
                      const { element } = this;
                      const children = element.get('children');
                      const point = getPoint(concat(dataArray), t);
                      children.forEach((child) => {
                        child.moveTo(point.x, point.y);
                      });
                    },
                  },
                }}
              >
                <EndView {...item} />
              </group>
            ) : null}
          </group>
        );
      })}
    </group>
  );
};
