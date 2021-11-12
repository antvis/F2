import Chart from '../../chart';
import Coord from '../../coord';

export interface AttrRange {
  shape?: any[];
  color?: any[];
  size?: any[];
}

export type GeomType = 'line' | 'point' | 'area' | 'polygon' | 'schema' | 'interval';

interface Style {
  [k: string]: any; // TODO
}

/**
 * 几何标记对象的数据调整类型。
 */
export type GeometryAdjustKind =
  // 堆叠
  | 'stack'
  // 分组
  | 'dodge'
  // 对称
  | 'symmetric';

export interface GeometryProps {
  data?: any;
  adjust?: GeometryAdjustKind;
  chart?: Chart;
  coord?: Coord;
  startOnZero?: boolean;
  style?: Style;
  [k: string]: any; // TODO
}
