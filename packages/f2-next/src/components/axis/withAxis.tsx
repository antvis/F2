import { jsx } from '@jsx';
import { batch2hd } from '@ali/f2x-util';
import Chart from '../chart';
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

    chart: Chart;
    dimType: 'x' | 'y';
    style: any;
    lastLayout: any;

    init(config) {
      super.init(config);
      const { props, chart } = this;
      const {
        field,
        visible,
        type,
        tickCount,
        range,
        formatter,
        // ticks,
        mask,
        min,
        max,
        nice,
      } = props;

      chart.scale(field, {
        type,
        tickCount,
        range,
        mask,
        formatter,
        min,
        max,
        nice
      });
    }

    mount() {
      const { props, chart } = this;
      const {
        field,
        visible,
      } = props;
      if (visible === false) {
        return;
      }
      const { coord } = chart;
      const { transposed } = coord;
      const xScale = chart.getXScale();
      const dimType = field === xScale.field ? 'x' : 'y';
      const otherDim = dimType === 'x' ? 'y' : 'x';

      this.dimType = transposed ? otherDim : dimType;
      this.style = getDefaultStyle(props);

      const ticks = this.getTicks();
      // TODO: 应该记录上下左右大小，然后还原，一个boolean不太够

      this._updateLayout(ticks);
    }
    update(props) {
      this.style = getDefaultStyle(props);
    }
    getTicks() {
      const { chart, props } = this;
      const { scales } = chart;
      const { field } = props;
      return scales[field].getTicks();
    }
    // 获取ticks最大的宽高
    getMaxBBox(ticks) {
      const { style, container } = this;
      const { label, labelOffset } = style;
      const group = container.addGroup();
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
      const { dimType, chart, props } = this;
      const { coord } = chart;
      const { isPolar } = coord;
      // 极坐标下，y轴 不计算
      if (isPolar && dimType === 'y') {
        return;
      }
      const { width, height } = this.getMaxBBox(ticks);
      if (isPolar) {
        chart.updateLayout({
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
          chart.updateLayout({ right: -width });
          return;
        }
        chart.updateLayout({ left: width });
        return;
      }
      if (position === 'top') {
        chart.updateLayout({ top: height });
        return;
      }
      chart.updateLayout({ bottom: -height });
    }

    convertPoint() {
      const { chart, props } = this;
      const { field } = props;

      const xScale = chart.getXScale();
      const ticks = this.getTicks();

      const dimType = field === xScale.field ? 'x' : 'y';
      const otherDim = dimType === 'x' ? 'y' : 'x';
      return ticks.map(tick => {
        // @ts-ignore
        const start = chart.convertPoint({
          [dimType]: tick.value,
          [otherDim]: 0,
        });
        // @ts-ignore
        const end = chart.convertPoint({
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
      const { coord, plot } = chart;
      const isPolar = coord.isPolar;
      const ticks = this.convertPoint();

      if (!ticks.length) {
        return null;
      }

      return <View
        dimType={ dimType }
        isPolar={ isPolar }
        coord={ coord }
        plot={ plot }
        style={ style }
        { ...props }
        ticks={ ticks }
      />
    }
  }
}
