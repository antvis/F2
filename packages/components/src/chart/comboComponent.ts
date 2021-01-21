import { render, renderJSXElement } from '@ali/f2-jsx';
import { map, each } from '@ali/f2x-util';
import Component from '../component';

class ComboComponent extends Component {
  components: any;

  constructor(props: any) {
    super(props);

    const { children } = props;
    const components = map(children, (child: JSX.Element) => {
      // 要对react生成的ref单独处理
      const { type, props, key, ref } = child;
      // 只处理组件，不支持标签
      if (typeof type !== 'function') {
        return null;
      }

      const component = this.createComponent(type, props);
      // 设置ref
      if (ref) {
        ref.current = component;
      }

      return component;
    });
    this.components = components;
  }

  init(chart, container) {
    super.init(chart, container);
    const { components } = this;
    map(components, (component: Component) => {
      component.init(chart, container.addGroup());
    });
  }

  createComponent(Constructor: any, props: any) {
    // class 形式的组件
    if (Constructor.prototype && Constructor.prototype.isF2Component) {
      return new Constructor(props);
    }
    // function 形式组件, 统一用ComboComponent处理
    return new ComboComponent(props);
  }

  render() {
    const { components, chart } = this;
    const width = chart.get('width');
    const height = chart.get('height');
    const plot = chart.get('plot');

    // 把常用的值append到props中去
    const appendProps = {
      width,
      height,
      plot,
    }

    map(components, (component: Component) => {
      this.renderComponent(component, appendProps);
    });

    return null;
  }

  renderComponent(component: Component, appendProps) {
    // @ts-ignore
    const { container, __shape } = component;
    // 先把之前的图形清除掉
    if (__shape) {
      __shape.remove(true);
    }

    // 返回的是jsx的element树
    const jsxElement = component.render();
    if (!jsxElement) return null;

    // 返回的是shape的定义树
    const element = renderJSXElement(jsxElement, appendProps);
    if (!element) return null;

    // 生成G的节点树
    const shape = render(element, container);
    // @ts-ignore
    component.__shape = shape;
  }

  update(props: any) {
    // 只处理数据和children的变化
    const { children } = props;
    const { components } = this;
    each(components, children, (component: any, child: any) => {
      const { props } = child;
      component.update(props);
    });

    this.render();
  }

  destroy() {
    const { components } = this;
    map(components, (component: Component) => {
      component.destroy();
    });
  }
}

export default ComboComponent;
