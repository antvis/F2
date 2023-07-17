import linearTick from '../../src/controller/tick/linear-tick';

describe('linear-tick', function() {
  it('整数, 默认tickcount, [0, 350]', function() {
    const tick = linearTick({
      min: 0,
      max: 350,
    });
    expect(tick).toEqual([0, 100, 200, 300, 400]);
  });

  it('整数, 指定tickcount6, [0, 350]', function() {
    const tick = linearTick({
      min: 0,
      max: 350,
      tickCount: 6,
    });
    expect(tick).toEqual([0, 75, 150, 225, 300, 375]);
  });

  it('负数, 默认tickcount, [-100, -560]', function() {
    const tick = linearTick({
      min: -560,
      max: -100,
    });
    expect(tick).toEqual([-600, -450, -300, -150, 0]);
  });

  it('一正一负且tickcount = 2, [-10, 110]', function() {
    const tick = linearTick({
      min: -10,
      max: 110,
      tickCount: 2,
    });
    expect(tick).toEqual([-120, 120]);
  });

  it('小数, 默认tickcount, [0, 0.0000035]', function() {
    const tick = linearTick({
      min: 0,
      max: 0.0000035,
    });
    expect(tick).toEqual([0, 0.000001, 0.000002, 0.000003, 0.000004]);
  });

  it('指定interval 200', function() {
    const tick = linearTick({
      min: 0,
      max: 350,
      tickInterval: 200,
    });
    expect(tick).toEqual([0, 200, 400, 600, 800]);
  });

  it('指定interval 200, 不超过tickCount', function() {
    const tick = linearTick({
      min: 0,
      max: 350,
      tickCount: 3,
      tickInterval: 200,
    });
    expect(tick).toEqual([0, 200, 400]);
  });

  it('指定interval 200, 超过tickCount', function() {
    const tick = linearTick({
      min: 0,
      max: 550,
      tickCount: 3,
      tickInterval: 200,
    });
    expect(tick).toEqual([0, 200, 400, 600]);
  });

  it('[11, 50]', function() {
    const tick = linearTick({
      max: 50,
      min: 11,
    });

    expect(tick).toEqual([10, 20, 30, 40, 50]);
  });

  it('max === min 350', function() {
    const tick = linearTick({
      min: 350,
      max: 350,
      tickInterval: 200,
    });
    expect(tick).toEqual([200, 400, 600, 800, 1000]);
  });

  it('max === min 0.0000075', function() {
    const tick = linearTick({
      min: 0.0000075,
      max: 0.0000075,
    });
    expect(tick).toEqual([0.000007, 0.000008, 0.000009, 0.00001, 0.000011]);
  });

  it('max === min 0', function() {
    const tick = linearTick({
      min: 0,
      max: 0,
    });
    expect(tick).toEqual([0, 1, 2, 3, 4]);
  });

  it('max === min NaN', function() {
    const tick = linearTick({
      min: NaN,
      max: NaN,
    });
    expect(tick).toEqual([0, 1, 2, 3, 4]);
  });

  it('recursive to best ticks', function() {
    const tick = linearTick({
      min: -0.001,
      max: 0.3909999999999999,
      tickCount: 5,
    });
    expect(tick).toEqual([-0.15, 0, 0.15, 0.3, 0.45]);
  });

  it('interval origin fixed length', function() {
    const tick = linearTick({
      min: 0,
      max: 0.3,
      tickCount: 3,
    });
    expect(tick).toEqual([0, 0.15, 0.3]);

    const tick1 = linearTick({
      min: 0,
      max: 12.5,
      tickCount: 6,
    });
    expect(tick1).toEqual([0, 2.5, 5, 7.5, 10, 12.5]);
  });
});
