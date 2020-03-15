import Base from './base';

class Pan extends Base {
  getDefaultCfg() {
    return {
      type: 'pan',
      startEvent: 'panstart',
      processEvent: 'pan',
      endEvent: 'panend'
    };
  }

  start() {
    const { context } = this;
    context.start();
  }

  process(e) {
    const { direction, deltaX } = e;
    if (direction === 'up' || direction === 'down') {
      return;
    }
    e.preventDefault && e.preventDefault();

    const { context } = this;
    const chart = context.chart;

    const coord = chart.get('coord');
    const { start, end } = coord;
    const coordWidth = end.x - start.x;
    const ratio = deltaX / coordWidth;
    context.doMove(ratio);
  }
}

export default Pan;
