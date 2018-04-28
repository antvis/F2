const Hammer = require('hammerjs'); // http://hammerjs.github.io/
const Util = require('../util/common');

const defaultOptions = {
  useCalculate: true, // 计算事件触发位置，对应的图表的数据. 关闭返回null
  useOffset: false // 计算数据是否需要计算图表相对页面偏移的坐标
};

class GestureController {
  constructor({ dom, gesture, options, chart, hammerOptions }) {
    this.Hammer = Hammer;
    this.hammer = new Hammer(dom, hammerOptions);
    this.dom = dom;
    this.gesture = gesture;
    this.options = Util.deepMix({}, defaultOptions, options);
    this.hammerOptions = hammerOptions;
    this.chart = chart;
    this._unbindEvent = {}; // 没有绑定事件
    if (!options) {
      this.hammerOptionsHack(gesture, this.hammer);
    }
  }
  // hammer默认配置把多指事件swipe 和 pinch 关闭。 如果没有自定义optionas为空则设置
  hammerOptionsHack(gesture, hammer) {
    for (const key in gesture) {
      if (key.indexOf('swipe') !== -1 && hammer.get('swipe')) {
        hammer.get('swipe').set({ enable: true });
      }

      if (key.indexOf('pinch') !== -1 && hammer.get('pinch')) {
        hammer.get('pinch').set({ enable: true });
      }
    }
  }
  // 等geom绘制完再绑定事件
  bindEvents() {
    const { gesture, hammer, dom } = this;
    const { useCalculate } = this.options;
    if (!hammer) {
      return;
    }
    for (const key in gesture) {
      // 基础的事件，hammer没提供，手动绑定。
      if ([ 'touchstart', 'touchmove', 'touchend' ].indexOf(key) !== -1) {
        const bindEvent = event => {
          const records = useCalculate ? this.getEventPostionRecords(event, true) : null;
          gesture[key](records, event);
        };
        Util.addEventListener(dom, key, bindEvent);
        this._unbindEvent[key] = bindEvent;
      } else {
        hammer.on(key, event => {
          const records = useCalculate ? this.getEventPostionRecords(event, false) : null;
          gesture[key](records, event);
        });
      }
    }
  }
  // 获取发生手势事件对应的数据
  getEventPostionRecords(event, _isOrigin) {
    const { useOffset } = this.options;
    const canvasDom = this.chart.get('canvas').get('el');
    let x;
    let y;
    // 原生的事件
    if (_isOrigin) {
      const positionSource = event.targetTouches.length > 0 ? event.targetTouches[0] : event.changedTouches[0];
      if (useOffset) {
        x = positionSource.clientX - canvasDom.offsetLeft;
        y = positionSource.clientY - canvasDom.offsetTop;
      } else {
        x = positionSource.clientX;
        y = positionSource.clientY;
      }
    } else {
      if (useOffset) {
        x = event.center.x - canvasDom.offsetLeft;
        y = event.center.y - canvasDom.offsetTop;
      } else {
        x = event.center.x;
        y = event.center.y;
      }
    }
    return this.chart.getSnapRecords({ x, y });
  }
  destroy() {
    this.hammer.destroy();
    for (const key in this._unbindEvent) {
      const event = this._unbindEvent[key];
      Util.removeEventListener(this.dom, key, event);
    }
  }
}

module.exports = {
  init(chart) {
    // 在chart对象上增加一个方法，用于插件传参数。
    chart.pluginGesture = function({ gesture, options, hammerOptions }) {
      const canvasDom = chart.get('canvas').get('el');
      const gestureController = new GestureController({ dom: canvasDom, gesture, options, hammerOptions, chart });
      gestureController.bindEvents();
      chart.set('gestureController', gestureController);
      return gestureController;
    };
  },
  clear(chart) {
    const gestureController = chart.get('gestureController');
    gestureController && gestureController.destroy();
  }
};
