import { useEffect, Children, useState } from 'react';
import Chart from '@ali/f2-components';

export default ({ canvasRef, pixelRatio, data, children }: any) => {
  const [ chart, setChart ] = useState(null);
  const [ rendered, setRendered ] = useState(false);

  useEffect(() => {
    console.log('create');
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext('2d');
    const chartInstance = new Chart({
      context,
      pixelRatio,
      data,
      // children
    });
    setChart(chartInstance);
    setRendered(true);

    // TODO: destroy chart
    return;
  }, []);

  // useEffect(() => {
  //   console.log('chart change', chart);
  // });

  useEffect(() => {
    console.log('chart change', chart);
  });
  
  // useEffect(() => {
  //   if (chart) {
  //     console.log('update');
  //     // chart.update();
  //     return;
  //   }
    

  //   // TODO: destroy chart
  //   return;


    // // 构造component的json描述
    // const components: any = [];
    // Children.forEach(children, child => {
    //   console.log(child);
    //   const { type, props: defineProps, ref } = child;
    //   const props = {
    //     ref,
    //     ...defineProps,
    //   }

    //   // f2 component
    //   if (type.prototype && type.prototype.isF2Component) {
    //     components.push({ type, props });
    //     return;
    //   }

    //   // function component
    //   let subChildren = type(props);
    //   subChildren = subChildren && !Array.isArray(subChildren) ? [ subChildren ] : subChildren;
      
    //   subChildren.forEach((child: any) => {
    //     const { type, props } = child;
    //     components.push({ type, props });
    //   });
    // });

    // const canvasEl = canvasRef.current;
    // const context = canvasEl.getContext('2d');
    // const chart = Chart({
    //   data,
    //   context,
    //   children: components,
    //   pixelRatio: pixelRatio || 1,
    // });
    // chart.render();

    // console.log(chart);
  // });
}
