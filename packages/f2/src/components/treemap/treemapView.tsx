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
        const { key, xMin, xMax, yMin, yMax, color } = node;
        return (
          <rect
            key={key}
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
            animation={{
              appear: {
                easing: 'linear',
                duration: 450,
                property: ['fillOpacity', 'strokeOpacity'],
                start: {
                  fillOpacity: 0,
                  strokeOpacity: 0,
                },
                end: {
                  fillOpacity: 1,
                  strokeOpacity: 1,
                },
              },
              update: {
                easing: 'linear',
                duration: 450,
                property: ['x', 'y', 'width', 'height', 'radius', 'lineWidth'],
              },
            }}
          />
        );
      })}
    </group>
  );
};
