import { JSX } from '../jsx/jsx-namespace';
import { renderJSXElement, compareRenderTree } from '../jsx';
import { render } from '../jsx/render';
import { isArray, isUndefined, isBoolean, pick } from '@antv/util';
import Component from './component';
import equal from './equal';
import Children from '../children';

function pickElement(element) {
  if (!element) return element;
  return Children.map(element, (item) => {
    if (!item) return item;
    // 只需要这几个元素就可以了
    return pick(item, ['key', 'ref', 'type', 'props']);
  });
}

function renderShape(component: Component, children: JSX.Element, animate?: boolean) {
  const {
    container,
    context,
    updater,
    // @ts-ignore
    __lastElement,
    // @ts-ignore
    transformFrom,
    animate: componentAnimate,
  } = component;
  // 先清空绘制内容
  container.clear();

  animate = isBoolean(animate) ? animate : componentAnimate;
  const { px2hd } = context;
  const lastElement = __lastElement || (transformFrom && transformFrom.__lastElement);

  // children 是 shape 的 jsx 结构, component.render() 返回的结构
  const shapeElement = renderJSXElement(children, context, updater);
  // @ts-ignore
  component.__lastElement = shapeElement;
  const renderElement =
    animate !== false ? compareRenderTree(shapeElement, lastElement) : shapeElement;
  if (!renderElement) return null;
  // 生成G的节点树, 存在数组的情况是根节点有变化，之前的树删除，新的树创建
  if (isArray(renderElement)) {
    return renderElement.map((element) => {
      return render(element, container, animate, px2hd);
    });
  } else {
    return render(renderElement, container, animate, px2hd);
  }
}

function setComponentAnimate(child: Component, parent: Component) {
  const { animate: parentAnimate } = parent;
  // 如果父组件不需要动画，子组件全不不执行动画
  if (parentAnimate === false) {
    child.animate = false;
    return;
  }
  const { props: childProps } = child;
  const { animate: childAnimate } = childProps;
  child.animate = isBoolean(childAnimate) ? childAnimate : parentAnimate;
}

function getTransformComponent(component: Component) {
  if (!component) return null;
  // @ts-ignore
  const { __lastElement, children } = component;
  if (__lastElement) {
    return component;
  }
  if (!children) {
    return null;
  }

  let componentFromChildren = null;
  Children.map(children, (item) => {
    if (componentFromChildren) return;
    if (!item) return;
    const component = getTransformComponent(item.component);
    if (component) {
      componentFromChildren = component;
    }
  });
  return componentFromChildren;
}

function getTransformFromComponentRef(transformFromRef) {
  if (!transformFromRef || !transformFromRef.current) {
    return null;
  }
  const transformFromComponent = transformFromRef.current;
  return getTransformComponent(transformFromComponent);
}

function createComponent(parent: Component, element: JSX.Element): Component {
  const { type, props, ref } = element;
  const {
    container,
    context,
    updater,
    //@ts-ignore
    transformFrom,
  } = parent;

  const { transformFrom: transformFromRef, ...receiveProps } = props;

  let component: Component;
  // @ts-ignore
  if (type.prototype && type.prototype.isF2Component) {
    // @ts-ignore
    component = new type(receiveProps, context, updater);
  } else {
    component = new Component(receiveProps, context, updater);
    component.render = function() {
      // @ts-ignore
      return type(this.props, context, updater);
    };
  }

  // 设置ref
  if (ref) {
    ref.current = component;
  }

  // 因为view 可能在子组件，所以这里要透传到子组件
  if (transformFrom) {
    // @ts-ignore
    component.transformFrom = transformFrom;
  }

  if (transformFromRef) {
    const transformFromComponent = transformFromRef
      ? getTransformFromComponentRef(transformFromRef)
      : null;
    // @ts-ignore
    component.transformFrom = transformFromComponent;
  }

  // 每个组件都新建一个独立容器
  component.container = container.addGroup();
  component.context = context;
  component.updater = updater;

  return component;
}

