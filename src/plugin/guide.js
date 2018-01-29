const Util = require('../util/common');
const Guide = require('../component/guide/');
const Global = require('../global');

// register the default configuration for Guide
Global.guide = Util.deepMix(Global.guide || {}, {
  line: {
    style: {
      stroke: '#a3a3a3',
      lineWidth: 1
    },
    top: true
  },
  text: {
    style: {
      fill: '#787878',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offsetX: 0,
    offsetY: 0,
    top: true
  },
  region: {
    style: {
      fillStyle: '#fafafa'
    },
    top: false
  },
  arc: {
    style: {
      stroke: '#a3a3a3'
    },
    top: true
  },
  html: {
    offsetX: 0,
    offsetY: 0,
    alignX: 'middle',
    alignY: 'middle'
  }
});

class GuideController {
  constructor(cfg) {
    this.guides = [];
    this.xScale = null;
    this.yScale = null;
    Util.mix(this, cfg);
  }

  setScale(xScale, yScale) {
    const guides = this.guides;
    this.xScale = xScale;
    this.yScale = yScale;
    Util.each(guides, function(guide) {
      guide.xScale = xScale;
      guide.yScale = yScale;
    });
  }

  paint(coord) {
    const self = this;
    const guides = self.guides;
    Util.each(guides, function(guide) {
      const container = guide.top ? self.frontPlot : self.backPlot;
      guide.render(coord, container);
    });
  }

  clear() {
    this.reset();
    this.guides = [];
    return this;
  }

  reset() {
    const guides = this.guides;
    guides.map(guide => {
      guide.remove();
      return guide;
    });
  }
  _createGuide(type, cfg) {
    const ClassName = Util.upperFirst(type);
    const guide = new Guide[ClassName](Util.deepMix({
      xScale: this.xScale,
      yScale: this.yScale
    }, Global.guide[type], cfg));
    this.guides.push(guide);
    return this;
  }

  line(cfg = {}) {
    return this._createGuide('line', cfg);
  }

  text(cfg = {}) {
    return this._createGuide('text', cfg);
  }

  arc(cfg = {}) {
    return this._createGuide('arc', cfg);
  }

  html(cfg = {}) {
    return this._createGuide('html', cfg);
  }

  rect(cfg = {}) {
    return this._createGuide('rect', cfg);
  }
}

module.exports = {
  init(chart) {
    const guideController = new GuideController({
      frontPlot: chart.get('frontPlot'),
      backPlot: chart.get('backPlot')
    });
    chart.set('guideController', guideController);
  },
  afterGeomDraw(chart) {
    const guideController = chart.get('guideController');
    if (!guideController.guides.length) {
      return;
    }
    const xScale = chart.getXScale();
    const yScale = chart.getYScales()[0];
    const coord = chart.get('coord');
    guideController.setScale(xScale, yScale);
    guideController.paint(coord);
  },
  clear(chart) {
    chart.get('guideController').clear();
  },
  repaint(chart) {
    chart.get('guideController').reset();
  }
};
