export default (layout) => {
  const { left, top, width } = layout;
  const r = width / 2;
  return {
    x: left + r,
    y: top + r,
    r,
  };
};
