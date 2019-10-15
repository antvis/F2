const expect = require('chai').expect;
const Guide = require('../../../../src/component/guide/base');
const Coord = require('../../../../src/coord/index');
const Scale = require('../../../../src/scale/');

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
    values: [ '一月', '二月', '45%三月', '四月', '五月' ]
  });

  const yScale = new Scale.Linear({
    min: 0,
    max: 1200
  });

  it('Base class method: parsePoint(coord, point)', function() {
    const point = [ '45%三月', 600 ];
    const cfg = {
      xScale,
      yScales: [ yScale ]
    };
    const guide = new Guide(cfg);

    const result = guide.parsePoint(coord, point);
    expect(result.x).to.be.equal(225);
    expect(result.y).to.be.equal(225);

    // percent
    const point1 = [ '50%', '60%' ];
    const result1 = guide.parsePoint(coord, point1);
    expect(result1.x).to.be.equal(225);
    expect(result1.y).to.be.equal(260);

    // KEYWORK
    const point2 = [ 'min', 'max' ];
    const result2 = guide.parsePoint(coord, point2);
    expect(result2.x).to.be.equal(50);
    expect(result2.y).to.be.equal(400);

    // callback
    const point3 = function(xScale) {
      return [ xScale.values[2], 'max' ];
    };
    const result3 = guide.parsePoint(coord, point3);
    expect(result3.x).to.be.equal(225);
    expect(result3.y).to.be.equal(400);
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

  it('Base class method: changeVisible()', function() {
    const guide = new Guide();
    expect(guide.changeVisible).be.an.instanceof(Function);
    guide.changeVisible(false);
    expect(guide.visible).to.be.false;
    guide.changeVisible(true);
    expect(guide.visible).to.be.true;
  });
});
