import { jsx } from '@ali/f2-jsx';

export default (props) => {
  const { nodes } = props;
  return (
    <group>
      {
        nodes.map(node => {
          const { x0, y0, x1, y1, color } = node;
          return (
            <rect
              attrs={{
                x: x0,
                y: y0,
                width: x1 - x0,
                height: y1 - y0,
                fill: color,
                radius: '8px'
              }}
            />
          );
        })
      }
    </group>
  );
}
