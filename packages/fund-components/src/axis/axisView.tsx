// @ts-nocheck

export default (props: any) => {
  const { ticks, coord, dimType } = props;
  const { tl, tr } = coord.plot;
  if (dimType === 'y') {
    return (
      <group>
        {
          ticks.map(tick => {
            const { x, y, text } = tick;
            return (
              <group>
                <text attrs={{
                  x,
                  y,
                  text,
                  fill: '#CCCCCC'
                }} />
                <line attrs={{
                  x1: x,
                  y1: y,
                  x2: tr.x,
                  y2: y,
                  stroke: '#EDEDED',
                  lineWidth: '1px',
                  // lineDash: [ '3px', '6px' ]
                }} />
              </group>
            );
          })
        }
      </group>
    );
  }
  return (
    <group>
      {
        ticks.map(tick => {
          const { x, y, text } = tick;
          return (
            <group>
              <text attrs={{
                x,
                y,
                text,
                fill: '#CCCCCC'
              }} />
              <line attrs={{
                x1: x,
                y1: y,
                x2: x,
                y2: tl.y,
                stroke: '#EDEDED',
                lineWidth: '1px',
                // lineDash: [ '3px', '6px' ]
              }} />
            </group>
          );
        })
      }
    </group>
  );
}
