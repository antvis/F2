import { batch2hd } from './src/util';

// 实现jsx-runtime 入口，需要使用es5语法
var jsx = function(type, props, key) {
  if (typeof type === 'function') {
    return type(props);
  }
  const { style, attrs } = props;
  return {
    type: type,
    props: props,
    style: batch2hd(style) || {},
    attrs: batch2hd(attrs),
    children: props.children,
    key: key,
  };
};

export { jsx, jsx as jsxs };
