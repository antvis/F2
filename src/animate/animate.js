/**
 * @fileOverview G2-mobile 的动画
 * @author 旻诺<audrey.tm@alibaba-inc.com> , dxq613@gmail.com
 */

const Util = require('../util');
const AnimateUtil = require('./util');
const DomUtil = require('../dom-util');

class Animate {

  getDefaultCfg() {
    return {
      // 背景image数据
      bgimageData: null,
      imageData: null,
      // 精度
      ratio: 1,
      // 正反方向动画的起点
      startPoint: { x: 0, y: 0 },
      // 极坐标圆心
      center: { x: 200, y: 200 },
      // 极坐标半径
      radius: 160,
      // 降频倍数
      reduceMultiple: 1,
      // 动画时间（毫秒）
      duration: 1000,
      // 动画方式
      easing: 'easeInOut',
      success: null
    };
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
  }

  // 动画前准备
  paint(canvas) {
    const self = this;
    const width = canvas.width;
    const height = canvas.height;
    // 获取精度
    const ratio = width / DomUtil.getWidth(canvas);
    self.ratio = ratio;
    // 生成虚拟canvas
    const virtualCanvas = document.createElement('canvas');
    virtualCanvas.style.width = width + 'px';
    virtualCanvas.style.height = height + 'px';
    virtualCanvas.width = width;
    virtualCanvas.height = height;
    self.draw(canvas, virtualCanvas);
  }

  // 渲染动画
  draw(/* canvas, virtualCanvas */) {

  }

  // 动画帧数控制
  animateStep(fn) {
    const self = this;
    if (self.animateId) {
      AnimateUtil.stopStep(self.animateId);
    }
    const animateId = AnimateUtil.animateStep(function(factor, num) {
      if (num % self.reduceMultiple === 0 || factor === 1) {
        fn(factor);
      }
    }, self.duration, self.easing, self.success);
    self.animateId = animateId;
  }

  clear(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  stop() {
    const self = this;
    const animateId = self.animateId;
    AnimateUtil.stopStep(animateId);
    self.animateId = null;
  }
}

module.exports = Animate;
