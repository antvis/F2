import linearTick from '../../../src/scale/linear-tick';

describe('linear-tick', function() {

  it('整数, 默认tickcount, [0, 350]', function() {
    const tick = linearTick({
      min: 0,
      max: 350
    });
    expect(tick).toEqual([ 0, 100, 200, 300, 400 ]);
  });

  it('整数, 指定tickcount6, [0, 350]', function() {
    const tick = linearTick({
      min: 0,
      max: 350,
      tickCount: 6
    });
    expect(tick).toEqual([ 0, 75, 150, 225, 300, 375 ]);
  });

  it('负数, 默认tickcount, [-100, -560]', function() {
    const tick = linearTick({
      min: -560,
      max: -100
    });

    expect(tick).toEqual([ -600, -480, -360, -240, -120, 0 ]);

  });

  it('小数, 默认tickcount, [0, 0.0000035]', function() {
    const tick = linearTick({
      min: 0,
      max: 0.0000035
    });
    expect(tick).toEqual([ 0, 0.000001, 0.000002, 0.000003, 0.000004 ]);
  });

  it('指定interval 200', function() {
    const tick = linearTick({
      min: 0,
      max: 350,
      tickInterval: 200
    });
    expect(tick).toEqual([ 0, 200, 400 ]);
  });

  it('[11, 50]', function() {
    const tick = linearTick({
      max: 50,
      min: 11
    });

    expect(tick).toEqual([ 10, 20, 30, 40, 50 ]);
  });

  it('max === min 350', function() {
    const tick = linearTick({
      min: 350,
      max: 350,
      tickInterval: 200
    });
    expect(tick).toEqual([ 175, 350, 525 ]);
  });

  it('max === min 0.00000', function() {
    const tick = linearTick({
      min: 0.000005,
      max: 0.000005
    });
    expect(tick).toEqual([ 0.0000025, 0.000005, 0.0000075 ]);
  });

});
