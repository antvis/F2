import { getTickMethod } from '@antv/scale';
import { getRange } from '@antv/util';
import { toTimeStamp } from '../../util';
import { renderComponent } from '../../base/diff'
import Children from '../../children'

// 判断新老values是否相等，这里只要判断前后是否相等即可
function isValuesEqual(values, newValues) {
  if (values.length !== newValues.length) {
    return false;
  }
  const lastIndex = values.length - 1;
  return (
    values[0] === newValues[0] && values[lastIndex] === newValues[lastIndex]
  );
}

// 不同交互之间共享的上下文
const defaultRange = [0, 1];
class Context {
  canvas = null;
  chart = null;
  // 最开始的原始值
  values = null;
  // 当前显示的范围
  range = defaultRange;
  startRange = defaultRange;
  // 缩放最小的点数
  minCount = 10;
  // 最小的缩放比例, 默认通过minCount计算
  minScale = 0.01;
  // 交互开始时，ticks个数，主要为了每次缩放后，更新ticks个数
  // lastTickCount;

  constructor(chart) {
    this.chart = chart;
    this.canvas = chart.context.canvas;
  }


  // TODO:数据或者scale发生变化后做一些处理
  update() { }

  // 缩放的主轴scale
  getPinchScale() {
    const { chart } = this;
    // 默认缩放x轴
    const scales = chart.getXScales();
    return scales[0];
  }
  // 跟随轴的scale
  getFollowScale() {
    const { chart } = this;
    // 默认缩放x轴
    const scales = chart.getYScales() || [];
    return scales[0];
  }

  start() {
    const { range } = this;
    // const scale = this.getPinchScale();
    const [start, end] = range;
    // 记录交互起始的范围
    this.startRange = [start, end];
    // 记录开始时的ticks个数
    // this.lastTickCount = scale.tickCount;
  }

  doZoom(leftScale, rightScale, zoom) {
    const { startRange: range, minScale } = this;
    const [start, end] = range;

    const zoomOffset = 1 - zoom;
    const rangeLen = end - start;
    const rangeOffset = rangeLen * zoomOffset;
    const leftOffset = rangeOffset * leftScale;
    const rightOffset = rangeOffset * rightScale;

    const newStart = Math.max(0, start - leftOffset);
    const newEnd = Math.min(1, end + rightOffset);

    const newRange = [newStart, newEnd];
    // 如果已经到了最小比例，则不能再继续再放大
    if (newEnd - newStart < minScale) {
      return;
    }

    this.repaint(newRange);
  }

  doMove(ratio) {
    // 不管是0， 还是其他，都不用处理
    if (!ratio) return;
    const { startRange: range } = this;
    const [start, end] = range;

    const rangeLen = end - start;

    const rangeOffset = rangeLen * ratio;
    const newStart = start - rangeOffset;
    const newEnd = end - rangeOffset;

    // 处理边界值
    let newRange;
    if (newStart < 0) {
      newRange = [0, rangeLen];
    } else if (newEnd > 1) {
      newRange = [1 - rangeLen, 1];
    } else {
      newRange = [newStart, newEnd];
    }

    this.repaint(newRange);
  }

  updateRange(range) {
    // 0， 1 的范围之间
    let [start, end] = range;
    // start 不能小于0
    start = Math.max(0, start);
    // end 不能大于1
    end = Math.min(1, end);
    // 设置当前的范围
    this.range = [start, end];
  }

  updateFollowScale(pinchScale, pinchValues) {
    const { chart } = this;
    const followScale = this.getFollowScale();
    const { field: pinchField, type: pinchScaleType } = pinchScale;
    const { field: followField } = followScale;
    // 根据主轴的value值，找到所有从轴的value值
    const values = [];
    // 转成map，让查找性能更高
    const pinchValueMap = {};
    pinchValues.forEach(item => {
      pinchValueMap[item] = true;
    });
    const { data } = chart;
    data.forEach(item => {
      if (pinchScaleType === 'timeCat') {
        const value = toTimeStamp(item[pinchField]);
        if (pinchValueMap[value]) {
          values.push(item[followField]);
        }
      }
    });
    const { min, max } = getRange(values);
    this.updateScale(followScale, { min, max, nice: true });
  }

  updateScale(scale, cfg) {
    if (!scale) {
      return;
    }
    const { field } = scale;
    const { chart } = this;
    chart.setScale(field, cfg)
  }

  getDefaultValues() {
    if (this.values) { return this.values }
    const { values } = this.getPinchScale();
    this.values = [].concat(values);
    return this.values;
  }

  getZoomedValues(range) {
    const values = this.getDefaultValues();

    let [start, end] = range;
    const len = values.length;
    const valueStart = start * len;
    const valueEnd = end * len;

    // 从原始数据里截取需要显示的数据
    const newValues = values.slice(valueStart, valueEnd);
    return newValues;
  }

  getZoomedTicks(newValues) {
    const values = this.getDefaultValues();
    const scale = this.getPinchScale();

    const { tickCount } = scale;
    // 根据当前数据的比例，和定义的tickCount计算应该需要多少个ticks
    const newTickCount = Math.round(
      (tickCount * values.length) / newValues.length
    );

    const catTicks = getTickMethod('cat');
    const ticks = catTicks({
      tickCount: newTickCount,
      values,
    });

    return ticks;
  }

  repaint(range?) {
    const scale = this.getPinchScale();
    if (!scale) {
      return;
    }
    const { values: currentValues, ticks: currentTicks } = scale;

    // 更新range(数据窗口)
    if (range) {
      this.updateRange(range);
    }

    // 从原始数据里截取需要显示的数据
    const newValues = this.getZoomedValues(this.range);

    // 根据要展示的数据数量计算出需要展示的ticks
    const newTicks = this.getZoomedTicks(newValues);

    // 如果新数组和当前显示的数组相同，则不更新
    if (
      isValuesEqual(currentValues, newValues) &&
      isValuesEqual(currentTicks, newTicks)
    ) {
      return;
    }

    // 更新主轴度量
    this.updateScale(scale, { values: newValues, ticks: newTicks });
    // 更新副轴度量
    this.updateFollowScale(scale, newValues);

    // 触发Chart重新渲染
    this.render();
  }

  private render() {
    const { chart } = this;
    const { animate } = chart;
    chart.setAnimate(false);
    chart.setState({
      zoomRange: this.range,
    }, () => {
      chart.setAnimate(animate);
    });
  }

  destroy() { }
}

export default Context;
