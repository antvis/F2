import { jsx } from '../../jsx';
import { isArray } from '@antv/util';

export default (props: any) => {
  const { coord, mappedArray } = props;
  const { center, type: coordType } = coord;
  if (coordType === 'rect') {
    return (
      <group>
        {mappedArray.map((dataArray, index) => {
          return dataArray.map((item) => {
            const { xMin, xMax, yMin, yMax, color } = item;
            return (
              <rect
                attrs={{
                  x: xMin,
                  y: yMin,
                  width: xMax - xMin,
                  height: yMax - yMin,
                  fill: color,
                }}
                animation={{
                  appear: {
                    easing: 'linear',
                    duration: 300,
                    // delay: 300 * index,
                    property: ['y', 'height'],
                    start: {
                      y: yMax,
                      height: 0,
                    },
                  },
                }}
              />
            );
          });
        })}
      </group>
    );
  }
  return (
    <group>
      {mappedArray.map((dataArray) => {
        return dataArray.map((item) => {
          const { xMin, xMax, yMin, yMax, color } = item;
          return (
            <sector
              attrs={{
                x: center.x,
                y: center.y,
                fill: color,
                startAngle: xMin,
                endAngle: xMax,
                r0: yMin,
                r: yMax,
              }}
            />
          );
        });
      })}
    </group>
  );
};
