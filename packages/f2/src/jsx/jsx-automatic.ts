import JSX from './types';
import { ElementType } from '../types';

// 实现jsx-automatic 入口
export function jsx(type: ElementType, config, key?: string): JSX.Element {
  const { ref, ...props } = config || {};
  return {
    key,
    ref,
    type,
    props,
    // 存储一些过程中的cache值
    _cache: {},
  };
}
