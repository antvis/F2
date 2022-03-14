import { jsx } from '../../jsx';
import { px } from '../../types';
import Zoom, { ZoomProps } from '../zoom';

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
   */
  margin?: px;
}

export default (View) => {
  return class ScrollBar extends Zoom<ScrollBarProps> {
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
