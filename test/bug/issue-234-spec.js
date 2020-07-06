import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/interval';
import * as Tooltip from '../../src/plugin/tooltip';

const canvas = document.createElement('canvas');
canvas.width = 360;
canvas.height = 360;
canvas.id = 'issue234';
document.body.appendChild(canvas);

describe('issue 234', () => {
  it('tooltimarker', () => {
    const data = [
      { day: '周一', value: 300 },
      { day: '周二', value: 400 },
      { day: '周三', value: 350 },
      { day: '周四', value: 500 },
      { day: '周五', value: 490 },
      { day: '周六', value: 600 },
      { day: '周日', value: 900 }
    ];
    const chart = new F2.Chart({
      id: 'issue234',
      plugins: Tooltip,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.coord('rect', {
      transposed: true
    });
    chart.interval().position('day*value');
    chart.render();

    const point = chart.getPosition({ day: '周五', value: 490 });
    chart.showTooltip(point);

    const tooltip = chart.get('tooltipController').tooltip;
    const markerGroup = tooltip.markerGroup;
    expect(markerGroup.get('children').length).to.equal(1);

    const tooltipMarker = markerGroup.get('children')[0];
    expect(tooltipMarker.get('type')).to.equal('rect');

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
