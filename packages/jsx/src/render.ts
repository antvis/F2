import JSX from './interface';
import computeLayout from 'css-layout';
import elementFactory from './element';
import { isArray } from './util';

// 展开数组
function extendArray(arr: any[]) {
  if (!arr) {
    return arr;
  }
  if (!isArray(arr)) {
    return [ arr ];
  }
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (isArray(element)) {
      newArray = newArray.concat(extendArray(element));
    } else {
      newArray.push(element);
    }
  }
  return newArray;
}

function createElement(node, container) {
  const { type, props, style, layout, children } = node;
  // const element = elementFactory.create(container, node);


  if (type === 'group') {
    const element = container.addGroup({
      attrs: style,
    });
    // 只有group才需要处理children
    if (children && children.length) {
      for (let i = 0, len = children.length; i < len; i++) {
        createElement(children[i], element);
      }
    }
    return element;
  }
  return container.addShape(type, {
    attrs: style,
    ...props,
  });
}


export default (node: JSX.Element, container: any) => {
  node.children = extendArray(node.children);
  computeLayout(node);
  return createElement(node, container);
}
