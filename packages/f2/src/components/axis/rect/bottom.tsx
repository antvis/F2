import { jsx } from '../../../jsx';
import { RectProps } from '../types';
import { TextAttrs } from '../../../types';

export default (props: RectProps<'bottom'>, context) => {
  const { ticks, coord, style, animation } = props;
  const { px2hd } = context;
  const { left, right, bottom } = coord;
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
                  x2: start.x,
                  y2: start.y + px2hd(tickLine.length),
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
            y1: bottom,
            x2: right,
            y2: bottom,
            ...line,
          }}
        />
      ) : null}
      {label
        ? ticks.map((tick, index) => {
            const { points, text, tickValue, labelStyle } = tick;
            const start = points[0];
            const { align = 'center' } = labelStyle || label || {};
            const textAttrs: TextAttrs = {
              x: start.x,
              y: start.y + labelOffset,
              textBaseline: 'top',
              text,
              ...label,
              ...labelStyle,
            };

            if (align === 'between') {
              if (index === 0) {
                textAttrs.textAlign = 'start';
              } else if (index === ticks.length - 1) {
                textAttrs.textAlign = 'end';
              } else {
                textAttrs.textAlign = 'center';
              }
            } else {
              textAttrs.textAlign = align;
            }

            return (
              <text
                key={tickValue}
                attrs={textAttrs}
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
