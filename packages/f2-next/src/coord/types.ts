interface Point {
  x: number;
  y: number;
}

type Range = [number, number];

interface Option {
  left: number;
  top: number;
  right: number;
  bottom: number;
  transposed?: boolean;
}

export {
  Point,
  Range,
  Option,
}