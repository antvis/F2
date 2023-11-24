import { jsx } from '@antv/f-engine';
import { RectProps } from '../types';
import { isArray } from '@antv/util';

export default (props: RectProps, context) => {
  const { ticks: originTicks, coord, style, animation } = props;
  const { px2hd } = context;
  const { left, top, bottom } = coord;
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
            const start = points[0];
            return (
              <line
                key={`tickLine-${tickValue}`}
                style={{
                  x1: start.x,
                  y1: start.y,
                  x2: start.x - px2hd(tickLineLength),
                  y2: start.y,
                  ...tickLineStyle,
                }}
              />
            );
          })
        : null}
      {symbols[0] ? (
        <marker
          style={{
            x: left,
            y: top,
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
            x2: left,
            y2: bottom,
            ...line,
          }}
        />
      ) : null}
      {symbols[1] ? (
        <marker
          style={{
            x: left,
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
            const start = points[0];
            return (
              <text
                key={`text-${tickValue}`}
                style={{
                  x: start.x - labelOffset,
                  y: start.y,
                  textAlign: 'right',
                  textBaseline: 'middle',
                  text,
                  ...label,
                  ...labelStyle,
                }}
                animation={
                  animation || {
                    appear: {
                      easing: 'linear',
                      duration: 300,
                      delay: 0,
                      property: ['fillOpacity'],
                      start: {
                        fillOpacity: 0,
                      },
                      end: {
                        fillOpacity: 1,
                      },
                    },
                    update: {
                      easing: 'linear',
                      duration: 450,
                      delay: 0,
                      property: ['x', 'y'],
                    },
                    leave: {
                      easing: 'linear',
                      duration: 450,
                      delay: 0,
                      property: ['fillOpacity'],
                      start: {
                        fillOpacity: 1,
                      },
                      end: {
                        fillOpacity: 0,
                      },
                    },
                  }
                }
              />
            );
          })
        : null}
    </group>
  );
};
