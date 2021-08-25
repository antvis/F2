import { jsx } from '@jsx';

export default (props) => {
  const { nodes, layout } = props;
  const nodeChildren = nodes.children;
  const { left, right, top, bottom } = layout;
  const x = left + (right - left) / 2;
  const y = top + (bottom - top) / 2;
  const angle = Math.PI * 2;
  const r = Math.min( x - left, y - top );

  const renderNodes = (nodes) => {
    return (
      <group>
        {
          nodes.map(node => {
            const { x0, y0, x1, y1, color, children } = node;
            return (
              <group>
                <sector
                  attrs={{
                    x,
                    y,
                    lineWidth: '1px',
                    stroke: '#fff',
                    r0: y0 * r,
                    r: y1 * r,
                    startAngle: x0 * angle,
                    endAngle: x1 * angle,
                    anticlockwise: false,
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

  return renderNodes(nodeChildren);
}
