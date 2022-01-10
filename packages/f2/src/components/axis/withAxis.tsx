import { deepMix, isFunction, mix, each, clone, isString, isNumber } from '@antv/util';
import { jsx } from '../../jsx';
import equal from '../../base/equal';
import Component from '../../base/component';
import { Style, Tick, AxisProps } from './types';

type BBox = {
  height: number;
  width: number;
};

export default (View) => {
  return class Axis extends Component<AxisProps> {
    style: Style = {};

    constructor(props: AxisProps) {
      super(props);
      const { chart, field } = this.props;

      const scaleOption = this.getScaleOption(props);
      chart.setScale(field, scaleOption);
    }

    willReceiveProps(nextProps: AxisProps) {
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

    getScaleOption(props: AxisProps) {
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

    _getDimType(): 'x' | 'y' {
      const { props } = this;
      const { field, chart } = props;
      const xScales = chart.getXScales();
      const scales = xScales.filter((scale) => {
        return scale.field === field;
      });
      return scales.length > 0 ? 'x' : 'y';
    }
    // 获取ticks最大的宽高
    getMaxBBox(ticks, style: Style): BBox {
      const { context } = this;
      const { measureText } = context;
      const { labelOffset } = style;

      let width = 0;
      let height = 0;
      ticks.forEach((tick: Tick) => {
        const { labelStyle, text } = tick;
        const bbox = measureText(text, { ...style.label, ...labelStyle });
        width = Math.max(width, bbox.width);
        height = Math.max(height, bbox.height);
      });

      const bbox = {
        width: width + labelOffset,
        height: height + labelOffset,
      };
      return bbox;
    }

    _getPosition() {
      const { props } = this;
      const { position, coord } = props;
      if (position) {
        return position;
      }
      const dimType = this._getDimType();
      if (coord.transposed) {
        return dimType === 'x' ? 'left' : 'bottom';
      }
      return dimType === 'x' ? 'bottom' : 'left';
    }

    getTicks() {
      const { props } = this;
      const { field, chart } = props;
      const scale = chart.getScale(field);
      let ticks = scale.getTicks();

      // 设置tick的样式
      ticks = this._setTicksStyle(ticks);
      return ticks;
    }

    _setTicksStyle(ticks) {
      const { props, context } = this;
      const { theme, px2hd } = context;
      const { style = {} } = props;
      const { axis: themeAxis } = theme;

      each(themeAxis, (value, key) => {
        // 关闭tick的样式
        if (style[key] === null) {
          return;
        }
        const styleValue = isFunction(style[key]) ? undefined : style[key];

        if (isString(value) || isNumber(value)) {
          this.style[key] = px2hd(styleValue) || value;
        } else {
          this.style[key] = px2hd(deepMix(clone(value), styleValue));
        }
      });

      return ticks.map((tick: Tick, index) => {
        const { label, grid } = style;
        const { label: defaultLabelStyle, grid: defaultGridStyle } = themeAxis;
        if (isFunction(label)) {
          tick.labelStyle = px2hd(
            mix({}, defaultLabelStyle, label(tick.text, index, ticks))
          );
        }
        if (isFunction(grid)) {
          tick.gridStyle = px2hd(mix({}, defaultGridStyle, grid(tick.text, index, ticks.length)));
        }
        return tick;
      });
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
      const { props } = this;
      const { visible, chart, coord } = props;
      if (visible === false) {
        return;
      }

      const ticks = this.getTicks();
      const bbox = this.getMaxBBox(ticks, this.style);
      const { isPolar, left, top, width: coordWidth, height: coordHeight } = coord;
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
