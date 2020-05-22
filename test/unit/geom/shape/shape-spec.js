import { expect } from 'chai';
import Shape from '../../../../src/geom/shape/index';
import Coord from '../../../../src/coord/';
// const { Canvas } = require('../../../../src/graphic/index');

describe('shape register', () => {
  const coord = new Coord.Rect({
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 200,
      y: 200
    }
  });
  it('get factory null', () => {
    const factory = Shape.getShapeFactory('test');
    expect(factory).equal(undefined);
  });

  it('register factory && register shape', function() {
    let called = false;
    Shape.registerFactory('test', {
      defaultShapeType: 'test',
      getShapePoints(type, cfg) {
        const x = cfg.x * 2;
        return [{
          x,
          y: 2
        }];
      }
    });

    Shape.registerShape('test', 'test', {
      draw() {
        called = true;
      }
    });

    const testFactory = Shape.getShapeFactory('test');
    expect(testFactory).not.equal(undefined);
    const points = testFactory.getShapePoints('test', {
      x: 2,
      y: 4
    });
    expect(points).eqls([{
      x: 4,
      y: 2
    }]);
    testFactory.drawShape('test', {});
    expect(called).equal(true);
  });

  it('parse point', function() {

    const testFactory = Shape.getShapeFactory('test');
    testFactory.setCoord(coord);
    const shape = testFactory.getShape('test');

    expect(shape.parsePoint({
      x: 0,
      y: 0
    })).eqls({
      x: 0,
      y: 0
    });
    expect(shape.parsePoint({
      x: 0.5,
      y: 0.5
    })).eqls({
      x: 100,
      y: 100
    });
    expect(shape.parsePoint({
      x: 1,
      y: 1
    })).eqls({
      x: 200,
      y: 200
    });
  });

  it('parse points', function() {
    const testFactory = Shape.getShapeFactory('test');
    testFactory.setCoord(coord);
    const shape = testFactory.getShape('test');
    const points = [{
      x: 0,
      y: 0
    }, {
      x: 0.5,
      y: 0.5
    }, {
      x: 1,
      y: 1
    }];
    expect(shape.parsePoints(points)).eqls([{
      x: 0,
      y: 0
    }, {
      x: 100,
      y: 100
    }, {
      x: 200,
      y: 200
    }]);
  });

  it('compatibility 2.x', function() {
    let called = false;
    Shape.registerFactory('test1', {
      defaultShapeType: 'test1'
    });
    Shape.registerShape('test1', 'test1', {
      getShapePoints() {
        return [ 1, 2 ];
      },
      drawShape() {
        called = true;
      }
    });
    const testFactory = Shape.getShapeFactory('test1');
    const points = testFactory.getShapePoints('test1', {
      x: 2,
      y: 4
    });
    expect(points).eqls([ 1, 2 ]);
    testFactory.drawShape('test1', {});
    expect(called).equal(true);
  });
});

describe('geom shapes', function() {
  const dom = document.createElement('canvas');
  dom.width = 500;
  dom.height = 500;
  document.body.appendChild(dom);

  // const canvas = new Canvas({
  //   el: dom,
  //   width: 500,
  //   height: 500
  // });

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

  describe('point', function() {

    const shapeFactory = Shape.getShapeFactory('point');
    it('get', function() {
      expect(shapeFactory).not.equal(undefined);
    });

    it('getShape', function() {
      expect(shapeFactory.getShape('point')).not.equal(undefined);
    });
    it('getPoints', function() {
      const arr1 = shapeFactory.getShapePoints('point', {
        x: 0,
        y: 0
      });
      expect(arr1.length).equal(1);
      const arr2 = shapeFactory.getShapePoints('point', {
        x: [ 0, 1 ],
        y: [ 0, 0 ]
      });
      expect(arr2.length).equal(2);
    });
  });

  describe('line', function() {
    const shapeFactory = Shape.getShapeFactory('line');
    it('get', function() {
      expect(shapeFactory).not.equal(undefined);
    });

    it('getShape', function() {
      expect(shapeFactory.getShape('line')).not.equal(undefined);
    });
  });

  describe('interval', function() {
    const shapeFactory = Shape.getShapeFactory('interval');
    shapeFactory.setCoord(coord);
    it('get', function() {
      expect(shapeFactory).not.equal(undefined);
    });

    it('getShape', function() {
      expect(shapeFactory.getShape('rect')).not.equal(undefined);
    });
    it('get points', () => {
      const arr1 = shapeFactory.getShapePoints('rect', {
        x: 0.5,
        y: 0.5,
        size: 0.4,
        y0: 0
      });

      expect(arr1[0]).eqls({
        x: 0.3,
        y: 0
      });
      expect(arr1[1]).eqls({
        x: 0.3,
        y: 0.5
      });
      expect(arr1[2]).eqls({
        x: 0.7,
        y: 0.5
      });
      expect(arr1[3]).eqls({
        x: 0.7,
        y: 0
      });

    });
  });

  describe('area', function() {
    const shapeFactory = Shape.getShapeFactory('area');
    shapeFactory.setCoord(coord);
    it('get', function() {
      expect(shapeFactory).not.equal(undefined);
    });

    it('getShape', function() {
      expect(shapeFactory.getShape('area')).not.equal(undefined);
    });

    it('get points', () => {
      const arr1 = shapeFactory.getShapePoints('area', {
        x: 0.5,
        y: 0.5,
        y0: 0
      });
      expect(arr1.length).equal(2);
      expect(arr1[0]).eqls({
        x: 0.5,
        y: 0
      });
      expect(arr1[1]).eqls({
        x: 0.5,
        y: 0.5
      });
    });
  });

  describe('polygon', function() {
    const shapeFactory = Shape.getShapeFactory('polygon');
    shapeFactory.setCoord(coord);
    it('get', function() {
      expect(shapeFactory).not.equal(undefined);
    });

    it('getShape', function() {
      expect(shapeFactory.getShape('polygon')).not.equal(undefined);
    });

    it('get points', () => {
      const arr1 = shapeFactory.getShapePoints('polygon', {
        x: [ 0, 0.2, 0.4 ],
        y: [ 0, 0.4, 0.6 ]
      });
      expect(arr1.length).equal(3);
      expect(arr1[0]).eqls({
        x: 0,
        y: 0
      });
      expect(arr1[1]).eqls({
        x: 0.2,
        y: 0.4
      });
    });
  });
});
