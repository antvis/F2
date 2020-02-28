const expect = require('chai').expect;
const Geom = require('../../../src/geom/index');
const Scale = require('../../../src/scale/index');
const Coord = require('../../../src/coord/index');
require('../../../src/coord/polar');
const Global = require('../../../src/global');
const { Canvas } = require('../../../src/graphic/index');

require('../../../src/geom/adjust/index');
require('../../../src/geom/shape/index');

const dom = document.createElement('canvas');
dom.width = 500;
dom.height = 500;
document.body.appendChild(dom);

const canvas = new Canvas({
  el: dom,
  width: 500,
  height: 500
});

let scaleA = new Scale.Linear({
  field: 'a',
  min: 0,
  max: 10
});

const scaleB = new Scale.Linear({
  field: 'b',
  min: 0,
  max: 5,
  nice: false
});

const scaleC = new Scale.Cat({
  field: 'c',
  values: [ '1', '2' ]
});

const ScaleRed = new Scale.Identity({
  field: 'red',
  value: 'red'
});

const ScaleSmooth = new Scale.Identity({
  field: 'smooth',
  value: 'smooth'
});

const ScaleTen = new Scale.Identity({
  field: '10',
  value: 10
});

const scaleShapePyramid = new Scale.Identity({
  field: 'pyramid',
  value: 'pyramid'
});

const scaleShapeFunnel = new Scale.Identity({
  field: 'funnel',
  value: 'funnel'
});


const coord = new Coord.Rect({
  start: {
    x: 0,
    y: 0
  },
  end: {
    x: 500,
    y: 500
  }
});

