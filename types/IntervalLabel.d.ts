import { DataRecord } from './Data';
import { CanvasProps } from './CanvasProps';

// ref: https://github.com/antvis/F2/blob/master/src/plugin/interval-label.js
/**
 * @todo 文档未说明，漏斗图示例中出现。完善注释。
 */
export interface IntervalLabelParams<TRecord extends DataRecord> {
  label?: (
    record: TRecord,
    color: string,
  ) => CanvasProps<{
    text: string;
  }>;

  offsetX?: number;

  offsetY?: number;
}
