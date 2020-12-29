import { batch2hd, isArray } from './src/util';

// 实现jsx-runtime 入口，需要使用es5语法
var jsx = function(type: string | Function, props: any, key?: string) {
  if (typeof type === 'function') {
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

export { jsx, jsx as jsxs };
