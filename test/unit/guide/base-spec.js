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
  const xScale = new Scale.cat({
    values: [ '一月', '二月', '三月', '四月', '五月' ]
  });

  const yScale = new Scale.linear({
    min: 0,
    max: 1200
  });

  it('Base class method: parsePoint(coord, point)', function() {
    const point = [ '三月', 600 ];
    const cfg = {
      xScale,
      yScale
    };
    const guide = new Guide(cfg);

    const result = guide.parsePoint(coord, point);
    expect(result.x).to.be.equal(225);
    expect(result.y).to.be.equal(225);
  });

  it('Base class method: render()', function() {
    const guide = new Guide();
    expect(guide.render).be.an.instanceof(Function);
    expect(guide.render()).to.be.undefined;
  });
});
