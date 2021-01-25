import { jsx } from '@ali/f2-jsx';
import { withLine } from '@ali/f2-components';

export default withLine((props) => {
  const { plot, points, color, size, areaColor } = props;
  if (!points || !points.length) {
    return null;
  }
  const { bl } = plot;
  const { x } = points[0];
  const lastPoint = points[points.length - 1];
  const areaPoints = [].concat(points);
  areaPoints.push({
    x: lastPoint.x,
    y: bl.y,
  }, {
    x: x,
    y: bl.y,
  });
  return (
    <group>
      <polyline attrs={{
        points: areaPoints,
        fill: areaColor,
        fillOpacity: 0.3
      }}
    />
    <polyline attrs={{
        points,
        lineJoin: 'round',
        lineCap: 'round',
        lineWidth: size,
        strokeStyle: color,
      }}
    />
    </group>
  );
});
