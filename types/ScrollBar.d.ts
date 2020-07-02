import { CanvasProps } from './CanvasProps';

/**
 * 进度条参数。
 */
export interface ScrollBarParams {
  /**
   * 用于确定进度条的渲染方向。
   */
  mode?: 'x' | 'y' | 'xy';

  /**
   * 用于设置 x 轴方向进度条的样式。
   */
  xStyle?: CanvasProps;

  /**
   * 用于设置 y 轴方向进度条的样式。
   */
  yStyle?: CanvasProps;
}
