import Layout from '../base/layout';

interface Style {
  left: number;
  top: number;
  width: number;
  height: number;
  padding: number[];
}

class LayoutController {
  private layout: Layout;

  private getRectRange(style: Style) {
    const { left, top, width, height, padding } = style;
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    return {
      left: left + paddingLeft,
      top: top + paddingTop,
      width: width - paddingLeft - paddingRight,
      height: height - paddingTop - paddingBottom,
    };
  }

  create(style: Style) {
    const rectRange = this.getRectRange(style);
    const layout = new Layout(rectRange);
    this.layout = layout;
    return layout;
  }

  update(style: Style) {
    const rectRange = this.getRectRange(style);
    const { layout } = this;
    layout.update(rectRange);
    return layout;
  }
}

export default LayoutController;
