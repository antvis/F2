import F2 from '..';

// ==== Util ====
F2.Util.isArray([]);
// @ts-expect-error
F2.Util.lowerFirst(2);
F2.Util.mix<{
  x: number;
  y: string;
}>({ x: 1, y: '' }, { x: 1 }, {}, { y: '2' });
// @ts-expect-error
F2.Util.mix({}, {}, {}, {}, {});
F2.Util.each([1, 2], (value, index) => {
  console.log(1 + value + index);
});
F2.Util.each({ x: 1, y: '2' }, (value, key) => {
  // @ts-expect-error
  console.log(1 + value + key);
});
