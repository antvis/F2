// @ts-nocheck
import { Component } from '@ali/f2-components';

export default View => {
  return class Axis extends Component {
    mount() {
      const { props, chart } = this;
      const { field, type, tickCount, range } = props;
      chart.scale(field, {
        type,
        tickCount,
        range
      });
    }
    getTicks() {
      const { props, chart } = this;
      const { field, dimType = 'x' } = props;
      const scale = chart.get('scales')[field];
      const coord = chart.get('coord');
      const ticks = scale.getTicks();
    
      const otherDim = dimType === 'x' ? 'y' : 'x';
      const points = ticks.map(tick => {
        const point = coord.convertPoint({
          [dimType]: tick.value,
          [otherDim]: 0,
        });
        return {
          ...tick,
          ...point,
        }
      });
      return points;
    }
    render() {
      const { chart, props } = this;
      const { visible, dimType = 'x' } = props;
      if (visible === false) {
        return null;
      }
      const coord = chart.get('coord');
      const ticks = this.getTicks();
      return <View dimType={ dimType } ticks={ ticks } coord={ coord } />
    }
  }
}
