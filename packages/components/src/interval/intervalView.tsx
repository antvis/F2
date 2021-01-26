import { jsx } from '@ali/f2-jsx';

function getRectRange(points) {
  const xValues = [];
  const yValues = [];
  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    xValues.push(point.x);
    yValues.push(point.y);
  }
  const xMin = Math.min.apply(null, xValues);
  const yMin = Math.min.apply(null, yValues);
  const xMax = Math.max.apply(null, xValues);
  const yMax = Math.max.apply(null, yValues);

  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
}

export default (props) => {
  const { points, color } = props;
  const rectCfg = getRectRange(points);
  return <rect
    attrs={{
      ...rectCfg,
      fill: color,
    }}
  />;
}
