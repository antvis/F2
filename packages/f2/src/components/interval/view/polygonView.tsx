import { jsx } from '../../../jsx';
import { getMiddlePoint } from '../../../util/coord';
import { convertToPoints } from '../util';

// 金字塔图和漏斗图的View
export default (props) => {
  const { records, shape, showLabel, labelCfg, LabelView } = props;

  // 是否倒置
  let overturn = false;

  return (
    <group>
      {records.map((record, index) => {
        const { key, children } = record;
        const isLastRecord = index === records.length - 1;
        const nextRecord = isLastRecord ? record : records[index + 1];
        const { children: nextChildren } = nextRecord;

        const nextFirstPoint = convertToPoints(nextChildren[0]);
        const nextLastPoints = convertToPoints(nextChildren[nextChildren.length - 1]);

        if (!overturn) {
          overturn = nextChildren[0].yMax > children[0].yMax;
        }

        if (overturn) {
          nextFirstPoint.reverse();
          nextLastPoints.reverse();
        }

        const polygonPoints = children.map((child, childIndex) => {
          let points = convertToPoints(child);

          if (overturn) {
            points.reverse();
          }

          if (isLastRecord) {
            if (shape === 'pyramid') {
              points = [getMiddlePoint(points[0], points[1]), points[2], points[3]];
            }
          } else {
            if (childIndex === 0) {
              points[0] = nextFirstPoint[3];
            }
            if (childIndex === children.length - 1) {
              points[1] = nextLastPoints[2];
            }
          }
          return {
            ...child,
            points,
          };
        });

        return (
          <group key={key}>
            {polygonPoints.map((child) => {
              const { points, color, shape } = child;
              return (
                <group>
                  <polygon
                    attrs={{
                      points,
                      fill: color,
                      ...shape,
                    }}
                  />
                  {showLabel && LabelView ? (
                    <LabelView record={child} points={points} {...labelCfg} />
                  ) : null}
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
