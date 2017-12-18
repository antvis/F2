const expect = require('chai').expect;
const Scale = require('../../../../src/scale/');
const Controller = require('../../../../src/chart/controller/axis');
const Plot = require('../../../../src/chart/plot');
const Coord = require('../../../../src/coord/index');

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
  plot
});
const rect = new Coord.Cartesian({
  plot
});

const linear = new Scale.Linear({
  min: 0,
  max: 100,
  field: 'b',
  tickCount: 5
});

const otherLinear = new Scale.Linear({
  min: 0,
  max: 100,
  field: 'c',
  tickCount: 5
});

const cat = Scale.cat({
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
        grid: null
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
    expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });

  it('get axis default y cfg', function() {
    const cfg = controller._getAxisCfg(rect, cat, linear, 'y', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });

  it('get axis default, no grid', function() {
    const cfg = controller._getAxisCfg(rect, linear, cat, 'x', { grid: {} });
    expect(cfg.ticks.length).equal(linear.getTicks().length);
    expect(cfg.gridPoints).equal(undefined);
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
    const cfg = controller._getLineCfg(rect, 'y', 1);
    expect(cfg.start).eql(rect.convertPoint({ x: 1, y: 0 }));
    expect(cfg.end).eql(rect.convertPoint({ x: 1, y: 1 }));
    expect(cfg.offsetFactor).equal(1);
  });

  it('get positin x', function() {
    const positin = controller._getLinePosition('x');
    expect(positin).equal('bottom');
  });

  it('get positin y', function() {
    const positin = controller._getLinePosition('y');
    expect(positin).equal('left');
  });

  it('get positin y 2', function() {
    const positin = controller._getLinePosition('y', 1);
    expect(positin).equal('right');
  });

  it('createAxis', function() {
    controller.createAxis(rect, cat, [ linear ]);

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
    plot
  });
  rect.transposed = true;

  it('get line x axis cfg', function() {
    const cfg = controller._getLineCfg(rect, 'x', { grid: {} });
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
    const cfg = controller._getLineCfg(rect, 'y', 1);
    expect(cfg.start).eql(rect.convertPoint({ x: 1, y: 0 }));
    expect(cfg.end).eql(rect.convertPoint({ x: 1, y: 1 }));
    expect(cfg.offsetFactor).equal(-1);

  });

  it('createAxis', function() {
    controller.createAxis(rect, cat, [ linear ]);
  });

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
    expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });

  it('get axis default y cfg', function() {
    const cfg = controller._getAxisCfg(circle, cat, linear, 'y', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });

  it('get line x axis cfg', function() {
    const cfg = controller._getCircleCfg(circle);
    expect(cfg.startAngle).equal(circle.get('startAngle'));
    expect(cfg.center).equal(circle.get('center'));
  });

  it('get line y axis cfg', function() {
    const cfg = controller._getRadiusCfg(circle);
    expect(cfg.start).eql(circle.convertPoint({ x: 0, y: 0 }));
    expect(cfg.end).eql(circle.convertPoint({ x: 0, y: 1 }));
    expect(cfg.offsetFactor).equal(-1);
  });

  it('createAxis', function() {
    controller.createAxis(circle, cat, [ linear ]);
  });

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
    plot
  });
  circle.transposed = true;

  it('get axis default x cfg', function() {
    cat.change({
      range: [ 0.2, 0.8 ]
    });
    const cfg = controller._getAxisCfg(circle, cat, linear, 'x', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });

  it('get axis default y cfg', function() {
    const cfg = controller._getAxisCfg(circle, cat, linear, 'y', { grid: {} });
    expect(cfg.ticks.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints.length).equal(cat.getTicks().length);
    expect(cfg.gridPoints[0].length).equal(linear.getTicks().length);
  });
  it('get line x axis cfg', function() {
    const cfg = controller._getCircleCfg(circle);
    expect(cfg.startAngle).equal(circle.get('startAngle'));
    expect(cfg.center).equal(circle.get('center'));
  });

  it('get line y axis cfg', function() {
    const cfg = controller._getRadiusCfg(circle);
    expect(cfg.start).eql(circle.convertPoint({ x: 0, y: 0 }));
    expect(cfg.end).eql(circle.convertPoint({ x: 1, y: 0 }));
    expect(cfg.offsetFactor).equal(-1);
  });

  it('createAxis', function() {
    controller.createAxis(circle, cat, [ linear, otherLinear ]);
  });
});
