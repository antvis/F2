const Vector2 = require('./vector2');

const start = Vector2.create();
const end = Vector2.create();
const extremity = Vector2.create();

function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
  const x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
  const y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
  return ({
    x,
    y
  });
}
// cubic helper formula at T distance
function CubicN(T, a, b, c, d) {
  const t2 = T * T;
  const t3 = t2 * T;
  return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}

function cubicBezierBounds(c) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  const s = {
    x: c[0],
    y: c[1]
  };
  const c1 = {
    x: c[2],
    y: c[3]
  };
  const c2 = {
    x: c[4],
    y: c[5]
  };
  const e = {
    x: c[6],
    y: c[7]
  };
  for (let t = 0; t < 100; t++) {
    const pt = getCubicBezierXYatT(s, c1, c2, e, t / 100);
    if (pt.x < minX) {
      minX = pt.x;
    }
    if (pt.x > maxX) {
      maxX = pt.x;
    }
    if (pt.y < minY) {
      minY = pt.y;
    }
    if (pt.y > maxY) {
      maxY = pt.y;
    }
  }
  return {
    minX,
    minY,
    maxX,
    maxY
  };
}

module.exports = {
  /**
   * 从顶点数组中计算最小包围盒
   * @param  {Array} points 顶点数组
   * @param  {Number} lineWidth 线宽
   * @return {Object}        最小包围盒的范围
   */
  getBBoxFromPoints(points) {
    if (points.length === 0) {
      return;
    }
    let p = points[0];
    let left = p.x;
    let right = p.x;
    let top = p.y;
    let bottom = p.y;
    const len = points.length;

    for (let i = 1; i < len; i++) {
      p = points[i];
      left = Math.min(left, p.x);
      right = Math.max(right, p.x);
      top = Math.min(top, p.y);
      bottom = Math.max(bottom, p.y);
    }

    return {
      minX: left,
      minY: top,
      maxX: right,
      maxY: bottom
    };
  },
  /**
   * 计算线的最小包围盒
   * @param  {Number} x0 线段的起点 x
   * @param  {Number} y0 线段的起点 y
   * @param  {Number} x1 线段的终点 x
   * @param  {Number} y1 线段的终点 y
   * @param  {Number} lineWidth 线宽
   * @return {Object}    线段的最小包围盒
   */
  getBBoxFromLine(x0, y0, x1, y1) {
    return {
      minX: Math.min(x0, x1),
      minY: Math.min(y0, y1),
      maxX: Math.max(x0, x1),
      maxY: Math.max(y0, y1)
    };
  },
  getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise) {
    const diff = Math.abs(startAngle - endAngle);
    if (diff % Math.PI * 2 < 1e-4 && diff > 1e-4) {
      // Is a circle
      return {
        minX: x - r,
        minY: y - r,
        maxX: x + r,
        maxY: y + r
      };
    }

    start[0] = Math.cos(startAngle) * r + x;
    start[1] = Math.sin(startAngle) * r + y;

    end[0] = Math.cos(endAngle) * r + x;
    end[1] = Math.sin(endAngle) * r + y;
    const min = [ 0, 0 ];
    const max = [ 0, 0 ];

    Vector2.min(min, start, end);
    Vector2.max(max, start, end);

    // Thresh to [0, Math.PI * 2]
    startAngle = startAngle % (Math.PI * 2);
    if (startAngle < 0) {
      startAngle = startAngle + Math.PI * 2;
    }
    endAngle = endAngle % (Math.PI * 2);
    if (endAngle < 0) {
      endAngle = endAngle + Math.PI * 2;
    }

    if (startAngle > endAngle && !anticlockwise) {
      endAngle += Math.PI * 2;
    } else if (startAngle < endAngle && anticlockwise) {
      startAngle += Math.PI * 2;
    }
    if (anticlockwise) {
      const tmp = endAngle;
      endAngle = startAngle;
      startAngle = tmp;
    }

    for (let angle = 0; angle < endAngle; angle += Math.PI / 2) {
      if (angle > startAngle) {
        extremity[0] = Math.cos(angle) * r + x;
        extremity[1] = Math.sin(angle) * r + y;

        Vector2.min(min, extremity, min);
        Vector2.max(max, extremity, max);
      }
    }

    return {
      minX: min[0],
      minY: min[1],
      maxX: max[0],
      maxY: max[1]
    };
  },
  getBBoxFromBezierGroup(points) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0, len = points.length; i < len; i++) {
      const bbox = cubicBezierBounds(points[i]);
      if (bbox.minX < minX) {
        minX = bbox.minX;
      }
      if (bbox.maxX > maxX) {
        maxX = bbox.maxX;
      }
      if (bbox.minY < minY) {
        minY = bbox.minY;
      }
      if (bbox.maxY > maxY) {
        maxY = bbox.maxY;
      }
    }

    return {
      minX,
      minY,
      maxX,
      maxY
    };
  }
};
