export default (layout) => {
  const { left, top, width, height } = layout;
  return {
    x: left,
    y: top,
    width,
    height,
  };
};
