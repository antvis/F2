import equal from '../../src/base/equal';

describe('equal', () => {
  it('equal', () => {
    expect(equal(0, 0)).toBe(true);
    expect(equal(0, 2)).toBe(false);
    expect(equal(NaN, NaN)).toBe(true);

    expect(equal(null, null)).toBe(true);
    expect(equal(null, undefined)).toBe(false);
    expect(equal(undefined, undefined)).toBe(true);

    // 方法默认都相等，不然在jsx里只要存在方法，就是不同
    expect(
      equal(
        () => {},
        () => {
          console.log(1);
        }
      )
    ).toBe(true);

    expect(equal([1, 2], [1, 2])).toBe(true);
    expect(equal([1, 2], [1, 3])).toBe(false);

    expect(equal({ a: 1 }, { a: 1 })).toBe(true);
    expect(equal({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(equal({ a: 1, b: 2 }, { a: 1, b: NaN })).toBe(false);
  });
});
