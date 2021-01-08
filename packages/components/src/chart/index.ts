import F2 from '@antv/f2';
import ComponentFactory from './componentFactory';
import { render } from '../../../jsx/src/index';

class Chart {

  chart: any;
  components: any;

  constructor(cfg: any) {
    const { context, pixelRatio, width, height, components } = cfg;
    const chart = new F2.Chart({
      context,
      pixelRatio,
      width,
      height,
    });
    this.chart = chart;

    // TODO
    chart.legend(false);
    chart.tooltip(false);
    chart.axis(false);

    this.createComponents(components);

    chart.on('aftergeomdraw', () => {
      this.renderComponents();
    });
  }
  
  createComponents(componentsSchema: any) {
    const { chart } = this;
    const components = ComponentFactory.create(chart, componentsSchema);
    components.forEach(component => {
      component.setState = (state: any) => {
        component.state = {
          ...component.state,
          ...state,
        };
        this.renderComponent(component);
        // TODO 避免每次的绘制
        chart.get('canvas').draw();
      }
    })
    this.components = components;
  }

  renderComponents() {
    const { components } = this;
    const elements = components.map((component: any) => {
      return this.renderComponent(component);
    });
    return elements;
  }

  renderComponent(component: any) {
    // 先把之前的内容清理掉
    if (component.shape) {
      component.shape.remove(true);
    }
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
    const shape = render(element, frontPlot);
    component.shape = shape;
  }

  source(data: any) {
    this.chart.source(data);
  }

  render() {
    const { chart } = this;
    chart.render();
  }
}

export default Chart;
