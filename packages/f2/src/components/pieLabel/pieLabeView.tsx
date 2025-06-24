import { jsx } from '@antv/f-engine';

export default (props) => {
  const {
    lineStyle,
    anchorStyle,
    labels,
    label1OffsetY,
    label2OffsetY,
    triggerRef,
    onClick,
    showAnchor,
  } = props;

  return (
    <group ref={triggerRef}>
      {labels.map((label) => {
        const { origin, anchor, side, color, label1, label2, points } = label;
        const end = points[points.length - 1];

        return (
          <group
            onClick={
              onClick
                ? () => {
                    onClick(label);
                  }
                : null
            }
          >
            {/* 锚点 */}
            {showAnchor && (
              <circle
                attrs={{
                  r: '4px',
                  cx: anchor.x,
                  cy: anchor.y,
                  fill: color,
                  ...anchorStyle,
                }}
              />
            )}
            {/* 线 */}
            <polyline
              attrs={{
                points: points.map((d) => [d.x, d.y]),
                lineWidth: '2px',
                stroke: color,
                ...lineStyle,
              }}
            />
            {/* label1 顶部 */}
            <text
              className="click"
              attrs={{
                x: end.x,
                y: end.y + label1OffsetY,
                fontSize: '24px',
                lineHeight: '24px',
                fill: color,
                textAlign: side === 'left' ? 'left' : 'right',
                ...label1,
              }}
              data={origin}
            />
            {/* label2 底部 */}
            <text
              className="click"
              attrs={{
                x: end.x,
                y: end.y + label2OffsetY,
                fontSize: '24px',
                lineHeight: '24px',
                fill: '#808080',
                textBaseline: 'top',
                textAlign: side === 'left' ? 'left' : 'right',
                ...label2,
              }}
              data={origin}
            />
          </group>
        );
      })}
    </group>
  );
};
