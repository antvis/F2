const expect = require('chai').expect;
const AxisLine = require('../../../src/axis/line');
const Scale = require('../../../src/scale/');
const axisGlobal = require('../../../src/global').axis;
const Util = require('../../../src/util/common');
const { Group } = require('../../../src/g/index');

const linear = new Scale.Linear({
  min: 0,
  max: 100,
  tickCount: 5
});

const frontContainer = new Group({
  zIndex: 2
});
const backContainer = new Group({
  zIndex: 1
});

describe('line axis', function() {
  describe('left', function() {
    const cfg = Util.deepMix({
      start: {
        x: 40,
        y: 460
      },
      end: {
        x: 40,
        y: 40
      },
      frontContainer,
      backContainer,
      offsetFactor: -1,
      ticks: linear.getTicks()
    }, axisGlobal);
    let axis;
    it('init', function() {
      axis = new AxisLine(cfg);
      // TODO
      expect(axis.ticks.length).equal(linear.ticks.length);
    });

    it('test point', function() {
      let point = axis.getOffsetPoint(0);
      expect(point).eql({ x: 40, y: 460 });
      point = axis.getOffsetPoint(1);
      expect(point).eql({ x: 40, y: 40 });
    });

    it('test text align', function() {
      const point = axis.getOffsetPoint(0);
      expect(axis.getTextAlignInfo(point, 5)).eql({ textAlign: 'right', textBaseline: 'middle' });
      expect(axis.getTextAlignInfo(point, -5)).eql({ textAlign: 'left', textBaseline: 'middle' });
    });
    it('test text position', function() {
      const point = axis.getOffsetPoint(0);
      const side = axis.getSidePoint(point, 10);
      expect(side).eql({ x: 30, y: 460 });
    });
  });

  describe('bottom', function() {
    const cfg = Util.deepMix({
      start: {
        x: 40,
        y: 460
      },
      end: {
        x: 460,
        y: 460
      },
      frontContainer,
      backContainer,
      ticks: linear.getTicks()
    }, axisGlobal, {
      line: null
    });
    const axis = new AxisLine(cfg);
    // axis.draw();

    it('test point', function() {
      let point = axis.getOffsetPoint(0);
      expect(point).eql({ x: 40, y: 460 });

      point = axis.getOffsetPoint(0.5);
      expect(point).eql({ x: 250, y: 460 });

      point = axis.getOffsetPoint(1);
      expect(point).eql({ x: 460, y: 460 });
    });

    it('test text align', function() {
      const point = axis.getOffsetPoint(0);
      expect(axis.getTextAlignInfo(point, 5)).eql({ textAlign: 'center', textBaseline: 'top' });
      expect(axis.getTextAlignInfo(point, -5)).eql({ textAlign: 'center', textBaseline: 'bottom' });
    });

    it('test text position', function() {
      const point = axis.getOffsetPoint(0);
      let side = axis.getSidePoint(point, 10);
      expect(side).eql({ x: 40, y: 470 });

      side = axis.getSidePoint(point, -10);
      expect(side).eql({ x: 40, y: 450 });
    });

  });

  it('right', function() {
    const cfg = Util.deepMix({
      start: {
        x: 460,
        y: 460
      },
      end: {
        x: 460,
        y: 40
      },
      frontContainer,
      backContainer,
      gridPoints: [[{ x: 460, y: 450 }, { x: 40, y: 450 }], [{ x: 460, y: 60 }, { x: 40, y: 60 }]],
      ticks: linear.getTicks()
    }, axisGlobal, {
      label: null
    });
    const axis = new AxisLine(cfg);

    it('test point', function() {
      let point = axis.getOffsetPoint(0);
      expect(point).eql({ x: 460, y: 460 });

      point = axis.getOffsetPoint(0.5);
      expect(point).eql({ x: 460, y: 250 });

      point = axis.getOffsetPoint(1);
      expect(point).eql({ x: 460, y: 460 });
    });

    it('test text align', function() {
      const point = axis.getOffsetPoint(0);
      expect(axis.getTextAlignInfo(point, 5)).eql({ textAlign: 'left', textBaseline: 'middle' });
      expect(axis.getTextAlignInfo(point, -5)).eql({ textAlign: 'right', textBaseline: 'middle' });
    });

    it('test text position', function() {
      const point = axis.getOffsetPoint(0);
      let side = axis.getSidePoint(point, 10);
      expect(side).eql({ x: 470, y: 460 });

      side = axis.getSidePoint(point, -10);
      expect(side).eql({ x: 450, y: 460 });
    });

    it('test grid', function() {
      expect(axis.get('gridPoints').length).equal(2);
    });
  });

  describe('top', function() {
    const cfg = Util.deepMix({
      start: {
        x: 40,
        y: 40
      },
      end: {
        x: 460,
        y: 40
      },
      frontContainer,
      backContainer,
      offsetFactor: -1,
      ticks: linear.getTicks()
    }, axisGlobal, {
      grid: null,
      tick: null
    });
    const axis = new AxisLine(cfg);

    it('test point', function() {
      let point = axis.getOffsetPoint(0);
      expect(point).eql({ x: 40, y: 40 });

      point = axis.getOffsetPoint(0.5);
      expect(point).eql({ x: 250, y: 40 });

      point = axis.getOffsetPoint(1);
      expect(point).eql({ x: 460, y: 40 });
    });

    it('test text align', function() {
      const point = axis.getOffsetPoint(0);
      expect(axis.getTextAlignInfo(point, 5)).eql({ textAlign: 'center', textBaseline: 'bottom' });
      expect(axis.getTextAlignInfo(point, -5)).eql({ textAlign: 'center', textBaseline: 'top' });
    });

    it('test text position', function() {
      const point = axis.getOffsetPoint(0);
      let side = axis.getSidePoint(point, 10);
      expect(side).eql({ x: 40, y: 30 });

      side = axis.getSidePoint(point, -10);
      expect(side).eql({ x: 40, y: 50 });

    });
  });

  // describe('grid label function', function() {
  //   const cfg = Util.deepMix({
  //     start: {
  //       x: 40,
  //       y: 150
  //     },
  //     end: {
  //       x: 460,
  //       y: 250
  //     },
  //     frontContainer,
  //     backContainer,
  //     gridPoints: [[{ x: 40, y: 40 }, { x: 40, y: 450 }], [{ x: 460, y: 60 }, { x: 460, y: 460 }]],
  //     ticks: linear.getTicks()
  //   }, axisGlobal, {
  //     label(text, index) {
  //       if (index % 2 === 0) {
  //         return null;
  //       }
  //       return {
  //         offset: 10,
  //         font: '30px sans-serif',
  //         fillStyle: '#333'
  //       };

  //     },
  //     grid(text, index) {
  //       if (index % 2 !== 0) {
  //         return null;
  //       }
  //       return {
  //         strokeStyle: 'blue'
  //       };

  //     }
  //   });
  //   // const axis = new AxisLine(cfg);
  //   // axis.draw();
  // });

});
