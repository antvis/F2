const { Shape } = require('../graphic/index');
module.exports = {
  getClip(coord) {
    const start = coord.start;
    const end = coord.end;
    const width = end.x - start.x;
    const height = Math.abs(end.y - start.y);
    const margin = 10;
    let clip;
    if (coord.isPolar) {
      const { circleRadius, center, startAngle, endAngle } = coord;
      clip = new Shape.Sector({
        attrs: {
          x: center.x,
          y: center.y,
          r: circleRadius,
          r0: 0,
          startAngle,
          endAngle
        }
      });
    } else {
      clip = new Shape.Rect({
        attrs: {
          x: start.x,
          y: end.y - margin,
          width,
          height: height + 2 * margin
        }
      });
    }
    clip.isClip = true;
    return clip;
  },
  isPointInPlot(point, plot) {
    const { x, y } = point;
    const { tl, tr, br } = plot;
    return (x >= tl.x && x <= tr.x && y >= tl.y && y <= br.y);
  }
};
