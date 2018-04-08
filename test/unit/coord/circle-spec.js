const expect = require('chai').expect;
const Plot = require('../../../src/chart/plot');
const Coord = require('../../../src/coord/index');

const gMath = {
  equal(v1, v2) {
    return Math.abs(v1 - v2) < 0.001;
  }
};

describe('coord circle', function() {
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
  describe('with inner circle', () => {
    const circle = new Coord.Polar({
      start: plot.bl,
      end: plot.tr,
      innerRadius: 0.5
    });

    it('constructor', function() {
      expect(circle.type).to.be.equal('polar');
    });

    it('center', function() {
      const center = circle.center;
      expect(center.x).to.be.equal(200);
      expect(center.y).to.be.equal(200);
    });

    it('绝对半径 radius', function() {
      expect(circle.circleRadius).to.be.equal(200);
    });

    it('convertPoint', function() {
      let p = { x: 0, y: 0 };
      p = circle.convertPoint(p);
      expect(p.x).to.be.equal(200);
      expect(p.y).to.be.equal(100);

      p = { x: 0, y: 1 };
      p = circle.convertPoint(p);
      expect(p.x).to.be.equal(200);
      expect(p.y).to.be.equal(0);

      p = { x: 0.75, y: 0.5 };
      p = circle.convertPoint(p);
      expect(gMath.equal(p.x, 50)).to.be.equal(true);
      expect(gMath.equal(p.y, 200)).to.be.equal(true);
    });

    it('invertPoint', function() {
      let p = { x: 200, y: 100 };
      p = circle.invertPoint(p);
      expect(p.x).to.be.equal(0);
      expect(p.y).to.be.equal(0);

      p = { x: 200, y: 0 };
      p = circle.invertPoint(p);
      expect(p.x).to.be.equal(0);
      expect(p.y).to.be.equal(1);

      p = { x: 50, y: 200 };
      p = circle.invertPoint(p);
      expect(gMath.equal(p.x, 0.75)).to.be.equal(true);
      expect(gMath.equal(p.y, 0.5)).to.be.equal(true);
    });
  });

  describe('no inner', () => {
    const circle1 = new Coord.Polar({
      start: plot.bl,
      end: plot.tr,
      inner: 0
    });

    it('radius', function() {
      expect(circle1.radius).to.be.equal(null);
    });

    it('circleRadius', function() {
      expect(circle1.circleRadius).to.be.equal(200);
    });

    it('inner convertPoint', function() {
      let p = { x: 0, y: 0 };
      p = circle1.convertPoint(p);
      expect(p.x).to.be.equal(200);
      expect(p.y).to.be.equal(200);

      p = { x: 0.5, y: 0 };
      p = circle1.convertPoint(p);
      expect(p.x).to.be.equal(200);
      expect(p.y).to.be.equal(200);

      p = { x: 0.5, y: 0.5 };
      p = circle1.convertPoint(p);
      expect(p.x).to.be.equal(200);
      expect(p.y).to.be.equal(300);
    });

    it('inner invertPoint', function() {
      let p = { x: 200, y: 200 };
      p = circle1.invertPoint(p);
      expect(p.x).to.be.equal(0);
      expect(p.y).to.be.equal(0);

      p = { x: 200, y: 300 };
      p = circle1.invertPoint(p);
      expect(p.x).to.be.equal(0.5);
      expect(p.y).to.be.equal(0.5);
    });
  });

  describe('half circle', () => {
    const circle = new Coord.Polar({
      start: plot.bl,
      end: plot.tr,
      startAngle: -Math.PI,
      endAngle: 0
    });
    it('init', function() {
      expect(circle.radius).equal(null);
      expect(circle.circleRadius).equal(200);
    });
    it('convert point', function() {
      const p = circle.convertPoint({
        x: 0,
        y: 0
      });
      expect(p).eqls({ x: 200, y: 400 });

      const p1 = circle.convertPoint({
        x: 0,
        y: 1
      });
      expect(p1).eqls({ x: 0, y: 400 });

      const p2 = circle.convertPoint({
        x: 0.5,
        y: 1
      });
      expect(p2).eqls({ x: 200, y: 200 });
    });
    it('invert point', function() {
      expect(circle.invertPoint({ x: 200, y: 400 })).eqls({ x: 0, y: 0 });
      expect(circle.invertPoint({ x: 200, y: 200 })).eqls({ x: 0.5, y: 1 });
    });
  });

  describe('set radius', () => {
    const circle5 = new Coord.Polar({
      start: plot.bl,
      end: plot.tr,
      radius: 0.6
    });

    it('radius', function() {
      expect(circle5.radius).to.be.equal(0.6);
    });

    it('circleRadius', function() {
      expect(circle5.circleRadius).to.be.equal(120);
    });

    it('reset', function() {
      const newPlot = new Plot({
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 200,
          y: 200
        }
      });
      circle5.reset(newPlot);
      expect(circle5.radius).to.be.equal(0.6);
      expect(circle5.circleRadius).to.be.equal(60);
      expect(circle5.start).to.eql({ x: 0, y: 200 });
      expect(circle5.end).to.eql({ x: 200, y: 0 });
    });
  });
});
