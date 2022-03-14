import { jsx } from '../../jsx';
import Component from '../../base/component';

const getPoint = (cener, angle, r) => {
  const x = cener.x + Math.cos(angle) * r;
  const y = cener.y + Math.sin(angle) * r;
  return { x, y };
};

const getTicks = (
  start: number,
  end: number,
  tickCount: number,
  center,
  r: number,
  tickOffset: number,
  tickLength: number
) => {
  const ticks = [];
  const diff = end - start;
  for (let i = 0; i <= tickCount; i++) {
    const tickValue = start + (diff * i) / tickCount;
    const startPoint = getPoint(center, tickValue, r + tickOffset - tickLength);
    const endPoint = getPoint(center, tickValue, r + tickOffset);
    ticks.push({
      tickValue,
      start: startPoint,
      end: endPoint,
    });
  }
  return ticks;
};

export default (View) => {
  return class Guage extends Component {
    render() {
      const { props, context } = this;
      const { startAngle, endAngle, tickCount, center, r, tickOffset, tickLength } = props;

      const ticks = getTicks(
        startAngle,
        endAngle,
        tickCount,
        center,
        context.px2hd(r),
        context.px2hd(tickOffset),
        context.px2hd(tickLength)
      );
      return <View {...props} ticks={ticks} />;
    }
  };
};
