import { ScaleValues, ZoomRange } from './index';
import { Scale, getTickMethod } from '../../deps/f2-scale/src';
import { getRange, isArray } from '@antv/util';
import { toTimeStamp } from '../../util';

// 判断新老values是否相等，这里只要判断前后是否相等即可
function isValuesEqual(values: ScaleValues, newValues: ScaleValues) {
  if (values.length !== newValues.length) {
    return false;
  }
  const lastIndex = values.length - 1;
  return values[0] === newValues[0] && values[lastIndex] === newValues[lastIndex];
}

function updateCategoryRange(scale: Scale, originScale: Scale, range: ZoomRange) {
  const { values: currentValues, ticks: currentTicks, tickMethod, tickCount } = scale;
  const { values: originValues } = originScale;
  const [start, end] = range;
  const len = originValues.length;
  const valueStart = start * len;
  const valueEnd = end * len;

  // 保持滑动时个数的稳定
  const diff = valueEnd - valueStart;
  const precision = parseFloat(diff.toFixed(3)); // js 计算精度问题
  const count = Math.round(precision);
  const sliceSatrt = Math.min(Math.round(valueStart), len - count);

  // 从原始数据里截取需要显示的数据
  const newValues = originValues.slice(sliceSatrt, sliceSatrt + count);
  // 根据当前数据的比例，和定义的tickCount计算应该需要多少个ticks
  const newTickCount = Math.round((tickCount * originValues.length) / newValues.length);

  // 计算新的ticks
  const catTicks = getTickMethod(tickMethod as string);
  const newTicks = catTicks({
    tickCount: newTickCount,
    values: originValues,
  });

  // 如果新数组和当前显示的数组相同，则不更新
  if (isValuesEqual(currentValues, newValues) && isValuesEqual(currentTicks, newTicks)) {
    return;
  }

  scale.change({
    values: newValues,
    ticks: newTicks,
  });
  return scale;
}

function updateLinearRange(scale: Scale, originScale: Scale, range: ZoomRange) {
  const { min, max } = originScale;

  const [start, end] = range;
  const newMin = min + (max - min) * start;
  const newMax = min + (max - min) * end;

  scale.change({ min: newMin, max: newMax, nice: false });
}

function updateScale(scale: Scale, values: ScaleValues) {
  const { isLinear } = scale;
  if (isLinear) {
    const { min, max } = getRange(values as number[]);
    return scale.change({ min, max, nice: true });
  }
}

function updateRange(scale: Scale, originScale: Scale, range: ZoomRange) {
  const { isCategory, isLinear } = scale;
  if (isCategory) {
    return updateCategoryRange(scale, originScale, range);
  }
  if (isLinear) {
    return updateLinearRange(scale, originScale, range);
  }
}

function updateFollow(scales: Scale[], mainScale: Scale, data) {
  const { field: mainField, type: mainType, values: mainValues } = mainScale;

  // 转成 map 提高查询性能
  const mainValuesMap = {};
  mainValues.forEach((item) => {
    mainValuesMap[item] = true;
  });

  return scales.map((scale) => {
    const { field: followField } = scale;
    const values = [];
    data.forEach((item) => {
      const value = mainType === 'timeCat' ? toTimeStamp(item[mainField]) : item[mainField];
      if (mainValuesMap[value]) {
        const followItemValue = item[followField];
        if (isArray(followItemValue)) {
          values.push(...followItemValue);
        } else {
          values.push(followItemValue);
        }
      }
    });
    return updateScale(scale, values);
  });
}

export { updateRange, updateFollow };
