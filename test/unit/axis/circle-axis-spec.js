const expect = require('chai').expect;
const AxisCircle = require('../../../src/axis/circle');
const Scale = require('../../../src/scale/index');
const axisGlobal = require('../../../src/global').axis;
const Util = require('../../../src/util/common');
const { Group } = require('../../../src/g/index');

const cat = Scale.cat({
  domain: [ 'a', 'b', 'c' ],
  range: [ 0, 0.66 ]
});

const gridPoints = [[{ x: 250, y: 50 }, { x: 250, y: 250 }], [{ x: 450, y: 250 }, { x: 250, y: 250 }]];
const frontContainer = new Group({
  zIndex: 2
});
const backContainer = new Group({
  zIndex: 1
});
function equal(v1, v2) {
  return Math.abs(v1 - v2) < 0.00001;
}

describe('circle axis', function() {
  describe('full circle', function() {
    const cfg = Util.mix({
      frontContainer,
      backContainer,
      radius: 200,
      center: {
        x: 250,
        y: 250
      },
      gridPoints,
      ticks: cat.getTicks()
    }, axisGlobal.circle);

    let axis;
    it('init', function() {
      axis = new AxisCircle(cfg);
      // axis.draw();
      expect(axis.ticks.length).equal(cat.getTicks().length);
      expect(backContainer.get('children').length).to.equal(3);
    });

    it('test point', function() {
      let point = axis.getOffsetPoint(0);
      expect(equal(point.x, 250)).equal(true);
      expect(equal(point.y, 50)).equal(true);

      point = axis.getOffsetPoint(0.5);
      expect(equal(point.x, 250)).equal(true);
      expect(equal(point.y, 450)).equal(true);

      point = axis.getOffsetPoint(1);
      expect(equal(point.x, 250)).equal(true);
      expect(equal(point.y, 50)).equal(true);
    });

    it('test text align', function() {
      let point = axis.getOffsetPoint(0);
      expect(axis.getTextAlignInfo(point, 15)).eql({ textAlign: 'center', textBaseline: 'bottom' });
      expect(axis.getTextAlignInfo(point, -5)).eql({ textAlign: 'center', textBaseline: 'top' });

      point = axis.getOffsetPoint(0.5);

      expect(axis.getTextAlignInfo(point, 15)).eql({ textAlign: 'center', textBaseline: 'top' });
      expect(axis.getTextAlignInfo(point, -5)).eql({ textAlign: 'center', textBaseline: 'bottom' });


      point = axis.getOffsetPoint(0.3);

      expect(axis.getTextAlignInfo(point, 15)).eql({ textAlign: 'left', textBaseline: 'middle' });
      expect(axis.getTextAlignInfo(point, -5)).eql({ textAlign: 'right', textBaseline: 'middle' });


      point = axis.getOffsetPoint(0.6);

      expect(axis.getTextAlignInfo(point, 15)).eql({ textAlign: 'right', textBaseline: 'middle' });
      expect(axis.getTextAlignInfo(point, -5)).eql({ textAlign: 'left', textBaseline: 'middle' });
    });

  });


});
