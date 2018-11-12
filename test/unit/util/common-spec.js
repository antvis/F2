const expect = require('chai').expect;
const Util = require('../../../src/util/common');

describe('test basic util', function() {
  it('test upperFirst', function() {
    const str = 'abc';
    expect(Util.upperFirst(str)).to.be.equal('Abc');
  });

  it('type', function() {
    expect(Util.isString('123')).to.be.equal(true);
    expect(Util.isString(123)).to.be.equal(false);

    expect(Util.isNumber(123)).to.be.equal(true);
    expect(Util.isNumber('123')).to.be.equal(false);

    expect(Util.isObject({})).to.be.equal(true);

    expect(Util.isFunction(123)).to.be.equal(false);

    const a = function() {};
    expect(Util.isFunction(a)).to.be.equal(true);

    expect(Util.isArray([])).to.be.equal(true);

    expect(Util.isBoolean(true)).to.be.equal(true);

    expect(Util.isDate(new Date())).to.be.equal(true);

    expect(Util.isNil(null)).to.be.equal(true);
    expect(Util.isNil(undefined)).to.be.equal(true);
    expect(Util.isNil(1)).to.be.equal(false);
  });

  it('simple mix', function() {
    const a = {
      a: 123
    };
    const b = {
      b: 'b'
    };

    Util.mix(a, b);
    expect(a.b).to.be.equal(b.b);

  });

  it('deep mix', function() {
    const test = {
      a: 1,
      b: [ 1, 2, 'c' ],
      c: {
        x: 1,
        y: 2
      }
    };
    const testMix = Util.deepMix({}, test, {
      c: {
        z: 1
      },
      e: {
        f: 1,
        g: 3
      },
      b: [ 3 ]

    });
    expect(testMix.a).equal(1);
    expect(testMix.b.length).to.be.equal(1);
    expect(testMix.c.z).equal(1);
    expect(testMix.c.y).equal(2);
  });

  it('test mix prototype', function() {
    const A = function(a) {
      this.a = a;
    };
    const b = {
      b: 'b'
    };

    A.prototype.c = 'c';
    const a = new A('123');

    Util.mix(b, a);
    expect(b.c).to.be.equal(undefined);
  });

  it('each obj', function() {
    const a = {
      a: 'a',
      b: 'b'
    };

    let num = 0;
    Util.each(a, function() {
      num++;
    });
    expect(num).to.be.equal(2);
  });

  it('each array', function() {
    const a = [ 1, 2, 3 ];

    let num = 0;
    Util.each(a, function() {
      num++;
    });

    expect(num).to.be.equal(a.length);
  });


  it('test deep mix', function() {
    const obj = {
      a: {
        b: {
          c: {

          }
        }
      },
      a1: '1',
      a2: '2'
    };
    const src = {
      a: {
        b: {
          c: {
            d: 'd'
          },
          c1: 'c1'
        },
        b1: 'b1'
      },
      a1: 'a1'
    };
    Util.deepMix(obj, src);

    expect(obj.a2).to.be.equal('2');
    expect(obj.a1).to.be.equal('a1');
    expect(obj.a.b.c.d).to.be.equal('d');
  });

  it('mix circle', function() {
    const a = {
      a1: 123,
      a2: 234
    };
    const b = {
      b1: 222,
      b2: a
    };

    a.a3 = b;
    const obj = Util.deepMix({}, b);
    expect(obj.b2).not.to.be.equal(a);
  });

  it('parsePadding', function() {
    expect(Util.parsePadding('auto')).to.be.eql([ 'auto', 'auto', 'auto', 'auto' ]);
    expect(Util.parsePadding(10)).to.be.eql([ 10, 10, 10, 10 ]);
    expect(Util.parsePadding([ 10 ])).to.be.eql([ 10, 10, 10, 10 ]);
    expect(Util.parsePadding([ 10, 19 ])).to.be.eql([ 10, 19, 10, 19 ]);
    expect(Util.parsePadding([ 10, 19, 29 ])).to.be.eql([ 10, 19, 29, 19 ]);
  });

  it('directionEnabled', function() {
    expect(Util.directionEnabled('xy', 'x')).to.be.true;
    expect(Util.directionEnabled('xy', 'e')).to.be.false;
    expect(Util.directionEnabled(undefined, 'e')).to.be.true;
    expect(Util.directionEnabled({}, 'e')).to.be.false;
  });
});
