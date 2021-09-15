import { createCanvas } from '@ali/f2-graphic';
import createComponentTree from './createComponentTree';
import Component from '../base/component';
import Container from '../base/container';
import Layout from '../base/layout';
import equal from '../base/equal';
import Animation from './animation';
import { px2hd } from '../util';
import { createUpdater } from './updater';

interface ChartUpdateProps {
  pixelRatio?: number,
  width?: number | string,
  height?: number | string,
  padding?: (number | string)[],
  animate?: boolean,
  children?: any
}

interface ChartProps extends ChartUpdateProps {
  context: any,
}

interface IF2Canvas {
  container: any; 
}

// 顶层Canvas标签
class Canvas extends Component implements IF2Canvas {
  canvas: any;
  context: CanvasRenderingContext2D;
  component: Container;
  componentTree: any;
  animation?: Animation;

  constructor(props: ChartProps) {
    super(props);
    const { context, pixelRatio, width, height, animate = true, children } = props;
    this.context = context;

    // 创建G的canvas
    const canvas = createCanvas({
      context,
      pixelRatio,
      width,
      height,
    });

    const {
      width: canvasWidth,
      height: canvasHeight
    } = canvas._attrs;

    // 初始化默认的布局
    const layout = new Layout({
      width: canvasWidth,
      height: canvasHeight
    });

    const updater = createUpdater(this);

    const componentTree = createComponentTree(children, { canvas: this, width: canvasWidth, height: canvasHeight, context, layout });
    const component = new Container({ children: componentTree, animate }, {}, updater);
    component.init({ layout, container: canvas });

    this.canvas = canvas;
    this.container = canvas;
    this.component = component;
    this.layout = layout;

    // 实例化动画模块
    this.animation = animate ? new Animation(canvas) : null;
    this.componentTree = componentTree;

    this.willMount();
    this.mount();
  }

  willMount() {
    const { __mounted, component } = this;
    if (__mounted) {
      return;
    }
    component.willMount();
  }

  mount() {
    const { __mounted, component } = this;
    if (__mounted) {
      return;
    }
    component.mount();
    component.__mounted = true;
  }

  draw() {
    const { canvas, container, animation } = this;
    // 执行动画
    if (animation) {
      animation.abort();
      animation.play(container);
    } else {
      canvas.draw();
    }
  }

  render() {
    const { component } = this;

    component.render();
    this.draw();
    return null;
  }

  update(props: ChartUpdateProps) {
    const { component, canvas, animation, layout } = this;
    // 只处理数据，和children的变化
    const { children } = props;

    const {
      width,
      height,
      context,
    } = canvas._attrs;

    const componentTree = createComponentTree(children, { canvas: this, width, height, context, layout });

    if (equal(this.componentTree, componentTree)) {
      return;
    }

    component.update({ children: componentTree });
    this.render();
  }

  destroy() {
    const { component } = this;
    component.destroy();
  }

  px2hd = px2hd

  measureText(text, font) {
    const { context } = this;
    const {
      fontSize = 12,
      fontFamily = 'normal',
      fontStyle = 'normal',
      fontWeight = 'normal',
      fontVariant = 'normal',
    } = this.px2hd(font);
  
    context.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
    return context.measureText(text);
  }
}

export default Canvas;
