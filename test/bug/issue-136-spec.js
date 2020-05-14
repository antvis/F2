import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/interval';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'interval-scale';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('issue 136', () => {
  it('Bar Chart set min value for axis y', function() {
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 }
    ];
    const chart = new F2.Chart({
      id: 'interval-scale',
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      sales: {
        min: 30,
        nice: false
      }
    });
    const interval = chart.interval().position('year*sales');
    chart.render();

    const yScale = interval.getYScale();
    expect(yScale.min).to.equal(30);

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
