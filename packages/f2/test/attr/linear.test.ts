import Linear from '../../src/attr/linear';

const domain = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }]; // 定义域
const range = [0, 100]; // 值域

describe('attr/category', () => {
  it('正常case', () => {
    const linear = new Linear({
      field: 'value',
      data: domain,
      range,
    });

    // 批量映射
    const batchMappingResult = linear.mapping([1, 2, 3, 4, 5, 6]);
    expect(batchMappingResult.length).toBe(6);

    // 单值映射
    const singleMappingResult1 = linear.mapping(1);
    const singleMappingResult2 = linear.mapping(6);
    expect(singleMappingResult1).toBe(0);
    expect(singleMappingResult2).toBe(100);
  });
});
