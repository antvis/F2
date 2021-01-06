import { useEffect, Children } from 'react';
import F2 from '@antv/f2';
import { render } from '../../jsx/src/index';

function createComponent(Constructor: any, props: any, chart: any) {
  const frontPlot = chart.get('frontPlot');
  const width = chart.get('width');
  const component = new Constructor(props, chart);
  // hack, 毛坯房不雕花
  component.setState = function(state: any) {
    this.state = {
      ...this.state,
      ...state,
    };
    if (component.shape) {
      component.shape.remove(true);
    }
    const element = component.render();
    if (element) {
      const style = element.style;
      element.style = {
        // 设置元素默认宽度
        width,
        ...style
      }
      const shape = render(element, frontPlot);
      component.shape = shape;
    }
    // TODO 避免每次的绘制
    chart.get('canvas').draw();
  }
  return component;
}

export default ({ canvasRef, pixelRatio, data, children }: any) => {

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext('2d');
    const chart = new F2.Chart({
      context,
      pixelRatio: pixelRatio || 1,
    });

    chart.source(data);
    chart.legend(false);
    chart.tooltip(false);
    chart.axis(false);

    const frontPlot = chart.get('frontPlot');
    const width = chart.get('width');

    const components: any[] = [];
    Children.forEach(children, child => {
      const { type, props } = child;

      if (type.prototype && type.prototype.isComponent) {
        const component = createComponent(type, props, chart);
        components.push(component);
        return;
      }
      // function component
      let subChildren = type(props);
      subChildren = subChildren && !Array.isArray(subChildren) ? [ subChildren ] : subChildren;
      
      subChildren.forEach((child: any) => {
        const { type, props } = child;
        const component = createComponent(type, props, chart);
        components.push(component);
      });
    });

    // @ts-ignore
    chart.on('aftergeomdraw', () => {
      for (let i = 0, len = components.length; i < len; i++) {
        const component = components[i];

        const element = component.render();
        if (element) {
          const style = element.style;
          element.style = {
            // 设置元素默认宽度
            width,
            ...style
          }
          const shape = render(element, frontPlot);
          component.shape = shape;
        }
      }
    });

    chart.render();
    return;
  }, []);
}
