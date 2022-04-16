import { deepMix, isFunction } from '@antv/util';
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

              //#region 处理接收的animation
              let _thisAnimation = {};
              if (animation) {
                Object.keys(animation).map((animationType) => {
                  let _animationCfg = animation[animationType];
                  // 如果动画配置为函数，则执行该函数获取配置对象
                  if (isFunction(_animationCfg)) {
                    _animationCfg = _animationCfg(item);
                  }
                  _thisAnimation[animationType] = _animationCfg;
                });
              }
              //#endregion

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
                    _thisAnimation
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
