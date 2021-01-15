import F2 from '@antv/f2';
import { render } from '@ali/f2-jsx';

// @ts-ignore
const map = (children: any, fn: any) => {
  if (!children) return children;
  if (Array.isArray(children)) {
    return children.map(child => {
      return map(child, fn);
    });
  }
  return fn(children);
}

// components 和 children 必须是完全相同的2棵树
// @ts-ignore
function each(components, children, fn) {
  if (!components) return;
  if (Array.isArray(components)) {
    components.forEach((component, index) => {
      each(component, children[index], fn);
    });
    return;
  }
  return fn(components, children);
}

class Chart {

  chart: any;
  components: any;

  constructor(props: any) {
    const { context, pixelRatio, width, height, animate, data, children } = props;
    const chart = new F2.Chart({
      context,
      pixelRatio,
      width,
      height,
      animate,
    });
    // 直接设置数据
    chart.source(data);
    // 一些初始化
    chart.legend(false);
    chart.tooltip(false);
    chart.axis(false);

    this.chart = chart;

    this.createComponents(children);

    // @ts-ignore
    chart.on('aftergeomdraw', () => {
      this.renderComponents();
    });
  }

  createComponent(Constructor: any, props: any) {
    const { chart } = this;
    const component = new Constructor(props, chart);
    return component;
  }

  createComponents(children: any) {
    const components = map(children, (child: any) => {
      // 要对react生成的ref单独处理
      const { type, props, key, ref } = child;
      // 只处理组件，不支持标签
      if (typeof type !== 'function') {
        return null;
      }

      // class 形式的组件
      if (type.prototype && type.prototype.isF2Component) {
        return this.createComponent(type, props);
      }

      // function 形式组件 TODO
      // let subChildren = type(props);

      return null;
    });

    this.components = components;
  }

  renderComponent(component: any) {
    // 先把之前的内容清理掉
    if (component.shape) {
      component.shape.remove(true);
    }
    // 返回的是G的节点定义树
    const element = component.render();
    if (!element) return null;
    const { chart } = this;
    // TODO: 先暂时全往顶层画
    const frontPlot = chart.get('frontPlot');
    const width = chart.get('width');
    const { style } = element;
    element.style = {
      // 设置元素默认宽度
      width,
      ...style
    }
    // 生成G的节点树
    const shape = render(element, frontPlot);
    component.shape = shape;
    if (component.ref) {
      component.ref.component = component;
      component.ref.current = shape;
    }
  }

  renderComponents() {
    const { components } = this;
    map(components, (component: any) => {
      this.renderComponent(component);
    });
  }

  update(props: any) {
    const { chart } = this;
    // 只处理数据，和children的变化
    const { data, children } = props;
    const { components } = this;
    each(components, children, (component: any, child: any) => {
      const { props } = child;
      component.update(props);
      this.renderComponent(component);
    });
    chart.get('canvas').draw();
  }

  render() {
    const { chart } = this;
    chart.render();
  }
}

export default Chart;
