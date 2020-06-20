import F2 from '.';

// === Util ===
F2.Util.isArray([]);
// @ts-expect-error
F2.Util.lowerFirst(2);
F2.Util.mix<{
  x: number;
  y: string;
}>({ x: 1, y: '' }, { x: 1 }, {}, { y: '2' });
// @ts-expect-error
F2.Util.mix({}, {}, {}, {}, {});
