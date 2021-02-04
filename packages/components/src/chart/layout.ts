interface updateLayout {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

class Layout {
  chart: any;
  width: number;
  height: number;
  left = 0;
  top = 0;
  right: number;
  bottom: number;

  constructor({ chart, width, height }) {
    this.chart = chart;
    this.width = width;
    this.height = height;
    this.right = width;
    this.bottom = height;
  }

  update(layout: updateLayout) {
    Object.keys(layout).forEach(key => {
      const current = this[key];
      const value = layout[key] || 0;
      this[key] = current + value;
    });
    const { left, top, right, bottom, width, height } = this;
    this.chart._updateLayout([ top, width - right, height - bottom, left ]);
  }
}

export default Layout;
