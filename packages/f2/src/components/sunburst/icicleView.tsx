import { jsx } from '@antv/f-engine';

export default (props) => {
  const { node, onClick } = props;
  const { children } = node;

  const renderNodes = (nodes) => {
    return (
      <group>
        {nodes.map((node) => {
          const { xMin, xMax, yMin, yMax, color, children } = node;
          return (
            <group onClick={onClick}>
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
