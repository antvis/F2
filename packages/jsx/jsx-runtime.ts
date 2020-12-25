
// 实现jsx-runtime 入口，需要使用es5语法
var jsx = function(type, props, key) {
  if (typeof type === 'function') {
    return type(props);
  }
  return {
    type: type,
    props: props,
    style: props.style || {},
    children: props.children,
    key: key,
  };
};

export { jsx, jsx as jsxs };
