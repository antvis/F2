import { jsx } from '../../../index';
import { RectProps } from '../types';
import { isArray } from '@antv/util';

export default (props: RectProps) => {
  const { ticks: originTicks, coord, style, animation } = props;
  const { left, top, bottom } = coord;
  const { grid, tickLine, line, labelOffset, label, symbol } = style;
  const ticks = originTicks.filter((d) => !isNaN(d.value));
  const symbolList = isArray(symbol) ? symbol : [symbol];

  return (
    <group>
      {grid
        ? ticks.map((tick) => {
            const { points, tickValue, gridStyle } = tick;
            const start = points[0];
            const end = points[points.length - 1];
            return (
              <line
                key={tickValue}
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
            const { points, tickValue } = tick;
            const start = points[0];
            return (
              <line
                key={tickValue}
                attrs={{
                  x1: start.x,
                  y1: start.y,
                  x2: start.x - tickLine.length,
                  y2: start.y,
                  ...tickLine,
                }}
              />
            );
          })
        : null}
      {symbolList[0] ? (
        <marker
          style={{
            x: left,
            y: top,
            ...symbolList[0],
            symbol: symbolList[0].type,
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
      {symbolList[1] ? (
        <marker
          style={{
            x: left,
            y: bottom,
            transform: 'rotate(180deg)',
            transformOrigin: '50% 50%',
            ...symbolList[1],
            symbol: symbolList[1].type,
          }}
        />
      ) : null}
      {label
        ? ticks.map((tick, _index) => {
            const { tickValue, points, text, labelStyle } = tick;
            const start = points[0];
            return (
              <text
                key={tickValue}
                attrs={{
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
