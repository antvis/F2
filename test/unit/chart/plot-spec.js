import { expect } from 'chai';
import Plot from '../../../src/chart/plot';

describe('plot', function() {
  const plot = new Plot({
    start: {
      x: 400,
      y: 0
    },
    end: {
      x: 0,
      y: 400
    }
  });

  it('isInRange', function() {
    const p = { x: 250, y: 350 };
    expect(plot.isInRange(p)).to.be.equal(true);

    expect(plot.isInRange(300, 500)).to.be.equal(false);
    expect(plot.isInRange(200, 300)).to.be.equal(true);
  });

  it('width', function() {
    expect(plot.width).to.be.equal(400);
  });

  it('height', function() {
    expect(plot.height).to.be.equal(400);
  });

  it('tl', function() {
    const tl = plot.tl;
    expect(tl.x).to.be.equal(0);
    expect(tl.y).to.be.equal(0);
  });

  it('tr', function() {
    const tr = plot.tr;
    expect(tr.x).to.be.equal(400);
    expect(tr.y).to.be.equal(0);
  });

  it('bl', function() {
    const bl = plot.bl;
    expect(bl.x).to.be.equal(0);
    expect(bl.y).to.be.equal(400);
  });

  it('br', function() {
    const br = plot.br;
    expect(br.x).to.be.equal(400);
    expect(br.y).to.be.equal(400);
  });

  it('reset', function() {
    plot.reset(
      {
        x: 0,
        y: 0
      },
      {
        x: 300,
        y: 200
      }
    );

    expect(plot.width).to.be.equal(300);
    expect(plot.height).to.be.equal(200);
  });
});
