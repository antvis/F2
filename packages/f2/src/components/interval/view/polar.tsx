import { jsx } from '../../../jsx';

export default (props) => {
  const { coord, records } = props;
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
                  animation={{
                    // appear: {
                    //   easing: 'linear',
                    //   duration: 450,
                    //   property: ['y', 'height'],
                    //   start: {
                    //     y: yMax,
                    //     height: 0,
                    //   },
                    // },
                    update: {
                      easing: 'linear',
                      duration: 450,
                      property: ['x', 'y', 'startAngle', 'endAngle', 'r0', 'r'],
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
