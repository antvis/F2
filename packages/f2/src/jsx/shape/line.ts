export default (layout) => {
  const { left, top, width, height } = layout;
  const halfHeight = height / 2;
  return {
    x1: left,
    y1: top + halfHeight,
    x2: left + width,
    y2: top + halfHeight,
    lineWidth: height,
  };
};
