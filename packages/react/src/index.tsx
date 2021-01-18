import React from 'react';
import Chart from '@ali/f2-components';

class ReactChart extends React.Component {
  canvasRef: any;
  chart: any;

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    const { canvasRef, props } = this;
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext('2d');
    // @ts-ignore
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
    return (<canvas className="f2-chart" ref={ this.canvasRef } />);
  }
}

export default ReactChart;
