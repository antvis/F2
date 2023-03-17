import EE from '@antv/event-emitter';
import { Canvas as GCanvas, createCanvas } from '@antv/f2-graphic';
import { deepMix, isFunction } from '@antv/util';
import Component from '../base/component';
import { destroyElement, renderChildren, renderComponent } from '../base/diff';
import equal from '../base/equal';
import Layout from '../base/layout';
import { createUpdater } from '../base/updater';
import defaultTheme from '../theme';
import { batch2hd, px2hd as defaultPx2hd } from '../util';
import Animation from './animation';

export interface ChartProps {
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
  /**
   * 是否横屏
   */
  landscape?: boolean;
  /**
   * @title 每次绘制完成后的回调
   */
  onAfterDraw?: () => void;
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
      landscape,
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
      landscape,
    });

    // 组件更新器
    const updater = createUpdater(this);

    // 供全局使用的一些变量
    const componentContext = {
      root: this,
      ctx: context,
      canvas,
      theme,
      px2hd,
      measureText: measureText(canvas, px2hd),
    };

    // 动画模块
    const animation = new Animation(canvas);

    canvas.on('afterdraw', () => {
      const { onAfterDraw } = this.props;
      onAfterDraw && onAfterDraw();
    });

    this.canvas = canvas;
    this.container = canvas;
    this.context = componentContext;
    this.updater = updater;
    this.animate = animate;
    this.animation = animation;
    this.theme = theme;
    this._ee = new EE();

    this.updateLayout(props);
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

  resize(width?, height?) {
    const { width: canvasWidth, height: canvasHeight } = this.canvas._attrs;
    this.canvas.changeSize(width || canvasWidth, height || canvasHeight);
    // this.canvas.clear();
    // this.children = null;
    this.updateLayout({ ...this.props, width, height });
    this.render();
  }

  updateLayout(props) {
    const { width: canvasWidth, height: canvasHeight } = this.canvas._attrs;
    const style = this.context.px2hd({
      left: 0,
      top: 0,
      width: props?.width || canvasWidth,
      height: props?.height || canvasHeight,
      padding: this.theme.padding,
      ...props.style,
    });
    this.layout = Layout.fromStyle(style);

    this.context = {
      ...this.context,
      left: this.layout.left,
      top: this.layout.top,
      width: this.layout.width,
      height: this.layout.height,
    };
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
    const { canvas, children } = this;
    destroyElement(children);
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
