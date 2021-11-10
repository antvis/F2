import Chart from '../../chart';
import Coord from '../../coord';

export interface AttrRange {
  shape?: any[];
  color?: any[];
  size?: any[];
}

export type GeomType = 'line' | 'point' | 'area' | 'polygon' | 'schema' | 'interval';

interface Style {
  field: string;
  smooth?: boolean;
  stroke?: string | ((t) => string);
  lineWidth?: number | ((t) => number);
}

export interface GeometryProps {
  data: any;
  adjust: any;
  chart: Chart;
  coord: Coord;
  startOnZero: boolean;
  style: Style;
  [k: string]: any;  // TODO
}