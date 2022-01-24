export default (layout) => {
  const { height, left, top } = layout;
  return {
    x: left,
    y: top + height / 2,
    // 通过middle + top 才能比较好的实现文本对齐
    textBaseline: 'middle',
  };
};
