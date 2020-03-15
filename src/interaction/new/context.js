import { getRange } from '../../util/array';
import {
  EVENT_AFTER_INIT,
  EVENT_AFTER_DATA_CHANGE
} from '../../chart/const';

const autoCat = require('@antv/scale/lib/auto/cat');

// 判断新老values是否相等，这里只要判断前后是否相等即可
function isValuesEqual(values, newValues) {
  if (values.length !== newValues.length) {
    return false;
  }
  const lastIndex = values.length - 1;
  return values[0] === newValues[0] && values[lastIndex] === newValues[lastIndex];
}

// 不同交互之间共享的上下文
const defaultRange = [ 0, 1 ];
class Context {
  chart = null;
  // 最开始的原始值
  values = null;
  // 当前显示的范围
  range = defaultRange;
  startRange = defaultRange;
  // 缩放最小的点数
  minCount = 10;
  // 最小的缩放比例, 默认通过minCount计算
  // minScale = 0.01;
  // 交互开始时，ticks个数，主要为了每次缩放后，更新ticks个数
  // lastTickCount;

  constructor(chart) {
    this.chart = chart;
    this._initEvent(chart);
  }
  _initEvent(chart) {
    // 在整体初始化后还需要设置一些初始状态
    chart.on(EVENT_AFTER_INIT, () => {
      // 初始化value值
      const scale = this.getPinchScale();
      // 记录原始全量数据
      const values = [].concat(scale.values);
      this.values = values;

      // 最小的缩放比例
      if (!this.minScale) {
        this.minScale = this.minCount / values.length;
      }

      // 初始化的时候有设置range，则初始化成默认比例
      if (this.range !== defaultRange) {
        this.updateRange(this.range);
        this.updateTicks();
      }
    });
    chart.on(EVENT_AFTER_DATA_CHANGE, () => {
      this.updateRange(this.range);
    });
  }
  // 缩放的主轴scale
  getPinchScale() {
    const { chart } = this;
    // 默认缩放x轴
    const scale = chart.getXScale();
    return scale;
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
    const scale = this.getPinchScale();
    const [ start, end ] = range;
    // 记录交互起始的范围
    this.startRange = [ start, end ];
    // 记录开始时的ticks个数
    this.lastTickCount = scale.tickCount;
  }

  doZoom(leftScale, rightScale, zoom) {
    const { startRange: range, minScale } = this;
    const [ start, end ] = range;

    const zoomOffset = (1 - zoom);
    const rangeLen = end - start;
    const rangeOffset = rangeLen * zoomOffset;
    const leftOffset = rangeOffset * leftScale;
    const rightOffset = rangeOffset * rightScale;

    const newStart = Math.max(0, start - leftOffset);
    const newEnd = Math.min(1, end + rightOffset);

    const newRange = [ newStart, newEnd ];

    // 如果已经到了最小比例，则不能再继续再放大
    if (newEnd - newStart < minScale) {
      return;
    }

    this.updateRange(newRange);
  }

  doMove(ratio) {
    // 不管是0， 还是其他，都不用处理
    if (!ratio) return;
    const { startRange: range } = this;
    const [ start, end ] = range;

    const rangeLen = end - start;

    const rangeOffset = rangeLen * ratio;
    const newStart = start - rangeOffset;
    const newEnd = end - rangeOffset;

    // 处理边界值
    let newRange;
    if (newStart < 0) {
      newRange = [ 0, rangeLen ];
    } else if (newEnd > 1) {
      newRange = [ 1 - rangeLen, 1 ];
    } else {
      newRange = [ newStart, newEnd ];
    }

    this.updateRange(newRange);
  }

  updateRange(range) {
    const { values } = this;

    // 0， 1 的范围之间
    let [ start, end ] = range;
    // start 不能小于0
    start = Math.max(0, start);
    // end 不能大于1
    end = Math.min(1, end);

    // 设置当前的范围
    this.range = [ start, end ];
    const len = values.length;
    const valueStart = start * len;
    const valueEnd = end * len;

    // 从原始数据里截取需要显示的数据
    const newValues = values.slice(valueStart, valueEnd);
    this.repaint(newValues);
  }

  repaint(newValues) {
    const { chart } = this;
    const scale = this.getPinchScale();
    const { values: currentValues, ticks } = scale;
    // 如果新数组和当前显示的数组相同，则不更新
    if (isValuesEqual(currentValues, newValues)) {
      return;
    }
    // 更新主轴values
    this.updateScale(scale, { ticks, values: newValues });
    this.updateFollowScale(scale, newValues);
    chart.repaint();
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
    const data = chart.get('data');
    data.forEach(item => {
      if (pinchScaleType === 'timeCat') {
        const value = pinchScale._toTimeStamp(item[pinchField]);
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
    scale.change(cfg);
  }

  // 上一次的tick个数
  updateTicks() {
    const { chart, lastTickCount, values } = this;
    const scale = this.getPinchScale();

    const { values: currentValues, tickCount, isRounding } = scale;
    // 根据当前数据的比例，和定义的tickCount计算应该需要多少个ticks
    const newTickCount = Math.round(tickCount * values.length / currentValues.length);

    // 如果个数没有变化，则不更新
    if (newTickCount === lastTickCount) {
      return;
    }
    const cat = autoCat({
      maxCount: newTickCount,
      data: values,
      isRounding
    });
    const ticks = cat.ticks;
    this.updateScale(scale, { ticks, values: currentValues });

    // 更新完后，需要重新绘制一次
    chart.repaint();
  }
}

export default Context;
