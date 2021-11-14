import { jsx } from '../../jsx';

export default (props) => {
  const { coord, node } = props;
  const { children } = node;
  const { x, y } = coord.center;

  const renderNodes = (nodes) => {
    return (
      <group>
        {nodes.map((node) => {
          const { xMin, xMax, yMin, yMax, color, children } = node;
          return (
            <group>
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
              {children && children.length ? renderNodes(children) : null}
            </group>
          );
        })}
      </group>
    );
  };

  return renderNodes(children);
};
