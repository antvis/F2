import { jsx } from '@antv/f-engine';
import { vec2 } from 'gl-matrix';
import { PolarProps } from '../types';

export default (props: PolarProps) => {
  const { ticks: originTicks, coord, style, grid: gridType } = props;
  const { center } = coord;
  const { grid, tickLine, line, labelOffset, label } = style;
  const ticks = originTicks.filter((d) => !isNaN(d.value));

  return (
    <group>
      {grid
        ? ticks.map((tick) => {
            const { points, gridStyle, gridPoints } = tick;
            const end = points[points.length - 1];
            if (gridType !== 'line') {
              return (
                <arc
                  style={{
                    cx: center.x,
                    cy: center.y,
                    startAngle: 0,
                    endAngle: 360,
                    r: vec2.length([end.x - center.x, end.y - center.y]),
                    ...grid,
                    ...gridStyle,
                  }}
                />
              );
            }
            return (
              <polyline
                attrs={{
                  points: gridPoints.map((d) => [d.x, d.y]),
                  ...grid,
                  ...gridStyle,
                }}
              />
            );
          })
        : null}
      {tickLine && tickLine.length
        ? ticks.map((tick) => {
            const { points } = tick;
            const end = points[points.length - 1];
            return (
              <line
                attrs={{
                  x1: end.x,
                  y1: end.y,
                  x2: end.x - tickLine.length,
                  y2: end.y,
                  ...tickLine,
                }}
              />
            );
          })
        : null}
      {line ? (
        <line
          attrs={{
            x1: ticks[0].points[0].x,
            y1: ticks[0].points[0].y,
            x2: ticks[ticks.length - 1].points[0].x,
            y2: ticks[ticks.length - 1].points[0].y,
            ...line,
          }}
        />
      ) : null}
      {label
        ? ticks.map((tick) => {
            const { points, text, labelStyle } = tick;
            const end = points[points.length - 1];
            return (
              <text
                attrs={{
                  x: end.x - labelOffset,
                  y: end.y,
                  text,
                  textAlign: 'right',
                  textBaseline: 'middle',
                  ...label,
                  ...labelStyle,
                }}
              />
            );
          })
        : null}
    </group>
  );
};
