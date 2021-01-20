import JSX from './interface';
import { extendMap, batch2hd } from '@ali/f2x-util';
import computeLayout from './css-layout';

// 转换成布局所需要的布局树
function createNodeTree(element: JSX.Element) {
  const { key, ref, type, props } = element;
  const { style, attrs } = props;
  const children = extendMap(props.children, (child) => {
    return createNodeTree(child);
  });

  return {
    key,
    ref,
    type,
    props,
    style: batch2hd(style),
    attrs: batch2hd(attrs),
    children,
  }
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
  const { key, ref, type, props, attrs, layout: originLayout, children } = node;
  const layout = mergeLayout(parentLayout, originLayout);
  const { width, height, left, top } = layout;

  let element;
  if (type === 'group') {
    element = container.addGroup();
    if (attrs) {
      element.addShape('rect', {
        attrs: {
          ...attrs,
          x: left,
          y: top,
          width,
          height,
        }
      });
    }
    // 只有group才需要处理children
    if (children && children.length) {
      for (let i = 0, len = children.length; i < len; i++) {
        createElement(children[i], element, layout);
      }
    }
  } else {
    element = container.addShape(type, {
      ...props,
      attrs: {
        x: left,
        y: top,
        width,
        height,
        ...attrs,
      },
    });
  }
  if (ref) {
    ref.current = element;
  }
  return element;
}

export default (element: JSX.Element, container: any) => {
  if (!element) {
    return;
  }
  const nodeTree = createNodeTree(element);
  computeLayout(nodeTree);
  return createElement(nodeTree, container, null);
}
