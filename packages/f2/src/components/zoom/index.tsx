import Component from '../../base/component';
import { ChartChildProps } from '../../chart';
import { updateRange, updateFollow } from './zoomUtil';
import { Scale, ScaleConfig } from '@antv/scale';
import { each } from '@antv/util';

export type ZoomRange = [number, number];
export type ScaleValues = number[] | string[];

export interface ZoomProps extends ChartChildProps {
  sensitive?: number;
  /**
   * 缩放和平移模式
   */
  mode?: 'x' | 'y' | ['x', 'y'] | null;
  /**
   * 显示的范围
   */
  range?: ZoomRange;
  /**
   * 平移
   */
  pan?: boolean;
  /**
   * 缩放
   */
  pinch?: boolean;
  /**
   * 横扫
   */
  swipe?: boolean;
  /**
   * 事件回调
   */
  onPanStart?: Function;
  onPinchStart?: Function;
  onPan?: Function;
  onPinch?: Function;
  onPanEnd?: Function;
  onPinchEnd?: Function;
  /**
   * 自动同步 x/y 的坐标值
   */
  autoFit?: boolean;
  /**
   * 最少展示数据量，用于控制最小缩放比例, 默认是10
   */
  minCount?: number;
  /**
   * 漫游模式
   */
  roam?: boolean;
}

export interface ZoomState {
  range: {
    x?: ZoomRange;
    y?: ZoomRange;
  };
}

const MIN_COUNT = 10;

function cloneScale(scale: Scale, scaleConfig?: ScaleConfig) {
  // @ts-ignore
  return new scale.constructor({
    // @ts-ignore
    ...scale.__cfg__,
    ...scaleConfig,
  });
}

// 缩放
class Zoom<P extends ZoomProps = ZoomProps, S extends ZoomState = ZoomState> extends Component<
  P,
  S
