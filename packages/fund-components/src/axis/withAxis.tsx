// @ts-nocheck
import { Component } from '@ali/f2-components';

export default View => {
  return class Axis extends Component {
    mount() {
      const { props, chart } = this;
      const { field, type, tickCount, range } = props;
      chart.scale(field, {
        type,
        tickCount,
        range
      });

      // 更新四边边距，暂时这么处理
      chart.on('beforegeomdraw', () => {
        const ticks = this.getTicks();
        const bbox = this.getMaxBBox(ticks);
        const padding = this._calcPadding(bbox);
        chart._updateLayout(padding);
      });
    }
    // 获取ticks最大的宽高
    getMaxBBox(ticks) {
      const { chart } = this;
      const group = chart.get('backPlot').addGroup();
      let width = 0;
      let height = 0;
      ticks.forEach(tick => {
        const text = group.addShape('text', {
          attrs: {
            x: 0,
            y: 0,
            text: tick.text
          }
        });
        const bbox = text.getBBox();
        width = Math.max(width, bbox.width);
        height = Math.max(height, bbox.height);
      });
      // 检测完后直接删除掉
      group.remove(true);
      return {
        width,
        height,
      }
    }
    _calcPadding(bbox) {
      const { props, chart } = this;
      const padding = chart.get('padding');
      const { width, height } = bbox;
      const { position } = props;
      switch(position) {
        case 'top':
          padding[0] = padding[0] + height;
          break;
        case 'right':
          padding[1] = padding[1] + width;
            break;
        case 'bottom':
          padding[2] = padding[2] + height;
          break;
        default:
          padding[3] = padding[3] + width;
          break;
      }
      return padding;
    }
    getTicks() {
      const { props, chart } = this;
      const { field } = props;
      const scale = chart.get('scales')[field];
      const ticks = scale.getTicks();
      return ticks;
    }
    convertPoint() {
      const { props, chart } = this;
      const { position } = props;
      const coord = chart.get('coord');
      const ticks = this.getTicks();
      const dimType = position === 'top' || position === 'bottom' ? 'x' : 'y';

      const otherDim = dimType === 'x' ? 'y' : 'x';
      const points = ticks.map(tick => {
        const point = coord.convertPoint({
          [dimType]: tick.value,
          [otherDim]: 0,
        });
        return {
          ...tick,
          ...point,
        }
      });
      return points;
    }
    render() {
      const { width, height, plot, props } = this;
      const ticks = this.convertPoint();
      const { visible, position } = props;
      if (visible === false) {
        return null;
      }
      return <View
        position={ position }
        ticks={ ticks }
        plot={ plot }
      />
    }
  }
}
