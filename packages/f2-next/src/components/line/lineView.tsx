import { jsx } from '../../jsx';
import { isArray } from '@antv/util';

export default (props: any) => {
  const { mappedArray, style } = props;
  return (
    <group>
      {
        mappedArray.map(item => {
          const { color, dataArray, size, lineWidth, lineDash, smooth } = item;
          return (
            <group>
              {
                dataArray.map(data => (
                  <polyline
                    attrs={{
                      points: data,
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
