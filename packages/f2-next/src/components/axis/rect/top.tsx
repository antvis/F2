import { jsx } from '@jsx';

export default (props: any) => {
  const { ticks, plot, style } = props;
  const { tl, tr } = plot;
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
            const end = points[points.length - 1];
            return (
              <line attrs={{
                x1: end.x,
                y1: end.y,
                x2: end.x,
                y2: end.y - tickLine.length,
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
            x2: tr.x,
            y2: tr.y,
            ...line,
          }} />
        :
          null
      }
      {
        label ?
          ticks.map((tick, index) => {
            const { points, text } = tick;
            const end = points[points.length - 1];
            return (
              <text attrs={{
                x: end.x,
                y: end.y - labelOffset,
                textAlign: 'center',
                textBaseline: 'bottom',
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
