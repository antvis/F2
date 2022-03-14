import { jsx } from '../../../jsx';
import { deepMix } from '@antv/util';

export default (props) => {
  const { coord, records, animation } = props;
  const { center } = coord;
  return (
    <group>
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((item) => {
              const { key, xMin, xMax, yMin, yMax, color, shape } = item;
              return (
                <sector
                  key={key}
                  attrs={{
                    x: center.x,
                    y: center.y,
                    fill: color,
                    startAngle: xMin,
                    endAngle: xMax,
                    r0: yMin,
                    r: yMax,
                    ...shape,
                  }}
                  animation={deepMix(
                    {
                      update: {
                        easing: 'linear',
                        duration: 450,
                        property: ['x', 'y', 'startAngle', 'endAngle', 'r0', 'r'],
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
