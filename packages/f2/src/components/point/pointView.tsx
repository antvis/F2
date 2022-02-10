import { jsx } from '../../jsx';
import { isNil } from '@antv/util';

export default (props) => {
  const { records } = props;
  return (
    <group>
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((item) => {
              const { x, y, size, color, shape } = item;
              return (
                <circle
                  attrs={{
                    x,
                    y,
                    fill: color,
                    stroke: '#fff',
                    ...shape,
                    r: isNil(size) ? shape.size : size,
                  }}
                  animation={{
                    appear: {
                      easing: 'linear',
                      duration: 450,
                    },
                    update: {
                      easing: 'linear',
                      duration: 450,
                      property: ['x', 'y', 'r', 'fill'],
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
};
