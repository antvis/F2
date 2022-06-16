import { CanvasRenderer, Canvas } from '@antv/f-engine';
import { deepMix } from '@antv/util';
import Layout from './base/layout';
import defaultTheme from './theme';
import { px2hd as defaultPx2hd, batch2hd } from './util';

class f2Canvas extends Canvas {
  layout: Layout;

  constructor(props) {
    const theme = deepMix({}, defaultTheme, props.theme);
    props = {
      ...props,
      px2hd: props.px2hd ? batch2hd(props.px2hd) : defaultPx2hd,
      renderer: props.renderer || new CanvasRenderer(),
      theme,
    };
    super(props);

    const { style: customStyle, px2hd } = props;
    const { width: canvasWidth, height: canvasHeight } = this.getCanvasConfig();

    const style = px2hd({
      left: 0,
      top: 0,
      width: canvasWidth,
      height: canvasHeight,
      padding: theme.padding,
      ...customStyle,
    });

    const layout = Layout.fromStyle(style);
    this.layout = layout;

    this.setContext({
      left: layout.left,
      top: layout.top,
      width: layout.width,
      height: layout.height,
    });
  }
}

export { f2Canvas };
