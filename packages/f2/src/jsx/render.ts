import { JSX } from './jsx-namespace';
import { extendMap, px2hd as defaultPx2hd } from '../util';
import { omit } from '@antv/util';
import computeLayout from './css-layout';
import getShapeAttrs from './shape';
import getAnimation from './animation';
import { ELEMENT_DELETE } from './elementStatus';
import createClipElement from './createClipElement';

// 转换成布局所需要的布局树
function createNodeTree(element, container, px2hd) {
  const { key, ref, _cache, type, props, status, animation } = element;
  const children = extendMap(props.children, (child) => {
    return createNodeTree(child, container, px2hd);
  });

  // const { style, attrs } = props;
  let style = px2hd(props.style);
  const attrs = px2hd(props.attrs);

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
    };
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
    animation,

    // 处理px2hd之后的配置
    style,
    attrs,
  };
}

function mergeLayout(parent, layout) {
  if (!parent || !layout) return layout;
  const { left: parentLeft, top: parentTop } = parent;
  const { left, top } = layout;
  return {
    ...layout,
    left: parentLeft + left,
    top: parentTop + top,
  };
}

function createElement(node, container, parentLayout, animate: boolean) {
  const {
    _cache = {},
    ref,
    type,
    props,
    attrs,
    layout: originLayout,
    renderChildren,
    children: nodeChildren,
    status,
    animation,
  } = node;
  const layout = mergeLayout(parentLayout, originLayout);

  // 该元素上一次的attrs
  const { attrs: lastAttrs } = _cache;

  const elementAttrs = {
    ...getShapeAttrs(type, layout),
    // 因为删除的元素不参与布局计算，所以只有在删除的时候才保留lastAttrs, 新增和更新的时候都让其重新计算
    ...(status === ELEMENT_DELETE ? lastAttrs : null),
    ...attrs,
  };
  // 缓存这次新的attrs
  _cache.attrs = elementAttrs;

  if (elementAttrs.clip) {
    const { clip } = elementAttrs;
    elementAttrs.clip = createClipElement(clip.type, clip);
  }

  let element;
  if (type === 'group') {
    element = container.addGroup({
      ...omit(props, ['children']),
      status,
      attrs: elementAttrs,
    });

    // 如果元素被删除了，就不会有renderChildren， 直接拿node.children渲染
    const children = renderChildren ? renderChildren : nodeChildren;
    // 只有group才需要处理children
    if (children && children.length) {
      for (let i = 0, len = children.length; i < len; i++) {
        createElement(children[i], element, layout, animate);
      }
    }
  } else {
    element = container.addShape(type, {
      ...props,
      status,
      attrs: elementAttrs,
    });
  }
  if (animate !== false) {
    element.set('animation', getAnimation(element, animation, elementAttrs, lastAttrs));
  }
  if (ref) {
    ref.current = element;
  }
  return element;
}

// 过滤删除的元素，让其不参与布局计算
function filterDeleteElement(node) {
  const { status, children } = node;
  if (status === ELEMENT_DELETE) {
    return null;
  }
  if (!children || !children.length) {
    return node;
  }

  const newChildren = children.filter((child) => {
    return !!filterDeleteElement(child);
  });

  // 要保留引用
  node.children = newChildren;
  node.renderChildren = children;

  return node;
}

function render(element: JSX.Element, container, animate?: boolean, px2hd = defaultPx2hd) {
  if (!element) {
    return;
  }
  const nodeTree = createNodeTree(element, container, px2hd);
  const computeLayoutTree = filterDeleteElement(nodeTree);
  computeLayout(computeLayoutTree);
  return createElement(nodeTree, container, null, animate);
}

export { render };

export default (element: JSX.Element, container, animate?: boolean) => {
  return render(element, container, animate);
};
