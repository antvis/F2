import { render, renderJSXElement, compareRenderTree } from '../jsx';
import { map, mapTwo, isArray } from '../util';
import Component from './component';
import PlaceholderComponent from './placeholder';
import equal from './equal';

class ContainerComponent extends Component {
  components: Component[];

  constructor(props: any, context?, updater?) {
    super(props, context, updater);

    const { children } = props;
    const components = map(children, (child: JSX.Element) => {
      if (!child) {
        return new PlaceholderComponent({});
      }
      const component = this.createComponent(child);
      return component;
    });
    this.components = components;
  }

  init(config) {
    super.init(config);
    const { container } = config;
    const { components } = this;
    map(components, (component: Component) => {
      component.init({
        ...config,
        // 为每个组件都创建一个独立节点
        container: container.addGroup()
      });
    });
  }

  willMount() {
    const { components } = this;
    map(components, (component: Component) => {
      const { __mounted } = component;
      if (__mounted) {
        return;
      }
      component.willMount();
    });
  }

  mount() {
    const { components } = this;
    map(components, (component: Component) => {
      const { __mounted } = component;
      if (__mounted) {
        return;
      }
      component.mount();
      component.__mounted = true;
    });
  }

  createComponent(element: JSX.Element): Component {
    const { type, props, key, ref } = element;

    // 这里 一定是 F2 Component 了
    // @ts-ignore
    const component = new type(props, {}, this.updater);

    // 设置ref
    if (ref) {
      ref.current = component;
    }

    return component;
  }

  _getAppendProps() {
    const { layout } = this;
    const { width, height } = layout;

    // 把常用的值append到props中去
    return {
      width,
      height,
      // plot,
      layout,
    }
  }

  render() {
    const { components } = this;
    const appendProps = this._getAppendProps();

    map(components, (component: Component) => {
      this.renderComponent(component, appendProps);
    });

    // 自身不绘制任何内容
    return null;
  }

  renderComponent(component: Component, appendProps?: any) {
    const { __shape, __lastElement, container, animate, props } = component;
    // 先把之前的图形清除掉
    if (__shape) {
      container.clear();
    }

    // 支持function形式，为了更的自定义
    const { animation } = props;
    if (animation && typeof animation === 'function') {
      props.animation = animation(props);
    }

    // 返回的是jsx的element树
    const jsxElement = component.render();
    if (!jsxElement) return null;

    // 返回的是shape的结构树
    const element = renderJSXElement(jsxElement, appendProps);
    component.__lastElement = element;
  
    // 如果需要动画，才进行比较，默认为true, 只有在设置false 才关闭
    const renderElement = animate !== false ? compareRenderTree(element, __lastElement) : element;
    if (!renderElement) return null;

    // 生成G的节点树, 存在数组的情况是根节点有变化，之前的树删除，新的树创建
    if (isArray(renderElement)) {
      for (let i = 0, len = renderElement.length; i < len; i++) {
        const shape = render(renderElement[i], container);
        // 删除的节点在前面，所以这里保留后面的结构就可以了
        component.__shape = shape;
      }
    } else {
      const shape = render(renderElement, container);
      component.__shape = shape;
    }
  }

  diffComponent(component, child) {
    if (!child) {
      // 销毁后，创建一个占位的组件
      component.destroy();
      return new PlaceholderComponent({});
    }
    // 如果之前是占位组件，现在有新的组件，是个新建逻辑
    // @ts-ignore
    if (component.placeholder) {
      if (isArray(child)) {
        return map(child, (c) => {
          return this.createComponent(c);
        });
      }
      return this.createComponent(child);
    }

    const { type, props } = child;
    // 如果类型变化了
    // @ts-ignore
    if (!(component instanceof type)) {
      // 销毁之前的
      component.destroy();
      // 创建新的
      return this.createComponent(child);
    }
    if (!equal(props, component.props)) {
      if (!component.shouldUpdate || component.shouldUpdate(props)) {
        if (component.componentWillReceiveProps) {
          component.componentWillReceiveProps(props);
        }
        component.props = props; 
        if (component.update) {
          component.update(props);
        }
      }
    }
    return component;
  }

  update(props: any, forceUpdate?) {
    super.update(props);
    const { components, layout } = this;
    // 只处理数据和children的变化
    const { children } = props;

    this.components = mapTwo(components, children, (component: Component, child: JSX.Element) => {
      const newComponent = this.diffComponent(component, child);

      if (!newComponent.__shape && newComponent.beforeMount) {
        newComponent.beforeMount();
      }

      return newComponent;
    });
  }

  destroy() {
    const { components } = this;
    map(components, (component: Component) => {
      if (!component) {
        return;
      }
      component.destroy();
    });
    this.components = null;
  }
}

export default ContainerComponent;
