import computeLayout from './css-layout';

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
  const { type, props, attrs, layout: originLayout, children } = node;
  const layout = mergeLayout(parentLayout, originLayout);
  const { width, height, left, top } = layout;
  if (type === 'group') {
    const element = container.addGroup();
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
    return element;
  }
  const element = container.addShape(type, {
    ...props,
    attrs: {
      x: left,
      y: top,
      width,
      height,
      ...attrs,
    },
  });
  if (props.ref) {
    props.ref.current = element;
  }
  return element;
}

export default (node: any, container: any) => {
  if (!node) {
    return;
  }
  computeLayout(node);
  return createElement(node, container, null);
}
