import { jsx } from '../../jsx';
import { isArray } from '@antv/util';

export default (props: any) => {
  const { mappedArray, lineWidth = '4px' } = props;

  return (
    <group>
      {
        mappedArray.map(item => {
          const { color, points, lineDash, smooth } = item;
          return (
            <group>
              <polyline
                attrs={{
                  points: points,
                  stroke: color,
                  lineWidth: lineWidth,
                  lineDash,
                  smooth,
                }}
              />
            </group>
          );
        })
      }
    </group>
  );
}
