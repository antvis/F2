import { jsx } from '@antv/f-engine';

export default (props) => {
  const { pointsData = [], radius, center, frameStyle, lineStyle, linesData = [] } = props;
  const cx = center[0];
  const cy = center[1];

  return (
    <group
      style={{
        clip: {
          type: 'circle',
          style: {
            cx,
            cy,
            r: radius,
          },
        },
      }}
    >
      {/* 放大镜外框 */}
      <circle
        style={{
          cx,
          cy,
          r: radius,
          fill: 'transparent',
          stroke: '#d8d8d8',
          lineWidth: '2px',
          ...frameStyle,
        }}
      />
      {/* 辅助线 */}
      {linesData.map((line) => (
        <line
          style={{
            x1: line.points[0].x,
            y1: line.points[0].y,
            x2: line.points[1].x,
            y2: line.points[1].y,
            stroke: '#d8d8d8',
            lineWidth: '5px',
            ...line.style,
          }}
        />
      ))}
      {/* 折线 */}
      {pointsData.map((d) => (
        <polyline
          style={{
            points: d.children.map((p) => [p.x, p.y]),
            stroke: d.color,
            lineWidth: '5px',
            ...d.shape,
            ...lineStyle,
          }}
          animation={{
            appear: {
              easing: 'quadraticOut',
              duration: 450,
              clip: {
                type: 'rect',
                property: ['width'],
                style: {
                  x: cx - radius,
                  y: cy - radius,
                  height: radius * 2,
                },
                start: {
                  width: 0,
                },
                end: {
                  width: radius * 2,
                },
              },
            },
          }}
        />
      ))}
    </group>
  );
};
