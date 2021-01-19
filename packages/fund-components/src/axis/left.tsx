// @ts-nocheck

export default (props: any) => {
  const { plot, labelOffset, ticks, line, label, tickLine, grid } = props;
  const { tl, tr, bl } = plot;
  
  return (
    <group>
      {
        line === false ?
          null
        :
          <line attrs={{
            x1: tl.x,
            y1: tl.y,
            x2: bl.x,
            y2: bl.y,
            stroke: '#EDEDED',
            lineWidth: '1px',
            ...line,
          }} />
      }
      {
        ticks.map((tick, index) => {
          const { x, y, text } = tick;
          return (
            <group>
              {
                label === false ?
                  null
                :
                  <text attrs={{
                    x: x - labelOffset,
                    y,
                    textAlign: 'right',
                    textBaseline: 'middle',
                    text,
                    fill: '#CCCCCC',
                    fontSize: '20px',
                    ...label,
                  }} />
              }
              {
                grid === false ?
                  null
                :
                  <line attrs={{
                    x1: tl.x,
                    y1: y,
                    x2: tr.x,
                    y2: y,
                    stroke: '#EDEDED',
                    lineWidth: '2px',
                    ...grid,
                  }} />
              }
              {
                tickLine === false ?
                  null
                :
                  <line attrs={{
                    x1: x - (tickLine && tickLine.length || 0),
                    y1: y,
                    x2: x,
                    y2: y,
                    stroke: '#EDEDED',
                    lineWidth: '2px',
                    ...tickLine,
                  }} />
              }
            </group>
          );
        })
      }
    </group>
  );
}
