import { mix, deepMix } from '@antv/util';
import { jsx } from '../../jsx';
import equal from '../../base/equal';
import Component from '../../base/component';
import Chart from '../../chart';

export default (View) => {
  return class Axis extends Component {
    chart: Chart;
    style: any;

    constructor(props) {
      super(props);
      const { chart, field } = props;

      const scaleOption = this.getScaleOption(props);
      chart.setScale(field, scaleOption);
    }

    willReceiveProps(nextProps) {
      const { props: lastProps } = this;
      const { chart, field } = nextProps;

      const nextScaleOption = this.getScaleOption(nextProps);
      const lastScaleOption = this.getScaleOption(lastProps);
      if (!equal(nextScaleOption, lastScaleOption)) {
        chart.setScale(field, nextScaleOption);
      }
    }

    willMount() {
      this.updateCoord();
    }

    willUpdate() {
      this.updateCoord();
    }

    getScaleOption(props) {
      const { type, tickCount, range, mask, formatter, min, max, nice } = props;

      return {
        type,
        tickCount,
        range,
        mask,
        formatter,
        min,
        max,
        nice,
      };
    }

    _getDimType() {
      const { props } = this;
      const { field, chart } = props;
      const xScales = chart.getXScales();
      const scales = xScales.filter((scale) => {
        return scale.field === field;
      });
      return scales.length > 0 ? 'x' : 'y';
    }
    // 获取ticks最大的宽高
    getMaxBBox(ticks, style) {
      const { context } = this;
      const { measureText } = context;
      const { label, labelOffset } = style;
      let width = 0;
      let height = 0;
      ticks.forEach((tick) => {
        const bbox = measureText(tick.text, label);
        width = Math.max(width, bbox.width);
        height = Math.max(height, bbox.height);
      });
      return {
        width: width + labelOffset,
        height: height + labelOffset,
      };
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

    getTicks() {
      const { props } = this;
      const { field, chart } = props;
      const scale = chart.getScale(field);
      const ticks = scale.getTicks();
      return ticks;
    }

    convertTicks(ticks) {
      const { props } = this;
      const { coord } = props;
      const dimType = this._getDimType();
      const otherDim = dimType === 'x' ? 'y' : 'x';

      return ticks.map((tick) => {
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
        };
      });
    }

    // 主要是计算coord的布局
    updateCoord() {
      const { props, context } = this;
      const { visible, style, chart, coord } = props;
      if (visible === false) {
        return;
      }

      const { theme, px2hd } = context;
      this.style = px2hd(deepMix({}, theme.axis, style));
      const ticks = this.getTicks();
      const bbox = this.getMaxBBox(ticks, this.style);
      const {
        isPolar,
        left,
        top,
        width: coordWidth,
        height: coordHeight,
      } = coord;
      const dimType = this._getDimType();
      const { width, height } = bbox;

      if (isPolar) {
        // 机坐标系的 y 不占位置
        if (dimType === 'y') {
          return;
        }
        coord.update({
          left: left + width,
          top: top + height,
          width: coordWidth - width * 2,
          height: coordHeight - height * 2,
        });
        return;
      }

      // 直角坐标系下
      const position = this._getPosition();
      chart.layoutCoord(position, bbox);
    }

    render() {
      const { props, style } = this;
      const { visible, coord } = props;
      if (visible === false) {
        return null;
      }

      const ticks = this.getTicks();
      const position = this._getPosition();
      const dimType = this._getDimType();

      return (
        <View
          {...props}
          style={style}
          ticks={this.convertTicks(ticks)}
          coord={coord}
          position={position}
          dimType={dimType}
        />
      );
    }
  };
};
