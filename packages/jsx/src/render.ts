import JSX from './interface';
import { extendMap, batch2hd } from '@ali/f2x-util';
import computeLayout from './css-layout';

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
      top: height / 2,
      ...style,
    }
    // 通过middle + top 才能比较好的实现对齐
    attrs.textBaseline = 'middle';
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
          x: left,
          y: top,
          width,
          height,
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
    // TODO， 后面再优化
    if (type === 'line') {
      element = container.addShape(type, {
        ...props,
        attrs: {
          x1: left,
          y1: top,
          x2: left + width,
          y2: top + height,
          ...attrs,
        },
      });
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
