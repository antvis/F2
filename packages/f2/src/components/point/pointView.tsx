import { jsx } from '../../jsx';

export default (props: any) => {
  const { mappedArray } = props || {};
  return (
    <group>
      {mappedArray.map((dataArray) => {
        const first = dataArray[0];
        return (
          <group key={first.key}>
            {dataArray.map((item) => {
              const { x, y, size, color } = item;
              return (
                <circle
                  attrs={{
                    x,
                    y,
                    r: size ?? 4 / 2,
                    fill: color,
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
    </group>
  );
};
