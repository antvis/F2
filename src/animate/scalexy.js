/**
 * @fileOverview 从中心缩放出来
 * @author dxq613@gmail.com
 */

const Animate = require('./animate');

class Scalexy extends Animate {
  draw(canvas, virtualCanvas) {
    const self = this;
    const ratio = self.ratio;
    const center = self.center;
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
      ctx.drawImage(virtualCanvas, 0, 0, width, height, center.x * (1 - factor), center.y * (1 - factor), width * factor / ratio, height * factor / ratio);
    });
  }
}

module.exports = Scalexy;
