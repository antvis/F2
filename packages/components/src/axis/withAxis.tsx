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
        const bbox = this.getMaxBBox(ticks);
        const padding = this._calcPadding(bbox);
        chart._updateLayout(padding);
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
      const group = chart.get('backPlot').addGroup();
      let width = 0;
      let height = 0;
      ticks.forEach(tick => {
        const text = group.addShape('text', {
          attrs: {
            ...props.label,
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
      const { position, labelOffset } = props;
      switch(position) {
        case 'top':
          padding[0] = padding[0] + height + labelOffset;
          break;
        case 'right':
          padding[1] = padding[1] + width + labelOffset;
            break;
        case 'bottom':
          padding[2] = padding[2] + height + labelOffset;
          break;
        default:
          padding[3] = padding[3] + width + labelOffset;
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
