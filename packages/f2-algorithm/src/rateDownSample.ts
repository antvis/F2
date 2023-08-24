import { isString, isFunction } from '@antv/util';

/**
 * data down sampling
 * 常见统计采样，最大最小固定点等
 * @param {string} data
 * @param {number} targetCount
 * @param {string} sampler
 */

function downSample(data, rate, sampler, dimension) {
  const sampled = [];
  let sampledIndex = 0;
  const len = data.length;
  let frameSize = Math.floor(rate);

  for (let i = 0; i < len; i += frameSize) {
    // Last frame
    frameSize = frameSize > len - i ? len - i : frameSize;
    const frameValues = [];

    for (let k = 0; k < frameSize; k++) {
      frameValues[k] = data[k + i];
    }

    const value = sampler(frameValues, dimension);
    sampled[sampledIndex++] = value;
  }

  return sampled;
}

const samplers = {
  max: (frame, dimension) => {
    const max = -Infinity;
    let maxData;
    for (let i = 0; i < frame.length; i++) {
      frame[i][dimension] > max && (maxData = frame[i]);
    }
    return maxData || NaN;
  },
  min: (frame, dimension) => {
    const min = Infinity;
    let minData;
    for (let i = 0; i < frame.length; i++) {
      frame[i][dimension] < min && (minData = frame[i]);
    }
    return minData || NaN;
  },
  // TODO 中位数 median
  nearest: (frame) => {
    return frame[0];
  },
};

export interface OptionsProps {
  sampling: 'nearest' | 'max' | 'min' | Function;
  /* 周期  */
  rate: number;
  dimension: string;
}

export default function rateDownSample(data, options?: OptionsProps) {
  const { sampling = 'nearest', rate = 5, dimension = 'value' } = options;
  let sampler;
  if (isFinite(rate) && rate > 1) {
    if (isString(sampling)) {
      sampler = samplers[sampling];
    } else if (isFunction(sampling)) {
      sampler = sampling;
    }

    return downSample(data, rate, sampler, dimension);
  }
  return data;
}
