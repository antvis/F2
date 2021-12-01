import { jsx } from '../../../src';
import RollNumber from './rollNumber';
import { Matrix, getTranslateMatrix, leave } from './util';

const fontFamily = 'AlipayNumber';

export default (props, context) => {
  const {
    center,
    rectRef,
    textRef,
    value,
    suffixText,
    delay,
    padding,
    fontSize,
    fill,
    leaveAnimation,
  } = props;
  const { width: valueWidth } = context.measureText(value, { fontSize, fontFamily });

  const width = valueWidth + padding[1] + padding[3];
  const height = fontSize + padding[0] + padding[2];

  const left = center.x - valueWidth / 2 - padding[3];
  const top = center.y - fontSize / 2 - padding[0];

  return (
    <group
      animation={{
        appear: {
          easing: 'quinticOut',
          property: ['matrix'],
          delay,
          duration: 1000,
          start: {
            matrix: getTranslateMatrix(0, center.y + height),
          },
          end: {
            matrix: Matrix.generateDefault(),
          },
        },
      }}
    >
      <rect
        ref={rectRef}
        attrs={{
          x: left,
          y: top,
          width,
          height,
          radius: '8px',
          fill,
        }}
        animation={{
          appear: {
            easing: 'quinticOut',
            property: ['fillOpacity'],
            delay,
            duration: 1000,
            start: {
              fillOpacity: 0,
            },
            end: {
              fillOpacity: 1,
            },
          },
          leave: rectRef ? null : leave,
        }}
      />
      <RollNumber
        textRef={textRef}
        context={context}
        delay={delay}
        center={center}
        text={value}
        fill="#fff"
        fontSize={fontSize}
        suffixText={suffixText}
        leaveAnimation={leaveAnimation}
      />
    </group>
  );
};
