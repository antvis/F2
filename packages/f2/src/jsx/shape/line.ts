export default (layout) => {
  const { left, top, width, height } = layout;
  return {
    x1: left,
    y1: top,
    x2: left + width,
    y2: top + height,
  };
};
