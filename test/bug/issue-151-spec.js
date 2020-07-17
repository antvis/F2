import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/interval';
import '../../src/geom/adjust/dodge';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue-151';
// canvas.style.position = 'fixed';
// canvas.style.top = 0;
// canvas.style.left = 0;
document.body.appendChild(canvas);

describe('issue 151', function() {
  it('Make sure TimeCat scale to sort by default.', function() {
    const data = [
      { type: '欣天科技', date: '2011-12-01', value: 37.37428940721245 },
      { type: '欣天科技', date: '2012-12-01', value: 35.534330280123484 },
      { type: '欣天科技', date: '2013-12-01', value: 35.483750315503 },
      { type: '欣天科技', date: '2014-12-01', value: 36.93420323516352 },
      { type: '欣天科技', date: '2015-12-01', value: 28.440425157430234 },
      // { type: '欣天科技', date: '2016-12-01', value: 26.539661716086698 },
      { type: '保利地产', date: '2007-12-01', value: 25.308530029569354 },
      { type: '保利地产', date: '2008-12-01', value: 24.721858861887316 },
      { type: '保利地产', date: '2009-12-01', value: 22.71019080164943 },
      { type: '保利地产', date: '2010-12-01', value: 20.684340451124587 },
      { type: '保利地产', date: '2011-12-01', value: 21.183867630801377 },
      { type: '保利地产', date: '2012-12-01', value: 19.437525921551583 },
      { type: '保利地产', date: '2013-12-01', value: 17.33174541312307 },
      { type: '保利地产', date: '2014-12-01', value: 17.404313051756663 },
      { type: '保利地产', date: '2015-12-01', value: 18.410947230529278 }
      // { type: '保利地产', date: '2016-12-01', value: 14.94209942310791 }
    ];
    const chart = new F2.Chart({
      id: 'issue-151',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.scale('date', { type: 'timeCat', tickCount: 3 });
    chart.scale('value', { tickCount: 5 });
    chart
      .interval()
      .position('date*value')
      .color('type')
      .adjust({
        type: 'dodge',
        marginRatio: 0.05
      });
    chart.render();

    const xScale = chart.getXScale();
    const ticks = xScale.getTicks();
    const tickLabels = [];
    ticks.map(obj => {
      tickLabels.push(obj.text);
      return obj;
    });
    expect(tickLabels).to.eql([ '2007-12-01', '2011-12-01', '2015-12-01' ]);

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
