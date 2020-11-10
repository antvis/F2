import { substitute } from '../../util/common';
import { lang } from '../../global';

export function generateScaleAria(scale) {
  const { type, values } = scale;
  if (type === 'linear') {
    return substitute(lang.scale.linear, scale);
  }
  if (type === 'cat') {
    return substitute(lang.scale.cat, { values: values.slice(0, 10).join(' ') });
  }
  if (type === 'timeCat') {
    const start = scale.getText(values[0]);
    const end = scale.getText(values[values.length - 1]);
    return substitute(lang.scale.timeCat, { start, end });
  }
  return '';
}


export function generateCoordAria(coord, xScale, yScale) {
  const { type } = coord;
  if (!lang.coord[type]) {
    return '';
  }
  return substitute(lang.coord[type], {
    xLabel: generateScaleAria(xScale),
    yLabel: generateScaleAria(yScale)
  });
}
