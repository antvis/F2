import { jsx } from '../../../jsx';
import { RectProps } from '../types';

export default (props: RectProps) => {
  const { ticks, coord, style, animation } = props;
  const { left, top, bottom } = coord;
  const { grid, tickLine, line, labelOffset, label } = style;

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
      {line ? (
        <line
          attrs={{
            x1: left,
            y1: top,
            x2: left,
            y2: bottom,
            ...line,
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
