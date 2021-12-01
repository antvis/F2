import { jsx } from '../../../src';
import { interpolateText } from './util';

export default (props) => {
  const { text, delay, left = '24px', top = '44px', animation, leaveDuration = 500 } = props;
  let totalLength = 0;

  for (let i = 0, len = text.length; i < len; i++) {
    totalLength += text[i].text.length;
  }
  const textFrame = interpolateText(text);

  // 每个字50ms
  const duration = totalLength * 50;

  return (
    <group
      style={{
        left,
        top,
        flexDirection: 'row',
      }}
      animation={
        animation === false
          ? null
          : {
              appear: {
                easing: 'linear',
                delay,
                duration,
                property: [],
                onFrame: function(t) {
                  textFrame(t);
                },
              },
            }
      }
    >
      {text.map((item, index) => {
        return (
          <text
            // key={ item.text }
            ref={item.ref}
            attrs={{
              ...item,
              textBaseline: 'bottom',
            }}
            animation={
              animation === false
                ? null
                : {
                    leave: {
                      easing: 'linear',
                      duration: leaveDuration,
                      property: ['fillOpacity'],
                      start: {
                        fillOpacity: 1,
                      },
                      end: {
                        fillOpacity: 0,
                      },
                    },
                  }
            }
          />
        );
      })}
    </group>
  );
};
