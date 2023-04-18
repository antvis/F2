import { LayoutProps } from '../base/layout';
interface Point {
  x: number;
  y: number;
}

type Range = [number, number];

type centerCallback = (width: number, height: number) => [number, number];

interface Option extends LayoutProps {
  transposed?: boolean;
  center?: [number, number] | centerCallback;
}

export { Point, Range, Option };
