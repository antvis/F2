/**
 * Large data down sampling using largest-triangle-three-buckets.
 *   A   B   C
 *
 * 桶：包含数据子区间的有序集。
 * @param {string} data
 * @param {number} rate
 * * @param {number} dimension
 */

export interface OptionsProps {
  /*周期 */
  rate: number;
  dimension: string;
}

export default function lttbDownSample(data, options?: OptionsProps) {
  const { rate = 5, dimension = 'value' } = options;
  const len = data.length;
  const targetCount = len / rate;

  if (rate >= len || targetCount < 2) {
    return data;
  }

  const sampled = [];
  let sampledIndex = 0;
  // Bucket size targetCount需大于2
  const bucketSize = Math.floor((len - 2) / (targetCount - 2));

  // A is the first point in the triangle
  let a = 0,
    maxAreaPoint,
    maxArea,
    area,
    // B Bucket
    nextA;

  sampled[sampledIndex++] = data[a];

  for (let i = 1; i < len - 1; i += bucketSize) {
    // Calculate point average for C bucket
    let avgRangeStart = Math.min(i + bucketSize, len - 1);
    const avgRangeEnd = Math.min(i + 2 * bucketSize, len);

    const avgX = (avgRangeEnd + avgRangeStart) / 2;
    let avgY = 0;
    const avgLength = avgRangeEnd - avgRangeStart;
    for (; avgRangeStart < avgRangeEnd; avgRangeStart++) {
      avgY += Number(data[avgRangeStart][dimension]);
    }
    // 桶的平均数
    avgY /= avgLength;

    // Get the range for B bucket
    const rangeTo = Math.min(i + bucketSize, len);

    // Point a
    const pointA_x = i - 1;
    const pointA_y = Number(data[a][dimension]);
    maxArea = area = -1;

    for (let rangeOffs = i; rangeOffs < rangeTo; rangeOffs++) {
      // Calculate triangle area over three buckets
      area =
        Math.abs(
          (pointA_x - avgX) * (Number(data[rangeOffs][dimension]) - pointA_y) -
            (pointA_x - rangeOffs) * (avgY - pointA_y)
        ) * 0.5;
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[rangeOffs];
        nextA = rangeOffs;
      }
    }

    sampled[sampledIndex++] = maxAreaPoint;
    a = nextA; // T
  }
  sampled[sampledIndex++] = data[len - 1];
  return sampled;
}
