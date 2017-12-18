/**
 * @fileOverview 在水平方向平铺
 * @author dxq613@gmail.com
 */

const Animate = require('./animate');

class Waveh extends Animate {
  draw(canvas, virtualCanvas) {
    const self = this;
    const width = canvas.width;
    const height = canvas.height;
    const ctx = canvas.getContext('2d');
    const ratio = self.ratio;
    const virtualCtx = virtualCanvas.getContext('2d');
    const imageData = self.imageData;
    const bgImageData = self.bgImageData;
    // 绘制背景
    ctx.putImageData(bgImageData, 0, 0);
    // 在虚拟canvas上渲染imageData
    virtualCtx.putImageData(imageData, 0, 0);
    self.animateStep(function(factor) {
      self.clear(canvas);
      ctx.putImageData(bgImageData, 0, 0);
      ctx.drawImage(virtualCanvas, 0, 0, width * factor, height, 0, 0, (width * factor) / ratio, height / ratio);
    });
  }
}

module.exports = Waveh;
