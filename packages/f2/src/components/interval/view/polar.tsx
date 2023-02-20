import { jsx } from '@antv/f-engine';
import { deepMix } from '@antv/util';

export default (props) => {
  const { coord, records, animation, onClick } = props;
  const { center, startAngle, endAngle, radius } = coord;
  return (
    <group
      animation={{
        appear: {
          easing: 'quadraticOut',
          duration: 450,
          clip: {
            type: 'sector',
            property: ['endAngle'],
            style: {
              cx: center.x,
              cy: center.y,
              startAngle: `${startAngle}rad`,
              r: radius,
            },
            start: {
              endAngle: `${startAngle}rad`,
            },
            end: {
              endAngle: `${endAngle}rad`,
            },
          },
          // 特殊处理，appear 的动画设置在整体上
          ...(animation && animation.appear),
        },
      }}
    >
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
                    cx: center.x,
                    cy: center.y,
                    fill: color,
                    lineWidth: 1,
                    startAngle: `${xMin}rad`,
                    endAngle: `${xMax}rad`,
                    r0: yMin,
                    r: yMax,
                    ...shape,
                  }}
                  onClick={onClick}
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
