import { jsx, ShapeProps } from '@antv/f-engine';
import withZoom, { ZoomProps } from '../zoom';
import { ChartChildProps } from '../../chart';

export interface ScrollBarProps extends ZoomProps {
  /**
   * 显示滚动条
   */
  visible?: boolean;
  /**
   * 滚动条显示位置
   */
  position?: 'bottom' | 'top' | 'left' | 'right';
  /**
   * 间距
   * @deprecated
   */
  margin?: string;

  /**
   * 滚动条父容器样式
   */
  style?: ShapeProps;
  /**
   * 背景条样式
   */
  background?: ShapeProps;
  /**
   * 滚动条样式
   */
  barStyle?: ShapeProps;
}

export default (View) => {
  return class ScrollBar extends withZoom(View)<ScrollBarProps & ChartChildProps> {
    willMount() {
      super.willMount();
      const { context, props } = this;
      const { visible, position = 'bottom', margin = '16px', chart } = props;
      const marginNumber = context.px2hd(margin);

      if (visible === false) {
        return null;
      }

      chart.updateCoordFor(this, {
        position,
        width: position === 'left' || position === 'right' ? marginNumber : 0,
        height: position === 'bottom' || position === 'top' ? marginNumber : 0,
      });
    }

    render() {
      const { props, state } = this;
      const { visible } = props;
      if (visible === false) {
        return null;
      }
      return <View position="bottom" {...props} {...state} />;
    }
  };
};
