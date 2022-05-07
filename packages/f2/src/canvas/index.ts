import { createCanvas, Canvas as GCanvas } from '@antv/f2-graphic';
import { deepMix, isFunction } from '@antv/util';
import Component from '../base/component';
import Layout from '../base/layout';
import equal from '../base/equal';
import Animation from './animation';
import { px2hd as defaultPx2hd, batch2hd } from '../util';
import { createUpdater } from '../base/updater';
import defaultTheme from '../theme';
import { renderChildren, renderComponent } from '../base/diff';
import EE from '@antv/event-emitter';

interface ChartProps {
  context?: CanvasRenderingContext2D;
  pixelRatio?: number;
  width?: number | string;
  height?: number | string;
  padding?: number | string | (number | string)[];
  animate?: boolean;
  children?: any;
  px2hd?: any;
  theme?: any;
  style?: any;
  createImage?: () => HTMLImageElement;
}

function measureText(canvas, px2hd) {
  return (text: string, font?) => {
    const { fontSize, fontFamily, fontStyle, fontWeight, fontVariant } = font || {};
    const shape = canvas.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        fontSize: px2hd(fontSize),
        fontFamily,
        fontStyle,
        fontWeight,
        fontVariant,
        text,
      },
    });
    const { width, height } = shape.getBBox();
    shape.remove(true);
    return {
      width,
      height,
    };
  };
}

// 顶层Canvas标签
class Canvas extends Component<ChartProps> {
  canvas: GCanvas;
  container: GCanvas;
  animation?: Animation;
  layout: Layout;
  theme: any;

  private _ee: EE;

  constructor(props: ChartProps) {
    super(props);
    const {
      context,
      pixelRatio,
      width,
      height,
      animate = true,
      px2hd: customPx2hd,
      theme: customTheme,
      style: customStyle,
      createImage,
    } = props;

    const px2hd = isFunction(customPx2hd) ? batch2hd(customPx2hd) : defaultPx2hd;
    const theme = px2hd(deepMix({}, defaultTheme, customTheme));

    // 创建G的canvas
    const canvas = createCanvas({
      context,
      pixelRatio,
      fontFamily: theme.fontFamily,
      width,
      height,
      createImage,
    });

    const { width: canvasWidth, height: canvasHeight } = canvas._attrs;

    const style = px2hd({
      left: 0,
      top: 0,
      width: canvasWidth,
      height: canvasHeight,
      padding: theme.padding,
      ...customStyle,
    });

    const layout = Layout.fromStyle(style);

    // 组件更新器
    const updater = createUpdater(this);

    // 供全局使用的一些变量
    const componentContext = {
      root: this,
      canvas,
      left: layout.left,
      top: layout.top,
      width: layout.width,
      height: layout.height,
      theme,
      px2hd,
      measureText: measureText(canvas, px2hd),
    };

    // 动画模块
    const animation = new Animation(canvas);

    this.canvas = canvas;
    this.container = canvas;
    this.layout = layout;
    this.context = componentContext;
    this.updater = updater;
    this.animate = animate;
    this.animation = animation;
    this.theme = theme;
    this._ee = new EE();
  }

  renderComponents(components: Component[]) {
    if (!components || !components.length) {
      return;
    }
    renderComponent(components);
    this.draw();
  }

  update(nextProps: ChartProps) {
    const { props } = this;
    if (equal(nextProps, props)) {
      return;
    }
    this.props = nextProps;
    this.render();
  }

  draw() {
    const { canvas, animate } = this;
    if (animate === false) {
      canvas.draw();
      return;
    }
    this.play();
  }

  play() {
    const { canvas, animation } = this;
    // 执行动画
    animation.abort();
    animation.play(canvas, () => {
      this.emit('animationEnd');
    });
  }

  render() {
    const { children: lastChildren, props } = this;
    const { children: nextChildren } = props;
    renderChildren(this, nextChildren, lastChildren);
    this.draw();
    return null;
  }

  destroy() {
    const { canvas } = this;
    canvas.destroy();
  }

  on(type: string, listener) {
    this._ee.on(type, listener);
  }

  emit(type: string, event?: any) {
    this._ee.emit(type, event);
  }

  off(type: string, listener?) {
    this._ee.off(type, listener);
  }
}

export default Canvas;
