import F2 from '@antv/f2';
import { batch2hd, map } from '@ali/f2x-util';
import Component from '../component';
import ComboComponent from './comboComponent';
import createComponentTree from './createComponentTree';
import Layout from './layout';

interface ChartUpdateProps {
  pixelRatio?: number,
  width?: number | string,
  height?: number | string,
  data: any,
  padding?: (number | string)[],
  animate?: boolean,
  children?: any,
}

interface ChartProps extends ChartUpdateProps {
  context: any,
}

class Chart extends Component {

  chart: any;
  component: ComboComponent;
  container: any;
  layout: Layout;

  constructor(props: ChartProps) {
    super(props);
    const { context, pixelRatio, width, height, animate, data, children, padding } = props;
    const chart = new F2.Chart({
      context,
      pixelRatio,
      // @ts-ignore
      width,
      // @ts-ignore
      height,
      animate,
      // padding: batch2hd(padding) || [ 0, 0, 0, 0 ],
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
    const canvasWidth = canvas.get('width');
    const canvasHeight = canvas.get('height');
    const layout = new Layout({
      chart,
      width: canvasWidth,
      height: canvasHeight
    });
    
    // TODO， 后续优化
    const p = batch2hd(padding);
    layout.update({
      top: p[0],
      right: -p[1],
      bottom: -p[2],
      left: p[3],
    });
    const componentTree = createComponentTree(children);
    const component = new ComboComponent({ children: componentTree });

    component.init({
      chart,
      container,
      layout,
    });

    // @ts-ignore
    chart.on('aftergeomdraw', () => {
      component.render();
    });
    this.chart = chart;
    this.container = container;
    this.component = component;
    this.layout = layout;
  }

  render() {
    const { chart } = this;
    chart.render();
    return null;
  }

  update(props: ChartUpdateProps) {
    const { chart, component } = this;
    // 只处理数据，和children的变化
    const { data, children } = props;
    const componentTree = createComponentTree(children);
    component.update({ children: componentTree });
    chart.get('canvas').draw();
  }

  destroy() {
    const { chart, component } = this;
    component.destroy();
    chart.destroy();
  }
}

export default Chart;
