import { jsx } from '@antv/f-engine';

export default (props) => {
  const { elements, color } = props;
  const topPoints = [];
  const bottomPoints = [];

  elements.map((d) => {
    const { min, max } = d.shape.getBounds();
    topPoints.push([min[0], min[1]]);
    topPoints.push([max[0], min[1]]);
    bottomPoints.push([min[0], max[1]]);
    bottomPoints.push([max[0], max[1]]);
  });

  // 将上边的点和下边的点连接起来，形成一个多边形
  const points = [...topPoints, ...bottomPoints.reverse()];

  return (
    <group>
      <polygon
        style={{
          points,
          fill: color,
          stroke: 'none',
          opacity: 0.4,
        }}
      />
    </group>
  );
};
