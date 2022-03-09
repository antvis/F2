import Chart from '../../chart';
import Coord from '../../coord';
import { AnimationCycle } from '../../canvas/animation/interface';
import { SelectionProps } from './selection';

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
export type GeometryAdjustType =
  // 堆叠
  | 'stack'
  // 分组
  | 'dodge'
  // 对称
  | 'symmetric';

export type GeometryAdjust = {
  type: GeometryAdjustType;
  [k: string]: any;
};

export type AdjustConfig = GeometryAdjust | GeometryAdjustType;

export interface GeometryProps extends SelectionProps {
  data?: any;
  adjust?: AdjustConfig;
  chart?: Chart;
  coord?: Coord;
  startOnZero?: boolean;
  style?: Style;
  animation?: AnimationCycle;
  [k: string]: any; // TODO
}
