import { jsx, TextStyleProps } from '@antv/f-engine';
import Coord from '../../coord/base';
import { DataRecord } from '../../chart/Data';
import { TreemapProps as TreemapBaseProps, RecordNode } from './withTreemap';

export interface TreemapProps<TRecord extends DataRecord = DataRecord>
  extends TreemapBaseProps<TRecord> {
  label?: boolean | TextStyleProps;
  onClick?: (record: RecordNode<TRecord>) => void;
}

export default (
  props: TreemapProps & { coord: Coord } // Coord 在 withTreemap 被转成 Coord 类型了，所以这里需要重新定义
) => {
  const { nodes, coord, onClick, label = false } = props;

  if (coord.isPolar) {
    const { center } = coord;
    const { x, y } = center;
    return (
      <group>
        {nodes.map((node) => {
          const { xMin, xMax, yMin, yMax, color, style } = node;
          return (
            <sector
              style={{
                cx: x,
                cy: y,
                lineWidth: '1px',
                stroke: '#fff',
                startAngle: xMin,
                endAngle: xMax,
                r0: yMin,
                r: yMax,
                fill: color,
                ...style,
              }}
              onClick={onClick ? () => onClick(node) : null}
            />
          );
        })}
      </group>
    );
  }
  return (
    <group>
      {nodes.map((node) => {
        const { key, xMin, xMax, yMin, yMax, color, style } = node;
        return (
          <group>
            <rect
              key={key}
              style={{
                x: xMin,
                y: yMin,
                width: xMax - xMin,
                height: yMax - yMin,
                fill: color,
                lineWidth: '4px',
                stroke: '#fff',
                radius: '8px',
                ...style,
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
                },
                update: {
                  easing: 'linear',
                  duration: 450,
                  property: [
                    'x',
                    'y',
                    'width',
                    'height',
                    'radius',
                    'lineWidth',
                    'fillOpacity',
                    'strokeOpacity',
                  ],
                },
              }}
              onClick={onClick ? () => onClick(node) : null}
            />
            {label && (
              <text
                style={{
                  x: (xMin + xMax) / 2,
                  y: (yMin + yMax) / 2,
                  text: node.origin.name,
                  fill: 'white',
                  textAlign: 'center',
                  textBaseline: 'middle',
                  ...(label as TextStyleProps),
                }}
              />
            )}
          </group>
        );
      })}
    </group>
  );
};
