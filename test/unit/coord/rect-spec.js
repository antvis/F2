import { expect } from 'chai';
import Plot from '../../../src/chart/plot';
import Coord from '../../../src/coord/index';

describe('coord rect', function() {
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
  const rect = new Coord.Cartesian({
    start: plot.bl,
    end: plot.tr
  });

  it('constructor', function() {
    expect(rect.type).to.be.equal('cartesian');
  });

  it('convertPoint', function() {
    let p = { x: 0, y: 0 };
    p = rect.convertPoint(p);
    expect(p.x).to.be.equal(0);
    expect(p.y).to.be.equal(400);

    p = { x: 0, y: 1 };
    p = rect.convertPoint(p);
    expect(p.x).to.be.equal(0);
    expect(p.y).to.be.equal(0);

    p = { x: 1, y: 0.5 };
    p = rect.convertPoint(p);
    expect(p.x).to.be.equal(400);
    expect(p.y).to.be.equal(200);

    p = { x: 0.3, y: 0.7 };
    p = rect.convertPoint(p);
    expect(p.x).to.be.equal(120);
    expect(p.y).to.be.equal(120);
  });

  it('invertPoint', function() {
    let p = { x: 200, y: 200 };
    p = rect.invertPoint(p);
    expect(p.x).to.be.equal(0.5);
    expect(p.y).to.be.equal(0.5);

    p = { x: 0, y: 400 };
    p = rect.invertPoint(p);
    expect(p.x).to.be.equal(0);
    expect(p.y).to.be.equal(0);

    p = { x: 400, y: 400 };
    p = rect.invertPoint(p);
    expect(p.x).to.be.equal(1);
    expect(p.y).to.be.equal(0);

    p = { x: 120, y: 120 };
    p = rect.invertPoint(p);
    expect(p.x).to.be.equal(0.3);
    expect(p.y).to.be.equal(0.7);
  });

  const rect1 = new Coord.Cartesian({
    start: plot.bl,
    end: plot.tr,
    transposed: true
  });
  it('transposed convertPoint', function() {
    let p = { x: 0, y: 0 };
    p = rect1.convertPoint(p);
    expect(p.x).to.be.equal(0);
    expect(p.y).to.be.equal(400);

    p = { x: 1, y: 0.5 };
    p = rect1.convertPoint(p);
    expect(p.x).to.be.equal(200);
    expect(p.y).to.be.equal(0);

    p = { x: 0.5, y: 1 };
    p = rect1.convertPoint(p);
    expect(p.x).to.be.equal(400);
    expect(p.y).to.be.equal(200);

    p = { x: 0.3, y: 0.7 };
    p = rect1.convertPoint(p);
    expect(p.x).to.be.equal(280);
    expect(p.y).to.be.equal(280);
  });


  it('transposed invertPoint', function() {
    let p = { x: 0, y: 400 };
    p = rect1.invertPoint(p);
    expect(p.x).to.be.equal(0);
    expect(p.y).to.be.equal(0);

    p = { x: 200, y: 0 };
    p = rect1.invertPoint(p);
    expect(p.x).to.be.equal(1);
    expect(p.y).to.be.equal(0.5);

    p = { x: 400, y: 200 };
    p = rect1.invertPoint(p);
    expect(p.x).to.be.equal(0.5);
    expect(p.y).to.be.equal(1);

    p = { x: 280, y: 280 };
    p = rect1.invertPoint(p);
    expect(p.x).to.be.equal(0.3);
    expect(p.y).to.be.equal(0.7);
  });
});
