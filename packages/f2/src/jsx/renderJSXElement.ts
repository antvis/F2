import { JSX } from './jsx-namespace';
import Children from '../children';

// 主要是把function节点，全部转换成string标签节点
function renderJSXElement(element: JSX.Element, context, updater): JSX.Element {
  if (!element) return element;
  const { type, key, ref, props, _cache = {} } = element;

  // render children first
  const children = Children.map(props.children, (child: JSX.Element) => {
    return renderJSXElement(child, context, updater);
  });

  element = {
    type,
    key,
    ref,
    _cache,
    props: {
      ...props,
      children,
    },
  };

  if (typeof type === 'function') {
    // @ts-ignore
    const newElement = type(element.props, context, updater);
    if (!newElement) return newElement;
    // recursive render until type is string
    return renderJSXElement(
      {
        ...newElement,
        // 保留原始的key和ref
        key: key !== undefined ? key : newElement.key,
        ref: ref !== undefined ? ref : newElement.ref,
      },
      context,
      updater
    );
  }
  // return element if type is string
  return element;
}

export default (element: JSX.Element, context, updater) => {
  return renderJSXElement(element, context, updater);
};
