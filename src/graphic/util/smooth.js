/**
 * @fileOverview 将折线转换成平滑曲线
 * @author dxq613@gmail.com
 */
const Vector2 = require('./vector2');

function getPoint(v) {
  return [ v.x, v.y ];
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
    min = [ Infinity, Infinity ];
    max = [ -Infinity, -Infinity ];

    for (i = 0, l = points.length; i < l; i++) {
      point = getPoint(points[i]);
      Vector2.min(min, min, point);
      Vector2.max(max, max, point);
    }
    Vector2.min(min, min, constraint[0]);
    Vector2.max(max, max, constraint[1]);
  }

  for (i = 0, len = points.length; i < len; i++) {
    point = getPoint(points[i]);
    if (isLoop) {
      prevPoint = getPoint(points[i ? i - 1 : len - 1]);
      nextPoint = getPoint(points[(i + 1) % len]);
    } else {
      if (i === 0 || i === len - 1) {
        cps.push([ point[0], point[1] ]);
        continue;
      } else {
        prevPoint = getPoint(points[i - 1]);
        nextPoint = getPoint(points[i + 1]);
      }
    }

    const v = Vector2.sub([], nextPoint, prevPoint);
    Vector2.scale(v, v, smooth);
    let d0 = Vector2.distance(point, prevPoint);
    let d1 = Vector2.distance(point, nextPoint);

    const sum = d0 + d1;
    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    const v1 = Vector2.scale([], v, -d0);
    const v2 = Vector2.scale([], v, d1);

    const cp0 = Vector2.add([], point, v1);
    const cp1 = Vector2.add([], point, v2);

    if (hasConstraint) {
      Vector2.max(cp0, cp0, min);
      Vector2.min(cp0, cp0, max);
      Vector2.max(cp1, cp1, min);
      Vector2.min(cp1, cp1, max);
    }

    cps.push([ cp0[0], cp0[1] ]);
    cps.push([ cp1[0], cp1[1] ]);
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
