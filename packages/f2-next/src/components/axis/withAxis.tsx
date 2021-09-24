import { mix, deepMix } from '@antv/util';
import { jsx } from '../../jsx';
import Component from '../../base/component';
import Chart from '../../chart';
import Layout from '../../base/layout';

export default View => {
  return class Axis extends Component {

    chart: Chart;
    style: any;

    willMount() {
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
        nice,
      } = props;

      chart.setScale(field, {
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
        visible,
        canvas
      } = props;
      if (visible === false) {
        return;
      }
      const { theme } = chart;
      this.style = canvas.px2hd(deepMix({}, theme.axis, props.style));
    }

    _getDimType() {
      const { props, chart } = this;
      const { field } = props;
      const xScales = chart.getXScales();
      const scales = xScales.filter(scale => {
        return scale.field === field;
      });
      return scales.length > 0 ? 'x' : 'y';
    }
    // 获取ticks最大的宽高
    getMaxBBox() {
      const { style, container } = this;
      const ticks = this.getTicks();
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

    _getPosition() {
      const { props } = this;
      const { position } = props;
      if (position) {
        return position;
      }
      const dimType = this._getDimType();
      return dimType === 'x' ? 'bottom' : 'left';
    }

    getLayout() {
      const { chart } = this;
      const { coord } = chart;
      const { isPolar } = coord;
      const dimType = this._getDimType();

      if (isPolar) {
        // 机坐标系的 y 不占位置
        if (dimType === 'y') {
          return;
        }
        const { width: axisWidth, height: axisHeight } = this.getMaxBBox();
        const { left, top, width, height } = coord;
        coord.update({
          left: left + axisWidth,
          top: top + axisHeight,
          width: width - (axisWidth * 2),
          height: height - (axisHeight * 2)
        });
        return;
      }

      const position = this._getPosition();

      // 直角坐标系下
      const { width, height } = this.getMaxBBox();
      return { position, width, height };
    }

    setLayout(layout) {
      this.layout = new Layout(layout);
    }

    getTicks() {
      const { chart, props } = this;
      const { field } = props;
      const scale = chart.getScale(field);
      const ticks = scale.getTicks();
      return ticks;
    }

    convertTicks() {
      const { chart } = this;
      const { coord } = chart;
      const ticks = this.getTicks();
      const dimType = this._getDimType();
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
      const { chart, props, style } = this;
      const { coord } = chart;
      const ticks = this.convertTicks();
      const position = this._getPosition();
      const dimType = this._getDimType();
      return (
        <View
          { ...props }
          style={ style }
          ticks={ ticks }
          coord={ coord }
          position={ position }
          dimType={ dimType }
        />
      );
    }
  }
}
