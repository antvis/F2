const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/line');
const Tooltip = require('../../src/plugin/tooltip');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue702';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('issue 702', () => {
  it('只有一条数据，tooltip也能展示', () => {
    const data = [
      { key: 0, value: 63.4 }
    ];
    const chart = new F2.Chart({
      id: 'issue702',
      pixelRatio: window.devicePixelRatio,
      plugins: Tooltip
    });

    chart.source(data);
    chart.tooltip({
      snap: true
    });
    chart.line().position('key*value');
    chart.render();

    const point = chart.getPosition({ key: 0, value: 63.4 });
    chart.showTooltip(point);

    const tooltip = chart.get('tooltipController').tooltip;
    expect(tooltip.items.length).to.equal(1);
    expect(tooltip.items[0].name).to.equal('value');
    expect(tooltip.items[0].value).to.equal('63.4');
    expect(tooltip.items[0].title).to.equal('0');
    expect(tooltip.markerGroup.get('visible')).to.be.true;

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
