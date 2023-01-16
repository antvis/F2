import { px2hd } from '../../src/util/index';

describe('px2hd', () => {
  it('px2hd', () => {
    expect(px2hd('')).toBe('');
    expect(px2hd('0')).toBe('0');
    expect(px2hd(0)).toBe(0);
    expect(px2hd(1)).toBe(1);
    expect(px2hd('10px')).toBe(5);
    expect(px2hd('10.0px')).toBe(5);
    expect(px2hd('10.00px')).toBe(5);
    expect(px2hd('10.px')).toBe('10.px');
  });
});
