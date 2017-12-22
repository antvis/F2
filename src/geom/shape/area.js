const Util = require('../../util/common');
const Shape = require('./shape');
const Smooth = require('../../g/util/smooth');

// 是否相等
function equals(v1, v2) {
  return Math.abs(v1 - v2) < 0.00001;
}

// 是否等于圆心的点
function equalsCenter(points, center) {
  let eqls = true;
  Util.each(points, function(point) {
    if (!equals(point.x, center.x) || !equals(point.y, center.y)) {
      eqls = false;
      return false;
    }
  });
  return eqls;
}

function drawCircleArea(topPoints, bottomPoints, container, style, isSmooth) {
  const shapeName = isSmooth ? 'SmoothLine' : 'Polyline';
  container.addShape(shapeName, {
    className: 'area',
    attrs: Util.mix({
      points: topPoints
    }, style)
  });
  if (bottomPoints.length) {
    container.addShape(shapeName, {
      className: 'area',
      attrs: Util.mix({
        points: bottomPoints
      }, style)
    });
  }
}

function drawRectShape(topPoints, bottomPoints, container, style, isSmooth) {
  if (isSmooth) {
    container.addShape('Custom', {
      className: 'area',
      attrs: style,
      createPath(context) {
        const constaint = [ // 范围
          [ 0, 0 ],
          [ 1, 1 ]
        ];
        const topSps = Smooth.smooth(topPoints, false, constaint);
        const bottomSps = Smooth.smooth(bottomPoints, false, constaint);

        context.beginPath();
        context.moveTo(topPoints[0].x, topPoints[0].y);
        for (let i = 0, n = topSps.length; i < n; i++) {
          const sp = topSps[i];
          context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
        }
        context.lineTo(bottomPoints[0].x, bottomPoints[0].y);
        for (let i = 0, n = bottomSps.length; i < n; i++) {
          const sp = bottomSps[i];
          context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
        }
        context.closePath();
      }
    });
  } else {
    topPoints = topPoints.concat(bottomPoints);
    container.addShape('Polyline', {
      className: 'area',
      attrs: Util.mix({
        points: topPoints
      }, style)
    });
  }
}

function drawShape(cfg, container, isSmooth) {
  const self = this;
  const points = cfg.points;
  let topPoints = []; // 区域图上面的点
  let bottomPoints = []; // 区域图下面的点
  Util.each(points, function(point) {
    bottomPoints.push(point[0]);
    topPoints.push(point[1]);
  });
  const style = Util.mix({
    fillStyle: cfg.color
  }, cfg.style);
  bottomPoints.reverse(); // 下面
  topPoints = self.parsePoints(topPoints);
  bottomPoints = self.parsePoints(bottomPoints);
  if (cfg.isInCircle) {
    if (equalsCenter(bottomPoints, cfg.center)) { // 如果内部点等于圆心，不绘制
      bottomPoints = [];
    }
    drawCircleArea(topPoints, bottomPoints, container, style, isSmooth);
  } else {
    drawRectShape(topPoints, bottomPoints, container, style, isSmooth);
  }
}

const Area = Shape.registerFactory('area', {
  defaultShapeType: 'area',
  // 如果存在多个点，分割成单个的点, 不考虑多个x对应一个y的情况
  getDefaultPoints(obj) {
    const x = obj.x;
    let y = obj.y;
    const y0 = obj.y0; // 最小值
    y = Util.isArray(y) ? y : [ y0, y ];

    const points = [];
    points.push({
      x,
      y: y[0]
    }, {
      x,
      y: y[1]
    });
    return points;
  }
});

// draw area shape
Shape.registerShape('area', 'area', {
  draw(cfg, container) {
    drawShape.call(this, cfg, container, false);
  }
});

// draw smooth shape
Shape.registerShape('area', 'smooth', {
  draw(cfg, container) {
    drawShape.call(this, cfg, container, true);
  }
});

module.exports = Area;
