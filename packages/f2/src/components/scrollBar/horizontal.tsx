import { jsx } from '../../jsx';

export default (props, context) => {
  const { coord, range, position, layout } = props;
  const { left, width } = coord;
  const { top, height } = layout;
  const [start, end] = range;
  const barLeft = width * start;
  const barWidth = width * (end - start);

  return (
    <group
      style={{
        left,
        top: position === 'top' ? top - context.px2hd('8px') : top + height,
      }}
    >
      <line
        style={{
          position: 'absolute',
          left: 0,
          width,
          height: 0,
        }}
        attrs={{
          stroke: 'rgba(202, 215, 239, .2)',
          lineCap: 'round',
          lineWidth: '8px',
        }}
      />
      <line
        style={{
          position: 'absolute',
          left: barLeft,
          width: barWidth,
          height: 0,
        }}
        attrs={{
          stroke: 'rgba(202, 215, 239, .5)',
          lineCap: 'round',
          lineWidth: '8px',
        }}
      />
    </group>
  );
};
