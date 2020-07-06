import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/line';
import '../../src/coord/polar';
import '../../src/component/axis/circle';

const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
canvas.id = 'issue437';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('Issue 437', () => {
  it('Issue 437', () => {
    const data = [
      { year: '1951 年', sales: 30 },
      { year: '1952 年', sales: 10 },
      { year: '1956 年', sales: 45 },
      { year: '1957 年', sales: 23 },
      { year: '1958 年', sales: 17 }
    ];
    const chart = new F2.Chart({
      id: 'issue437',
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data);
    chart.coord('polar');
    chart.axis('year', false);
    chart.axis('sales', {
      line: null, // 为了测试方便，将干扰因素去除
      label: null,
      grid(text) {
        if (text === '30') {
          return {
            type: 'arc'
          };
        }
        return null;
      }
    });

    chart.line()
      .position('year*sales')
      .size(4);
    chart.render();

    const axisController = chart.get('axisController');
    const children = axisController.backPlot.get('children');
    expect(children.length).to.equal(1); // grid 存储在 backPlot 图层中
    expect(children[0]._id).to.equal('axis-y0-grid-30');

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
