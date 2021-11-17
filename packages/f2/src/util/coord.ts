/**
 * 计算两个坐标的中点坐标
 * @param start 起始点{x:number, y:number}
 * @param end 结束点{x:number, y:number}
 * @returns 中点坐标{x:number, y:number}
 */
function getMiddlePoint(start, end) {
  const x = (end.x - start.x) / 2 + start.x;
  const y = (end.y - start.y) / 2 + start.y;
  return { x, y };
}

export { getMiddlePoint };
