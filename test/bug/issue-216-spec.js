import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/line';
import * as Tooltip from '../../src/plugin/tooltip';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue216';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('issue 216', () => {
  it('tooltip 层级问题', () => {
    const data = [
      { value: 63.4, city: 'New York', date: '2011-10-01' },
      { value: 62.7, city: 'San Francisco', date: '2011-10-01' },
      { value: 72.2, city: 'Austin', date: '2011-10-01' },
      { value: 58, city: 'New York', date: '2011-10-02' },
      { value: 59.9, city: 'San Francisco', date: '2011-10-02' },
      { value: 67.7, city: 'Austin', date: '2011-10-02' },
      { value: 53.3, city: 'New York', date: '2011-10-03' },
      { value: 59.1, city: 'San Francisco', date: '2011-10-03' },
      { value: 69.4, city: 'Austin', date: '2011-10-03' },
      { value: 55.7, city: 'New York', date: '2011-10-04' },
      { value: 58.8, city: 'San Francisco', date: '2011-10-04' },
      { value: 68, city: 'Austin', date: '2011-10-04' },
      { value: 64.2, city: 'New York', date: '2011-10-05' },
      { value: 58.7, city: 'San Francisco', date: '2011-10-05' },
      { value: 72.4, city: 'Austin', date: '2011-10-05' }
    ];
    const chart = new F2.Chart({
      id: 'issue216',
      pixelRatio: window.devicePixelRatio,
      plugins: Tooltip
    });

    chart.source(data, {
      date: {
        range: [ 0, 1 ],
        type: 'timeCat',
        mask: 'MM-DD'
      },
      value: {
        tickCount: 5
      }
    });
    chart.tooltip({
      layout: 'v',
      offsetY: 100,
      crosshairsStyle: {
        stroke: 'red'
      },
      background: {
        fill: '#894402',
        radius: 5
      }
    });
    chart.line().position('date*value').color('city');
    chart.render();

    const point = chart.getPosition({
      date: '2011-10-03',
      value: 59.1
    });
    chart.showTooltip(point);

    const tooltip = chart.get('tooltipController').tooltip;
    const frontPlot = tooltip.frontPlot;
    frontPlot.get('children').forEach((child, index) => {
      expect(child.get('zIndex')).to.equal(index);
    });

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
