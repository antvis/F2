import F2 from '@antv/f2';
import '@antv/data-set';
const DataSet = window.DataSet;

const Util = F2.Util;

// 获取 text 文本的图形属性
function getTextAttrs(cfg) {
  return Util.mix({}, {
    fillOpacity: cfg.opacity,
    fontSize: cfg.origin._origin.size,
    rotate: cfg.origin._origin.rotate * Math.PI / 180,
    text: cfg.origin._origin.text,
    textAlign: 'center',
    fontFamily: cfg.origin._origin.font,
    fill: cfg.color,
    textBaseline: 'Alphabetic'
  }, cfg.style);
}

// 给point注册一个词云的shape
F2.Shape.registerShape('point', 'cloud', {
  draw: function draw(cfg, container) {
    const attrs = getTextAttrs(cfg);
    const x = cfg.x;
    const y = this._coord.y.start - cfg.y;
    return container.addShape('text', {
      attrs: Util.mix(attrs, {
        x,
        y
      })
    });
  }
});

fetch('../data/world-population.json')
  .then(res => res.json())
  .then(data => {
    const dv = new DataSet.View().source(data);
    const range = dv.range('value');
    const min = range[0];
    const max = range[1];
    const MAX_FONTSIZE = 36; // 最大的字体
    const MIN_FONTSIZE = 12; // 最小的字体
    // 生成词云的布局
    dv.transform({
      type: 'tag-cloud',
      fields: [ 'x', 'value' ],
      size: [ 375, 260 ], // 同 canvas 画布保持一致
      font: 'Verdana',
      padding: 0,
      timeInterval: 5000, // max execute time
      rotate: function rotate() {
        let random = ~~(Math.random() * 4) % 4;
        if (random === 2) {
          random = 0;
        }
        return random * 90; // 0, 90, 270
      },
      fontSize: function fontSize(d) {
        if (d.value) {
          return (d.value - min) / (max - min) * (MAX_FONTSIZE - MIN_FONTSIZE) + MIN_FONTSIZE;
        }
        return 0;
      }
    });

    const chart = new F2.Chart({
      id: 'container',
      padding: 0,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(dv.rows, {
      x: {
        nice: false
      },
      y: {
        nice: false
      }
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip(false);

    chart.point()
      .position('x*y')
      .color('category')
      .shape('cloud');
    chart.render();
  });
