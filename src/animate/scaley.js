/**
 * @fileOverview y 轴方向的缩放
 * @author dxq613@gmail.com
 */

const Animate = require('./animate');

class Scaley extends Animate {
  draw(canvas, virtualCanvas) {
    const self = this;
    const ratio = self.ratio;
    const start = self.startPoint.y * ratio;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');
    const virtualCtx = virtualCanvas.getContext('2d');
    const imageData = self.imageData;
    const bgImageData = self.bgImageData;
    // 在虚拟canvas上渲染imageData
    virtualCtx.putImageData(imageData, 0, 0);
    self.animateStep(function(factor) {
      self.clear(canvas);
      ctx.putImageData(bgImageData, 0, 0);
      // 计算正反方向的图片宽度
      const negativeWidth = start * factor / ratio;
      const positiveWidth = (height - start) * factor / ratio;
      ctx.drawImage(virtualCanvas, 0, 0, width, height, 0, start * (1 - factor) / ratio, width / ratio, negativeWidth + positiveWidth);
    });
  }
}

module.exports = Scaley;
