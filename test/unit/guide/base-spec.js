const expect = require('chai').expect;
const Guide = require('../../../src/component/guide/base');
const Coord = require('../../../src/coord/index');
const Scale = require('../../../src/scale/');

describe('Guide Base', function() {
  const coord = new Coord.Rect({
    start: {
      x: 50,
      y: 50
    },
    end: {
      x: 400,
      y: 400
    }
  });
  const xScale = new Scale.Cat({
    values: [ '一月', '二月', '三月', '四月', '五月' ]
  });

  const yScale = new Scale.Linear({
    min: 0,
    max: 1200
  });

  it('Base class method: parsePoint(coord, point)', function() {
    const point = [ '三月', 600 ];
    const cfg = {
      xScale,
      yScales: [ yScale ]
    };
    const guide = new Guide(cfg);

    // data value
    const result = guide.parsePoint(coord, point);
    expect(result.x).to.be.equal(225);
    expect(result.y).to.be.equal(225);

    // percent
    const point1 = [ '50%', '60%' ];
    const result1 = guide.parsePoint(coord, point1);
    expect(result1.x).to.be.equal(225);
    expect(result1.y).to.be.equal(190);

    // KEYWORK
    const point2 = [ 'min', 'max' ];
    const result2 = guide.parsePoint(coord, point2);
    expect(result2.x).to.be.equal(50);
    expect(result2.y).to.be.equal(400);

    // percent + value
    const point3 = [ '20%', 600 ];
    const result3 = guide.parsePoint(coord, point3);
    expect(result3.x).to.be.equal(120);
    expect(result3.y).to.be.equal(225);

    // keyword + value
    const point4 = [ 2, 'median' ];
    const result4 = guide.parsePoint(coord, point4);
    expect(result4.x).to.be.equal(225);
    expect(result4.y).to.be.equal(225);

    // keyword + percent
    const point5 = [ 'min', '60%' ];
    const result5 = guide.parsePoint(coord, point5);
    expect(result5.x).to.be.equal(50);
    expect(result5.y).to.be.equal(190);

    // callback
    const point6 = function(xScale) {
      return [ xScale.values[2], 'max' ];
    };
    const result6 = guide.parsePoint(coord, point6);
    expect(result6.x).to.be.equal(225);
    expect(result6.y).to.be.equal(400);
  });

  it('limitInPlot', function() {
    const point = [ '九月', 600 ];
    const cfg = {
      xScale,
      yScales: [ yScale ],
      limitInPlot: true
    };
    const guide = new Guide(cfg);

    const result = guide.parsePoint(coord, point);
    expect(result).to.be.null;
  });

  it('Base class method: render()', function() {
    const guide = new Guide();
    expect(guide.render).be.an.instanceof(Function);
    expect(guide.render()).to.be.undefined;
  });
});
