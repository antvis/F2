import {
  interpolateNumber,
  interpolateNumberArray,
  interpolateRgb
} from 'd3-interpolate';

export default (a: any, b: any) => {
  if (typeof b === 'string') {
    return interpolateRgb(a, b);
  }
  if (Array.isArray(b)) {
    return interpolateNumberArray(a, b);
  }
  return interpolateNumber(a, b);
};
