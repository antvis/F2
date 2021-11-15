import { jsx } from '../../../jsx';

export default (props) => {
  const { records } = props;
  return (
    <group>
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((item) => {
              const { key, xMin, xMax, yMin, yMax, color } = item;
              return (
                <rect
                  key={key}
                  attrs={{
                    x: xMin,
                    y: yMin,
                    width: xMax - xMin,
                    height: yMax - yMin,
                    fill: color,
                  }}
                  animation={{
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
