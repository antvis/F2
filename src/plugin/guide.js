const Util = require('../util/common');
const Guide = require('../component/guide/base');
const Global = require('../global');

// register the default configuration for Guide
Global.guide = Util.deepMix({
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
  rect: {
    style: {
      fill: '#fafafa'
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
  },
  tag: {
    top: true,
    offsetX: 0, // X 轴偏移
    offsetY: 0, // Y 轴偏移
    side: 4, //  三角标的边长
    background: {
      padding: 5, // tag 内边距
      radius: 2, // tag 圆角
      fill: '#1890FF' // tag 背景色
    },
    textStyle: {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  }
}, Global.guide || {});

class GuideController {
  constructor(cfg) {
    this.guides = [];
    this.xScale = null;
    this.yScales = null;
    Util.mix(this, cfg);
  }

  paint(coord) {
    const self = this;
    const guides = self.guides;
    const xScale = self.xScale;
    const yScales = self.yScales;
    Util.each(guides, function(guide) {
      guide.xScale = xScale;
      guide.yScales = yScales;
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
    Util.each(guides, guide => {
      guide.remove();
    });
  }
  _createGuide(type, cfg) {
    const ClassName = Util.upperFirst(type);
    const guide = new Guide[ClassName](Util.deepMix({}, Global.guide[type], cfg));
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

  tag(cfg = {}) {
    return this._createGuide('tag', cfg);
  }
}

module.exports = {
  init(chart) {
    const guideController = new GuideController({
      frontPlot: chart.get('frontPlot').addGroup({
        zIndex: 20,
        className: 'guideContainer'
      }),
      backPlot: chart.get('backPlot').addGroup({
        className: 'guideContainer'
      })
    });
    chart.set('guideController', guideController);
    /**
     * 为图表添加 guide
     * @return {GuideController} 返回 guide 控制器
     */
    chart.guide = function() {
      return guideController;
    };
  },
  afterGeomDraw(chart) {
    const guideController = chart.get('guideController');
    if (!guideController.guides.length) {
      return;
    }
    const xScale = chart.getXScale();
    const yScales = chart.getYScales();
    const coord = chart.get('coord');
    guideController.xScale = xScale;
    guideController.yScales = yScales;
    guideController.paint(coord);
  },
  clear(chart) {
    chart.get('guideController').clear();
  },
  repaint(chart) {
    chart.get('guideController').reset();
  }
};
