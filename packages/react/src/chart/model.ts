import { useEffect, useState, Children } from 'react';
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
      padding: ['auto', 'auto', 'auto', 80],
    });

    chart.source(data);
    chart.legend(false);
    chart.tooltip(false);
    chart.axis(false);

    const components = Children.map(children, child => {
      const { type, props } = child;
      return new type(props, chart);
    });

    const frontPlot = chart.get('frontPlot');
    const width = chart.get('width');
    const height = chart.get('height');
    // @ts-ignore
    chart.on('aftergeomdraw', () => {
      // component render
      for (let i = 0, len = components.length; i < len; i++) {
        const component = components[i];

        const element = component.render();
        if (element) {
          const style = element.style;
          element.style = {
            // 设置元素默认宽高
            width,
            height,
            ...style
          }
          render(element, frontPlot);
        }
      }
    });

    chart.render();
    return;
  }, []);

  return {
  }
}
