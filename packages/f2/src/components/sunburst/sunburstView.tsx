import { jsx } from '../../index';

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
                  cx: x,
                  cy: y,
                  lineWidth: '1px',
                  stroke: '#fff',
                  startAngle: `${xMin} rad`,
                  endAngle: `${xMax} rad`,
                  r0: yMin,
                  r: yMax,
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
