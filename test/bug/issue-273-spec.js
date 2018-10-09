const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/interval');
const Tooltip = require('../../src/plugin/tooltip');

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 260;
canvas.id = 'issue273';
document.body.appendChild(canvas);

function snapEqual(a, b) {
  return Math.abs(a - b) < 0.01;
}

describe('issue 273', () => {
  it('Issue273', done => {
    const data = [
      { country: '巴西', population: 100 },
      { country: '印尼', population: 234 },
      { country: '美国', population: 290 },
      { country: '印度', population: 104 },
      { country: '中国', population: 131 }
    ];
    const chart = new F2.Chart({
      id: 'issue273',
      pixelRatio: window.devicePixelRatio,
      plugins: Tooltip
    });

    chart.source(data);
    const geom = chart.interval().position('country*population');
    chart.render();

    const point = chart.getPosition({ country: '美国', population: 290 });
    chart.showTooltip(point);
    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const markerGroup = tooltip.markerGroup;
    const tooltipMarker = markerGroup.get('children')[0];
    const width = geom.get('_width');
    expect(snapEqual(tooltipMarker.attr('width'), 48.12300109863281)).to.be.true;
    expect(snapEqual(width, 320.82000732421875)).to.be.true;

    setTimeout(() => {
      chart.changeSize(100, 260);
      const point = chart.getPosition({ country: '美国', population: 290 });
      chart.showTooltip(point);
      const tooltipController = chart.get('tooltipController');
      const tooltip = tooltipController.tooltip;
      const markerGroup = tooltip.markerGroup;
      const tooltipMarker = markerGroup.get('children')[0];
      const width = geom.get('_width');
      expect(snapEqual(tooltipMarker.attr('width'), 6.8730010986328125)).to.be.true;
      expect(snapEqual(width, 45.82000732421875)).to.be.true;

      chart.destroy();
      document.body.removeChild(canvas);

      done();
    }, 200);
  });
});
