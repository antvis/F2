import { deepMix } from '@antv/util';
import { jsx } from '@antv/f-engine';

export default (props) => {
  const { records, animation, y0, clip, onClick } = props;
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
              const { key, xMin, xMax, yMin, yMax, color, shape } = item;
              if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
                return null;
              }
              return (
                <rect
                  key={key}
                  attrs={{
                    x: xMin,
                    y: yMin,
                    width: xMax - xMin,
                    height: yMax - yMin,
                    fill: color,
                    ...shape,
                  }}
                  onClick={onClick}
                  animation={deepMix(
                    {
                      appear: {
                        easing: 'linear',
                        duration: 450,
                        property: ['y', 'height'],
                        start: {
                          y: y0,
                          height: 0,
                        },
                      },
                      update: {
                        easing: 'linear',
                        duration: 450,
                        property: ['x', 'y', 'width', 'height'],
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
