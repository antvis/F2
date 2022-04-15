import { deepMix } from '@antv/util';
import { jsx } from '../../../jsx';

export default (props) => {
  const { records, animation } = props;
  const { delayCfg } = props;
  return (
    <group>
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((item) => {
              const { key, xMin, xMax, yMin, yMax, color, shape } = item;
              const { origin } = item;
              let _delay = 0;
              if (
                delayCfg &&
                delayCfg.hasOwnProperty('field') &&
                delayCfg.hasOwnProperty('delays')
              ) {
                _delay = delayCfg['delays'][origin[delayCfg['field']]];
              }

              if (delayCfg)
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
                      deepMix(
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
                        animation
                      ),
                      { appear: { delay: _delay } }
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
