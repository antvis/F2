const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/area');

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 260;
canvas.id = 'issue238';
document.body.appendChild(canvas);

describe('issue 238', () => {
  it('Empty data cause error.', () => {
    let chart;
    const creatFunc = function() {
      chart = new F2.Chart({
        id: 'issue238',
        pixelRatio: window.devicePixelRatio
      });
      chart.source([]);
      chart.area().position('day*value').shape('smooth');
      chart.render();
    };
    expect(creatFunc).not.to.throw();

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
