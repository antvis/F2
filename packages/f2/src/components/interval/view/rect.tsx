import { deepMix } from '@antv/util';
import { jsx } from '../../../jsx';

export default (props) => {
  const { records, animation } = props;
  return (
    <group>
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((item) => {
              const { key, xMin, xMax, yMin, yMax, color, shape } = item;
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
                  animation={deepMix(
                    {
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
