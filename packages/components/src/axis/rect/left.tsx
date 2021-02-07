import { jsx } from '@ali/f2-jsx';

export default (props: any) => {
  const { ticks, plot, style } = props;
  const { tl, bl } = plot;
  const { grid, tickLine, line, labelOffset, label } = style;

  return (
    <group>
      {
        grid ?
          ticks.map(tick => {
            const { points } = tick;
            const start = points[0];
            const end = points[points.length - 1];
            return (
              <line attrs={{
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
            const { points } = tick;
            const start = points[0];
            return (
              <line attrs={{
                x1: start.x,
                y1: start.y,
                x2: start.x - tickLine.length,
                y2: start.y,
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
            x1: tl.x,
            y1: tl.y,
            x2: bl.x,
            y2: bl.y,
            ...line,
          }} />
        :
          null
      }
      {
        label ?
          ticks.map((tick, index) => {
            const { points, text } = tick;
            const start = points[0];
            return (
              <text attrs={{
                x: start.x - labelOffset,
                y: start.y,
                textAlign: 'right',
                textBaseline: 'middle',
                text,
                ...label,
              }} />
            );
          })
        :
          null
      }
    </group>
  );
}
