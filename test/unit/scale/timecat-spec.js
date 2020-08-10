import timecatTick from '../../../src/scale/timecat-tick';

describe('timecat-tick', function() {

  it('length 8, 默认tickcount', function() {

    const tick = timecatTick({
      values: [ 1, 2, 3, 4, 5, 6, 7, 8 ]
    });

    expect(tick).toEqual([ 1, 5, 8 ]);
  });

  it('length 8, tickcount8', function() {

    const tick = timecatTick({
      values: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
      tickCount: 4
    });

    expect(tick).toEqual([ 1, 3, 5, 8 ]);
  });

});