describe('test geoms', function() {
  const data = [{
    a: 1,
    b: 2,
    c: '1'
  }, {
    a: 1,
    b: 3,
    c: '2'
  },
  {
    a: 2,
    b: 1,
    c: '1'
  }, {
    a: 2,
    b: 4,
    c: '2'
  },
  {
    a: 3,
    b: 5,
    c: '1'
  }, {
    a: 3,
    b: 1,
    c: '2'
  }
  ];

  describe('test create', function() {
    const geom = new Geom({
      type: 'test'
    });

    it('create geom', function() {
      expect(geom.get('type')).equal('test');
    });

    it('test attr method position', function() {
      geom.position('a*b');
      expect(geom.get('attrOptions').position).eqls({ field: 'a*b' });
      geom.position([ 'a', 'b' ]);
      expect(geom.get('attrOptions').position).eqls({ field: [ 'a', 'b' ] });
    });

    it('other attrs', function() {
      geom.color('red')
        .shape('a', [ 'circle', 'rect' ])
        .size('b', function() {});
      const attrOptions = geom.get('attrOptions');
      expect(attrOptions.color.field).eqls('red');
      expect(attrOptions.color.values).eqls(Global.colors);
      expect(attrOptions.shape).eqls({ field: 'a', values: [ 'circle', 'rect' ] });
      expect(attrOptions.size.field).equal('b');
      expect(attrOptions.size.callback).to.be.a('function');
    });

  });

  describe('test init data', function() {
    const newData = data.slice(0);
    let geom;
    it('init attrs', function() {
      geom = new Geom({
        type: 'test',
        coord,
        container: canvas.addGroup(),
        data: newData,
        scales: { a: scaleA, b: scaleB, c: scaleC }
      });
      geom.position('a*b').color('c');
      geom._initAttrs();
      const attrs = geom.get('attrs');
      expect(attrs.position.type).equal('position');
      expect(attrs.position.scales.length).equal(2);
      expect(attrs.color.scales.length).eqls(1);
    });
    it('test group data', function() {
      const arr = geom._groupData(newData);
      expect(arr.length).equal(2);
      expect(arr[0][0].c).equal('1');
      expect(arr[1][0].c).equal('2');
    });

    it('save origin', function() {
      const rst = geom._saveOrigin(newData);
      expect(newData[0]._origin).equal(undefined);
      expect(rst[0]._origin).equal(newData[0]);
    });

    it('test numberic', function() {
      geom.position('a*c');
      geom._initAttrs();
      const attrs = geom.get('attrs');
      expect(attrs.position.scales.length).equal(2);
      expect(attrs.color.scales.length).eqls(1);
      const temp = newData.slice(0);
      geom._numberic(temp);
      expect(temp[0].c).to.be.equal(0);
    });

    it('reset', function() {
      geom.reset();
      expect(geom.get('attrs')).eqls({});
      // expect(geom.get('adjusts')).eqls(null);
    });

    it('test total init', function() {
      geom.position('a*b').color('c');
      geom.init();
      const dataArray = geom.get('dataArray');
      expect(dataArray[0][0].b).eqls(2);
      expect(dataArray[1][0].b).eqls(3);
    });

    it('test group data with values setting in colDefs', function() {
      geom.reset();
      geom.set('colDefs', {
        c: {
          values: [ '2', '1' ]
        }
      });
      geom.position('a*b').color('c');
      geom._initAttrs();

      const geomData = [
        { a: 1, b: 2, c: '1' },
        { a: 1, b: 3, c: '2' },
        { a: 2, b: 1, c: '1' },
        { a: 2, b: 4, c: '2' },
        { a: 3, b: 5, c: '1' },
        { a: 3, b: 1, c: '2' }
      ];
      const arr = geom._groupData(geomData);
      expect(arr.length).equal(2);
      expect(arr[0][0].c).equal('2');
      expect(arr[1][0].c).equal('1');
    });

    it('test group data with undefined values in group', function() {
      geom.set('colDefs', {});
      const data = [
        // 相关数据
        { a: 1, b: 1, c: '指标1' },
        { a: 2, b: 2, c: '指标1' },
        { a: 3, b: 3, c: '指标1' },
        { a: 1, b: 2, c: '指标2' },
        { a: 2, b: 3, c: '指标2' },
        { a: 3, b: 4, c: '指标2' },
        // 无关数据
        { a: 1, b1: 3, c: '指标3' },
        { a: 2, b1: 2, c: '指标3' },
        { a: 3, b1: 1, c: '指标3' },
        { a: 1, b1: 4, c: '指标4' },
        { a: 2, b1: 3, c: '指标4' },
        { a: 3, b1: 2, c: '指标4' }
      ];
      geom.set('data', data);
      geom.position('a*b').color('c');
      geom.init();
      const dataArray = geom.get('dataArray');
      expect(dataArray.length).equal(4);

      geom.set('ignoreEmptyGroup', true);
      geom.init();
      const dataArray1 = geom.get('dataArray');
      expect(dataArray1.length).equal(2);
    });

    it('destroy', function() {
      geom.destroy();
      expect(geom.destroyed).equal(true);
    });
  });


  describe('test paint', function() {
    const newData = data.slice(0);
    let geom;
    const scaleA = new Scale.Linear({
      field: 'a',
      min: 0,
      max: 10
    });
    const scaleB = new Scale.Linear({
      field: 'b',
      min: 0,
      max: 5,
      nice: false
    });
    it('test generate points and ', function() {
      // const data = [
      //   { a: 1, b: [ 1, 2 ], c: '1' },
      //   { a: 2, b: [ 2, 3 ], c: '1' }
      // ];
      geom = new Geom({
        shapeType: 'point',
        coord,
        data: newData,
        container: canvas.addGroup(),
        generatePoints: true,
        scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed }
      });
      geom.position('a*b').color('red');
      geom.init();
      // const dataArray = geom.get('dataArray');
      // expect(dataArray[0][0].points).eqls([{ x: 0.1, y: 0.2 }, { x: 0.1, y: 0.4 }]);
      const data = [
        { a: 1, b: [ 1, 2 ], c: '1' },
        { a: 2, b: [ 2, 3 ], c: '2' }
      ];
      geom._beforeMapping([ data ]);
      expect(data[0].points).eqls([{ x: 0.1, y: 0.2 }, { x: 0.1, y: 0.4 }]);
    });

    it('test mapping', function() {
      const data = [
        { a: 1, b: [ 1, 2 ], c: '1' },
        { a: 2, b: [ 2, 3 ], c: '2' }
      ];
      geom._beforeMapping([ data ]);
      const mappedData = geom._mapping(data);
      const obj1 = mappedData[0];
      expect(obj1.x).equal(50);
      expect(obj1.y).eqls([ 100, 200 ]);
      expect(obj1.color).equal('red');
    });

    it('test paint', function() {
      geom.reset();
      geom.position('a*b').color('c');
      geom.init();
      geom.paint();
      /* expect(geom.get('shapeContainer').getCount()).to.be.equal(6);
      canvas.draw();
      */
    });

    it('test style no fields', function() {
      geom.reset();
      geom.position('a*b').color('c').style({
        fill: 'blue',
        cursor: 'pointer'
      });
      geom.init();
      geom.paint();

    });
    it('test style with fields', function() {
      geom.reset();
      geom.position('a*b').color('c').style('a', {
        fill: 'red',
        lineWidth(a) {
          return a * 2;
        }
      });

      geom.init();
      geom.paint();
    });
  });
});

