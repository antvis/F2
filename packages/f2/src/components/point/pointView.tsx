import { deepMix, isNil } from '@antv/util';
import { jsx } from '@antv/f-engine';

export default (props) => {
  const { records, animation, clip } = props;
  return (
    <group
      attrs={{
        clip,
      }}
    >
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((item) => {
              const { x, y, size, color, shapeName, shape } = item;
              if (isNaN(x) || isNaN(y)) {
                return null;
              }
              if (shapeName === 'rect') {
                const rectSize = isNil(size) ? shape.size : size;
                return (
                  <rect
                    key={key}
                    attrs={{
                      x: x - rectSize,
                      y: y - rectSize,
                      fill: color,
                      stroke: color,
                      ...shape,
                      width: rectSize * 2,
                      height: rectSize * 2,
                    }}
                    animation={deepMix(
                      {
                        appear: {
                          easing: 'linear',
                          duration: 450,
                        },
                        update: {
                          easing: 'linear',
                          duration: 450,
                          property: ['x', 'y', 'width', 'height', 'fill'],
                        },
                      },
                      animation
                    )}
                  />
                );
              }
              return (
                <circle
                  key={key}
                  style={{
                    cx: x,
                    cy: y,
                    fill: shapeName === 'circle' ? color : null,
                    stroke: shapeName === 'hollowCircle' ? color : null,
                    ...shape,
                    r: isNil(size) ? shape.size : size,
                  }}
                  animation={deepMix(
                    {
                      appear: {
                        easing: 'linear',
                        duration: 450,
                      },
                      update: {
                        easing: 'linear',
                        duration: 450,
                        property: ['cx', 'cy', 'r', 'fill'],
                      },
                    },
                    animation
                  )}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
