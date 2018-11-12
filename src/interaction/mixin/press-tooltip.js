const Util = require('../../util/common');

module.exports = {
  _bindPress() {
    const { chart, hammer, el, pressThreshold, pressTime } = this;
    const tooltipController = chart.get('tooltipController');
    if (tooltipController && tooltipController.enable) {
      chart.set('_closeTooltip', true); // 用于交互的特殊标示量
      if (hammer) {
        hammer.get('press').set({
          threshold: pressThreshold,
          time: pressTime
        });
        hammer.on('press', Util.wrapBehavior(this, '_handlePress'));
      } else {
        Util.addEventListener(el, 'press', Util.wrapBehavior(this, '_handlePress'));
      }
    }
  },

  reset() {
    const chart = this.chart;
    const tooltipController = chart.get('tooltipController');
    if (tooltipController) {
      this.pressed = false;
      !tooltipController.cfg.alwaysShow && chart.hideTooltip();
      chart.set('_closeTooltip', true); // 用于交互的特殊标示量
    }
  },

  _handlePress(e) {
    this.pressed = true;
    const center = e.center || e.touches[0];
    this.chart.set('_closeTooltip', false); // 用于交互的特殊标示量
    this.chart.showTooltip(center);
  }
};
