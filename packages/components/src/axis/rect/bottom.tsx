import { jsx } from '@ali/f2-jsx';

export default (props: any) => {
  const { ticks, plot, style, animation } = props;
  const { bl, br } = plot;
  const { grid, tickLine, line, labelOffset, label } = style;
  const { align = 'between' } = label || {};

  return (
    <group>
      {
        grid ?
          ticks.map(tick => {
            const { points, tickValue } = tick;
            const start = points[0];
            const end = points[points.length - 1];
            return (
              <line key={ tickValue } attrs={{
                x1: start.x,
                y1: start.y,
                x2: end.x,
                y2: end.y,
                ...grid,
              }} />
            );
          })
        :
          null
      }
      {
        tickLine && tickLine.length ?
          ticks.map(tick => {
            const { points, tickValue } = tick;
            const start = points[0];
            return (
              <line key={ tickValue } attrs={{
                x1: start.x,
                y1: start.y,
                x2: start.x,
                y2: start.y + tickLine.length,
                ...tickLine,
              }} />
            );
          })
        :
          null
      }
      {
        line ?
          <line attrs={{
            x1: bl.x,
            y1: bl.y,
            x2: br.x,
            y2: br.y,
            ...line,
          }} />
        :
          null
      }
      {
        label ?
          ticks.map((tick, index) => {
            const { points, text, tickValue } = tick;
            const start = points[0];
            
            const textAttrs = {
              x: start.x,
              y: start.y + labelOffset,
              textAlign: align,
              textBaseline: 'top',
              text,
              ...label,
            }

            if (align === "between") {
              if (index === 0) {
                textAttrs.textAlign = "start";
              } else if (index === ticks.length - 1) {
                textAttrs.textAlign = "end";
              } else {
                textAttrs.textAlign = "center";
              }
            }

            return (
              <text
                key={ tickValue }
                attrs={textAttrs}
                animation={ animation || {
                  appear: {
                    easing: 'linear',
                    duration: 300,
                    delay: 0,
                    property: [ 'fillOpacity' ],
                    start: {
                      fillOpacity: 0,
                    },
                    end: {
                      fillOpacity: 1,
                    }
                  },
                  update: {
                    easing: 'linear',
                    duration: 450,
                    delay: 0,
                    property: [ 'x', 'y' ],
                  },
                  leave: {
                    easing: 'linear',
                    duration: 450,
                    delay: 0,
                    property: [ 'fillOpacity' ],
                    start: {
                      fillOpacity: 1,
                    },
                    end: {
                      fillOpacity: 0,
                    }
                  }
                }}
              />
            );
          })
        :
          null
      }
    </group>
  );
}
