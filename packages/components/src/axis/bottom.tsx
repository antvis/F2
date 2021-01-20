import { jsx } from '@ali/f2-jsx';

export default (props: any) => {
  const { plot, labelOffset, ticks, line, label, tickLine, grid } = props;
  const { tl, br, bl } = plot;
  const total = ticks.length;

  return (
    <group>
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
        ticks.map((tick, index) => {
          const { x, y, text } = tick;
          return (
            <group>
              {
                label ?
                  <text attrs={{
                    x,
                    y: y + labelOffset,
                    textAlign: index === 0 ? 'start' : index === total - 1 ? 'end' : 'center',
                    textBaseline: 'top',
                    text,
                    ...label,
                  }} />
                :
                  null
              }
              {
                grid ?
                  <line attrs={{
                    x1: x,
                    y1: tl.y,
                    x2: x,
                    y2: bl.y,
                    ...grid,
                  }} />
                :
                  null
              }
              {
                tickLine ?
                  <line attrs={{
                    x1: x,
                    y1: bl.y,
                    x2: x,
                    y2: bl.y + (tickLine.length || 0), // 默认为0
                    ...tickLine,
                  }} />
                :
                  null
              }
            </group>
          );
        })
      }
    </group>
  );
}
