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
                    key={key}
                    style={{
                      x: xMin,
                      y: yMin,
                      width: xMax - xMin,
                      height: yMax - yMin,
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
