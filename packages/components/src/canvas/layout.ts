interface updateLayout {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

class Layout {
  width: number;
  height: number;
  left = 0;
  top = 0;
  right: number;
  bottom: number;

  constructor({ left = 0, top = 0, width, height }) {
    this.left = left;
    this.top = top;
    this.right = left + width;
    this.bottom = top + height;
    this.width = width;
    this.height = height;
  }

  update(layout: updateLayout) {
    Object.keys(layout).forEach(key => {
      const current = this[key];
      const value = layout[key] || 0;
      this[key] = current + value;
    });
    this.width = this.right - this.left;
    this.height = this.bottom - this.top;
  }

  clone() {
    const { left, top, width, height } = this;
    return new Layout({
      left,
      top,
      width,
      height
    });
  }
}

export default Layout;
