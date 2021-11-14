import { jsx } from '../../jsx';

export default (props) => {
  const { node } = props;
  const { children } = node;

  const renderNodes = (nodes) => {
    return (
      <group>
        {nodes.map((node) => {
          const { xMin, xMax, yMin, yMax, color, children } = node;
          return (
            <group>
              <rect
                attrs={{
                  x: xMin,
                  y: yMin,
                  width: xMax - xMin,
                  height: yMax - yMin,
                  lineWidth: '1px',
                  stroke: '#fff',
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
