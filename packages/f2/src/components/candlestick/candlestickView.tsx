import { jsx } from '@antv/f-engine';
import { deepMix } from '@antv/util';

export default (props) => {
  const { records, animation, y0, onClick } = props;
  return (
    <group>
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((item) => {
              const { key, xMin, xMax, yMin, yMax, x, y, color, shape } = item;
              if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
                return null;
              }
              return (
                <group>
                  <line
                    key={`${key}-line`}
                    style={{
                      x1: x,
                      y1: y[2],
                      x2: x,
                      y2: y[3],
                      stroke: color,
                      lineWidth: '2px',
                      lineCap: 'round',
                    }}
                    animation={{
                      appear: {
                        easing: 'linear',
                        duration: 300,
                        property: ['y1', 'y2'],
                        // @ts-ignore
                        start: {
                          y1: 0,
                          y2: 0,
                        },
                      },
                      update: {
                        easing: 'linear',
                        duration: 300,
                        property: ['x1', 'y1', 'x2', 'y2'],
                      },
                    }}
                  />
                  <rect
                    key={`${key}-rect`}
                    style={{
                      x: xMin,
                      y: yMin,
                      // 当 min === max 时，设置 1，否则会出现 0 的情况
                      width: Math.max(xMax - xMin, 1),
                      height: Math.max(yMax - yMin, 1),
                      fill: color,
                      radius: '2px',
                      ...shape,
                    }}
                    onClick={onClick}
                    animation={deepMix(
                      {
                        appear: {
                          easing: 'linear',
                          duration: 300,
                          property: ['y', 'height'],
                          start: {
                            y: y0,
                            height: 0,
                          },
                        },
                        update: {
                          easing: 'linear',
                          duration: 300,
                          property: ['x', 'y', 'width', 'height'],
                        },
                      },
                      animation
                    )}
                  />
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
