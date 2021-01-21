import F2 from '@antv/f2';
import { batch2hd } from '@ali/f2x-util';
import ComboComponent from './comboComponent';

class Chart {

  chart: any;
  component: ComboComponent;
  container: any;

  constructor(props: any) {
    const { context, pixelRatio, width, height, animate, data, children, padding } = props;
    const chart = new F2.Chart({
      context,
      pixelRatio,
      width,
      height,
      animate,
      padding: batch2hd(padding) || [ 0, 0, 0, 0 ],
    });
    // 直接设置数据
    chart.source(data);
    // 一些初始化
    chart.legend(false);
    chart.tooltip(false);
    chart.axis(false);

    const canvas = chart.get('canvas');
    const container = canvas.addGroup({
      zIndex: 40
    });
    const component = new ComboComponent({ children });
    component.init(chart, container);

    // @ts-ignore
    chart.on('aftergeomdraw', () => {
      component.render();
    });
    this.chart = chart;
    this.container = container;
    this.component = component;
  }

  render() {
    const { chart } = this;
    chart.render();
  }

  update(props: any) {
    const { chart, component } = this;
    // 只处理数据，和children的变化
    const { data, children } = props;
    component.update({ children });
    chart.get('canvas').draw();
  }

  destroy() {
    const { chart, component } = this;
    component.destroy();
    chart.destroy();
  }
}

export default Chart;
