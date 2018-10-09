const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/interval');
const Tooltip = require('../../src/plugin/tooltip');

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 260;
canvas.id = 'issue302';
document.body.appendChild(canvas);

describe('issue 302', () => {
  it('Issue 302', () => {
    const data = [
      { country: '巴西', population: 100 },
      { country: '印尼印尼\n印尼印尼', population: 234 },
      { country: '美国', population: 290 },
      { country: '印度', population: 104 },
      { country: '中国', population: 131 }
    ];
    const chart = new F2.Chart({
      id: 'issue302',
      pixelRatio: window.devicePixelRatio,
      plugins: Tooltip
    });

    chart.source(data);
    chart.tooltip({
      showTitle: true,
      offsetY: 60
    });
    chart.interval().position('country*population');
    chart.render();

    let point = chart.getPosition({
      country: '印尼印尼\n印尼印尼', population: 234
    });
    chart.showTooltip(point);

    let titleShape = chart.get('tooltipController').tooltip.container.titleShape;
    expect(titleShape.getBBox().height).to.equal(25.68);
    expect(titleShape.attr('textArr')).to.eql([ '印尼印尼', '印尼印尼' ]);

    point = chart.getPosition({
      country: '美国', population: 290
    });
    chart.showTooltip(point);

    titleShape = chart.get('tooltipController').tooltip.container.titleShape;
    expect(titleShape.getBBox().height).to.equal(12);
    expect(titleShape.attr('textArr')).to.be.null;

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
