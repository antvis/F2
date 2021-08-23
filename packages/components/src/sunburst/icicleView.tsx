import { jsx } from '@ali/f2-jsx';

export default (props) => {
  const { nodes, layout } = props;
  const { width, height } = layout;

  const renderNodes = (nodes) => {
    return (
      <group>
        {
          nodes.map(node => {
            const { x0, y0, x1, y1, color, children } = node;
            return (
              <group>
                <rect
                  attrs={{
                    x: x0 * width,
                    y: height - y0 * height,
                    width: (x1 - x0) * width,
                    height: (y1 - y0) * height,
                    lineWidth: '1px',
                    stroke: '#fff',
                    fill: color,
                  }}
                />
                {
                  children && children.length ? renderNodes(children) : null
                }
              </group>
            );
          })
        }
      </group>
    );
  };

  return renderNodes(nodes);
}
