import * as ColorUtil from '../../../src/attr/color-util';

const expect = require('chai').expect;

describe('color util test', function() {
  it('color to rgb', () => {
    expect(ColorUtil.toHex('red')).equal('#ff0000');
    expect(ColorUtil.toHex('white')).equal('#ffffff');
    expect(ColorUtil.toHex('#ddd')).equal('#dddddd');
    expect(ColorUtil.toHex('#eeeeee')).equal('#eeeeee');
  });
  it('color to rgb with rgb(r,g,b)', () => {
    expect(ColorUtil.toHex('rgb(255,0, 0)')).equal('#ff0000');
    expect(ColorUtil.toHex('rgba(255,0, 0, 1)')).equal('#ff0000');
  });

  it('gradient white black', () => {
    const gradient = ColorUtil.gradient([ 'white', 'black' ]);
    expect(gradient(0)).equal('#ffffff');
    expect(gradient(1)).equal('#000000');
    expect(gradient(0.5)).equal('#808080');
  });

  it('gradient red blue', () => {
    const gradient = ColorUtil.gradient([ 'red', 'blue' ]);
    expect(gradient(0)).equal('#ff0000');
    expect(gradient(1)).equal('#0000ff');
    expect(gradient(0.5)).equal('#800080');
  });
});
