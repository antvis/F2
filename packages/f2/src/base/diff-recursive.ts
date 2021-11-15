// @ts-nocheck
import { render, renderJSXElement, compareRenderTree } from '../jsx';
import { isArray, isUndefined } from '@antv/util';
import Component from './component';
import equal from './equal';
import createComponentTree from './createComponentTree';
import Children from '../children';

function renderShape(component: Component, children: JSX.Element, animate: boolean) {
  // @ts-ignore
  const { container, __lastElement, context } = component;
  // 先清空绘制内容
  container.clear();

  // children 是 shape 的 jsx 结构, component.render() 返回的结构
  const shapeElement = renderJSXElement(children, { context });
  // @ts-ignore
  component.__lastElement = shapeElement;
  const renderElement =
    animate !== false ? compareRenderTree(shapeElement, __lastElement) : shapeElement;
  if (!renderElement) return;
  // 生成G的节点树, 存在数组的情况是根节点有变化，之前的树删除，新的树创建
  if (isArray(renderElement)) {
    for (let i = 0, len = renderElement.length; i < len; i++) {
      render(renderElement[i], container);
    }
  } else {
    render(renderElement, container);
  }
}

function createComponent(parent: Component, element: JSX.Element): Component {
  const { type, props, ref } = element;
  const { container, context, updater } = parent;
  // 这里 一定是 F2 Component 了
  // @ts-ignore
  const component = new type(props, context, updater);

  // 设置ref
  if (ref) {
    ref.current = component;
  }

  // 每个组件都新建一个独立容器
  component.container = container.addGroup();
  component.context = context;
  component.updater = updater;

  return component;
}

function renderComponent(component: Component) {
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
    let newChildren = item.render();
    // @ts-ignore
    if (item.isF2Container) {
      newChildren = diff(item, newChildren, lastChildren);
    } else {
      renderShape(item, newChildren, true);
    }
    component.children = newChildren;

    if (mount) {
      if (component.didMount) component.didMount();
    } else if (component.didUpdate) {
      component.didUpdate();
    }
  });
}

function renderElement(parent: Component, element: JSX.Element) {
  const { component } = element;
  if (component) {
    const { container: parentGroup } = parent;
    parentGroup.add(component.container);
  } else {
    // 把新建的component 挂到element上
    element.component = createComponent(parent, element);
  }
  renderComponent(element.component);
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
    destroyElement(component.element);
    const { container } = component;
    container.remove(true);
    if (component.didUnmount) {
      component.didUnmount();
    }
  });
}

function diffElement(parent: Component, nextElement: JSX.Element, lastElement: JSX.Element) {
  if (!nextElement && !lastElement) {
    return null;
  }
  // 新建
  if (nextElement && !lastElement) {
    Children.map(nextElement, (element) => {
      renderElement(parent, element);
    });
    return;
  }

  // 删除
  if (!nextElement && lastElement) {
    return destroyElement(lastElement);
  }

  // diff
  const { type: nextType, props: nextProps } = nextElement;
  const { type: lastType, props: lastProps, component } = lastElement;

  if (nextType !== lastType) {
    destroyElement(lastElement);
    renderElement(parent, nextElement);
    return;
  }

  if (equal(nextProps, lastProps)) {
    return;
  }

  if (component.shouldUpdate && component.shouldUpdate(nextProps) === false) {
    return;
  }
  if (component.willReceiveProps) {
    component.willReceiveProps(nextProps);
  }
  // 开始更新逻辑
  component.props = nextProps;
  nextElement.component = component;
  renderElement(parent, nextElement);
  return;
}

function diff(parent: Component, nextChildren, lastChildren) {
  const newChildren = createComponentTree(nextChildren);
  Children.compare(newChildren, lastChildren, (next: JSX.Element, last: JSX.Element) => {
    diffElement(parent, next, last);
  });
  return newChildren;
}

export { diff, renderComponent };
