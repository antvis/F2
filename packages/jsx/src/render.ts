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
  let newArray: any = [];
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

function mergeLayout(parent: any, layout: any) {
  if (!parent) return layout;
  const { left: parentLeft, top: parentTop } = parent;
  const { left, top } = layout;
  return {
    ...layout,
    left: parentLeft + left,
    top: parentTop + top,
  }
}


function createElement(node: any, container: any, parentLayout: any) {
  const { type, props, layout: originLayout, children } = node;
  const layout = mergeLayout(parentLayout, originLayout);
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


export default (node: any, container: any) => {
  if (!node) {
    return;
  }
  node.children = extendArray(node.children);
  console.log(node);
  computeLayout(node);
  return createElement(node, container, null);
}
