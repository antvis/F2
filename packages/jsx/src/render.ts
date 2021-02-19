import JSX from './interface';
import { extendMap, batch2hd } from '@ali/f2x-util';
import computeLayout from './css-layout';
import getShapeAttrs from './shape';

// 转换成布局所需要的布局树
function createNodeTree(element: JSX.Element, container: any) {
  const { key, ref, type, props } = element;
  const children = extendMap(props.children, (child) => {
    return createNodeTree(child, container);
  });

  // const { style, attrs } = props;
  let style = batch2hd(props.style);
  const attrs = batch2hd(props.attrs);

  // 文本要自动计算文本的宽高, TODO, 后面再优化
  if (type === 'text') {
    const shape = container.addShape(type, {
      attrs: {
        x: 0,
        y: 0,
        ...attrs,
      },
    });
    const { width, height } = shape.getBBox();
    style = {
      width,
      height,
      ...style,
    }
    // 无用，销毁掉
    shape.remove(true);
  }

  return {
    key,
    ref,
    type,
    props,
    style,
    attrs,
    children,
  }
}

function mergeLayout(parent: any, layout: any) {
  if (!parent || !layout) return layout;
  const { left: parentLeft, top: parentTop } = parent;
  const { left, top } = layout;
  return {
    ...layout,
    left: parentLeft + left,
    top: parentTop + top,
  }
}


function createElement(node: any, container: any, parentLayout: any) {
  const { key, ref, type, props, style, attrs, layout: originLayout, children } = node;
  const layout = mergeLayout(parentLayout, originLayout);

  let element;
  if (type === 'group') {
    element = container.addGroup();
    // TODO： 后续让G里的group继承rect
    if (attrs && layout) {
      const defaultAttrs = getShapeAttrs('rect', layout);
      element.addShape('rect', {
        attrs: {
          ...defaultAttrs,
          ...attrs,
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
    const defaultAttrs = getShapeAttrs(type, layout);
    element = container.addShape(type, {
      ...props,
      attrs: {
        ...defaultAttrs,
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
  const nodeTree = createNodeTree(element, container);
  computeLayout(nodeTree);
  return createElement(nodeTree, container, null);
}
