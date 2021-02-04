import { jsx } from '@ali/f2-jsx';
import { batch2hd } from '@ali/f2x-util';
import Component from '../component';

export default View => {
  return class Axis extends Component {
    px2hd(props) {
      // 设置默认配置
      const {
        labelOffset = '15px',
        line = {
          stroke: '#EDEDED',
          lineWidth: '1px',
        },
        label = {
          fill: '#CCCCCC',
          fontSize: '20px',
        },
        tickLine,
        grid = {
          stroke: '#EDEDED',
          lineWidth: '1px',
          lineDash: [ '4px' ]
        }
      } = props;
      return batch2hd({
        labelOffset,
        line,
        label,
        tickLine,
        grid
      });
    }
    mount() {
      const { props, chart } = this;
      const {
        field,
        type,
        tickCount,
        range,
        formatter,
        mask,
        min,
        max,
      } = props;
      // 把这几个hd转换下
      this.props = {
        ...props,
        ...this.px2hd(props),
      };
      chart.scale(field, {
        type,
        tickCount,
        range,
        formatter,
        mask,
        min,
        max,
      });

      // 更新四边边距，暂时这么处理
      chart.on('beforegeomdraw', () => {
        const { visible } = this.props;
        if (visible === false) {
          return;
        }
        const ticks = this.getTicks();
        this._updateLayout(ticks);
      });
    }
    update(props) {
      this.props = {
        ...props,
        ...this.px2hd(props)
      };
    }
    // 获取ticks最大的宽高
    getMaxBBox(ticks) {
      const { chart, props } = this;
      const { label, labelOffset } = props;
      const group = chart.get('backPlot').addGroup();
      let width = 0;
      let height = 0;
      ticks.forEach(tick => {
        const text = group.addShape('text', {
          attrs: {
            ...label,
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
        width: width + labelOffset,
        height: height + labelOffset,
      }
    }
    _updateLayout(ticks) {
      const { props, layout } = this;
      const { width, height } = this.getMaxBBox(ticks);
      const { position } = props;
      switch(position) {
        case 'top':
          layout.update({ top: height });
          break;
        case 'right':
          layout.update({ right: -width });
          break;
        case 'bottom':
          layout.update({ bottom: -height });
          break;
        default:
          layout.update({ left: width });
          break;
      }
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
          [otherDim]: position === 'top' || position === 'right' ? 1 : 0,
        });
        return {
          ...tick,
          ...point,
        }
      });
      return points;
    }
    render() {
      const { props } = this;
      const { visible } = props;
      if (visible === false) {
        return null;
      }
      const ticks = this.convertPoint();
      return <View
        ticks={ ticks }
        { ...props }
      />
    }
  }
}
