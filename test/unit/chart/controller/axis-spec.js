const expect = require('chai').expect;
const Scale = require('../../../../src/scale/');
const Controller = require('../../../../src/chart/controller/axis');
const Plot = require('../../../../src/chart/plot');
const Coord = require('../../../../src/coord/index');
require('../../../../src/coord/polar');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

const plot = new Plot({
  start: {
    x: 0,
    y: 0
  },
  end: {
    x: 400,
    y: 400
  }
});
const circle = new Coord.Polar({
  start: plot.bl,
  end: plot.tr
});
const rect = new Coord.Cartesian({
  start: plot.bl,
  end: plot.tr
});

const linear = new Scale.Linear({
  min: 0,
  max: 100,
  field: 'b',
  tickCount: 5
});

const cat = new Scale.Cat({
  field: 'a',
  range: [ 0, 0.66 ],
  values: [ 'a', 'b', 'c' ]
});


describe('axis controller', function() {
  const controller = new Controller({
    canvas,
    axisCfg: {
      c: false,
      b: {
        grid: null,
        position: 'right'
      }
    }
  });

  it('is hide', function() {
    expect(controller._isHide('c')).equal(true);
    expect(controller._isHide('a')).equal(false);
  });

  it('get axis default x cfg', function() {
    const cfg = controller._getAxisCfg(rect, cat, linear, 'x', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
  });

  it('get axis default y cfg', function() {
    const cfg = controller._getAxisCfg(rect, cat, linear, 'y', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
  });

  it('get axis default, no grid', function() {
    const cfg = controller._getAxisCfg(rect, linear, cat, 'x', { grid: {} });
    expect(cfg.ticks.length).equal(linear.getTicks().length);
  });

  it('get line x axis cfg', function() {
    const cfg = controller._getLineCfg(rect, 'x');
    expect(cfg.start).eql(rect.convertPoint({ x: 0, y: 0 }));
    expect(cfg.end).eql(rect.convertPoint({ x: 1, y: 0 }));
    expect(cfg.offsetFactor).equal(1);
  });

  it('get line y axis cfg', function() {
    const cfg = controller._getLineCfg(rect, 'y');
    expect(cfg.start).eql(rect.convertPoint({ x: 0, y: 0 }));
    expect(cfg.end).eql(rect.convertPoint({ x: 0, y: 1 }));
    expect(cfg.offsetFactor).equal(-1);
  });

  it('get line y2 axis cfg', function() {
    const cfg = controller._getLineCfg(rect, 'y', 'right');
    expect(cfg.start).eql(rect.convertPoint({ x: 1, y: 0 }));
    expect(cfg.end).eql(rect.convertPoint({ x: 1, y: 1 }));
    expect(cfg.offsetFactor).equal(1);
  });

  it('get position x', function() {
    const position = controller._getLinePosition(cat, 'x');
    expect(position).equal('bottom');
  });

  it('get position y', function() {
    const position = controller._getLinePosition(linear, 'y');
    expect(position).equal('right');
  });

  it('get position y 2', function() {
    const position = controller._getLinePosition(linear, 'y', 1);
    expect(position).equal('right');
  });

  it('clear', function() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

});

describe('axis controller rect transposed', function() {
  const controller = new Controller({
    canvas
  });

  const rect = new Coord.Cartesian({
    start: plot.bl,
    end: plot.tr
  });
  rect.transposed = true;

  it('get line x axis cfg', function() {
    const cfg = controller._getLineCfg(rect, 'x');
    expect(cfg.start).eql(rect.convertPoint({ x: 0, y: 0 }));
    expect(cfg.end).eql(rect.convertPoint({ x: 1, y: 0 }));
    expect(cfg.offsetFactor).equal(-1);
  });

  it('get line y axis cfg', function() {
    const cfg = controller._getLineCfg(rect, 'y');
    expect(cfg.start).eql(rect.convertPoint({ x: 0, y: 0 }));
    expect(cfg.end).eql(rect.convertPoint({ x: 0, y: 1 }));
    expect(cfg.offsetFactor).equal(1);
  });

  it('get line y2 axis cfg', function() {
    const cfg = controller._getLineCfg(rect, 'y', 'right');
    expect(cfg.start).eql(rect.convertPoint({ x: 1, y: 0 }));
    expect(cfg.end).eql(rect.convertPoint({ x: 1, y: 1 }));
    expect(cfg.offsetFactor).equal(-1);

  });

  // it('createAxis', function() {
  //   controller.createAxis(rect, cat, [ linear ]);
  // });

  xit('clear', function() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

});

describe('axis controller circle', function() {
  const controller = new Controller({
    canvas
  });

  it('get axis default x cfg', function() {
    const cfg = controller._getAxisCfg(circle, cat, linear, 'x', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
    // expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    // expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });

  it('get axis default y cfg', function() {
    const cfg = controller._getAxisCfg(circle, cat, linear, 'y', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
    // expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    // expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });

  it('get line x axis cfg', function() {
    const cfg = controller._getCircleCfg(circle);
    expect(cfg.startAngle).equal(circle.startAngle);
    expect(cfg.center).equal(circle.center);
  });

  it('get line y axis cfg', function() {
    const cfg = controller._getRadiusCfg(circle);
    expect(cfg.start).eql(circle.convertPoint({ x: 0, y: 0 }));
    expect(cfg.end).eql(circle.convertPoint({ x: 0, y: 1 }));
    expect(cfg.offsetFactor).equal(-1);
  });

  // it('createAxis', function() {
  //   controller.createAxis(circle, cat, [ linear ]);
  // });

  it('clear', function() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

});

describe('axis controller circle transposed', function() {

  const controller = new Controller({
    canvas,
    axisCfg: {
      c: false
    }
  });

  const circle = new Coord.Polar({
    start: plot.bl,
    end: plot.tr
  });
  circle.transposed = true;

  it('get axis default x cfg', function() {
    cat.change({
      range: [ 0.2, 0.8 ]
    });
    const cfg = controller._getAxisCfg(circle, cat, linear, 'x', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
    // expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    // expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });

  it('get axis default y cfg', function() {
    const cfg = controller._getAxisCfg(circle, cat, linear, 'y', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
    // expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    // expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });
  it('get line x axis cfg', function() {
    const cfg = controller._getCircleCfg(circle);
    expect(cfg.startAngle).equal(circle.startAngle);
    expect(cfg.center).equal(circle.center);
  });

  it('get line y axis cfg', function() {
    const cfg = controller._getRadiusCfg(circle);
    expect(cfg.start).eql(circle.convertPoint({ x: 0, y: 0 }));
    expect(cfg.end).eql(circle.convertPoint({ x: 1, y: 0 }));
    expect(cfg.offsetFactor).equal(-1);
  });

  // it('createAxis', function() {
  //   controller.createAxis(circle, cat, [ linear, otherLinear ]);
  // });
  document.body.removeChild(canvas);
});
