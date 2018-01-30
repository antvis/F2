const expect = require('chai').expect;
const Base = require('../../src/base');

describe('test base', () => {
  it('init', () => {
    const base = new Base({
      a: 'a',
      b: 'b'
    });
    expect(base._attrs).eqls({
      a: 'a',
      b: 'b'
    });
  });
  it('get', () => {
    const base = new Base({
      a: 'a',
      b: 'b'
    });
    expect(base.get('a')).equal('a');
    expect(base.get('b')).equal('b');
    expect(base.get('c')).equal(undefined);
  });
  it('set', () => {
    const base = new Base({
      a: 'a',
      b: 'b'
    });
    base.set('a', 'a1');
    base.set('c', 'c1');
    expect(base.get('a')).equal('a1');
    expect(base.get('b')).equal('b');
    expect(base.get('c')).equal('c1');
  });
  it('destroy', () => {
    const base = new Base({
      a: 'a',
      b: 'b'
    });
    base.destroy();
    expect(base._attrs).eqls({});
    expect(base.destroyed).equal(true);
  });
});
