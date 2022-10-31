import Adjust, { AdjustConstructor } from './adjusts/adjust';

interface AdjustMapType {
  [type: string]: AdjustConstructor;
}

const ADJUST_MAP: AdjustMapType = {};

/**
 * 根据类型获取 Adjust 类
 * @param type
 */
const getAdjust = (type: string): AdjustConstructor => {
  return ADJUST_MAP[type.toLowerCase()];
};

/**
 * 注册自定义 Adjust
 * @param type
 * @param ctor
 */
const registerAdjust = (type: string, ctor: AdjustConstructor): void => {
  // 注册的时候，需要校验 type 重名，不区分大小写
  if (getAdjust(type)) {
    throw new Error(`Adjust type '${type}' existed.`);
  }
  // 存储到 map 中
  ADJUST_MAP[type.toLowerCase()] = ctor;
};

export { getAdjust, registerAdjust, Adjust };

export * from './interface';
