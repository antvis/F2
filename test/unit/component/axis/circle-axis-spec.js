import { expect } from 'chai';
import AxisCircle from '../../../../src/component/axis/circle';
import Scale from '../../../../src/scale/index';
import global from '../../../../src/global';
import * as Util from '../../../../src/util/common';
import { Group, Text } from '../../../../src/graphic/index';

const axisGlobal = global.axis;

const cat = new Scale.Cat({
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

const labels = [];
const ticks = cat.getTicks();
ticks.map(tick => {
  const textShape = new Text({
    className: 'label-text',
    attrs: {
      x: 0,
      y: 0,
      text: tick.text
    },
    value: tick.value
  });
  labels.push(textShape);
  return textShape;
});

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
      ticks: cat.getTicks(),
      labels
    }, axisGlobal.circle);
    let axis;
    it('init', function() {
      axis = new AxisCircle(cfg);
      expect(axis.ticks.length).equal(cat.getTicks().length);
      expect(backContainer.get('children').length).to.equal(2);
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

    it('test grid', function() {
      const grid = axis.grid;
      expect(grid.type === 'line');
    });
  });
});
