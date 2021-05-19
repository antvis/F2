import { jsx } from '@ali/f2-jsx';
import Geometry from '../geometry';

/**
 * TODO 实现分类柱图
 */
export default View => {
  return class Interval extends Geometry {
    getDefaultSize() {
      const { chart } = this;
      const size = this.getAttr('size');
      if (!size) {
        const xScale = this.getXScale();
        const count = xScale.values.length;
        const normalizeSize = 1 / count;
        const { plot } = chart;
        const { width } = plot;
        // 绘制区和空白区 1:1
        const widthRatio = 0.5;
        return width * normalizeSize * widthRatio;
      }
    }
    mount() {
      const xScale = this.getXScale();
      const { values } = xScale;
      const count = values.length;
      // 留一个位置的空间
      const offset = 1 / count * 0.5;
      // 2边留空
      xScale.range = [offset, 1 - offset];
    }
    render() {
      const mappedArray = this._mapping();
      const size = this.getDefaultSize();
      return <View
        {...this.props}
        mappedArray={ mappedArray }
        size={ size }
      />
    }
  }
}
