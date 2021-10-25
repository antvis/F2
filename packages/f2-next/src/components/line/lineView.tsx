import { jsx } from '../../jsx';
import { isArray } from '@antv/util';

export default (props: any) => {
  const { mappedArray, style } = props;
  return (
    <group>
      {
        mappedArray.map(item => {
          const { color, points, size, lineWidth, lineDash, smooth } = item;
          return (
            <group>
              {
                points.map(list => (
                  <polyline
                    attrs={{
                      points: list,
                      stroke: color,
                      lineWidth: lineWidth ?? size,
                      lineDash,
                      smooth,
                      ...style,
                    }}
                  />
                ))
              }
            </group>
          );
        })
      }
    </group>
  );
}
