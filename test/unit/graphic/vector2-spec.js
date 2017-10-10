const expect = require('chai').expect;
const Vector2 = require('../../../src/graphic/vector2');

const gMath = {
  PRECISION: 0.00001,
  equal(a, b) {
    return (Math.abs((a - b)) < this.PRECISION);
  }
};

describe('vector2', function() {

  it('length', function() {
    const v1 = new Vector2(1, 0);
    expect(v1.length()).equal(1);
    const v2 = new Vector2(3, 4);
    expect(v2.length()).equal(5);
  });

  it('normalize', function() {
    const v1 = new Vector2(3, 4);
    const v = v1.normalize();
    expect(gMath.equal(v.x, 0.6)).equal(true);
    expect(gMath.equal(v.y, 0.8)).equal(true);
  });

  it('add', function() {
    const v1 = new Vector2(4, 1);
    const v2 = new Vector2(3, 2);
    const v3 = v1.add(v2);

    expect(v3.x).equal(7);
    expect(v3.y).equal(3);
  });

  it('sub', function() {
    const v1 = new Vector2(3, 2);
    const v2 = new Vector2(1, 1);
    const v = Vector2.sub(v1, v2);
    expect(gMath.equal(v.x, 2)).equal(true);
    expect(gMath.equal(v.y, 1)).equal(true);
  });

  it('multiply', function() {
    const v1 = new Vector2(3, 2);
    const v2 = v1.multiply(2);
    expect(v2.x).equal(6);
    expect(v2.y).equal(4);
  });

  it('dot', function() {
    const v1 = new Vector2(1, 0);
    const v2 = new Vector2(0, 1);
    const dot1 = v1.dot(v2);
    expect(dot1).equal(0);

    const v3 = new Vector2(-1, 0);
    const dot2 = v1.dot(v3);

    expect(dot2).equal(-1);
  });

  it('angle', function() {
    const v = new Vector2(1, 0);
    const v1 = new Vector2(0, 1);
    expect(v.angle(v1)).equal(Math.PI / 2);

    const v2 = new Vector2(0, -1);
    expect(v.angle(v2)).equal(Math.PI / 2);
  });


  it('angleTo', function() {
    const v = new Vector2(1, 0);
    const v1 = new Vector2(0, 1);
    expect(v.angleTo(v1)).equal(Math.PI / 2);

    const v2 = new Vector2(0, -1);
    expect(v.angleTo(v2)).equal(Math.PI * 3 / 2);
  });

  it('direction', function() {
    const v = new Vector2(1, 0);
    const v1 = new Vector2(0, 1);
    expect(v.direction(v1) > 0).equal(true);

    const v2 = new Vector2(0, -1);
    expect(v.direction(v2) < 0).equal(true);
  });

  it('min', function() {
    const v = new Vector2(3, 2);
    const v1 = new Vector2(2, 4);
    v.min(v1);
    expect(gMath.equal(v.x, 2)).equal(true);
    expect(gMath.equal(v.y, 2)).equal(true);
  });

  it('max', function() {
    const v = new Vector2(3, 2);
    const v1 = new Vector2(2, 4);
    v.max(v1);
    expect(gMath.equal(v.x, 3)).equal(true);
    expect(gMath.equal(v.y, 4)).equal(true);
  });

  it('distanceTo', function() {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(2, 3);
    expect(v1.distanceTo(v2)).equal(Math.sqrt(2));
  });

  it('getPoint', function() {
    const v = new Vector2(3, 4);
    const p = v.getPoint();
    expect(p.x).equal(3);
    expect(p.y).equal(4);
  });
});
