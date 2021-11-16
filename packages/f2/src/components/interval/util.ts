import { isArray } from '@antv/util';

function convertRect({ x, y, size, y0 }) {
  let xMin: number;
  let xMax: number;
  if (isArray(x)) {
    xMin = x[0];
    xMax = x[1];
  } else {
    xMin = x - size / 2;
    xMax = x + size / 2;
  }

  let yMin: number;
  let yMax: number;
  if (isArray(y)) {
    yMin = y[0];
    yMax = y[1];
  } else {
    yMin = Math.min(y0, y);
    yMax = Math.max(y0, y);
  }

  return {
    xMin,
    xMax,
    yMin,
    yMax,
  };
}

function convertToPoints({ xMin, xMax, yMin, yMax }) {
  return [
    { x: xMin, y: yMin }, // tl
    { x: xMax, y: yMin }, // tr
    { x: xMax, y: yMax }, // br
    { x: xMin, y: yMax }, // bl
  ];
}

export { convertRect, convertToPoints };
