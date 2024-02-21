import { jsx } from '@antv/f-engine';

export default (props, context) => {
  const { coord, range, position, layout, style, background, barStyle } = props;
  const { left, width } = coord;
  const { top, height } = layout;
  const [start, end] = range?.x || range?.y;
  const barLeft = width * start;
  const barWidth = width * (end - start);
  if (isNaN(barWidth)) return;

  return (
    <group
      style={{
        display: 'flex',
        left,
        top: position === 'top' ? top - context.px2hd('8px') : top + height,
        ...style,
      }}
    >
      <line
        style={{
          display: 'flex',
          position: 'absolute',
          left: 0,
          width,
          height: 0,
          stroke: 'rgba(202, 215, 239, .2)',
          lineCap: 'round',
          lineWidth: '8px',
          ...background,
        }}
      />
      <line
        style={{
          display: 'flex',
          position: 'absolute',
          left: barLeft,
          width: barWidth,
          height: 0,
          stroke: 'rgba(202, 215, 239, .5)',
          lineCap: 'round',
          lineWidth: '8px',
          ...barStyle,
        }}
      />
    </group>
  );
};
