import { jsx } from '../../jsx';

export default (props: any) => {
  const { mappedArray } = props;
  return (
    <group>
      {mappedArray.map((item) => {
        const { color, dataArray, size, shape } = item;
        return (
          <group>
            {dataArray.map((data) => (
              <polyline
                attrs={{
                  points: data.map((item) => {
                    return { x: item.x, y: item.y };
                  }),
                  stroke: color,
                  lineWidth: size,
                  ...shape,
                }}
                animation={{
                  update: {
                    easing: 'linear',
                    duration: 450,
                    property: ['points'],
                  },
                }}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
};
