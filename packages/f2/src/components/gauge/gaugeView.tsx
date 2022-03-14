import { jsx } from '../../jsx';

export default (props) => {
  const { center, startAngle, endAngle, r, percent, ticks } = props;
  const { x, y } = center;
  const diff = endAngle - startAngle;
  return (
    <group>
      <arc
        attrs={{
          x,
          y,
          r,
          startAngle,
          endAngle,
          lineWidth: '20px',
          lineCap: 'round',
          stroke: '#e7e7e7',
        }}
      />
      <arc
        attrs={{
          x,
          y,
          r,
          startAngle,
          endAngle: startAngle,
          lineWidth: '40px',
          lineCap: 'round',
          stroke: '#0075ff',
        }}
        animation={{
          appear: {
            easing: 'linear',
            duration: 500,
            property: ['endAngle'],
            start: {
              endAngle: startAngle,
            },
            end: {
              endAngle: startAngle + diff * percent,
            },
          },
        }}
      />
      {ticks.map((tick) => {
        const { start, end } = tick;
        return (
          <line
            attrs={{
              x1: start.x,
              y1: start.y,
              x2: end.x,
              y2: end.y,
              lineWidth: '6px',
              lineCap: 'round',
              stroke: '#e7e7e7',
            }}
          />
        );
      })}
    </group>
  );
};
