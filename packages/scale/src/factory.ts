import Scale from './base';
import { ScaleConfig } from './types';
type ScaleConstructor<T extends Scale = Scale> = new (cfg: ScaleConfig) => T;

interface ScaleMap {
  [key: string]: ScaleConstructor;
}

const map: ScaleMap = {};

function getClass(key: string): ScaleConstructor {
  return map[key];
}

function registerClass(key: string, cls: ScaleConstructor) {
  if (getClass(key)) {
    throw new Error(`type '${key}' existed.`);
  }
  map[key] = cls;
}

export { Scale, getClass as getScale, registerClass as registerScale };
