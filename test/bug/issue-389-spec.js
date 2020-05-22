import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/line';
import * as Animation from '../../src/animation/detail';

const canvas = document.createElement('canvas');
canvas.width = 100;
canvas.height = 100;
canvas.id = 'issue389';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('Issue 389', () => {
  it('Issue 389', done => {
    const data = [
      { year: '1951 年', sales: 0 },
      { year: '1952 年', sales: 0 },
      { year: '1956 年', sales: 0 },
      { year: '1957 年', sales: 0 },
      { year: '1958 年', sales: 0 },
      { year: '1959 年', sales: 0 },
      { year: '1960 年', sales: 0 },
      { year: '1962 年', sales: 0 }
    ];
    const chart = new F2.Chart({
      id: 'issue389',
      padding: 0,
      pixelRatio: window.devicePixelRatio,
      plugins: [ Animation ]
    });

    chart.source(data, {
      sales: {
        min: -1,
        max: 1,
        nice: false
      }
    });
    chart.axis(false);

    const geom = chart.line()
      .position('year*sales')
      .color('l(90) 0:#1890ff 1:#45e999')
      .size(4);
    chart.render();

    const lineShape = geom.get('container').get('children')[0];
    const { maxX, maxY, minX, minY } = lineShape.getBBox();
    expect(maxX).to.equal(95.75);
    expect(maxY).to.equal(52);
    expect(minX).to.equal(4.25);
    expect(minY).to.equal(48);

    chart.changeData([
      { year: '1951 年', sales: 0 },
      { year: '1952 年', sales: 0 },
      { year: '1956 年', sales: 0.5 },
      { year: '1957 年', sales: 0.5 },
      { year: '1958 年', sales: 0.5 },
      { year: '1959 年', sales: 0 },
      { year: '1960 年', sales: 0 },
      { year: '1962 年', sales: 0 }
    ]);

    setTimeout(() => {
      const lineShape = geom.get('container').get('children')[0];
      const { maxX, maxY, minX, minY } = lineShape.getBBox();
      expect(maxX).to.equal(95.75);
      expect(maxY).to.equal(52);
      expect(minX).to.equal(4.25);
      expect(minY).to.equal(23);
      chart.destroy();
      document.body.removeChild(canvas);

      done();
    }, 400);
  });
});
