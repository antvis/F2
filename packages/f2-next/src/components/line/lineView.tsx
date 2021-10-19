import { jsx } from '../../jsx';
import { isArray } from '@antv/util';

export default (props: any) => {
  const { mappedArray, smooth, lineWidth = '4px' } = props;

  return (
    <group>
      {
        mappedArray.map(item => {
          const { color, points } = item;
          return (
            <group>
              <polyline
                attrs={{
                  points: points,
                  stroke: color,
                  lineWidth: lineWidth,
                  smooth: smooth,
                }}
              />
            </group>
          );
        })
      }
    </group>
  );
}
