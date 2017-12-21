/**
 * @fileOverview 将折线转换成平滑曲线
 * @author dxq613@gmail.com
 */
const Vector2 = require('./vector2');

function getPoint(v) {
  return new Vector2(v.x, v.y);
}

function pointScale(p, s) {
  p.x *= s;
  p.y *= s;
  return p;
}

function smoothBezier(points, smooth, isLoop, constraint) {
  const cps = [];

  let prevPoint;
  let nextPoint;
  const hasConstraint = !!constraint;
  let min;
  let max;
  let point;
  let len;
  let l;
  let i;
  if (hasConstraint) {
    min = new Vector2(Infinity, Infinity);
    max = new Vector2(-Infinity, -Infinity);

    for (i = 0, l = points.length; i < l; i++) {
      point = getPoint(points[i]);
      min.min(point);
      max.max(point);
    }
    min.min(getPoint(constraint[0]));
    max.max(getPoint(constraint[1]));
  }

  for (i = 0, len = points.length; i < len; i++) {
    point = getPoint(points[i]);
    if (isLoop) {
      prevPoint = getPoint(points[i ? i - 1 : len - 1]);
      nextPoint = getPoint(points[(i + 1) % len]);
    } else {
      if (i === 0 || i === len - 1) {
        cps.push([ point.x, point.y ]);
        continue;
      } else {
        prevPoint = getPoint(points[i - 1]);
        nextPoint = getPoint(points[i + 1]);
      }
    }

    const v = Vector2.sub(nextPoint, prevPoint);
    pointScale(v, smooth);
    let d0 = point.distanceTo(prevPoint);
    let d1 = point.distanceTo(nextPoint);

    const sum = d0 + d1;
    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    const v1 = pointScale(v.clone(), -d0);
    const v2 = pointScale(v.clone(), d1);

    const cp0 = Vector2.add(point, v1);
    const cp1 = Vector2.add(point, v2);

    if (hasConstraint) {
      cp0.max(min);
      cp0.min(max);
      cp1.max(min);
      cp1.min(max);
    }

    cps.push([ cp0.x, cp0.y ]);
    cps.push([ cp1.x, cp1.y ]);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }
  return cps;
}

function catmullRom2bezier(pointList, z, constraint) {
  const isLoop = !!z;

  const controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
  const len = pointList.length;
  const d1 = [];

  let cp1;
  let cp2;
  let p;

  for (let i = 0; i < len - 1; i++) {
    cp1 = controlPointList[i * 2];
    cp2 = controlPointList[i * 2 + 1];
    p = pointList[i + 1];
    d1.push([ 'C',
      cp1[0],
      cp1[1],
      cp2[0],
      cp2[1],
      p.x,
      p.y
    ]);
  }

  if (isLoop) {
    cp1 = controlPointList[len];
    cp2 = controlPointList[len + 1];
    p = pointList[0];

    d1.push([ 'C',
      cp1[0],
      cp1[1],
      cp2[0],
      cp2[1],
      p.x,
      p.y
    ]);
  }
  return d1;
}

module.exports = {
  smooth: catmullRom2bezier
};
