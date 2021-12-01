import { jsx } from '../../../src';
import { px2hd } from '../../../src/util';
import { Shape, Matrix } from '@antv/f2-graphic';
import { leave } from './util';

function getTranslateMatrix(height) {
  const matrix = Matrix.generateDefault();
  return Matrix.translate(matrix, matrix, [0, -height]);
}

const fontFamily = 'AlipayNumber';

// 10个数字, 长度为11, 最后1个补0，为了让动画连续
const numbers = new Array(11).fill(0);

export default (props, context) => {
  const {
    center,
    text,
    textRef,
    suffixText,
    fill = '#000',
    fontSize = px2hd('84px'),
    delay,
    leaveAnimation = true,
  } = props;
  const { x, y } = center;

  const { width: textWidth } = context.measureText(text, { fontSize, fontFamily });
  const left = x - textWidth / 2;
  const top = y - fontSize / 2;

  let currentWidth = 0;

  return (
    <group>
      <group
        style={{
          left,
          top,
          flexDirection: 'row',
        }}
      >
        <text
          ref={textRef}
          attrs={{
            text,
            fontSize,
            fontFamily,
            // fill: 'red'
          }}
        />
        <text
          style={{
            top: '-10px',
            alignSelf: 'flex-end',
          }}
          attrs={{
            text: suffixText,
            fontSize: '30px',
            fill,
            fillOpacity: 0.55,
          }}
          animation={{
            appear: {
              easing: 'quadraticOut',
              delay: delay,
              duration: 500,
              property: ['fillOpacity'],
              start: {
                fillOpacity: 0,
              },
              end: {
                fillOpacity: 0.55,
              },
            },
            leave: leaveAnimation
              ? {
                  ...leave,
                  start: {
                    fillOpacity: 0.55,
                  },
                }
              : null,
          }}
        />
      </group>
      <group
        attrs={{
          clip: new Shape.Rect({
            attrs: {
              x: left,
              y: top,
              width: textWidth,
              height: fontSize,
            },
          }),
        }}
      >
        {new Array(text.length).fill(0).map((_, i) => {
          const charText = text.charAt(i);
          const { width } = context.measureText(charText, { fontSize, fontFamily }, context);
          const x = left + currentWidth;
          currentWidth = currentWidth + width;
          // 非数字直接显示
          if (!/^\d$/.test(charText)) {
            return (
              <text
                attrs={{
                  x,
                  // 字体高度，就按fontSize算
                  y,
                  text: charText,
                  fontSize,
                  fontFamily,
                  fill,
                }}
                animation={{
                  appear: {
                    easing: 'quinticOut',
                    delay: delay,
                    duration: 500,
                    property: ['fillOpacity'],
                    start: {
                      fillOpacity: 0,
                    },
                    end: {
                      fillOpacity: 1,
                    },
                  },
                  leave: leaveAnimation ? leave : null,
                }}
              />
            );
          }
          // 数字滚动动画
          const num = Number(charText);
          return (
            <group
              animation={{
                appear: {
                  easing: 'quinticOut',
                  delay: delay + 50 * i,
                  duration: 500,
                  // property: [ 'matrix' ],
                  onFrame(t) {
                    const length = fontSize * 10 + fontSize * num;
                    const offset = (length * t) % (fontSize * 10);
                    return {
                      matrix: getTranslateMatrix(offset),
                    };
                  },
                },
              }}
            >
              {numbers.map((_, n) => {
                return (
                  <text
                    attrs={{
                      x,
                      // 字体高度，就按fontSize算
                      y: y + fontSize * n,
                      text: `${n % 10}`,
                      fill,
                      fontSize,
                      fontFamily: 'AlipayNumber',
                    }}
                    animation={{
                      appear: {
                        easing: 'quinticOut',
                        delay,
                        duration: 500,
                        property: ['fillOpacity'],
                        start: {
                          fillOpacity: 0,
                        },
                        end: {
                          fillOpacity: 1,
                        },
                      },
                      leave: leaveAnimation ? leave : null,
                    }}
                  />
                );
              })}
            </group>
          );
        })}
      </group>
    </group>
  );
};
