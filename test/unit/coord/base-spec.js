import { expect } from 'chai';
import Plot from '../../../src/chart/plot';
import Coord from '../../../src/coord/base';

describe('coord', function() {
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

  const coord = new Coord({
    start: plot.bl,
    end: plot.tr,
    scale: [ 0.5, 0.5 ]
  });

  it('constructor', function() {
    expect(coord.center).eqls({ x: 200, y: 200 });
  });

  it('convertPoint', function() {
    const point = { x: 100, y: 100 };
    expect(coord.convertPoint(point)).eqls({ x: 150, y: 150 });
  });

  it('reset', function() {
    plot.reset({ x: 10, y: 10 }, { x: 410, y: 410 });
    const point = { x: 100, y: 100 };
    coord.reset(plot);
    expect(coord.convertPoint(point)).eqls({ x: 155, y: 155 });
  });

});
