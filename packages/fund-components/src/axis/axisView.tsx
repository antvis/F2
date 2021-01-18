// @ts-nocheck

export default (props: any) => {
  const { ticks, plot, position } = props;
  const { tl, tr, br, bl } = plot;
  let start = tl;
  let end = bl;
  let textAlign = 'center';

  if (position === 'top') {
    start = tl;
    end = tr;
  } else if (position === 'right') {
    start = tr;
    end = br;
    textAlign = 'left';
  } else if (position === 'bottom') {
    start = bl;
    end = br;
  } else {
    textAlign = 'right';
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
                fill: '#CCCCCC',
                textAlign,
                textBaseline: 'top',
                fontSize: '20px'
              }} />
              <line attrs={{
                x1: start.x,
                y1: start.y,
                x2: end.x,
                y2: end.y,
                stroke: '#EDEDED',
                lineWidth: '1px',
              }} />
            </group>
          );
        })
      }
      
    </group>
  );
}
