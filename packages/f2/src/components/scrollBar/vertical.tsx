import { jsx } from '@antv/f-engine';

export default (props, context) => {
  const { coord, range, position, layout, style, background, barStyle } = props;
  const { top, height } = coord;
  const { left, width } = layout;
  const [start, end] = range?.y || range?.x;

  const barTop = height * start;
  const barHeight = height * (end - start);

  return (
    <group
      style={{
        display: 'flex',
        top,
        left: position === 'left' ? left - context.px2hd('8px') : left + width,
        ...style,
      }}
    >
      <line
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height,
          stroke: 'rgba(202, 215, 239, .2)',
          lineCap: 'round',
          lineWidth: '8px',
          ...background,
        }}
      />
      <line
        style={{
          position: 'absolute',
          top: barTop,
          width: 0,
          height: barHeight,
          stroke: 'rgba(202, 215, 239, .5)',
          lineCap: 'round',
          lineWidth: '8px',
          ...barStyle,
        }}
      />
    </group>
  );
};
