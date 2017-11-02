/**
 * @fileOverview 使用 canvas 的api 绘制图表
 * @author dxq613@gmail.com
 */

const Util = require('../util');
const Vector2 = require('./vector2');
const Smooth = require('./smooth');
const Global = require('../global');

function before(canvas, cfg) {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.save();
  ctx.globalAlpha = cfg.opacity || 1;
  if (cfg.lineDash && ctx.setLineDash) {
    ctx.setLineDash(cfg.lineDash);
  }
  if (cfg.fill) cfg.fillStyle = cfg.fill;
  delete cfg.fill;
  if (cfg.stroke) cfg.strokeStyle = cfg.stroke;
  delete cfg.stroke;
  if (cfg.fontStyle || cfg.fontVariant || cfg.fontWeight || cfg.fontSize || cfg.fontFamily) {
    const fontCfg = {};
    Util.mix(fontCfg, Global.defaultFont, cfg);
    cfg.font = [
      fontCfg.fontStyle,
      fontCfg.fontVariant,
      fontCfg.fontWeight,
      fontCfg.fontSize + 'px',
      fontCfg.fontFamily
    ].join(' ');
  }
  Util.mix(ctx, cfg);
  return ctx;
}

function after(ctx, cfg) {
  const originOpacity = ctx.globalAlpha;
  if (cfg.strokeStyle) {
    if (cfg.strokeOpacity) {
      ctx.globalAlpha = cfg.strokeOpacity;
    }
    ctx.stroke();
    ctx.globalAlpha = originOpacity;
  }
  if (cfg.fillStyle) {
    ctx.globalAlpha = cfg.fillOpacity || ctx.globalAlpha;
    ctx.fill();
    if (cfg.fillOpacity || cfg.strokeOpacity) {
      ctx.strokeStyle = cfg.strokeStyle ? cfg.strokeStyle : cfg.fillStyle;
      ctx.globalAlpha = cfg.strokeOpacity || 1;
      ctx.stroke();
    }
  }

  ctx.restore();
}

module.exports = {
  drawLine(start, end, canvas, cfg) {
    const ctx = before(canvas, cfg);
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    after(ctx, cfg);
  },
  drawText(text, pos, canvas, cfg) {
    let rotate;
    if (cfg.rotate) {
      rotate = cfg.rotate * Math.PI / 180;
      delete cfg.rotate;
    }
    const ctx = before(canvas, cfg);
    if (rotate) {
      ctx.translate(pos.x, pos.y);
      ctx.rotate(rotate);
      ctx.fillText('' + text, 0, 0);
    } else {
      ctx.fillText('' + text, pos.x, pos.y);
    }
    ctx.restore();
  },
  drawCircle(center, radius, canvas, cfg) {
    const ctx = before(canvas, cfg);
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    after(ctx, cfg);
  },
  drawArc(center, radius, startAngle, endAngle, canvas, cfg) {
    const ctx = before(canvas, cfg);
    ctx.arc(center.x, center.y, radius, startAngle, endAngle);
    if (cfg.z !== false) {
      ctx.closePath();
    }
    after(ctx, cfg);
  },
  radiusRect(x, y, w, h, r, ctx) {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
  },
  drawRect(points, canvas, cfg) {
    const ctx = before(canvas, cfg);
    let minX = points[0].x;
    let minY = points[0].y;
    let maxX = points[1].x;
    let maxY = points[1].y;
    points.forEach(function(point) {
      if (point.x > maxX) {
        maxX = point.x;
      }
      if (point.x < minX) {
        minX = point.x;
      }
      if (point.y > maxY) {
        maxY = point.y;
      }
      if (point.y < minY) {
        minY = point.y;
      }
    });
    const x = minX;
    const y = minY;
    const width = maxX - minX;
    const height = maxY - minY;
    if (cfg.radius) {
      const radius = Math.min(cfg.radius, width / 2, height / 2);
      this.radiusRect(x, y, width, height, radius, ctx);
    } else {
      ctx.rect(x, y, width, height);
    }

    if (cfg.z !== false) {
      ctx.closePath();
    }
    after(ctx, cfg);
  },
  drawShape(canvas, cfg, shapeFn) {
    const ctx = before(canvas, cfg);
    shapeFn(ctx);
    if (cfg.z) {
      ctx.closePath();
    }
    after(ctx, cfg);
  },
  drawLines(points, canvas, cfg) {
    const ctx = before(canvas, cfg);
    this.lines(points, ctx);
    if (cfg.z) {
      ctx.closePath();
    }
    after(ctx, cfg);
  },
  // 绘制线，不处理上下文
  lines(points, ctx, isStart) {
    if (!points.length) {
      return;
    }
    if (isStart !== false) {
      ctx.moveTo(points[0].x, points[0].y);
    }
    for (let i = 1, l = points.length; i < l; i++) {
      const point = points[i];
      ctx.lineTo(point.x, point.y);
    }
  },
  drawFan(points, center, canvas, cfg) {
    const ctx = before(canvas, cfg);
    const v = new Vector2(1, 0);
    const v0 = new Vector2(points[0].x - center.x, points[0].y - center.y);
    const innerRadius = v0.length();
    const v1 = new Vector2(points[1].x - center.x, points[1].y - center.y);
    const radius = v1.length();
    const v2 = new Vector2(points[2].x - center.x, points[2].y - center.y);

    const startAngle = v.angleTo(v1);
    const endAngle = v.angleTo(v2);
    if (startAngle > endAngle && startAngle - endAngle < 0.0001) {
      ctx.moveTo(center.x + radius, center.y);
      ctx.arc(center.x, center.y, radius, 0, Math.PI);
      ctx.arc(center.x, center.y, radius, Math.PI, Math.PI * 2);
      ctx.moveTo(center.x + innerRadius, center.y);
      ctx.arc(center.x, center.y, innerRadius, Math.PI * 2, Math.PI, true);
      ctx.arc(center.x, center.y, innerRadius, Math.PI, 0, true);
      ctx.closePath();
    } else {
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.arc(center.x, center.y, radius, startAngle, endAngle);
      ctx.lineTo(points[3].x, points[3].y);
      ctx.arc(center.x, center.y, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
    }
    after(ctx, cfg);
  },
  drawSmooth(points, canvas, cfg) {
    if (points.length === 0) {
      return;
    }
    const ctx = this.before(canvas, cfg);
    this.smooth(points, ctx);
    this.after(ctx, cfg);
  },
  before(canvas, cfg) {
    return before(canvas, cfg);
  },
  after(ctx, cfg) {
    return after(ctx, cfg);
  },
  smooth(points, ctx, isStart) {
    const constaint = [ // 范围
      [ 0, 0 ],
      [ 1, 1 ]
    ];
    const sps = Smooth.smooth(points, false, constaint);
    if (isStart !== false) {
      ctx.moveTo(points[0].x, points[0].y);
    }
    for (let i = 0, n = sps.length; i < n; i++) {
      const sp = sps[i];
      ctx.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
    }
  }
};
