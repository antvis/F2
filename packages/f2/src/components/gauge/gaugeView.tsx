import { jsx } from '@antv/f-engine';
import { GaugeProps } from './withGauge';

export interface Point {
  x: number;
  y: number;
}

export interface Tick {
  tickValue: number;
  start: Point;
  end: Point;
}

export { GaugeProps };

export default (props: GaugeProps) => {
  const { center, startAngle, endAngle, r, percent, ticks } = props;
  const { x, y } = center;
  const diff = endAngle - startAngle;
  return (
    <group>
      <arc
        attrs={{
          cx: x,
          cy: y,
          r,
          startAngle: `${startAngle} rad`,
          endAngle: `${endAngle} rad`,
          lineWidth: '20px',
          lineCap: 'round',
          stroke: '#e7e7e7',
        }}
      />
      <arc
        attrs={{
          cx: x,
          cy: y,
          r,
          startAngle: `${startAngle} rad`,
          endAngle: `${startAngle} rad`,
          lineWidth: '40px',
          lineCap: 'round',
          stroke: '#0075ff',
        }}
        animation={{
          appear: {
            easing: 'linear',
            duration: 500,
            property: ['endAngle'],
            start: {
              endAngle: `${startAngle} rad`,
            },
            end: {
              endAngle: `${startAngle + diff * percent} rad`,
            },
          },
        }}
      />
      {ticks.map((tick) => {
        const { start, end } = tick;
        return (
          <line
            attrs={{
              x1: start.x,
              y1: start.y,
              x2: end.x,
              y2: end.y,
              lineWidth: '6px',
              lineCap: 'round',
              stroke: '#e7e7e7',
            }}
          />
        );
      })}
    </group>
  );
};
