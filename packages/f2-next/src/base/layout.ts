import { mix } from '@antv/util';

interface LayoutProps {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

interface Style {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
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

    return this;
  }

  padding(style: Style) {
    if (!style) {
      return this;
    }
    const {
      top: paddingTop = 0,
      right: paddingRight = 0,
      bottom: paddingBottom = 0,
      left: paddingLeft = 0,
    } = style;
    const { top, right, bottom, left } = this;
    this.top = top + paddingTop;
    this.right = right - paddingRight;
    this.bottom = bottom - paddingBottom;
    this.left = left + paddingLeft;

    this.width = this.right - this.left;
    this.height = this.bottom - this.top;

    return this;
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

  static fromStyle(style) {
    const { left, top, width, height, padding } = style;
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    return new Layout({
      left: left + paddingLeft,
      top: top + paddingTop,
      width: width - paddingLeft - paddingRight,
      height: height - paddingTop - paddingBottom,
    });
  }
}

export default Layout;
export { LayoutProps };
