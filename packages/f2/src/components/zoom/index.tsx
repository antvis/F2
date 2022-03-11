import Component from '../../base/component';
import { ChartChildProps } from '../../chart';
import { updateRange, updateFollow } from './zoomUtil';
import { Scale, ScaleConfig } from '@antv/scale';

export type ZoomRange = [number, number];
export type ScaleValues = number[] | string[];

export interface ZoomProps extends ChartChildProps {
  /**
   * 缩放和平移模式
   */
  mode?: 'x' | 'y' | null;
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
   * 自动同步 x/y 的坐标值
   */
  autoFit?: boolean;
}

export interface ZoomState {
  range: ZoomRange;
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
  startRange: ZoomRange;
  scale: Scale;
  originScale: Scale;
  // 最小的缩放比例
  minScale: number;

  constructor(props: P) {
    super(props);
    const { range = [0, 1] } = props;
    this.state = {
      range,
    } as S;
  }

  didMount(): void {
    this._bindEvents();
  }

  willMount(): void {
    const { props } = this;
    const { range } = props;
    const scale = this._getScale();
    const { values } = scale;
    this.scale = scale;
    this.originScale = cloneScale(scale);

    // 图表上最少显示 MIN_COUNT 个数据
    this.minScale = MIN_COUNT / values.length;

    this.updateRange(range);
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
    const { mode = 'x' } = this.props;
    if (mode === 'x') {
      this._doXPan(ev);
      return;
    }
    if (mode === 'y') {
      this._doYPan(ev);
      return;
    }
  };

  onPinch = (ev) => {
    const { mode = 'x' } = this.props;
    if (mode === 'x') {
      this._doXPinch(ev);
      return;
    }
    if (mode === 'y') {
      this._doYPinch(ev);
      return;
    }
  };

  onEnd = () => {
    this.startRange = null;
  };

  _doXPan(ev) {
    const { direction, deltaX } = ev;
    if (direction === 'up' || direction === 'down') {
      return;
    }
    ev.preventDefault && ev.preventDefault();

    const { props } = this;
    const { coord } = props;
    const { width: coordWidth } = coord;
    const ratio = deltaX / coordWidth;

    this._doPan(ratio);
  }

  _doYPan(ev) {
    const { direction, deltaY } = ev;
    if (direction === 'left' || direction === 'right') {
      return;
    }
    ev.preventDefault && ev.preventDefault();

    const { props } = this;
    const { coord } = props;
    const { height: coordHeight } = coord;
    const ratio = -deltaY / coordHeight;
    this._doPan(ratio);
  }

  _doPan(ratio: number) {
    const { startRange } = this;
    const [start, end] = startRange;
    const rangeLen = end - start;
    const rangeOffset = rangeLen * ratio;
    const newStart = start - rangeOffset;
    const newEnd = end - rangeOffset;
    this.updateRange([newStart, newEnd]);
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
    this._doPinch(leftZoom, rightZoom, zoom);
  }

  _doYPinch(ev) {
    ev.preventDefault && ev.preventDefault();
    const { zoom, center } = ev;
    const { props } = this;
    const { coord } = props;
    const { height: coordHeight, top, bottom } = coord;

    const topLen = Math.abs(center.x - top);
    const bottomLen = Math.abs(bottom - center.x);

    // 计算左右缩放的比例
    const topZoom = topLen / coordHeight;
    const bottomZoom = bottomLen / coordHeight;
    this._doPinch(topZoom, bottomZoom, zoom);
  }

  _doPinch(startRatio: number, endRatio: number, zoom: number) {
    const { startRange, minScale } = this;
    const [start, end] = startRange;

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
    this.updateRange(newRange);
  }

  updateRange(range: ZoomRange) {
    if (!range) return;
    const [start, end] = range;
    const rangeLength = end - start;
    // 处理边界值
    let newRange: ZoomRange;
    if (start < 0) {
      newRange = [0, rangeLength];
    } else if (end > 1) {
      newRange = [1 - rangeLength, 1];
    } else {
      newRange = range;
    }

    const { props, scale, originScale } = this;
    // 更新主 scale
    updateRange(scale, originScale, newRange);
    const { chart, data, autoFit } = props;

    if (autoFit) {
      const followScale = this._getFollowScales();

      this.updateFollow(followScale, scale, data);
    }

    this.setState({
      range: newRange,
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

  _getScale() {
    const { mode = 'x', coord, chart } = this.props;
    if (mode === 'x') {
      return coord.transposed ? chart.getYScales()[0] : chart.getXScales()[0];
    }
    if (mode === 'y') {
      return coord.transposed ? chart.getXScales()[0] : chart.getYScales()[0];
    }
  }

  _getFollowScales() {
    const { mode = 'x', coord, chart } = this.props;
    if (mode === 'x') {
      return coord.transposed ? chart.getXScales() : chart.getYScales();
    }
    if (mode === 'y') {
      return coord.transposed ? chart.getYScales() : chart.getXScales();
    }
  }

  _bindEvents() {
    const { context, props } = this;
    const { canvas } = context;
    const { pan, pinch } = props;
    // 统一绑定事件
    if (pan !== false) {
      canvas.on('panstart', this.onStart);
      canvas.on('pan', this.onPan);
      canvas.on('panend', this.onEnd);
    }

    if (pinch !== false) {
      canvas.on('pinchstart', this.onStart);
      canvas.on('pinch', this.onPinch);
      canvas.on('pinchend', this.onEnd);
    }
  }

  _clearEvents() {
    const { context, props } = this;
    const { canvas } = context;
    const { pan, pinch } = props;
    // 统一解绑事件
    if (pan !== false) {
      canvas.off('panstart', this.onStart);
      canvas.off('pan', this.onPan);
      canvas.off('panend', this.onEnd);
    }
    if (pinch !== false) {
      canvas.off('pinchstart', this.onStart);
      canvas.off('pinch', this.onPinch);
      canvas.off('pinchend', this.onEnd);
    }
  }
}

export default Zoom;
