import { batch2hd, isArray, isFunction } from './util';

// 实现jsx-runtime 入口
export default function(type: string | Function, props: any, key?: string) {
  if (isFunction(type)) {
    // f2组件，需要在外部实例化
    // @ts-ignore
    if (type.prototype && type.prototype.isComponent) {
      return {
        type,
        props,
        key,
      };
    }
    // @ts-ignore
    return type(props);
  }
  const { style, attrs, children } = props;

  return {
    type,
    props,
    style: batch2hd(style) || {},
    attrs: batch2hd(attrs),
    children: children && !isArray(children) ? [ children ] : children,
    key,
  };
};
