const Util = require('../../util');
const Shape = require('./shape');
const G = require('../../graphic/g');

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

function drawShape(cfg, canvas) {
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
  const ctx = G.before(canvas, style); // 开始绘制，附加参数
  bottomPoints.reverse(); // 下面
  topPoints = self.parsePoints(topPoints);
  bottomPoints = self.parsePoints(bottomPoints);
  if (cfg.isInCircle) {
    if (equalsCenter(bottomPoints, cfg.center)) { // 如果内部点等于圆心，不绘制
      bottomPoints = [];
    }
    self.drawCircleArea(topPoints, bottomPoints, ctx);
  } else {
    self.drawRectShape(topPoints, bottomPoints, ctx);
  }
  G.after(ctx, style);
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

  draw(cfg, canvas) {
    drawShape.call(this, cfg, canvas);
  },
  drawCircleArea(topPoints, bottomPoints, ctx) {
    G.lines(topPoints, ctx);
    ctx.lineTo(topPoints[0].x, topPoints[0].y);
    ctx.closePath();
    if (bottomPoints.length) {
      G.lines(bottomPoints, ctx);
      ctx.closePath();
    }
  },
  drawRectShape(topPoints, bottomPoints, ctx) {
    topPoints = topPoints.concat(bottomPoints);
    G.lines(topPoints, ctx);
    ctx.closePath();
  }
});

// draw line shape
Shape.registerShape('area', 'smooth', {
  draw(cfg, canvas) {
    drawShape.call(this, cfg, canvas);
  },
  drawCircleArea(topPoints, bottomPoints, ctx) {
    G.smooth(topPoints, ctx); // 绘制上面的线
    ctx.closePath();
    if (bottomPoints.length) {
      G.smooth(bottomPoints, ctx);
      ctx.closePath();
    }
  },
  drawRectShape(topPoints, bottomPoints, ctx) {
    G.smooth(topPoints, ctx); // 绘制上面的线
    ctx.lineTo(bottomPoints[0].x, bottomPoints[0].y);
    G.smooth(bottomPoints, ctx, false);
    ctx.closePath();
  }
});

module.exports = Area;
