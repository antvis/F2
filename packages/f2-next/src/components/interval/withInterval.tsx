import { jsx } from '@jsx';
import Geometry from '../geometry';

export default View => {
  return class Interval extends Geometry {
    getDefaultSize() {
      const { chart, groupedArray, adjust } = this;
      const size = this.getAttr('size');
      if (!size) {
        const xScale = this.getXScale();
        const count = xScale.values.length;
        const normalizeSize = 1 / count;
        const { plot } = chart;
        const { width } = plot;
        // 绘制区和空白区 1:1
        const widthRatio = 0.5;
        if (adjust && adjust.type === 'dodge') {
          return width * normalizeSize * widthRatio / groupedArray.length;
        }
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
      const { props } = this;
      const { startOnZero = true } = props;
      const mappedArray = this._mapping();
      const size = this.getDefaultSize();
      const basePoint = this.getBasePoint(startOnZero);

      return <View
        { ...props }
        basePoint={basePoint}
        mappedArray={ mappedArray }
        size={ size }
      />
    }
  }
}
