const expect = require('chai').expect;
const F2 = require('../../src/core');
const Tooltip = require('../../src/plugin/tooltip');
require('../../src/geom/line');


describe('Issue 543', () => {
  let canvas;
  let chart;
  beforeAll(() => {
    canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'issue543';
    document.body.appendChild(canvas);
  });

  it('Issue 543', () => {
    const data = [
      { day: '周一', value: 300 },
      { day: '周二', value: 400 },
      { day: '周三', value: 350 },
      { day: '周四', value: 500 },
      { day: '周五', value: 490 },
      { day: '周六', value: 600 },
      { day: '周日', value: 900 }
    ];
    chart = new F2.Chart({
      id: 'issue543',
      pixelRatio: 2,
      plugins: Tooltip
    });

    chart.source(data, {
      value: {
        tickCount: 5,
        min: 0
      },
      day: {
        range: [ 0, 1 ]
      }
    });
    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: false,
      onShow: function onShow(ev) {
        const items = ev.items;
        items[0].name = null;
        items[0].value = '$ ' + items[0].value;
      }
    });
    chart.axis('day', {
      label: function label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.line().position('day*value');
    chart.render();

    chart.changeSize(200, 250); // 改变大小


    const position = chart.getPosition({
      day: '周一',
      value: 300
    });
    chart.showTooltip(position);

    const tooltip = chart.get('tooltipController').tooltip;
    const crosshairsShapeY = tooltip.crosshairsShapeY;
    const plotRange = chart.get('plotRange');
    expect(crosshairsShapeY.attr('y1') - crosshairsShapeY.attr('y2')).to.equal(plotRange.height);
  });

  afterAll(() => {
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
