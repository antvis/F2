// @ts-nocheck
import { createCanvas } from '@ali/f2-graphic';
import createComponentTree from './createComponentTree';
import Component from '../base/component';
import Container from '../base/container';
import Timeline from '../timeline';
import Layout from '../base/layout';
import equal from '../base/equal';
import Animation from './animation';
import { px2hd as defaultPx2hd } from '../util';
import { createUpdater } from './updater';
import { Children } from '..';
import { isArray } from '@antv/util';
import theme from '../theme';
import { renderChildren, renderComponent } from '../base/diff';

interface ChartUpdateProps {
  pixelRatio?: number;
  width?: number | string;
  height?: number | string;
  padding?: (number | string)[];
  animate?: boolean;
  children?: any;
}

interface ChartProps extends ChartUpdateProps {
  context: any;
}

interface IF2Canvas {
  container: any;
}

function measureText(canvas, px2hd) {
  return (text: string, font) => {
    const { fontSize, fontFamily, fontStyle, fontWeight, fontVariant } = font;
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
class Canvas extends Component implements IF2Canvas {
  canvas: any;
  animation?: Animation;

  constructor(props: ChartProps) {
    super(props);
    const {
      context,
      pixelRatio,
      width,
      height,
      animate = true,
      children,
      px2hd = defaultPx2hd,
    } = props;

    // 创建G的canvas
    const canvas = createCanvas({
      context,
      pixelRatio,
      width,
      height,
    });

    const { width: canvasWidth, height: canvasHeight } = canvas._attrs;

    // 初始化默认的布局
    const layout = new Layout({
      width: canvasWidth,
      height: canvasHeight,
    });

    // 组件更新器
    const updater = createUpdater(this);

    // 供全局使用的一些变量
    const componentContext = {
      canvas,
      width: canvasWidth,
      height: canvasHeight,
      theme: px2hd(theme),
      px2hd,
      measureText: measureText(canvas, px2hd),
    };

    // 动画模块
    const animation = animate ? new Animation(canvas) : null;

    this.canvas = canvas;
    this.container = canvas;
    this.layout = layout;
    this.context = componentContext;
    this.updater = updater;
    this.global = global;
    this.animation = animation;
  }

  renderComponents(components: Component[]) {
    if (!components || !components.length) {
      return;
    }
    renderComponent(components);
    this.draw();
  }

  update(nextProps) {
    const { props } = this;
    if (equal(nextProps, props)) {
      return;
    }
    this.props = nextProps;
    this.render();
  }

  draw() {
    const { canvas, animation, props, children } = this;
    if (!animation) {
      canvas.draw();
      return;
    }
    // 查找timeline
    const timeline = Timeline.find(children);
    const { onAnimationEnd } = props;
    // 执行动画
    animation.abort();
    animation.play(canvas, () => {
      if (!timeline || !timeline.next()) {
        onAnimationEnd && onAnimationEnd();
      }
    });
  }

  render() {
    const { children: lastChildren, props } = this;
    const { children: nextChildren } = props;
    renderChildren(this, nextChildren, lastChildren);
    this.draw();
    return null;
  }
}

export default Canvas;
