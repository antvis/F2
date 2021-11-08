import { jsx } from '../../../jsx';
import { getMiddlePoint } from '../../../util/coord';
import { convertToPoints } from '../util';

// 金字塔图和漏斗图的View
export default (props: any) => {
  const { records, shape, style } = props;

  // 是否倒置
  const overturn = false;

  return (
    <group>
      {records.map((record, index) => {
        const { key, children } = record;
        const lastRecord = index === 0 ? record : records[index - 1];
        const { children: lastChildren } = lastRecord;

        const lastFirstPoints = convertToPoints(lastChildren[0]);
        const lastLastPoints = convertToPoints(
          lastChildren[lastChildren.length - 1]
        );
        const polygonPoints = children.map((child, childIndex) => {
          const points = convertToPoints(child);
          if (childIndex === 0) {
            points[0] = lastFirstPoints[3];
          }
          if (childIndex === children.length - 1) {
            points[1] = lastLastPoints[2];
          }
          return {
            ...child,
            points,
          };
        });
        return (
          <group key={key}>
            {polygonPoints.map(child => {
              const { points, color, shape } = child;
              return (
                <polygon
                  attrs={{
                    points,
                    fill: color,
                    ...shape,
                    ...style,
                  }}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
