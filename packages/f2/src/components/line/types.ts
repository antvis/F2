import { JSX } from '../../jsx/jsx-namespace';
import { GeometryProps, AdjustConfig } from '../geometry/interface';
import Coord from '../../coord';

interface Record {
  key: string;
  children: Record[];
  [k: string]: any;
}

export interface LineViewProps {
  records: Record[];
  coord: Coord;
  animation?: any;
  endView?: (origin: any) => JSX.Element;
}

export interface LineProps extends GeometryProps {
  coord?: Coord;
  connectNulls?: boolean;
  data?: any;
  adjust?: AdjustConfig;
  endView?: (origin: any) => JSX.Element;
}
