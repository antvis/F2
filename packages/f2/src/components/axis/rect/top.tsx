import { isArray } from '@antv/util';
import { jsx } from '../../../index';
import { RectProps } from '../types';

export default (props: RectProps) => {
  const { ticks: originTicks, coord, style } = props;
  const { left, top, right } = coord;
  const { grid, tickLine, line, labelOffset, label, symbol } = style;
  const ticks = originTicks.filter((d) => !isNaN(d.value));
  const symbolList = isArray(symbol) ? symbol : [symbol];

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
                  x2: end.x,
                  y2: end.y - tickLine.length,
                  ...tickLine,
                }}
              />
            );
          })
        : null}
      {symbolList[0] ? (
        <marker
          style={{
            x: right,
            y: top,
            transform: 'rotate(90deg)',
            transformOrigin: '50% 50%',
            ...symbolList[0],
            symbol: symbolList[0].type,
          }}
        />
      ) : null}
      {line ? (
        <line
          attrs={{
            x1: left,
            y1: top,
            x2: right,
            y2: top,
            ...line,
          }}
        />
      ) : null}
      {symbolList[1] ? (
        <marker
          style={{
            x: left,
            y: top,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            ...symbolList[0],
            symbol: symbolList[1].type,
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
