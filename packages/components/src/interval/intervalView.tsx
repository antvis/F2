import { jsx } from '@ali/f2-jsx';

function getRectRange(points) {
  const xValues = [];
  const yValues = [];
  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    xValues.push(point.x);
    yValues.push(point.y);
  }
  const xMin = Math.min.apply(null, xValues);
  const yMin = Math.min.apply(null, yValues);
  const xMax = Math.max.apply(null, xValues);
  const yMax = Math.max.apply(null, yValues);

  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
}

export default (props) => {
  const { mappedArray, size, plot } = props;
  const { bl } = plot;

  return (
    <group>
      {
        mappedArray.map(dataArray => {
          return dataArray.map(item => {
            const { color, x, y } = item;
            return (
              <rect
                attrs={{
                  fill: color,
                  // 数据点在柱子中间
                  x: x - (size / 2),
                  y,
                  width: size,
                  // y轴从底部开始画
                  height: bl.y - y,
                }}
                animation={{
                  appear: {
                    easing: 'linear',
                    duration: 450,
                    property: [ 'y', 'height' ],
                    start: {
                      height: 0,
                      y: bl.y,
                    },
                    end: {
                      height: bl.y - y,
                      y,
                    }
                  }
                }}
              />
            );
          })
        })
      }
    </group>
  );
}
