import { jsx } from '../../jsx';
import { isArray } from '@antv/util';

export default (props: any) => {
  const { mappedArray } = props || {};

  return (
    <group>
      {mappedArray.map(dataArray => {
        return dataArray.map(item => {
          const { x, y, size, color } = item;
          return (
            <circle
              attrs={{
                x,
                y,
                r: (size || 4) / 2,
                fill: color,
              }}
            />
          );
        });
      })}
    </group>
  );
};
