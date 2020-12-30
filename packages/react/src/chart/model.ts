import { useEffect, Children } from 'react';
import F2 from '@antv/f2';
import render from '../../../jsx/src/render';

export default ({ canvasRef, pixelRatio, data, children }) => {
  // const [chart, setChart] = useState();

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

    const components = Children.map(children, child => {
      const { type, props } = child;
      const component = new type(props, chart);

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
        console.log(chart.get('canvas'));
      }
      return component;
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

  return {
  }
}
