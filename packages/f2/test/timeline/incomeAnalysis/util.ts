import formatter from './formatter';
import { Matrix } from '@antv/f2-graphic';

function interpolateText(textArr) {
  let totalLength = 0;
  const arrlength = textArr.length;

  for (let i = 0; i < arrlength; i++) {
    const item = textArr[i];
    const length = item.text.length;
    item.ref = {};
    item.length = length;
    item.start = totalLength;
    totalLength += length;
  }

  return (t) => {
    const len = Math.round(t * totalLength);
    for (let i = 0; i < arrlength; i++) {
      const item = textArr[i];
      const { ref, text, start } = item;
      let currentText = '';

      if (len > start) {
        currentText = text.substr(0, len - start);
      }
      const textElement = ref.current;
      if (textElement && textElement._attrs && textElement._attrs.attrs) {
        textElement._attrs.attrs.text = currentText;
      }
    }
  };
}

function measureText(text, font, ctx?) {
  if (!ctx) {
    ctx = document.createElement('canvas').getContext('2d');
  }
  const {
    fontSize = 12,
    // fontFamily: 'AlipayNumber',
    fontFamily = 'normal',
    fontStyle = 'normal',
    fontWeight = 'normal',
    fontVariant = 'normal',
  } = font;

  ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
  return ctx.measureText(text);
}

function getTranslateMatrix(x, y) {
  const matrix = Matrix.generateDefault();
  return Matrix.translate(matrix, matrix, [x, y]);
}

const leave = {
  easing: 'quinticIn',
  property: ['fillOpacity'],
  duration: 500,
  start: {
    fillOpacity: 1,
  },
  end: {
    fillOpacity: 0,
  },
};

function toSignedPercent(
  value: number | string,
  precision: number = 2,
  emptySign: string = '--'
): string {
  const num = Number(value);
  const sign = formatter.getSign(num);
  const isNum = formatter.isNumber(value);
  const sNum = isNum ? formatter.formatPercent(Math.abs(num), precision) : emptySign;

  return `${sign}${sNum}`;
}

function amountColor(value) {
  const isNum = formatter.isNumber(value);
  if (!isNum) {
    return '#999999';
  }
  if (value > 0) {
    return '#E62C3B';
  } else if (value < 0) {
    return '#0E9976';
  } else {
    return '#999999';
  }
}

export {
  interpolateText,
  measureText,
  Matrix,
  getTranslateMatrix,
  leave,
  toSignedPercent,
  amountColor,
};
