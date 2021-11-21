import JSX from './interface';
import { ElementType } from '../types';

// 实现jsx-classic 入口
export default function(type: ElementType, config: any, ...children: any[]): JSX.Element {
  const { key, ref, ...props } = config || {};

  // 保持和automatic模式一致
  if (children.length) {
    props.children = children.length === 1 ? children[0] : children;
  }
  return {
    key,
    ref,
    type,
    props,
    // 存储一些过程中的cache值
    _cache: {},
  };
}
