import { jsx } from '@ali/f2-jsx';
import { batch2hd } from '@ali/f2x-util';
import Component from '../component';

function getDefaultStyle(props) {
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

export default View => {
  return class Axis extends Component {

    dimType: 'x' | 'y';
    style: any;

    mount() {
      const { props, chart } = this;
      const {
        field,
        visible,
        type,
        tickCount,
        range,
        formatter,
        mask,
        min,
        max,
      } = props;

      // 设置scale
      chart.scale(field, {
        type,
        tickCount,
        range,
        formatter,
        mask,
        min,
        max,
      });

      this.style = getDefaultStyle(props);

      // geom 可能在axis后面添加
      chart.on('beforegeomdraw', () => {
        if (visible === false) {
          return;
        }
        const coord = chart.get('coord');
        const { transposed } = coord;
        const xScale = chart.getXScale();
        const dimType = field === xScale.field ? 'x' : 'y';
        const otherDim = dimType === 'x' ? 'y' : 'x';

        this.dimType = transposed ? otherDim : dimType;

        const ticks = this.getTicks();
        this._updateLayout(ticks);
      });
    }
    update(props) {
      this.style = getDefaultStyle(props);
    }
    getTicks() {
      const { props, chart } = this;
      const { field } = props;
      const scale = chart.get('scales')[field];
      const ticks = scale.getTicks();
      return ticks;
    }
    // 获取ticks最大的宽高
    getMaxBBox(ticks) {
      const { chart, style } = this;
      const { label, labelOffset } = style;
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
      const { dimType, chart, props, layout } = this;
      const coord = chart.get('coord');
      const { isPolar } = coord;
      // 极坐标下，y轴 不计算
      if (isPolar && dimType === 'y') {
        return;
      }
      const { width, height } = this.getMaxBBox(ticks);
      if (isPolar) {
        layout.update({
          top: height,
          right: -width,
          bottom: -height,
          left: width,
        });
        return;
      }
      const { position } = props;
      if (dimType === 'y') {
        if (position === 'right') {
          layout.update({ right: -width });
          return;
        }
        layout.update({ left: width });
        return;
      }
      if (position === 'top') {
        layout.update({ top: height });
        return;
      }
      layout.update({ bottom: -height });
    }

    convertPoint() {
      const { chart, dimType } = this;
      const coord = chart.get('coord');
      const ticks = this.getTicks();

      const otherDim = dimType === 'x' ? 'y' : 'x';
      return ticks.map(tick => {
        const start = coord.convertPoint({
          [dimType]: tick.value,
          [otherDim]: 0,
        });
        const end = coord.convertPoint({
          [dimType]: tick.value,
          [otherDim]: 1,
        });
        return {
          ...tick,
          points: [start, end],
        }
      });
    }
    render() {
      const { chart, props, dimType, style } = this;
      const { visible } = props;
      if (visible === false) {
        return null;
      }
      const coord = chart.get('coord');
      const isPolar = coord.isPolar;
      const ticks = this.convertPoint();

      if (!ticks.length) {
        return null;
      }

      return <View
        dimType={ dimType }
        ticks={ ticks }
        isPolar={ isPolar }
        coord={ coord }
        style={ style }
        { ...props }
      />
    }
  }
}
