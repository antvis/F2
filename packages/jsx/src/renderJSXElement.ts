import JSX from './interface';
import { map } from '@ali/f2x-util';

function renderJSXElement(element: JSX.Element, otherProps: any): JSX.Element {
  const { type, key, ref, props } = element;

  // render children first
  const children = map(props.children, (child: JSX.Element) => {
    return renderJSXElement(child, otherProps);
  });

  // combo otherProps
  element.props = {
    ...props,
    ...otherProps,
    children,
  };

  if (typeof type === 'function') {
    const newElement = type(element.props);
    // recursive render until type is string
    return renderJSXElement({
      key,
      ref,
      ...newElement,
    }, null);
  }
  // return element if type is string
  return element;
}

export default (element: JSX.Element, props?: any) => {
  return renderJSXElement(element, props);
}
