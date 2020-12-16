
// 实现jsx-runtime 入口，需要使用es5语法
var jsx = function(type, props, key) {
  return {
    type: type,
    props: props,
    style: props.style,
    children: props.children,
    key: key,
  };
};

exports.jsx = jsx;
exports.jsxs = jsx;
