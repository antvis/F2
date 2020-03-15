import Base from './base';
import { mix } from '../../util/common';

class Pinch extends Base {
  getDefaultCfg() {
    return {
      type: 'pinch',
      startEvent: 'pinchstart',
      processEvent: 'pinch',
      endEvent: 'pinchend'
    };
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const { context } = this;
    mix(context, cfg);
  }

  start() {
    const { context } = this;
    context.start();
  }

  process(e) {
    e.preventDefault && e.preventDefault();
    const { zoom, center } = e;
    const { context } = this;
    const { chart } = context;
    const coord = chart.get('coord');
    const { start, end } = coord;

    const coordWidth = end.x - start.x;
    const leftLen = Math.abs(center.x - start.x);
    const rightLen = Math.abs(end.x - center.x);

    // 计算左右缩放的比例
    const leftScale = leftLen / coordWidth;
    const rightScale = rightLen / coordWidth;

    context.doZoom(leftScale, rightScale, zoom);
  }

  end() {
    // 缩放完成后再更新ticks
    const { context } = this;
    context.updateTicks();
  }
}

export default Pinch;
