import React, { RefObject } from 'react';
import Chart from '@ali/f2-components';

export interface ChartProps {
  className?: string;
  pixelRatio?: number;
  width?: number | string;
  height?: number | string;
  data: any;
  padding?: (string | number)[];
  animate?: boolean;
}

class ReactChart extends React.Component<ChartProps> {
  canvasRef: RefObject<HTMLCanvasElement>;
  chart: Chart;

  constructor(props: ChartProps) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { canvasRef, props } = this;
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext('2d');
    const chart = new Chart({
      ...props,
      context,
    });
    chart.render();
    this.chart = chart;
  }

  componentDidUpdate() {
    const { chart, props } = this;
    chart.update(props);
  }

  render() {
    const { props } = this;
    const { className = '' } = props;
    return React.createElement('canvas', {
      className: `f2-chart ${className}`,
      ref: this.canvasRef
    });
  }

  componentWillUnmount() {
    const { chart } = this;
    chart.destroy();
  }
}

export default ReactChart;
