import { jsx } from '@antv/f-engine';
import { isArray } from '@antv/util';
import { RectProps } from '../types';

export default (props: RectProps, context) => {
  const { ticks: originTicks, coord, style } = props;
  const { px2hd } = context;
  const { top, right, bottom } = coord;
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
      {tickLineLength
        ? ticks.map((tick) => {
            const { points, tickValue } = tick;
            const end = points[points.length - 1];
            return (
              <line
                key={`tickLine-${tickValue}`}
                style={{
                  x1: end.x,
                  y1: end.y,
                  x2: end.x + px2hd(tickLineLength),
                  y2: end.y,
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
            ...symbols[0],
            symbol: symbols[0].type,
          }}
        />
      ) : null}
      {line ? (
        <line
          style={{
            x1: right,
            y1: top,
            x2: right,
            y2: bottom,
            ...line,
          }}
        />
      ) : null}
      {symbols[1] ? (
        <marker
          style={{
            x: right,
            y: bottom,
            transform: 'rotate(180deg)',
            transformOrigin: '50% 50%',
            ...symbols[1],
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
