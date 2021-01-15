/** @jsxImportSource react */

import { Component, createRef } from 'react';
import Chart from '@ali/f2-components';

class ReactChart extends Component {
  canvasRef: any;
  chart: any;

  constructor(props) {
    super(props);
    this.canvasRef = createRef();
  }
  componentDidMount() {
    const { canvasRef, props } = this;
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext('2d');
    // @ts-ignore
    const { pixelRatio, width, height, animate, data, children } = props;
    const chart = new Chart({
      context,
      pixelRatio,
      width,
      height,
      animate,
      data,
      children
    });
    chart.render();
    this.chart = chart;
  }
  componentDidUpdate() {
    const { chart, props } = this;
    chart.update(props);
  }
  render() {
    return (<canvas className="f2-chart" ref={ this.canvasRef } />);
  }
}

export default ReactChart;
