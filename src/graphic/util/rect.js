const Rect = {
  calcRotatedBox({ width, height, rotate }) {
    const absRotate = Math.abs(rotate);
    return {
      width: Math.abs(width * Math.cos(absRotate) + height * Math.sin(absRotate)),
      height: Math.abs(height * Math.cos(absRotate) + width * Math.sin(absRotate))
    };
  }
};

module.exports = Rect;

