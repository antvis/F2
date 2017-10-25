/**
 * @fileOverview 横向缩放
 * @author dxq613@gmail.com
 */

const Animate = require('./animate');

class Scalex extends Animate {

  draw(canvas, virtualCanvas) {
    const self = this;
    const ratio = self.ratio;
    const start = self.startPoint.x * ratio;
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
      const positiveWidth = (width - start) * factor / ratio;
      ctx.drawImage(virtualCanvas, 0, 0, width, height, start * (1 - factor) / ratio, 0, negativeWidth + positiveWidth, height / ratio);
    });
  }
}

module.exports = Scalex;
