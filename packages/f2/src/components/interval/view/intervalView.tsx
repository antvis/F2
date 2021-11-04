import { jsx } from '../../../jsx';

export default (props: any) => {
  const { coord, mappedArray } = props;
  const { center, type: coordType } = coord;

  // 直角坐标系
  if (coordType === 'rect') {
    return (
      <group>
        {mappedArray.map((dataArray) => {
          const first = dataArray[0];
          return (
            <group key={first.key}>
              {dataArray.map((item) => {
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
                        duration: 450,
                        property: ['y', 'height'],
                        start: {
                          y: yMax,
                          height: 0,
                        },
                      },
                      update: {
                        easing: 'linear',
                        duration: 450,
                        property: ['x', 'y', 'width', 'height'],
                      },
                    }}
                  />
                );
              })}
            </group>
          );
        })}
      </group>
    );
  }

  // 极坐标系
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
