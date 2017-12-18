const expect = require('chai').expect;
const Util = require('../../src/util/common');


describe('test basic util', function() {
  it('test ucfirst', function() {
    const str = 'abc';
    expect(Util.ucfirst(str)).to.be.equal('Abc');
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

    expect(Util.isNull(null)).to.be.equal(true);
    expect(Util.isNull(undefined)).to.be.equal(true);
    expect(Util.isNull(1)).to.be.equal(false);
  });

  it('isNumeric', function() {
    const val = '1234';
    expect(Util.isNumeric(val)).to.be.equal(true);
    expect(Util.isNumeric('abc')).to.be.equal(false);
    expect(Util.isNumeric('123a')).to.be.equal(false);
  });

  it('to array', function() {
    const args = Util.toArray(arguments);
    expect(Util.isArray(args)).to.be.equal(true);
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

  it('frame', function(done) {
    let called = false;
    const callback = function() {
      called = true;
    };

    Util.requestAnimationFrame(callback);
    setTimeout(function() {
      expect(called).to.be.equal(true);
      done();
    }, 20);
  });

  it('clear frame', function(done) {
    let called = false;
    const callback = function() {
      called = true;
    };

    const id = Util.requestAnimationFrame(callback);

    Util.cancelAnimationFrame(id);
    setTimeout(function() {
      expect(called).to.be.equal(false);
      done();
    }, 20);
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
});