function renderComponent(component: Component | Component[]) {
  Children.map(component, (item: Component) => {
    const { children: lastChildren } = item;
    const mount = isUndefined(lastChildren);
    if (mount) {
      if (item.willMount) item.willMount();
    } else if (item.willUpdate) {
      item.willUpdate();
    }
  });

  Children.map(component, (item: Component) => {
    const { children: lastChildren } = item;
    const mount = isUndefined(lastChildren);
    const newChildren = item.render();
    renderChildren(item, newChildren, lastChildren);
    if (mount) {
      if (item.didMount) item.didMount();
    } else if (item.didUpdate) {
      item.didUpdate();
    }
  });
}

function destroyElement(elements: JSX.Element) {
  Children.map(elements, (element) => {
    if (!element) return;
    const { component } = element;
    if (!component) {
      return;
    }
    if (component.willUnmount) {
      component.willUnmount();
    }
    destroyElement(component.children);
    const { container } = component;
    container.remove(true);
    if (component.didUnmount) {
      component.didUnmount();
    }
  });
}

function diffElement(nextElement: JSX.Element, lastElement: JSX.Element) {
  if (!nextElement && !lastElement) {
    return null;
  }

  // 删除
  if (!nextElement && lastElement) {
    destroyElement(lastElement);
    return null;
  }

  // 新建
  if (nextElement && !lastElement) {
    return nextElement;
  }

  // diff
  const { type: nextType, props: nextProps } = nextElement;
  const { type: lastType, props: lastProps, component: lastComponent } = lastElement;

  if (nextType !== lastType) {
    destroyElement(lastElement);
    return nextElement;
  }

  // 保留component， 等下一阶段处理
  nextElement.component = lastComponent;
  if (equal(nextProps, lastProps)) {
    return null;
  }
  return nextElement;
}
function diff(parent: Component, nextChildren, lastChildren) {
  // destroy
  // 生命周期的几个阶段
  // should create / update
  // create / Receive props
  // willMount / willUpdate
  // render
  // didMount / didUpdate

  let childrenArray = [];
  // 1. 第一轮比较， 直接destroy的元素处理掉，destroy 的元素不需要进入下一阶段
  Children.compare(nextChildren, lastChildren, (next, last) => {
    const element = diffElement(next, last);

    if (element) {
      childrenArray = childrenArray.concat(Children.toArray(element).filter(Boolean));
    }
  });
  // 2. 处理 shouldCreate 和 shouldUpdate
  const shouldProcessChildren = childrenArray.filter((element: JSX.Element) => {
    const { component, props } = element;
    // 说明是新增的元素，需要新建
    if (!component) return true;
    // 不需要更新
    if (component.shouldUpdate && component.shouldUpdate(props) === false) {
      return false;
    }
    return true;
  });
  // 3. 处理 create 和 Receive props
  const shouldRenderComponent = shouldProcessChildren.map((element: JSX.Element) => {
    let { component } = element;
    if (!component) {
      component = createComponent(parent, element);
    } else {
      const { props } = element;
      if (component.willReceiveProps) {
        component.willReceiveProps(props);
      }
      component.props = props;
    }

    element.component = component;
    setComponentAnimate(component, parent);
    return component;
  });

  // 4. 处理 render
  renderComponent(shouldRenderComponent);

  // 按子组件顺序渲染内容
  childrenArray.forEach((element: JSX.Element) => {
    const { component } = element;
    const { container: parentGroup } = parent;
    parentGroup.add(component.container);
  });

  return nextChildren;
}

function isContainer(children: JSX.Element) {
  if (!children) return false;
  if (!isArray(children)) {
    const { type } = children;
    return typeof type === 'function';
  }

  for (let i = 0, len = children.length; i < len; i++) {
    if (isContainer(children[i])) {
      return true;
    }
  }
  return false;
}

function renderChildren(parent: Component, nextChildren, lastChildren) {
  // react 生成的 element 是 not extensible 的，这里新建一个新对象，并把需要的内容pick 出来
  nextChildren = pickElement(nextChildren);
  parent.children = nextChildren;

  if (isContainer(nextChildren)) {
    nextChildren = diff(parent, nextChildren, lastChildren);
  } else {
    renderShape(parent, nextChildren);
  }
  return nextChildren;
}

export { renderChildren, diff, renderComponent, renderShape };
