import { LayoutProps } from '../base/layout';
interface Point {
  x: number;
  y: number;
}

type Range = [number, number];

interface Option extends LayoutProps {
  transposed?: boolean;
}

export { Point, Range, Option };
