import { isArray } from '@antv/util';
import { jsx } from '../../jsx';

export default (props: any) => {
  const { records, selected } = props;
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
                    r: (size ?? 4) / 2,
                    fill: color,
                    stroke: '#fff',
                    ...shape,
                  }}
                  animation={{
                    appear: {
                      easing: 'linear',
                      duration: 450,
                    },
                    update: {
                      easing: 'linear',
                      duration: 450,
                      property: ['x', 'y', 'r'],
                    },
                  }}
                />
              );
            })}
          </group>
        );
      })}
      <group>
        {isArray(selected) && selected.map(item => {
          const { x, y, color, shape } = item;
          return (
            <circle
              attrs={{
                x,
                y,
                r: 3,
                fill: '#fff',
                lineWidth: '3px',
                stroke: color,
                ...shape,
              }}
            />
          );
        })}
      </group>
    </group>
  );
};
