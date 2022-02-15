import { jsx } from '../../jsx';
import { isNil, deepMix } from '@antv/util';

export default (props) => {
  const { records, animation } = props;
  return (
    <group>
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((item) => {
              const { x, y, size, color, shapeName, shape } = item;
              if (shapeName === 'rect') {
                const rectSize = isNil(size) ? shape.size : size;
                return (
                  <rect
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
                  attrs={{
                    x,
                    y,
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
                        property: ['x', 'y', 'r', 'fill'],
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
