import { useEffect, useState, Children } from 'react';
import F2 from '@antv/f2';

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

    Children.map(children, child => {
      const { type, props } = child;
      return type({
        ...props,
        chart,
      });
    });

    // const frontPlot = chart.get('frontPlot');

    chart.render();
    return;
  }, []);

  return {
  }
}
