import { jsx } from '../../jsx';

export default (props) => {
  const { nodes, coord } = props;
  if (coord.isPolar) {
    const { center } = coord;
    const { x, y } = center;
    return (
      <group>
        {nodes.map((node) => {
          const { xMin, xMax, yMin, yMax, color } = node;
          return (
            <sector
              attrs={{
                x,
                y,
                lineWidth: '1px',
                stroke: '#fff',
                startAngle: xMin,
                endAngle: xMax,
                r0: yMin,
                r: yMax,
                anticlockwise: false,
                fill: color,
              }}
            />
          );
        })}
      </group>
    );
  }
  return (
    <group>
      {nodes.map((node) => {
        const { xMin, xMax, yMin, yMax, color } = node;
        return (
          <rect
            attrs={{
              x: xMin,
              y: yMin,
              width: xMax - xMin,
              height: yMax - yMin,
              fill: color,
              lineWidth: '4px',
              stroke: '#fff',
              radius: '8px',
            }}
          />
        );
      })}
    </group>
  );
};
