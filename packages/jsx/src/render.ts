import JSX from './interface';
import { extendMap, batch2hd } from '@ali/f2x-util';
import computeLayout from './css-layout';
import getShapeAttrs from './shape';
import getAnimation from './animation';

// 转换成布局所需要的布局树
function createNodeTree(element: any, container: any) {
  const { key, ref, _cache, type, props, status } = element;
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
    _cache,
    type,
    props,
    children,
    status,

    // 处理px2hd之后的配置
    style,
    attrs,
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
  const { _cache, key, ref, type, props, style, attrs, layout: originLayout, children, status } = node;
  const layout = mergeLayout(parentLayout, originLayout);

  const elementAttrs = {
    ...getShapeAttrs(type, layout),
    ...attrs,
  };
  // 该元素上一次的attrs
  const { attrs: lastAttrs } = _cache;
  // 缓存这次新的attrs
  _cache.attrs = elementAttrs;

  const animation = getAnimation(type, props.animation, elementAttrs, lastAttrs);
  let element;
  if (type === 'group') {
    element = container.addGroup({
      status,
      attrs: elementAttrs,
      animation,
    });
    // 只有group才需要处理children
    if (children && children.length) {
      for (let i = 0, len = children.length; i < len; i++) {
        createElement(children[i], element, layout);
      }
    }
  } else {
    element = container.addShape(type, {
      ...props,
      status,
      attrs: elementAttrs,
      animation,
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
