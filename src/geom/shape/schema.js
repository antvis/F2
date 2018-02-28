const Shape = require('./shape');
const Util = require('../../util/common');
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
  }];
  return points;
}

const Schema = Shape.registerFactory('schema', {});

Shape.registerShape('schema', 'candle', {
  // 获取构建k线图的点
  getPoints(cfg) {
    return getCandlePoints(cfg.x, cfg.y, cfg.size);
  },
  // 绘制k线图
  draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const style = Util.mix({
      stroke: cfg.color,
      fill: cfg.color,
      lineWidth: 1
    }, cfg.style);
    return container.addShape('Custom', {
      className: 'schema',
      attrs: style,
      createPath(ctx) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);

        ctx.moveTo(points[2].x, points[2].y);
        for (let i = 3; i < 6; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.moveTo(points[6].x, points[6].y);
        ctx.lineTo(points[7].x, points[7].y);
      }
    });
  }
});

module.exports = Schema;
