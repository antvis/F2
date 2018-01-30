/**
 * @fileOverview 自定义图表
 * @author dxq613@gmail.com
 */

const Shape = require('./shape');
const Util = require('../../util');
const G = require('../../graphic/g');

// START candle shape
function _sortValue(value) {
  // 从大到小排序
  const sorted = value.sort(function(a, b) {
    return a < b ? 1 : -1;
  });

  const length = sorted.length;
  if (length < 4) {
    const min = sorted[length - 1];
    for (let i = 0; i < (4 - length); i++) {
      sorted.push(min);
    }
  }
  return sorted;
}

const Schema = Shape.registerFactory('schema', {});

// 方向：左下角顺时针连接
function getCandlePoints(x, y, width) {
  const yValues = _sortValue(y);
  const points = [{
    x,
    y: yValues[0]
  }, {
    x,
    y: yValues[1]
  }, {
    x: x - width / 2,
    y: yValues[2]
  }, {
    x: x - width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[1]
  }, {
    x: x + width / 2,
    y: yValues[2]
  }, {
    x,
    y: yValues[2]
  }, {
    x,
    y: yValues[3]
  }]; // 按照顺时针连接
  return points;
}


// 注册k线图
Shape.registerShape('schema', 'candle', {
  // 获取构建k线图的点
  getPoints(cfg) {
    const points = getCandlePoints(cfg.x, cfg.y, cfg.size);
    return points;
  },
  // 绘制k线图
  draw(cfg, canvas) {
    const points = this.parsePoints(cfg.points);
    const style = Util.mix({
      strokeStyle: cfg.color,
      fillStyle: cfg.color
    }, cfg.style);
    const ctx = G.before(canvas, style);
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);

    ctx.moveTo(points[2].x, points[2].y);
    for (let i = 3; i < 6; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.moveTo(points[6].x, points[6].y);
    ctx.lineTo(points[7].x, points[7].y);
    G.after(ctx, style);
  }
});

module.exports = Schema;
