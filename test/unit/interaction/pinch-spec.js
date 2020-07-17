import { expect } from 'chai';
import Pinch from '../../../src/interaction/pinch';
import * as F2 from '../../../src/core';
import '../../../src/geom/line';
import '../../../src/geom/interval';

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 200;
canvas.id = 'pinch';
document.body.appendChild(canvas);

function snapEqual(v1, v2) {
  return Math.abs(v1 - v2) < 0.01;
}

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

describe('Pinch', function() {
  const chart = new F2.Chart({
    id: 'pinch',
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data);
  chart.line().position('x1*y');
  chart.render();

  it('pinch start, process, end', function(done) {
    const pinch = new Pinch({
      maxScale: 4,
      minScale: 1
    }, chart);
    let eventObj = {
      type: 'pinchstart',
      scale: 1
    };
    pinch.start(eventObj);
    expect(pinch.currentPinchScaling).to.equal(1);

    eventObj = {
      type: 'pinch',
      scale: 1.3,
      center: {
        x: 210,
        y: 150
      },
      pointers: [
        { clientX: 100, clientY: 30 },
        { clientX: 125, clientY: 45 }
      ],
      target: {
        getBoundingClientRect() {
          return { top: 60, right: 375, bottom: 260, left: 0 };
        }
      }
    };


    pinch.process(eventObj);
    expect(pinch.currentPinchScaling).to.equal(1.3);
    const xScale = chart.getXScale();
    expect(snapEqual(xScale.min, 3.17016735058703)).to.be.true;
    expect(snapEqual(xScale.max, 17.17016735058703)).to.be.true;

    setTimeout(() => {
      eventObj = {
        type: 'pinch',
        scale: 1.12,
        center: {
          x: 210,
          y: 150
        },
        pointers: [
          { clientX: 100, clientY: 30 },
          { clientX: 125, clientY: 45 }
        ],
        target: {
          getBoundingClientRect() {
            return { top: 60, right: 375, bottom: 260, left: 0 };
          }
        }
      };
      pinch.process(eventObj);
      const xScale = chart.getXScale();


      expect(snapEqual(xScale.min, 2.1459594373204514)).to.be.true;
      expect(snapEqual(xScale.max, 18.08442097578199)).to.be.true;

      pinch.end(eventObj);
      expect(pinch.currentPinchScaling).to.be.null;
      expect(pinch.pinchCumulativeDelta).to.equal(0);
      done();
    }, 1000);
  });
});


describe('chart pinch', function() {
  let chart = new F2.Chart({
    id: 'pinch',
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data);
  chart.line().position('x1*y');
  chart.interaction('pinch');
  chart.render();

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
        min: 2.5,
        max: 17.5
      }
    });
    const xScale = chart.getXScale();
    expect(xScale.min).to.equal(6.3);
    expect(xScale.max).to.equal(24.8);

    const yScale = chart.getYScales()[0];
    expect(yScale.min).to.equal(-5.574999999999999);
    expect(yScale.max).to.equal(22.175);

    const xRange = interaction.xRange;
    const yRange = interaction.yRange;
    expect(xRange).to.eql([ 0.33157894736842103, 1.305263157894737 ]);
    expect(yRange).to.eql([ -0.5383333333333333, 1.3116666666666668 ]);
  });

  it('pinch x axis, and x field is a cat type', function(done) {
    chart.destroy();
    chart = new F2.Chart({
      id: 'pinch',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.line().position('x2*y');
    chart.interaction('pinch', {
      minScale: 1,
      maxScale: 5,
      sensitivity: 0
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
    expect(xScale.values.length).to.equal(4);
    expect(xScale.values).to.eql([ '16', '17', '18', '19' ]);

    const xRange = interaction.xRange;
    expect(xRange).to.eql([ 0.8421052631578947, 1 ]);

    setTimeout(() => {
      interaction._doZoom(0.85, point, 'x');
      const xScale = chart.getXScale();
      expect(xScale.values.length).to.equal(5);
      expect(xScale.values).to.eql([ '15', '16', '17', '18', '19' ]);

      const xRange = interaction.xRange;
      expect(xRange).to.eql([ 0.7894736842105263, 1 ]);
      done();
    }, 1000);
  });

  it('pan x axis, and x field is a timeCat type.', function(done) {
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
    chart.interaction('pinch', {
      sensitivity: 0
    });
    chart.render();

    const point = chart.getPosition({
      x3: '2018-08-09',
      y: 12
    });
    const interaction = chart._interactions.pinch;
    interaction._doZoom(1.5, point, 'x');

    const limitRange = interaction.limitRange;
    expect(limitRange.x3.length).to.equal(20);
    const xScale = chart.getXScale();
    expect(xScale.values.length).to.equal(10);

    const xRange = interaction.xRange;
    expect(xRange).to.eql([ 0, 0.47368421052631576 ]);

    setTimeout(() => {
      interaction._doZoom(0.85, point, 'x');
      const xScale = chart.getXScale();
      expect(xScale.values.length).to.equal(11);

      const xRange = interaction.xRange;
      expect(xRange).to.eql([ 0, 0.5263157894736842 ]);
      chart.destroy();
      document.body.removeChild(canvas);
      done();
    }, 1000);
  });
});

