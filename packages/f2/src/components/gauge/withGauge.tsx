import { jsx, Component, ComponentType } from '@antv/f-engine';
import { Point, Tick } from './gaugeView';

const getPoint = (cener: Point, angle: number, r: number): Point => {
  const x = cener.x + Math.cos(angle) * r;
  const y = cener.y + Math.sin(angle) * r;
  return { x, y };
};

const getTicks = (
  start: number,
  end: number,
  tickCount: number,
  center: Point,
  r: number,
  tickOffset: number,
  tickLength: number
) => {
  const ticks = [] as Tick[];
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

export interface GaugeProps {
  startAngle?: number;
  endAngle?: number;
  tickCount?: number;
  tickOffset?: number | string;
  tickLength?: number | string;
  r?: number | string;
  r0?: number | string;
  center?: Point;
  ticks?: Tick[];
  percent: number;
}

const withGauge = <IProps extends GaugeProps = GaugeProps>(View: ComponentType<IProps>) => {
  return class Gauge<P extends IProps = IProps> extends Component<P> {
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

export default withGauge;
