import { map } from '../util';
import Container from '../base/container';

function createComponentTree(element: JSX.Element, appendProps) {
  if (!element) return element;
  const { type, key, ref, props } = element;

  const children = map(props.children, (child: JSX.Element) => {
    return createComponentTree(child, appendProps);
  });

  // 如果有children， 统一处理成 Container
  if (type === 'fragment') {
    return {
      type: Container,
      key,
      ref,
      props: {
        ...appendProps,
        ...props,
        children,
      },
    }
  }
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
      props: {
        ...appendProps,
        ...props,
        children,
      },
    };
  }
  // 其他情况 说明是 function component, 直接执行
  const newElement = type({
    ...appendProps,
    ...element.props,
  });
  return createComponentTree(newElement, appendProps);
}

export default (children: JSX.Element[], props) => {
  return map(children, (child: JSX.Element) => {
    return createComponentTree(child, props);
  });
}
