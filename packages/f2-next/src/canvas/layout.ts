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

  constructor({ left = 0, top = 0, right = 0, bottom = 0 }) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.width = right - left;
    this.height = bottom - top;
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

  reset(layout) {
    Object.keys(layout).forEach(key => {
      const value = layout[key] || 0;
      this[key] = value;
    });
    const { left, top, right, bottom } = this;
    this.width = right - left;
    this.height = bottom - top;
  }

  clone() {
    const { left, top, right, bottom } = this;
    return new Layout({
      left,
      top,
      right,
      bottom
    });
  }
}

export default Layout;
