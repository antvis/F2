import JSX from './interface';
import computeLayout from './css-layout';
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


function createElement(node, container, parentLayout) {
  const { type, props, layout, children } = node;
  const { attrs } = props;
  if (type === 'group') {
    const element = container.addGroup();
    // 只有group才需要处理children
    if (children && children.length) {
      for (let i = 0, len = children.length; i < len; i++) {
        createElement(children[i], element, layout);
      }
    }
    return element;
  }
  const { width, height, left, top } = layout;
  return container.addShape(type, {
    ...props,
    attrs: {
      ...attrs,
      x: left,
      y: top,
      width,
      height,
    },
  });
}



export default (node: JSX.Element, container: any) => {
  if (!node) {
    return;
  }
  node.children = extendArray(node.children);
  computeLayout(node);
  return createElement(node, container, null);
}
