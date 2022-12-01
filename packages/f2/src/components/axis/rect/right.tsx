import { jsx } from '../../../index';
import { RectProps } from '../types';

export default (props: RectProps) => {
  const { ticks: originTicks, coord, style } = props;
  const { top, right, bottom } = coord;
  const { grid, tickLine, line, labelOffset, label, symbol } = style;
  const ticks = originTicks.filter((d) => !isNaN(d.value));
  const { type } = symbol;

  return (
    <group>
      {grid
        ? ticks.map((tick) => {
            const { points, gridStyle } = tick;
            const start = points[0];
            const end = points[points.length - 1];
            return (
              <line
                attrs={{
                  x1: start.x,
                  y1: start.y,
                  x2: end.x,
                  y2: end.y,
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
                  x2: end.x + tickLine.length,
                  y2: end.y,
                  ...tickLine,
                }}
              />
            );
          })
        : null}
      {type && type[0] ? (
        <marker
          style={{
            x: right,
            y: top,
            ...symbol,
            symbol: type[0],
          }}
        />
      ) : null}
      {line ? (
        <line
          attrs={{
            x1: right,
            y1: top,
            x2: right,
            y2: bottom,
            ...line,
          }}
        />
      ) : null}
      {type && type[2] ? (
        <marker
          style={{
            x: right,
            y: bottom,
            transform: 'rotate(180deg)',
            transformOrigin: '50% 50%',
            ...symbol,
            symbol: type[2],
          }}
        />
      ) : null}
      {label
        ? ticks.map((tick, _index) => {
            const { points, text, labelStyle } = tick;
            const end = points[points.length - 1];
            return (
              <text
                attrs={{
                  x: end.x + labelOffset,
                  y: end.y,
                  textAlign: 'left',
                  textBaseline: 'middle',
                  text,
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
