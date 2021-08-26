import { mix } from '@antv/util';

interface LayoutProps {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

class Layout {
  left = 0;
  top = 0;
  width = 0;
  height = 0;
  right: number;
  bottom: number;

  constructor(layout: LayoutProps) {
    this.update(layout);
  }

  update(layout: LayoutProps) {
    mix(this, layout);
    const { left, top, width, height } = this;
    this.right = left + width;
    this.bottom = top + height;
  }

  clone() {
    const { left, top, width, height } = this;
    return new Layout({
      left,
      top,
      width,
      height,
    });
  }
}

export default Layout;
export { LayoutProps };
