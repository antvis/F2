const expect = require('chai').expect;
require('../../../src/interaction/pinch');
const F2 = require('../../../src/core');
require('../../../src/geom/line');
require('../../../src/geom/interval');
require('../../../src/scale/time-cat');

function snapEqual(v1, v2) {
  return Math.abs(v1 - v2) < 0.01;
}

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 200;
canvas.id = 'pinch';
document.body.appendChild(canvas);

const data = [];
const dates = [ '2018-08-01', '2018-08-02', '2018-08-03', '2018-08-04', '2018-08-05', '2018-08-06', '2018-08-07', '2018-08-08', '2018-08-09', '2018-08-10', '2018-08-11', '2018-08-12', '2018-08-13', '2018-08-14', '2018-08-15', '2018-08-16', '2018-08-17', '2018-08-18', '2018-08-19', '2018-08-20' ];
const yValues = [ 3, 5.6, 7, 7, 10, 11, 3, 8, 9, 5.6, 12, 14, 10, 8, 9, 5, 17, 3, 8, 9 ];
for (let i = 0; i < 20; i++) {
  const obj = {};
  obj.x1 = i;
  obj.y = yValues[i];
  obj.x2 = i + '';
  obj.x3 = dates[i];
  data.push(obj);
}

let chart = new F2.Chart({
  id: 'pinch',
  pixelRatio: window.devicePixelRatio
});
chart.source(data);
chart.line().position('x1*y');
chart.interaction('pinch');
chart.render();

describe('chart pinch', function() {
  it('Register successfully', function() {
    const Chart = F2.Chart;
    expect(Chart._Interactions.pinch).not.to.be.undefined;
  });

  it('pinch x axis, and x field is a linear type.', function() {
    const interaction = chart._interactions.pinch;

    const point = chart.getPosition({
      x1: 16,
      y: 17
    });

    interaction._doZoom(1.5, point, 'x');

    const limitRange = interaction.limitRange;
    expect(limitRange).to.eql({
      x1: {
        min: 0,
        max: 20
      }
    });
    const xScale = chart.getXScale();
    expect(xScale.min).to.equal(8);
    expect(xScale.max).to.equal(18);

    const xRange = interaction.xRange;
    expect(xRange).to.eql([ 0.4, 0.9 ]);
  });

  it('pinch x and y axis, meanwhile x and y field both linear.', function() {
    chart.interaction('pinch', {
      mode: 'xy'
    });
    const interaction = chart._interactions.pinch;
    const point = chart.getPosition({
      x1: 10,
      y: 12
    });
    interaction._doZoom(0.15, point, 'xy');

    const limitRange = interaction.limitRange;
    expect(limitRange).to.eql({
      x1: {
        min: 0,
        max: 19
      },
      y: {
        min: 2,
        max: 18
      }
    });
    const xScale = chart.getXScale();
    expect(xScale.min).to.equal(6.3);
    expect(xScale.max).to.equal(24.8);

    const yScale = chart.getYScales()[0];
    expect(yScale.min).to.equal(-6.5);
    expect(yScale.max).to.equal(23.1);

    const xRange = interaction.xRange;
    const yRange = interaction.yRange;
    expect(xRange).to.eql([ 0.33157894736842103, 1.305263157894737 ]);
    expect(yRange).to.eql([ -0.53125, 1.31875 ]);
  });

  it('pinch x axis, and x field is a cat type', function() {
    chart.destroy();
    chart = new F2.Chart({
      id: 'pinch',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.line().position('x2*y');
    chart.interaction('pinch', {
      minScale: 1,
      maxScale: 5
    });
    chart.render();

    const interaction = chart._interactions.pinch;
    const point = chart.getPosition({
      x2: '11',
      y: 14
    });
    interaction._doZoom(1.8, point, 'x');

    const limitRange = interaction.limitRange;
    expect(limitRange.x2.length).to.equal(20);

    const xScale = chart.getXScale();
    expect(xScale.values).to.eql([ '9', '10', '11', '12' ]);

    const xRange = interaction.xRange;
    expect(xRange).to.eql([ 0.47368421052631576, 0.631578947368421 ]);
  });

  it('pan x axis, and x field is a timeCat type.', function() {
    chart.destroy();
    chart = new F2.Chart({
      id: 'pinch',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      x3: {
        type: 'timeCat',
        range: [ 0, 1 ]
      }
    });
    chart.line().position('x3*y');
    chart.interaction('pinch');
    chart.render();

    const point = chart.getPosition({
      x3: '2018-08-11',
      y: 12
    });
    const interaction = chart._interactions.pinch;
    interaction._doZoom(1.5, point, 'x');

    const limitRange = interaction.limitRange;
    expect(limitRange.x3.length).to.equal(20);
    const xScale = chart.getXScale();
    expect(xScale.values.length).to.equal(10);
    // expect(xScale.values[0]).to.equal(1533484800000);
    // expect(xScale.values[9]).to.equal(1534262400000);

    const xRange = interaction.xRange;
    expect(snapEqual(xRange[0], 0.2631578947368421)).to.be.true;
    expect(snapEqual(xRange[1], 0.7368421052631579)).to.be.true;

    chart.destroy();
    document.body.removeChild(canvas);
  });
});

