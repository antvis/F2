// @ts-nocheck

export default (props: any) => {
  const { points, height } = props;
  if (!points || !points.length) {
    return null;
  }
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const { x, y } = firstPoint;
  // 头尾补2个点
  const y0 = height;
  points.push({
    x: lastPoint.x,
    y: y0
  }, {
    x,
    y: y0
  });
  return (
    <group>
      <line attrs={{
        x1: x,
        y1: y,
        x2: x,
        y2: y0,
        stroke: '#CD9850',
        lineWidth: '2px',
        lineDash: [ '3px', '6px' ]
      }}/>
      <polyline attrs={{
        points,
        lineJoin: 'round',
        lineCap: 'round',
        fill: 'l(90) 0:#F1E7D1 1:#FFFFFF',
        fillOpacity: 0.6,
      }}
      />
      <circle
        attrs={{
          x,
          y,
          fill: '#D3B166',
          fillOpacity: 0.3,
          r: '24px'
        }}
      />
      <circle
        attrs={{
          x,
          y,
          fill: '#EAB76B',
          r: '12px'
        }}
      />
    </group>
  );
}