> {
  startRange: {
    x?: ZoomRange;
    y?: ZoomRange;
  };
  scale: {} = {};
  originScale: {} = {};
  // 最小的缩放比例
  minScale: number;
  dims: Array<String>;

  constructor(props: P) {
    const defaultProps = {
      onPanStart: () => {},
      onPinchStart: () => {},
      onPan: () => {},
      onPinch: () => {},
      onPanEnd: () => {},
      onPinchEnd: () => {},
    };
    super({ ...defaultProps, ...props });
    const { range = [0, 1], mode } = props;

    this.dims = mode instanceof Array ? mode : [mode];
    let cacheRange = {};
    each(this.dims, (dim) => {
      cacheRange[dim] = range;
    });

    // cacheRange['y'] = [0, 1];
    this.state = {
      range: cacheRange,
    } as S;
  }

  didMount(): void {
    this._bindEvents();
  }

  willMount(): void {
    const { props, dims, state } = this;
    // const { minCount } = props;
    const { range } = state;
    each(dims, (dim) => {
      const scale = this._getScale(dim);
      this.scale[dim] = scale;
      this.originScale[dim] = cloneScale(scale);

      this.updateRange(range[dim], dim);
    });

    // 图表上最少显示 MIN_COUNT 个数据
  }

  didUnmount(): void {
    this._clearEvents();
  }

  onStart = () => {
    const { state } = this;
    const { range } = state;
    this.startRange = range;
  };

  onPan = (ev) => {
    const { dims } = this;
    each(dims, (dim) => {
      if (dim === 'x') {
        this._doXPan(ev);
        return;
      }
      if (dim === 'y') {
        this._doYPan(ev);
        return;
      }
    });
    console.log('end', this.state.range);
  };

  onSwipe = (ev) => {
    // TODO: 定义
  };

  onPinch = (ev) => {
    const { dims } = this;
    each(dims, (dim) => {
      if (dim === 'x') {
        this._doXPinch(ev);
        return;
      }
      if (dim === 'y') {
        this._doYPinch(ev);
        return;
      }
    });
  };

  onEnd = () => {
    this.startRange = null;
  };

  _doXPan(ev) {
    const { direction, deltaX } = ev;
    if (this.props.mode.length === 1 && (direction === 'up' || direction === 'down')) {
      return;
    }
    ev.preventDefault && ev.preventDefault();

    const { props } = this;
    const { coord, sensitive = 1 } = props;
    const { width: coordWidth } = coord;
    const ratio = (deltaX / coordWidth) * sensitive;

    this._doPan(ratio, ['x']);
  }

  _doYPan(ev) {
    const { direction, deltaY } = ev;
    if (this.props.mode.length === 1 && (direction === 'left' || direction === 'right')) {
      return;
    }
    ev.preventDefault && ev.preventDefault();

    const { props } = this;
    const { coord, sensitive = 1 } = props;
    const { height: coordHeight } = coord;
    const ratio = (-deltaY / coordHeight) * sensitive;
    this._doPan(ratio, ['y']);
  }

  _doPan(ratio: number, dims: string[]) {
    const { startRange } = this;
    each(dims, (dim) => {
      const [start, end] = startRange[dim];
      const rangeLen = end - start;
      const rangeOffset = rangeLen * ratio;
      const newStart = start - rangeOffset;
      const newEnd = end - rangeOffset;
      this.updateRange([newStart, newEnd], dim);
    });
  }

  _doXPinch(ev) {
    ev.preventDefault && ev.preventDefault();
    const { zoom, center } = ev;
    const { props } = this;
    const { coord } = props;
    const { width: coordWidth, left, right } = coord;

    const leftLen = Math.abs(center.x - left);
    const rightLen = Math.abs(right - center.x);

    // 计算左右缩放的比例
    const leftZoom = leftLen / coordWidth;
    const rightZoom = rightLen / coordWidth;
    this._doPinch(leftZoom, rightZoom, zoom, ['x']);
  }

  _doYPinch(ev) {
    ev.preventDefault && ev.preventDefault();
    const { zoom, center } = ev;
    const { props } = this;
    const { coord } = props;
    const { height: coordHeight, top, bottom } = coord;

    const topLen = Math.abs(center.y - top);
    const bottomLen = Math.abs(bottom - center.y);

    // 计算左右缩放的比例
    const topZoom = topLen / coordHeight;
    const bottomZoom = bottomLen / coordHeight;
    this._doPinch(topZoom, bottomZoom, zoom, ['y']);
  }

  _doPinch(startRatio: number, endRatio: number, zoom: number, dims: string[]) {
    const { startRange, minScale } = this;
    each(dims, (dim) => {
      const [start, end] = startRange[dim];

      const zoomOffset = 1 - zoom;
      const rangeLen = end - start;
      const rangeOffset = rangeLen * zoomOffset;

      const startOffset = rangeOffset * startRatio;
      const endOffset = rangeOffset * endRatio;

      const newStart = Math.max(0, start - startOffset);
      const newEnd = Math.min(1, end + endOffset);

      const newRange: ZoomRange = [newStart, newEnd];
      // 如果已经到了最小比例，则不能再继续再放大
      if (newEnd - newStart < minScale) {
        return;
      }
      this.updateRange(newRange, dim);
    });
  }

  updateRange(originalRange: ZoomRange, dim) {
    if (!originalRange) return;
    const [start, end] = originalRange;
    const rangeLength = end - start;
    // 处理边界值
    let newRange: ZoomRange;
    if (start < 0) {
      newRange = [0, rangeLength];
    } else if (end > 1) {
      newRange = [1 - rangeLength, 1];
    } else {
      newRange = originalRange;
    }

    const { props, scale, originScale, state } = this;
    const { chart, data, autoFit } = props;
    const { range } = state;
    // 更新主 scale

    updateRange(scale[dim], originScale[dim], newRange);
    range[dim] = newRange;
    if (autoFit) {
      const followScale = this._getFollowScales(dim);

      this.updateFollow(followScale, scale[dim], data);
    }

    this.setState({
      range,
    } as S);

    // 手势变化不执行动画
    const { animate } = chart;
    chart.setAnimate(false);
    chart.forceUpdate(() => {
      chart.setAnimate(animate);
    });
  }

  updateFollow(scales: Scale[], mainScale: Scale, data: any[]) {
    updateFollow(scales, mainScale, data);
  }

  _getScale(dim) {
    const { coord, chart } = this.props;
    if (dim === 'x') {
      return coord.transposed ? chart.getYScales()[0] : chart.getXScales()[0];
    } else {
      return coord.transposed ? chart.getXScales()[0] : chart.getYScales()[0];
    }
  }

  _getFollowScales(dim) {
    const { coord, chart } = this.props;
    if (dim === 'x') {
      return coord.transposed ? chart.getXScales() : chart.getYScales();
    }
    if (dim === 'y') {
      return coord.transposed ? chart.getYScales() : chart.getXScales();
    }
  }

  _bindEvents() {
    const { context, props } = this;
    const { canvas } = context;
    const {
      pan,
      pinch,
      swipe,
      onPanStart,
      onPan,
      onPanEnd,
      onPinch,
      onPinchStart,
      onPinchEnd,
    } = props;
    // 统一绑定事件
    if (pan !== false) {
      canvas.on('panstart', () => {
        onPanStart();
        this.onStart();
      });
      canvas.on('pan', (ev) => {
        onPan();
        this.onPan(ev);
      });
      canvas.on('panend', () => {
        console.log(this.state.range);
        onPanEnd();
        this.onEnd();
      });
    }

    if (pinch !== false) {
      canvas.on('pinchstart', () => {
        onPinchStart();
        this.onStart();
      });
      canvas.on('pinch', (ev) => {
        onPinch();
        this.onPinch(ev);
      });
      canvas.on('pinchend', () => {
        onPinchEnd();
        this.onEnd();
      });
    }

    if (swipe !== false) {
      canvas.on('swipe', this.onSwipe);
    }
  }

  _clearEvents() {
    const { context, props } = this;
    const { canvas } = context;
    const {
      pan,
      pinch,
      swipe,
      onPanStart,
      onPan,
      onPanEnd,
      onPinch,
      onPinchEnd,
      onPinchStart,
    } = props;
    // 统一解绑事件
    if (pan !== false) {
      canvas.off('panstart', () => {
        onPanStart();
        this.onStart();
      });
      canvas.off('pan', (ev) => {
        onPan();
        this.onPan(ev);
      });
      canvas.off('panend', () => {
        onPanEnd();
        this.onEnd();
      });
    }
    if (pinch !== false) {
      canvas.off('pinchstart', () => {
        onPinchStart();
        this.onStart();
      });
      canvas.off('pinch', (ev) => {
        onPinch();
        this.onPinch(ev);
      });
      canvas.off('pinchend', () => {
        onPinchEnd();
        this.onEnd();
      });
    }
    if (swipe !== false) {
      canvas.off('swipe', this.onSwipe);
    }
  }
}

export default Zoom;