function clearCanvas(canvas) {
  const ctx = canvas.get('context');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

describe('test geom point', function() {
  let data = [{ a: 4, b: 3, c: '1' }, { a: 5, b: 2, c: '2' }];
  const geom = new Geom.Point({
    data,
    coord,
    container: canvas.addGroup(),
    scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed }
  });
  it('draw points', function() {
    clearCanvas(canvas);
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
    expect(geom.get('dataArray').length).to.equal(2);
  });
  it('draw points y is array', function() {
    data = [{ a: 4, b: [ 3, 5 ], c: '1' }, { a: 5, b: [ 2, 4 ], c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('red').style({
      opacity: 0.2
    });
    geom.init();
    geom.paint();
    expect(geom.get('dataArray').length).to.equal(1);
    expect(geom.get('dataArray')[0].length).to.equal(2);
  });
  it('has stack adjust', function() {
    data = [{ a: 4, b: 3, c: '1' }, { a: 4, b: 2, c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('c').adjust('stack');
    geom.init();
    geom.paint();
    expect(geom.hasAdjust('stack')).to.be.true;
    expect(geom.get('dataArray').length).to.equal(2);
  });
});

describe('test geom path', function() {
  let data = [{ a: 4, b: 3, c: '1' }, { a: 5, b: 2, c: '2' }];
  const geom = new Geom.Path({
    data,
    coord,
    container: canvas.addGroup(),
    scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed }
  });

  it('draw path', function() {
    clearCanvas(canvas);

    geom.position('a*b');
    geom.init();
    geom.paint();

  });

  it('draw path width null', function() {
    clearCanvas(canvas);
    data = [{ a: 4, b: 3, c: '1' }, { a: 5, b: 2, c: '2' }, { a: 4, b: null, c: '1' }, { a: 4, b: 2, c: '1' }, { a: 3, b: 1, c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('red');
    geom.init();
    geom.paint();

  });

  it('draw multiple path', function() {
    clearCanvas(canvas);
    data = [{ a: 4, b: [ 3, 5 ], c: '1' }, { a: 5, b: [ 2, 4 ], c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b');
    geom.init();
    geom.paint();
  });

  it('draw path with color', function() {
    clearCanvas(canvas);
    const data = [{ a: 1, b: 3, c: '1' }, { a: 2, b: 3.5, c: '1' }, { a: 1, b: 2, c: '2' }, { a: 2, b: 1.5, c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
  });
});

describe('test geom line', function() {
  let data = [{ a: 4, b: 3, c: '1' }, { a: 2, b: 2, c: '2' }];
  const scaleA = new Scale.Linear({
    field: 'a',
    min: 0,
    max: 10,
    values: [ 2, 4 ]
  });
  const scaleB = new Scale.Linear({
    field: 'b',
    min: 0,
    max: 5,
    nice: false
  });
  const geom = new Geom.Line({
    data,
    coord,
    container: canvas.addGroup(),
    scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed, smooth: ScaleSmooth }
  });

  it('draw line', function() {
    expect(geom.get('type')).eql('line');
    geom.position('a*b');
    geom.init();
    geom.paint();

    const dataArray = geom.get('dataArray');
    expect(dataArray[0][0]._origin.a).equal(2);
  });

  it('draw multiple line', function() {
    clearCanvas(canvas);
    data = [{ a: 4, b: [ 3, 5 ], c: '1' }, { a: 5, b: [ 2, 4 ], c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b');
    geom.init();
    geom.paint();

  });

  it('draw path with color', function() {
    clearCanvas(canvas);
    const data = [{ a: 1, b: 3, c: '1' }, { a: 2, b: 3.5, c: '1' }, { a: 1, b: 2, c: '2' }, { a: 2, b: 1.5, c: '2' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
  });

  it('stack line', function() {
    clearCanvas(canvas);
    const data = [
      { a: 1, b: 3, c: '1' },
      { a: 3, b: 2, c: '1' },
      { a: 1, b: 2, c: '2' },
      { a: 3, b: 3, c: '2' }
    ];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('c').adjust('stack');
    geom.init();
    geom.paint();
  });

  it('stack smooth line', function() {
    clearCanvas(canvas);
    const data = [
      { a: 1, b: 3, c: '1' },
      { a: 2, b: 1, c: '1' },
      { a: 3, b: 2, c: '1' },
      { a: 1, b: 2, c: '2' },
      { a: 2, b: 2, c: '2' },
      { a: 3, b: 3, c: '2' }
    ];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('c')
      .adjust('stack')
      .shape('smooth');
    geom.init();
    geom.paint();
  });

  it('first null line', function() {
    clearCanvas(canvas);
    const data = [{ a: 1, b: null, c: '1' }, { a: 4, b: null, c: '1' }, { a: 2, b: 2, c: '2' }, { a: 3, b: 4, c: '1' }, { a: 2.5, b: 3.5, c: '1' }];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b');
    geom.init();
    geom.paint();
  });

  it('destroy & reset', function() {
    geom.destroy();
    expect(geom.destroyed).equal(true);
    clearCanvas(canvas);
  });
});

describe('test geom area', function() {
  const data = [
    { a: '1', b: 2, c: '1' },
    { a: '2', b: 5, c: '1' },
    { a: '3', b: 4, c: '1' },
    { a: '1', b: 3, c: '2' },
    { a: '2', b: 1, c: '2' },
    { a: '3', b: 2, c: '2' }
  ];
  let geom;
  it('create area', function() {
    scaleA = new Scale.Cat({
      field: 'a',
      values: [ '1', '2', '3' ],
      range: [ 0.2, 0.8 ]
    });
    geom = new Geom.Area({
      data,
      coord,
      container: canvas.addGroup(),
      scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed, 10: ScaleTen }
    });
    expect(geom.get('type')).equal('area');
    expect(geom.get('shapeType')).equal('area');
  });

  it('draw area', function() {
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
  });

  it('draw range area', function() {
    clearCanvas(canvas);
    const data = [
      { a: '1', b: [ 2, 3 ], c: '1' },
      { a: '2', b: [ 3, 5 ], c: '1' },
      { a: '3', b: [ 0, 4 ], c: '1' }
    ];
    geom.reset();
    geom.set('data', data);
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();
  });

  it('draw area in polar', function() {
    clearCanvas(canvas);
    const coord1 = new Coord.Polar({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 500,
        y: 500
      }
    });
    geom.reset();
    geom.set('coord', coord1);
    geom.position('a*b').color('c');
    geom.init();
    geom.paint();

  });

  it('geom destroy', function() {
    geom.destroy();
    expect(geom.destroyed).equal(true);
  });
});


describe('test geom interval', function() {
  const data = [
    { a: '1', b: 2, c: '1' },
    { a: '2', b: 5, c: '1' },
    { a: '3', b: 4, c: '1' }
  ];

  const data1 = [
    { a: '1', b: 2, c: '1' },
    { a: '2', b: 5, c: '1' },
    { a: '3', b: 4, c: '1' },
    { a: '1', b: 3, c: '2' },
    { a: '2', b: 1, c: '2' },
    { a: '3', b: 2, c: '2' }
  ];

  scaleA = new Scale.Cat({
    field: 'a',
    values: [ '1', '2', '3' ],
    range: [ 0.2, 0.8 ]
  });

  const geom = new Geom.Interval({
    data,
    coord,
    container: canvas.addGroup(),
    scales: { a: scaleA, b: scaleB, c: scaleC, red: ScaleRed, 10: ScaleTen, pyramid: scaleShapePyramid, funnel: scaleShapeFunnel }
  });
  it('draw interval', function() {
    clearCanvas(canvas);
    expect(geom.get('type')).eql('interval');
    geom.position('a*b').color('c');

    geom.init();
    geom.paint();

  });

  it('size without dodge', function() {
    expect(geom.getSize()).equal(500 / 6);
  });

  it('size test with dodge', function() {
    clearCanvas(canvas);
    geom.reset();
    geom.position('a*b').color('c').adjust('dodge');
    geom.set('data', data1);
    geom.init();
    geom.paint();

    expect(geom.getSize()).equal((500) / 3 / 4);
  });

  it('custom size', function() {
    clearCanvas(canvas);
    geom.reset();
    geom.position('a*b').color('c').size(10);
    geom.set('data', [
      { a: '1', b: 2, c: '1' },
      { a: '2', b: 5, c: '1' },
      { a: '3', b: 4, c: '1' }
    ]);
    geom.init();
    geom.paint();
    expect(geom.getSize()).equal(10);
  });

  it('stack', function() {
    clearCanvas(canvas);
    geom.reset();
    geom.position('a*b').color('c').adjust('stack');
    geom.set('data', data1);
    geom.init();
    geom.paint();
    expect(geom.getSize()).equal(500 / 6);
  });

  it('shape pyramid', function() {
    clearCanvas(canvas);
    geom.reset();
    geom.position('a*b').color('c').adjust('symmetric');
    geom.set('data', data1);
    geom.shape('pyramid');
    geom.init();
    geom.paint();

    const container = geom.get('container');
    const children = container.get('children');
    expect(children.length).equal(6);
    expect(children[0].get('attrs').points.length).equal(4);
    expect(children[children.length - 1].get('attrs').points.length).equal(3);
  });

  it('shape funnel', function() {
    clearCanvas(canvas);
    geom.reset();
    geom.position('a*b').color('c').adjust('symmetric');
    geom.set('data', data1);
    geom.shape('funnel');
    geom.init();
    geom.paint();

    const container = geom.get('container');
    const children = container.get('children');
    expect(children[children.length - 1].get('attrs').points.length).equal(4);
  });

  it('polar coord, draw interval', function() {
    clearCanvas(canvas);
    const coord1 = new Coord.Polar({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 500,
        y: 500
      }
    });
    scaleA.range = [ 1 / 6, 1 - 1 / 6 ];
    geom.set('coord', coord1);
    geom.reset();
    geom.position('a*b');

    geom.init();
    geom.paint();
  });

  it('polar coord dodge size', function() {
    clearCanvas(canvas);
    scaleA.range = [ 0, 1 - 1 / 3 ];
    geom.reset();
    geom.set('data', data1);
    geom.position('a*b').adjust('dodge').color('c');
    geom.init();
    geom.paint();

  });

  it('ploar transpose', function() {
    clearCanvas(canvas);
    scaleA.range = [ 0, 1 - 1 / 6 ];
    geom.get('coord').transposed = true;
    geom.reset();
    geom.position('a*b').color('c').adjust('dodge');
    geom.init();
    geom.paint();
  });

  it('pie', function() {
    const coord1 = new Coord.Polar({
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 500,
        y: 500
      },
      innerRadius: 0.5,
      transposed: true
    });
    clearCanvas(canvas);
    geom.set('coord', coord1);
    geom.reset();
    geom.set('data', data);
    geom.position('c*b').color('a').adjust('stack');
    geom.init();
    geom.paint();

  });

  xit('geom destroy', () => {
    geom.destroy();
    expect(geom.destroyed).equal(true);
  });

});

describe('test polygon', function() {
  const data = [
    { x: [ 1, 2, 2, 1 ], y: [ 0, 0, 2, 1 ] },
    { x: [ 4, 3, 4, 2 ], y: [ 0, 0, 2, 4 ] }
  ];
  const data1 = [{
    a: '1', b: '1', c: 10
  }, {
    a: '2', b: '2', c: 5
  }];
  const scaleX = new Scale.Linear({
    field: 'x',
    min: 0,
    max: 5
  });
  const scaleY = new Scale.Linear({
    field: 'y',
    min: 0,
    max: 5
  });

  const scaleA = new Scale.Cat({
    field: 'a',
    values: [ '1', '2' ]
  });
  const scaleB = new Scale.Cat({
    field: 'b',
    values: [ '1', '2' ]
  });
  const scaleC = new Scale.Linear({
    field: 'c',
    min: 0,
    max: 10
  });
  const geom = new Geom.Polygon({
    data,
    coord,
    container: canvas.addGroup(),
    scales: { x: scaleX, y: scaleY }
  });
  it('test init', () => {
    expect(geom.get('type')).equal('polygon');
    expect(geom.get('generatePoints')).equal(true);
  });

  it('draw', function() {
    clearCanvas(canvas);
    geom.position('x*y');
    geom.init();
    geom.paint();
  });

  it('destroy', function() {
    geom.destroy();
    expect(geom.destroyed).equal(true);
  });

  it('cat', function() {
    clearCanvas(canvas);
    const geom1 = new Geom.Polygon({
      data: data1,
      coord,
      container: canvas.addGroup(),
      scales: { a: scaleA, b: scaleB, c: scaleC }
    });
    geom1.position('a*b').color('c');
    geom1.init();
    geom1.paint();
  });
});

describe('test schema', function() {
  const scaleX = new Scale.Linear({
    field: 'x',
    min: 0,
    values: [ 0, 1, 2, 3, 4, 5 ],
    max: 10
  });
  const scaleY = new Scale.Linear({
    field: 'y',
    min: 0,
    max: 5
  });

  const scaleCandle = new Scale.Identity({
    field: 'candle',
    value: 'candle'
  });


  describe('test candle', function() {
    const data = [
      { x: 1, y: [ 0, 1, 2, 3 ] },
      { x: 2, y: [ 1, 2, 3, 4 ] },
      { x: 3, y: [ 0, 4 ] }
    ];

    const geom = new Geom.Schema({
      data,
      coord,
      container: canvas.addGroup(),
      scales: { x: scaleX, y: scaleY, candle: scaleCandle }
    });

    it('init', function() {
      geom.position('x*y').shape('candle');
      expect(geom.get('type')).equal('schema');
    });

    it('draw', function() {
      clearCanvas(canvas);
      geom.init();
      expect(geom.getNormalizedSize()).equal(1 / 6 / 2);
      geom.paint();

    });

    it('destroy', function() {
      geom.destroy();
      expect(geom.destroyed).equal(true);
      document.body.removeChild(dom);
    });
  });
});
