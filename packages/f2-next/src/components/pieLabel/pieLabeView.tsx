import { jsx } from '../../jsx';

export default (props, context) => {
  const {
    sidePadding,
    adjustOffset,
    lineStyle,
    anchorStyle,
    labels,
    label1OffsetY,
    label2OffsetY,
    triggerRef,
  } = props;

  const defaultTextAttrs = {
    x: 0,
    y: 0,
    fontSize: 12,
    lineHeight: 12,
    fill: '#808080',
  };

  return (
    <group ref={triggerRef}>
      {labels.map((label) => {
        const { y, fill, _inflection, _anchor, origin, label1, label2 } = label;
        const lastPoint = {
          x: label._side === 'left' ? sidePadding : context.width - sidePadding,
          y,
        };

        const textAttrs = {
          textAlign: label._side === 'left' ? 'left' : 'right',
          x: label._side === 'left' ? sidePadding : context.width - sidePadding,
        };
        const points = [_anchor, _inflection, lastPoint];
        return (
          <group>
            {/* 锚点 */}
            <circle
              attrs={{
                r: 2,
                x: _anchor.x,
                y: _anchor.y,
                fill,
                ...anchorStyle,
              }}
            />
            {/* 线 */}
            <polyline
              attrs={{
                points,
                lineWidth: 1,
                stroke: fill,
                ...lineStyle,
              }}
            />
            {/* label1 顶部 */}
            <text
              className="click"
              attrs={{
                ...defaultTextAttrs,
                textBaseline: 'bottom',
                y: y + label1OffsetY,
                ...textAttrs,
                ...label1,
              }}
              data={origin}
            />
            {/* label2 底部 */}
            <text
              className="click"
              attrs={{
                ...defaultTextAttrs,
                textBaseline: 'top',
                y: y + label2OffsetY,
                ...textAttrs,
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
