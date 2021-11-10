import { jsx } from '../../jsx';

export default (props: any) => {
  const { records } = props;
  return (
    <group>
      {records.map(record => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map(child => {
              const { points, color, shape } = child;
              return (
                <polygon
                  attrs={{
                    points,
                    lineWidth: '2px',
                    fill: color,
                    ...shape,
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
