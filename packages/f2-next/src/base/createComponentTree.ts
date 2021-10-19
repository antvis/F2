import Children from '../children';

function createComponentTree(element: JSX.Element, otherProps) {
  if (!element) return element;
  const { type, key, ref, props } = element;

  // 其他标签都不处理
  if (typeof type !== 'function') {
    return null;
  }
  // 如果已经是F2 component了，直接返回
  if (type.prototype && type.prototype.isF2Component) {
    // 只保留需要的属性
    return {
      type,
      key,
      ref,
      props,
    };
  }
  // 其他情况 说明是 function component, 直接执行
  const newElement = type({ ...props, ...otherProps });
  return createComponentTree(newElement, otherProps);
}

export default (children: JSX.Element[], otherProps?) => {
  return Children.map(children, (child: JSX.Element) => {
    return createComponentTree(child, otherProps);
  });
};
