import { expect } from 'chai';
import * as F2 from '../../../src/core';
import '../../../src/geom/line';
import ScrollBar from '../../../src/plugin/scroll-bar';

function snapEqual(v1, v2) {
  return Math.abs(v1 - v2) < 0.01;
}

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 200;
canvas.id = 'scrollBar';
canvas.style.marginLeft = '20px';
document.body.appendChild(canvas);

const data = [];
const yValues = [ 3, 5.6, 7, 7, 10, 11, 3, 8, 9, 5.6, 12, 14, 10, 8, 9, 5, 17, 3, 8, 9 ];
for (let i = 0; i < 20; i++) {
  const obj = {};
  obj.x = i + 1;
  obj.y = yValues[i];
  data.push(obj);
}

const chart = new F2.Chart({
  id: 'scrollBar',
  pixelRatio: window.devicePixelRatio,
  plugins: ScrollBar,
  limitInPlot: true
});
chart.source(data, {
  x: {
    min: 4,
    max: 12
  },
  y: {
    min: 8,
    max: 14
  }
});
chart.line().position('x*y');
chart.scrollBar({
  mode: 'xy'
});
chart.render();

describe('ScrollBar', function() {
  it('render scrollBar.', function() {
    const backPlot = chart.get('backPlot');
    expect(backPlot.get('children').length).to.equal(3);

    const hBar = chart.get('_horizontalBar');
    const vBar = chart.get('_verticalBar');

    const hLine = hBar.get('children')[1];
    const vLine = vBar.get('children')[1];

    expect(snapEqual(hLine.attr('x1'), 85.1536800986842)).to.be.true;
    expect(snapEqual(hLine.attr('x2'), 222.5768400493421)).to.be.true;

    expect(snapEqual(vLine.attr('y1'), 79.10714285714286)).to.be.true;
    expect(snapEqual(vLine.attr('y2'), 138.03571428571428)).to.be.true;
  });

  it('chart.repaint()', function() {
    chart.repaint();
    const backPlot = chart.get('backPlot');
    expect(backPlot.get('children').length).to.equal(3);
  });

  it('chart.clear()', function() {
    chart.clear();
    const backPlot = chart.get('backPlot');
    expect(backPlot.get('children').length).to.equal(1);

    const hBar = chart.get('_horizontalBar');
    const vBar = chart.get('_verticalBar');
    expect(hBar).to.be.null;
    expect(vBar).to.be.null;
  });
});
