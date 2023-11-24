import { isArray } from '@antv/util';
import { jsx } from '@antv/f-engine';
import { RectProps } from '../types';

export default (props: RectProps, context) => {
  const { ticks: originTicks, coord, style } = props;
  const { px2hd } = context;
  const { left, top, right } = coord;
  const { grid, tickLine, line, labelOffset, label, symbol } = style;
  const ticks = originTicks.filter((d) => !isNaN(d.value));
  const symbols = isArray(symbol) ? symbol : [symbol];
  const { length: tickLineLength, ...tickLineStyle } = tickLine || {};

  return (
    <group>
      {grid
        ? ticks.map((tick) => {
            const { points, tickValue, gridStyle } = tick;
            const start = points[0];
            const end = points[points.length - 1];
            return (
              <line
                key={`grid-${tickValue}`}
                style={{
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
            const { points, tickValue } = tick;
            const end = points[points.length - 1];
            return (
              <line
                key={`tickLine-${tickValue}`}
                style={{
                  x1: end.x,
                  y1: end.y,
                  x2: end.x,
                  y2: end.y - px2hd(tickLineLength),
                  ...tickLineStyle,
                }}
              />
            );
          })
        : null}
      {symbols[0] ? (
        <marker
          style={{
            x: right,
            y: top,
            transform: 'rotate(90deg)',
            transformOrigin: '50% 50%',
            ...symbols[0],
            symbol: symbols[0].type,
          }}
        />
      ) : null}
      {line ? (
        <line
          style={{
            x1: left,
            y1: top,
            x2: right,
            y2: top,
            ...line,
          }}
        />
      ) : null}
      {symbols[1] ? (
        <marker
          style={{
            x: left,
            y: top,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            ...symbols[0],
            symbol: symbols[1].type,
          }}
        />
      ) : null}
      {label
        ? ticks.map((tick, _index) => {
            const { tickValue, points, text, labelStyle } = tick;
            const end = points[points.length - 1];
            return (
              <text
                key={`text-${tickValue}`}
                style={{
                  x: end.x,
                  y: end.y - labelOffset,
                  textAlign: 'center',
                  textBaseline: 'bottom',
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
