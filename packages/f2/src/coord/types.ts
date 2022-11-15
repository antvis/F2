interface Point {
  x: number;
  y: number;
}

type Range = [number, number];

interface Option {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  transposed?: boolean;
}

export { Point, Range, Option };
