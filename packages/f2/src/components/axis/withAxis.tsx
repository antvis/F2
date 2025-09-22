import { jsx, isEqual, Component } from '@antv/f-engine';
import {
  deepMix,
  isFunction,
  mix,
  each,
  clone,
  isString,
  isNumber,
  isArray,
  isNil,
} from '@antv/util';
import { ChartChildProps, PositionLayout } from '../../chart';
import { Style, Tick, AxisProps } from './types';
import { DataRecord } from '../../chart/Data';

type BBox = {
  height: number;
  width: number;
};

const SHOW_MIDDLE_LABEL_THRESHOLD = 10;

export { AxisProps };

export default (View) => {
  return class Axis<
    TRecord extends DataRecord = DataRecord,
    IProps extends AxisProps<TRecord> = AxisProps<TRecord>
  > extends Component<IProps & ChartChildProps, {}> {
    axisStyle: Style = {};
    maxLabelWidth: number = 0;
    ticks: Tick[];

    constructor(props: IProps & ChartChildProps) {
      super(props);
      const { chart, field } = props;

      const scaleOption = this.getScaleOption(props);
      chart.setScale(field as string, scaleOption);
    }

    willReceiveProps(nextProps: IProps & ChartChildProps) {
      const { props: lastProps } = this;
      const { chart, field } = nextProps;

      const nextScaleOption = this.getScaleOption(nextProps);
      const lastScaleOption = this.getScaleOption(lastProps);
      if (!isEqual(nextScaleOption, lastScaleOption)) {
        chart.setScale(field as string, nextScaleOption);
      }
    }

    willMount() {
      this.updateCoord();
    }

    willUpdate() {
      this.updateCoord();
    }

    getScaleOption(props: IProps) {
      const { type, tickCount, range, mask, formatter, ticks, min, max, nice } = props;

      return {
        type,
        tickCount,
        range,
        mask,
        formatter,
        min,
        max,
        nice,
        ticks,
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
      const { label, labelOffset } = style;

      let width = 0;
      let height = 0;
      ticks.forEach((tick: Tick) => {
        if (!label) return;
        const { labelStyle = {}, text } = tick;
        const bbox = measureText(labelStyle.text || text, { ...label, ...labelStyle });
        width = Math.max(width, bbox.width);
        height = Math.max(height, bbox.height);
      });
      if (!width && !height) {
        return { width, height };
      }

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
      const scale = chart.getScale(field as string);
      let ticks = scale.getTicks();

      // 设置tick的样式
      ticks = this._setTicksStyle(ticks);
      ticks = this._generateGridPoints(ticks);
      return ticks;
    }

    /**
     * 生成极坐标下网格线的交叉点
     * @param ticks
     * @returns
     */
    _generateGridPoints(ticks) {
      const { props } = this;
      const { chart, coord } = props;

      if (!coord.isPolar) {
        return ticks;
      }
      const dimType = this._getDimType();
      // 只需要在 y 的时候生成
      if (dimType !== 'y') {
        return ticks;
      }
      const xScale = chart.getXScales()[0];
      const xTicks = xScale.getTicks();
      ticks.forEach((tick) => {
        const gridPoints = xTicks.map((xTick) => {
          return coord.convertPoint({
            x: xTick.value,
            y: tick.value,
          });
        });

        // 添加第 1 个点，形成环状
        gridPoints.push(gridPoints[0]);
        tick.gridPoints = gridPoints;
      });

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
          this.axisStyle[key] = px2hd(styleValue) || value;
        } else if (isArray(styleValue)) {
          this.axisStyle[key] = styleValue.map((d) => px2hd(deepMix(clone(value), d)));
        } else {
          this.axisStyle[key] = px2hd(deepMix(clone(value), styleValue));
        }
      });

      return ticks.map((tick: Tick, index) => {
        const { label, grid } = style;
        const { label: defaultLabelStyle, grid: defaultGridStyle } = themeAxis;
        if (isFunction(label)) {
          tick.labelStyle = px2hd(mix({}, defaultLabelStyle, label(tick.text, index, ticks)));
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

    calculateLabelOverflow(lastTick): number {
      if (!lastTick) {
        return 0;
      }
      const { props, context, axisStyle } = this;
      const { measureText } = context;
      const { label } = axisStyle;
      const { coord } = props;
      const { labelStyle = {}, text } = lastTick;

      const tickBBox = measureText(labelStyle.text || text, { ...label, ...labelStyle });

      const lastTickPoint = coord.convertPoint({
        x: lastTick.value,
        y: 0,
      });

      let labelRightEdge = lastTickPoint.x;
      const { align = 'center' } = { ...label, ...labelStyle };

      if (align === 'center') {
        labelRightEdge += tickBBox.width / 2;
      } else if (align === 'left' || align === 'start') {
        labelRightEdge += tickBBox.width;
      }

      return labelRightEdge > coord.right ? labelRightEdge - coord.right : 0;
    }

    _getXTicksDistance(ticks) {
      const { props } = this;
      const { coord } = props;

      const firstPoint = coord.convertPoint({
        x: ticks[0].value,
        y: 0,
      });

      const secondPoint = coord.convertPoint({
        x: ticks[1].value,
        y: 0,
      });
      return Math.abs(secondPoint.x - firstPoint.x);
    }

    measureLayout(ticks): PositionLayout | PositionLayout[] {
      const { props, context } = this;
      const { visible, coord, style, labelAutoRotate = false, labelAutoHide = false } = props;
      if (visible === false) {
        return null;
      }
      const { width: customWidth, height: customHeight } = style || {};

      const bbox = this.getMaxBBox(ticks, this.axisStyle);

      const { isPolar } = coord;
      const dimType = this._getDimType();

      const width = isNil(customWidth) ? bbox.width : context.px2hd(customWidth);
      const height = isNil(customHeight) ? bbox.height : context.px2hd(customHeight);

      if (isPolar) {
        // 机坐标系的 y 不占位置
        if (dimType === 'y') {
          return null;
        }
        // 4 个方向都需要留空
        return ['top', 'right', 'bottom', 'left'].map(
          (position: 'top' | 'right' | 'bottom' | 'left') => {
            return {
              position,
              width,
              height,
            };
          }
        );
      }

      // 直角坐标系下
      const position = this._getPosition();

      if ((labelAutoRotate || labelAutoHide) && dimType === 'x') {
        const lastTick = ticks[ticks.length - 1];

        const overflowWidth = this.calculateLabelOverflow(lastTick);

        return [
          {
            position,
            width,
            height,
          },
          {
            position: 'right',
            width: overflowWidth,
            height: 0,
          },
        ];
      }

      return {
        position,
        width,
        height,
      };
    }

    findSuitableRotation(ticks) {
      const { context } = this;
      const { measureText } = context;

      const averageSpace = this._getXTicksDistance([ticks[0], ticks[1]]);
      const { label } = this.axisStyle;
      const { labelStyle = {}, text } = ticks[0];
      const bbox = measureText(labelStyle.text || text, { ...label, ...labelStyle });
      const labelHeight = bbox.height;

      // 安全距离
      const safetyDistance = 2;

      const availableSpace = labelHeight + safetyDistance;

      const sinValue = availableSpace / averageSpace;

      const clampedSinValue = Math.max(-1, Math.min(1, sinValue));

      const theoreticalAngle = (Math.asin(clampedSinValue) * 180) / Math.PI;

      const ceiledAngle = Math.ceil(theoreticalAngle);

      if (ceiledAngle > 0 && ceiledAngle <= 90) {
        ticks.forEach((tick) => {
          tick.labelStyle = tick.labelStyle || {};
          tick.labelStyle.align = 'start';
          tick.labelStyle.transform = `rotate(${ceiledAngle}deg)`;
          tick.labelStyle.transformOrigin = '0 50%';
        });
      }
    }

    hasOverlapAtSeq(ticks, step) {
      const { px2hd } = this.context;
      const { safetyDistance = 2 } = this.props;
      const XDistance = this._getXTicksDistance([ticks[0], ticks[step]]);

      let prevIdx = 0;
      for (let currIdx = step; currIdx <= ticks.length - 1; currIdx += step) {
        const { label } = this.axisStyle;
        const { labelStyle = {} } = ticks[prevIdx];
        const { align = 'center' } = { ...label, ...labelStyle };

        let minDistance =
          (ticks[prevIdx].labelWidth + ticks[currIdx].labelWidth) / 2 + px2hd(safetyDistance);
        if (prevIdx === 0 && align === 'between') {
          minDistance += ticks[prevIdx].labelWidth / 2;
        }

        if (XDistance < minDistance) {
          return true;
        }

        prevIdx = currIdx;
      }

      return false;
    }

    hasOverlap(ticks) {
      const { context } = this;
      const { measureText } = context;

      const tickCount = ticks.length;

      const { label } = this.axisStyle;

      for (let i = 0; i < tickCount; i++) {
        const tick = ticks[i];
        const { labelStyle = {}, text } = tick;
        const bbox = measureText(labelStyle.text || text, { ...label, ...labelStyle });
        tick.labelWidth = bbox.width;
        this.maxLabelWidth = Math.max(this.maxLabelWidth, bbox.width);
      }
      return this.hasOverlapAtSeq(ticks, 1);
    }

    findLabelsToHide(ticks) {
      const { props } = this;
      const { coord } = props;

      const tickCount = ticks.length;

      const initialSeq = Math.floor(this.maxLabelWidth / (coord.width / (tickCount - 1)));

      const range = tickCount - 1;
      const maxSeq = Math.floor(range / 2);

      let finalSeq = initialSeq;

      while (finalSeq <= maxSeq && range % finalSeq !== 0) {
        finalSeq++;
      }

      while (finalSeq <= maxSeq && this.hasOverlapAtSeq(ticks, finalSeq)) {
        finalSeq++;
        while (finalSeq <= maxSeq && range % finalSeq !== 0) {
          finalSeq++;
        }
      }

      if (finalSeq === 1) {
        return;
      }

      ticks.forEach((tick) => {
        tick.visible = false;
      });

      // 没找到最佳步长，则保留第一个和最后一个数据，如果总range较大，保留中间的label
      if (finalSeq > maxSeq) {
        ticks[0].visible = true;
        if(range > SHOW_MIDDLE_LABEL_THRESHOLD && !this.hasOverlapAtSeq(ticks, maxSeq)) {
          ticks[maxSeq].visible = true;
        }
        ticks[range].visible = true
        return;
      }
      for (let i = 0; i <= range; i += finalSeq) {
        ticks[i].visible = true;
      }
    }

    // 计算坐标轴布局并更新坐标系
    updateCoord() {
      const { props } = this;
      const { chart, labelAutoRotate = false, labelAutoHide = false } = props;
      const dimType = this._getDimType();
      const ticks = this.getTicks();

      if ((labelAutoRotate || labelAutoHide) && dimType === 'x' && this.hasOverlap(ticks)) {
        if (labelAutoRotate) {
          this.findSuitableRotation(ticks);
        }

        if (labelAutoHide) {
          this.findLabelsToHide(ticks);
        }

        this.ticks = ticks;
      }

      // 测量并获取布局信息
      const layout = this.measureLayout(ticks);

      // 更新图表的坐标系
      chart.updateCoordFor(this, layout);
    }

    render() {
      const { props, axisStyle } = this;
      const { visible, coord } = props;
      const dimType = this._getDimType();

      if (visible === false) {
        return null;
      }

      const ticks = this.ticks ? this.ticks : this.getTicks();
      const position = this._getPosition();

      return (
        <View
          {...props}
          style={axisStyle}
          ticks={this.convertTicks(ticks)}
          coord={coord}
          position={position}
          dimType={dimType}
        />
      );
    }
  };
};
