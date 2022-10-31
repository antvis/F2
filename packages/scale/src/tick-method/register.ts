import { TickMethod } from '../types';
interface MethodMap {
  [key: string]: TickMethod;
}
const methodCache: MethodMap = {};

/**
 * 获取计算 ticks 的方法
 * @param key 键值
 * @returns 计算 ticks 的方法
 */
export function getTickMethod(key: string): TickMethod {
  return methodCache[key];
}

/**
 * 注册计算 ticks 的方法
 * @param key 键值
 * @param method 方法
 */
export function registerTickMethod(key: string, method: TickMethod) {
  methodCache[key] = method;
}
