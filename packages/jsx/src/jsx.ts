import { batch2hd, isArray, isFunction } from './util';

// 实现jsx-runtime 入口
export default function(type: string | Function, props: any, key?: string) {
  const { style, attrs, children: nodeChildren } = props;

  // 要转成array
  const children = nodeChildren && !isArray(nodeChildren) ? [ nodeChildren ] : nodeChildren;

  // 清理为空的子元素
  props.children = children && children.filter((child: any) => !!child);

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
    // @ts-ignore
    return type(props);
  }

  return {
    type,
    props,
    style: batch2hd(style) || {},
    attrs: batch2hd(attrs),
    children: props.children,
    key,
  };
};
