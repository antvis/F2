import { valuesOfKey, sortBy, isArray, pick, filter } from '@antv/util';

export type UserOpt = {
  xField: string;
  fields?: string[];
  units?: number[];
  start?: any;
  [k: string]: any;
};

export type TimeCfg = {
  field: string;
  times: { [k: string]: number };
};

export type TimeCfgArray = TimeCfg[];

function getFieldValues(data: any[], field: string) {
  return valuesOfKey(data, field);
}

function pickAttrs(element, attrNames: string[]) {
  if (!isArray(element)) {
    return pick(element, attrNames);
  }

  let origin = [];
  element.forEach((e, i) => {
    origin.push(pick(e, attrNames));
  });
  return origin;
}

// TODO 后续实现不同的插值计算方法
function interpolateTimes() {}
function getTimesByField(data: any[], field: string, isX: boolean, unit: number, start?: any) {
  let times = {};

  let fieldValues = [];
  let startIndex = 0;

  if (isX) {
    fieldValues = getFieldValues(data, field);
  } else {
    const sortedData = sortBy(data, field);
    fieldValues = getFieldValues(sortedData, field);
  }

  if (start) {
    startIndex = fieldValues.indexOf(start);
    if (startIndex < 0) {
      throw new Error('"start" value not found');
    }
  }

  for (let i = 0, len = fieldValues.length; i < len; i++) {
    const value = fieldValues[i];
    times[value] = Math.abs((i - startIndex) * unit);
  }
  return times;
}

function getTimes(data: any[], xField: string, field: string, unit: number, start?: any) {
  let isX = false;
  isX = field === xField;
  return getTimesByField(data, field, isX, unit, start);
}

function getCfgArray(
  data: any[],
  xField: string,
  fields: string[],
  unit: number[],
  start?: any
): TimeCfgArray {
  let cfgArray = [];
  for (let i = 0, len = fields.length; i < len; i++) {
    const field = fields[i];
    const times = getTimes(data, xField, field, unit[i], start);
    cfgArray.push({
      field,
      times,
    });
  }
  return cfgArray;
}

/**
 * 根据原始数据集和用户time设置计算得到times配置
 * @param data 原始数据集
 * @param userDelayCfg 用户time设置
 */
export function processUserOpt(data: any[], userOpt: UserOpt): TimeCfgArray {
  if (!data || !data.length) {
    throw new Error('"data" required when process user option');
  }

  if (typeof userOpt === 'number') {
    return userOpt;
  }

  const { xField, fields, units, start } = userOpt;

  if (!xField) throw new Error('"xField" required by time configuration but get null');

  let _fields = [xField];
  if (fields && !isArray(fields)) throw new Error('"fields" must be Array');
  if (fields && fields.length) {
    _fields = fields;
  }

  let _unit = [1500, 500];
  if (units && !isArray(units)) throw new Error('"units" must be Array');
  if (units && units.length) {
    units.forEach((u, i) => {
      _unit[i] = u;
    });
  }

  return getCfgArray(data, xField, _fields, _unit, start);
}

function parseCfg(cfgs, item) {
  if (typeof cfgs === 'number') {
    return cfgs;
  } else {
    let time = 0;
    // cfg=[{field:'',delays:{}},...]
    for (let i = 0, len = cfgs.length; i < len; i++) {
      const cfg = cfgs[i];
      const { field, times } = cfg;
      if (typeof item === 'string') {
        time += times[item];
      } else {
        const { origin } = item;
        time += times[origin[field]];
      }
    }
    return time;
  }
}

/**
 * 根据times配置，在动画执行前获取图形元素各自的动画配置
 * @param animationCfg times配置
 * @param item 固定参数，无需手动传入
 * @returns
 */
export function processAnimationTypeCfg(animationCfg, item) {
  let typeCfg = {};

  const { delay: uDelayCfg, duration: uDurationCfg, easing } = animationCfg;

  // delay处理
  if (uDelayCfg) {
    typeCfg['delay'] = parseCfg(uDelayCfg, item);
  }

  // duration处理
  if (uDurationCfg) {
    typeCfg['duration'] = parseCfg(uDurationCfg, item);
  }

  // easing处理
  if (easing) {
    typeCfg['easing'] = easing;
  }
  return typeCfg;
}
