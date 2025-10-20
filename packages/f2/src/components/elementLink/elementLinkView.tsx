import { jsx } from '@antv/f-engine';

export default (props) => {
  const { elements } = props;

  return (
    <group>
      {elements.map((d) => {
        const { highlightsData, color } = d;
        const topPoints = [];
        const bottomPoints = [];

        highlightsData.forEach((item) => {
          const { xMin, xMax, yMin, yMax } = item;
          topPoints.push([xMin, yMin]);
          topPoints.push([xMax, yMin]);
          bottomPoints.push([xMin, yMax]);
          bottomPoints.push([xMax, yMax]);
        });

        // 将上边的点和下边的点连接起来，形成一个多边形
        const points = [...topPoints, ...bottomPoints.reverse()];
        return (
          <polygon
            style={{
              points,
              fill: color,
              stroke: 'none',
              opacity: 0.4,
            }}
          />
        );
      })}
    </group>
  );
};
