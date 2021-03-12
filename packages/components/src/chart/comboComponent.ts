import { render, renderJSXElement, compareRenderTree } from '@ali/f2-jsx';
import { map, mapTwo } from '@ali/f2x-util';
import Component from '../component';
import PlaceholderComponent from './placeholderComponent';
import equal from './equal';

class ComboComponent extends Component {
  components: any;

  constructor(props: any) {
    super(props);

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
        container: container.addGroup()
      });
    });
  }

  createComponent(element: JSX.Element): Component {
    const { type, props, key, ref } = element;

    // 设置默认的动画配置
    if (props.animate === undefined) {
      props.animate = this.animate;
    }
    // 这里 一定是 F2 Component 了
    // @ts-ignore
    const component = new type(props);

    // 设置ref
    if (ref) {
      ref.current = component;
    }

    return component;
  }

  _getAppendProps() {
    const { chart } = this;
    const width = chart.get('width');
    const height = chart.get('height');
    const plot = chart.get('plot');

    // 把常用的值append到props中去
    return {
      width,
      height,
      plot,
    }
  }

  render() {
    const { components } = this;
    const appendProps = this._getAppendProps();

    map(components, (component: Component) => {
      this.renderComponent(component, appendProps);
    });

    return null;
  }

  renderComponent(component: Component, appendProps) {
    const { __shape, __lastElement, container, animate, props } = component;
    // 先把之前的图形清除掉
    if (__shape) {
      __shape.remove(true);
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

    // 如果需要动画，才进行比较
    const renderElement = animate ? compareRenderTree(element, __lastElement) : element;
    if (!renderElement) return null;

    // 生成G的节点树
    const shape = render(renderElement, container);
    component.__shape = shape;
  }

  update(props: any, force?: boolean) {
    const { components, chart, layout } = this;
    const appendProps = this._getAppendProps();
    // 只处理数据和children的变化
    const { children } = props;
    this.components = mapTwo(components, children, (component: Component, child: JSX.Element) => {
      if (!child) {
        // 销毁后，创建一个占位的组件
        component.destroy();
        const placeholderComponent = new PlaceholderComponent({});
        placeholderComponent.init({
          chart,
          layout,
          container: component.container,
        });
        return placeholderComponent;
      }
      // 如果之前是展位组件，现在有新的组件，是个新建逻辑
      // @ts-ignore
      if (component.placeholder) {
        const newComponent = this.createComponent(child);
        newComponent.init({
          chart,
          layout,
          container: component.container,
        });
        // this.renderComponent(newComponent, appendProps);
        return newComponent;
      }

      // TODO diff比较是否需要更新
      const { type, props } = child;
      // 如果类型变化了
      // @ts-ignore
      if (!(component instanceof type)) {
        // 销毁之前的
        component.destroy();
        // 创建新的
        const newComponent = this.createComponent(child);
        newComponent.init({
          chart,
          layout,
          container: component.container,
        });

        // 保留shape结构，为了实现动画的过渡变化
        if (component.props.keepElement) {
          newComponent.__lastElement = component.__lastElement;
        }
        return newComponent;
        // this.renderComponent(newComponent, appendProps);
      }

      if (force || !equal(props, component.__props)) {
        component.update(props);
        // this.renderComponent(component, appendProps);
      }

      return component;
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
  }
}

export default ComboComponent;
