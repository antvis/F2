import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/line';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue-140';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('issue 140', () => {
  it('Linear scale values are all null.', function() {
    const data = [
      { type: '湿度/%', value: null, date: '2018-06-01 11:09:00' },
      { type: '温度/℃', value: null, date: '2018-06-01 11:09:00' },
      { type: '湿度/%', value: null, date: '2018-06-01 11:10:00' },
      { type: '温度/℃', value: null, date: '2018-06-01 11:10:00' }
    ];
    const chart = new F2.Chart({
      id: 'issue-140',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      value: {
        nice: false
      }
    });
    const line = chart.line().position('date*value').color('type');
    chart.render();

    const valueScale = line.getYScale();
    expect(valueScale.min).to.equal(0);
    expect(valueScale.max).to.equal(0);

    chart.scale('value', null);
    chart.changeData(data);
    const newValueScale = line.getYScale();
    expect(newValueScale.type).eql('identity');

    chart.destroy();
    document.body.removeChild(canvas);
  });
});

