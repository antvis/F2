import Category from '../../src/attr/category';

const domain = [
  { name: 'dog' },
  { name: 'cat' },
  { name: 'pig' },
  { name: 'dolpin' },
  { name: 'tiger' },
  { name: 'panda' },
]; // 定义域
const range = ['#1677FF', '#FF9F18', '#00B7F4', '#FF6430', '#F433C', '#7F12CC']; // 值域

describe('attr/category', () => {
  it('正常case', () => {
    const color = new Category({
      field: 'name',
      range,
      data: domain,
    });

    const y1 = color.mapping(domain[0].name);
    const y2 = color.mapping(domain[1].name);
    const y3 = color.mapping(domain[2].name);
    expect(y1).toBe('#1677FF');
    expect(y2).toBe('#FF9F18');
    expect(y3).toBe('#00B7F4');
  });
});
