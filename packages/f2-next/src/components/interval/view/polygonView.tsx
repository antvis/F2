import { jsx } from '../../../jsx';
import { getMiddlePoint } from '../../../util/coord';
import { convertToPoints } from '../util';

// 金字塔图和漏斗图的View
export default (props: any) => {
  const { mappedArray, shape } = props;

  // 是否倒置
  let overturn = false;

  return (
    <group>
      {mappedArray.map((dataArray, idx) => {
        const item = dataArray[0];
        const { color, yMax } = item;
        const points = convertToPoints(item);

        let polygonPoints = null;

        if (idx !== mappedArray.length - 1) {
          const nextItem = mappedArray[idx + 1][0];

          const { yMax: nextYMax } = nextItem;
          const nextPoints = convertToPoints(nextItem);

          // 在坐标系上从大往小画，就是倒置
          overturn = nextYMax > yMax;

          // 梯形的底边（较长的那一边）
          const bottomEdge = overturn
            ? [points[0], points[1]]
            : [points[3], points[2]];

          // 顶边
          const topEdge = overturn
            ? [nextPoints[1], nextPoints[0]]
            : [nextPoints[2], nextPoints[3]];

          polygonPoints = bottomEdge.concat(topEdge);
        } else {
          // 梯形的底边（较长的那一边）
          const bottomEdge = overturn
            ? [points[0], points[1]]
            : [points[2], points[3]];

          // 顶边
          const topEdge = overturn
            ? [points[2], points[3]]
            : [points[0], points[1]];

          polygonPoints = bottomEdge;

          // pyramid 顶部是三角形，所以取中心点就好了，funnel顶部是长方形
          if (shape === 'pyramid') {
            bottomEdge.push(getMiddlePoint(topEdge[0], topEdge[1]));
          } else {
            polygonPoints.push(topEdge[0], topEdge[1]);
          }
        }

        return (
          <polygon
            attrs={{
              points: polygonPoints,
              fill: color,
            }}
          />
        );
      })}
    </group>
  );
};
