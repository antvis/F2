/**
 * @fileOverview 从中心旋转出来
 * @author dxq613@gmail.com
 */

const Animate = require('./animate');

class Wavec extends Animate {
  draw(canvas, virtualCanvas) {
    const self = this;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');
    const virtualCtx = virtualCanvas.getContext('2d');
    const ratio = self.ratio;
    const center = self.center;
    const radius = self.radius;
    const imageData = self.imageData;
    const bgImageData = self.bgImageData;
    // 绘制背景
    ctx.putImageData(bgImageData, 0, 0);
    virtualCtx.putImageData(imageData, 0, 0);
    self.animateStep(function(factor) {
      self.clear(canvas);
      ctx.putImageData(bgImageData, 0, 0);
      // 剪切扇形区域
      ctx.save();
      self.sector(ctx, 2 * Math.PI * factor, center, radius);
      ctx.clip();
      // 绘制图表
      ctx.drawImage(virtualCanvas, 0, 0, width, height, 0, 0, width / ratio, height / ratio);
      ctx.restore();
    });
  }

  // 绘制扇形
  sector(ctx, thita, center, radius) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(1, 1, 1, 0)';
    // 画出圆弧
    ctx.arc(center.x, center.y, radius, 1.5 * Math.PI, 1.5 * Math.PI + thita);
    // 移动到终点，准备连接终点与圆心
    ctx.moveTo(center.x + Math.sin(thita) * radius, center.y - Math.cos(thita) * radius);
    // 连接到圆心
    ctx.lineTo(center.x, center.y);
    // 从圆心连接到起点
    ctx.lineTo(center.x, center.y - radius);
    ctx.stroke();
  }
}

module.exports = Wavec;
