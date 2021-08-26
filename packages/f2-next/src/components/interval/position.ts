import { isArray, mix } from '@antv/util';


function transposedRect({ xMin, xMax, yMin, yMax }) {
  return { xMin: yMin, xMax: yMax, yMin: xMin, yMax: xMax };
}

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
  }
}

function mappingRect(coord, rect) {
  const { x: xRange, y: yRange, transposed } = coord;
  const [xStart, xEnd] = xRange;
  const [yStart, yEnd] = yRange;


  const { xMin, xMax, yMin, yMax } = transposed ? transposedRect(rect) : rect;

  return {
    xMin: xStart + (xEnd - xStart) * xMin,
    xMax: xStart + (xEnd - xStart) * xMax,
    yMin: yStart + (yEnd - yStart) * yMin,
    yMax: yStart + (yEnd - yStart) * yMax,
  }
}

export {
  convertRect,
  mappingRect,
};
