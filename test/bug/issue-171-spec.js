const expect = require('chai').expect;

const F2 = require('../../src/core');
require('../../src/geom/line');
require('../../src/geom/area');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'connectNulls';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('issue 171', () => {
  it('connectNulls', function() {
    const data = [
      { time: 'Jan.', tem: 1000 },
      { time: 'Feb.', tem: 2200 },
      { time: 'Mar.', tem: 2000 },
      { time: 'Apr.' },
      { time: 'May.', tem: null },
      { time: 'Jun.', tem: 2600 },
      { time: 'Jul.', tem: 2800 },
      { time: 'Aug.', tem: 2000 }
    ];
    const chart = new F2.Chart({
      el: canvas,
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data);
    const area = chart.area({
      connectNulls: true
    }).position('time*tem');
    const line = chart.line().position('time*tem');
    chart.render();

    expect(area.get('container').get('children').length).to.equal(1);
    expect(line.get('container').get('children').length).to.equal(2);

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
