import { interpolateNumber, interpolateNumberArray, interpolateRgb } from 'd3-interpolate';

import interpolateObjectArray from './interpolateObjectArray';

export default (a: any, b: any) => {
  if (typeof b === 'string') {
    return interpolateRgb(a, b);
  }
  if (Array.isArray(b)) {
    if (typeof b[0] !== 'number') {
      // if (hasNaN(a[0])) {
      //   return interpolateObjectArray(b, b);
      // }
      return interpolateObjectArray(a, b);
    }
    return interpolateNumberArray(a, b);
  }
  // if (isNaN(a)) {
  //   return interpolateNumber(b, b);
  // }
  return interpolateNumber(a, b);
};
