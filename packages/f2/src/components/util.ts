import { valuesOfKey, sortBy } from '@antv/util';

export type DelayCfg = {
  data: any[];
  field: string;
  delayUnit: number;
  [k: string]: any;
};

function getFieldValues(data: any[], field: string) {
  return valuesOfKey(data, field);
}

function getIndex(data: any[], field: string, value: any) {
  for (let i = 0, len = data.length; i < len; i++) {
    const record = data[i];
    if (record[field] === value) {
      return i;
    }
  }
  return -1;
}

// TODO 后续可实现不同的插值方法
function getDelays(data: any[], field: string, isX: boolean, delayUnit: number, start?: any) {
  if (!data) {
    throw new Error('function "getDelays" needs "data"');
  }
  let delays = {};
  let startIndex = 0;

  if (isX) {
    if (start) {
      startIndex = getIndex(data, field, start);
    }
    for (let i = 0, len = data.length; i < len; i++) {
      const value = data[i][field];
      delays[value] = Math.abs((i - startIndex) * delayUnit);
    }
  } else {
    const sortedData = sortBy(data, field);
    const sortedFieldValues = getFieldValues(sortedData, field);
    if (start) {
      startIndex = getIndex(sortedData, field, start);
    }
    for (let i = 0, len = sortedFieldValues.length; i < len; i++) {
      const value = sortedFieldValues[i];
      delays[value] = Math.abs((i - startIndex) * delayUnit);
    }
  }

  return delays;
}

function _getDelayCfg(data: any[], field: string, xField: string, delayUnit: number, start?: any) {
  const delays = getDelays(data, field, field === xField, delayUnit, start);
  return {
    field: field,
    delays: delays,
  };
}

export default function getDelayCfg(cfg: DelayCfg, xField: string) {
  //   if (!cfg) {
  //     return {};
  //   }
  if (!cfg.data) {
    throw new Error('"Data" required by delay configuration but get null');
  }
  if (!cfg.field) {
    throw new Error('"Field" required by delay configuration but get null');
  }
  if (!cfg.delayUnit) {
    throw new Error("'DelayUnit' required by delay configuration but get null");
  }
  const { data, field, delayUnit, start } = cfg;
  return _getDelayCfg(data, field, xField, delayUnit, start);
}
