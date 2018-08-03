module.exports = {
  isPointInPlot(point, plot) {
    const { x, y } = point;
    const { tl, tr, br } = plot;
    return (x >= tl.x && x <= tr.x && y >= tl.y && y <= br.y);
  }
};
