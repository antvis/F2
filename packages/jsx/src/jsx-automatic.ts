import { batch2hd, extendArray, isFunction } from '@ali/f2x-util';
import JSX from './interface';

// 实现jsx-runtime 入口
export default function(type: string | Function, props: any, key?: string): JSX.Element {
  if (isFunction(type)) {
    // f2组件，需要在外部实例化
    // @ts-ignore
    if (type.prototype && type.prototype.isF2Component) {
      return {
        type,
        props,
        key,
      };
    }
    // 如果是方法，直接执行，生成G的定义树
    // @ts-ignore
    return type(props);
  }

  const { style, attrs, children } = props;

  return {
    type,
    props,
    key,
    style: batch2hd(style) || {},
    attrs: batch2hd(attrs),
    children: extendArray(children),
  };
};
