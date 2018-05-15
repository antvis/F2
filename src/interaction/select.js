const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');

class PieSelect extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return {
      animate: true,
      style: {
        // todo
      }
    }
  }

  constructor(cfg, chart) {
    // const

  }

}

Chart.registerInteraction('pie-select', PieSelect);

module.exports = PieSelect;
