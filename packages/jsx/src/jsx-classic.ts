import { batch2hd, extendArray, isFunction } from './util';

// 实现jsx-classic 入口
export default function(type: string | Function, props: any, ...children: any[]) {
  props = props || {};
  if (isFunction(type)) {
    // f2组件，需要在外部实例化
    // @ts-ignore
    if (type.prototype && type.prototype.isF2Component) {
      return {
        type,
        props,
        key: props.key,
      };
    }
    // 如果是方法，直接执行，生成G的定义树
    // @ts-ignore
    return type(props);
  }

  const { style, attrs, key } = props;

  return {
    type,
    props,
    key,
    style: batch2hd(style) || {},
    attrs: batch2hd(attrs),
    children: extendArray(children),
  };
};
