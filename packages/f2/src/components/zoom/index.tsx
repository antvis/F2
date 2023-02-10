import { Component, isEqual, jsx } from '@antv/f-engine';
import { ChartChildProps } from '../../chart';
import { updateRange, updateFollow } from './zoomUtil';
import { Scale, ScaleConfig } from '../../deps/f2-scale/src';
import { each, isNumberEqual, isArray } from '@antv/util';

export type ZoomRange = [number, number];
export type ScaleValues = number[] | string[];

function lerp(min, max, fraction) {
  return (max - min) * fraction + min;
}

function isEqualRange(aRange, bRange) {
  for (const i in aRange) {
    if (!isNumberEqual(aRange[i], bRange[i])) return false;
  }
  return true;
}
export interface ZoomProps {
  panSensitive?: number;
  pinchSensitive?: number;
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
  onInit?: Function;
  /**
   * 自动同步 x/y 的坐标值
   */
  autoFit?: boolean;
  /**
   * 最少展示数据量，用于控制最小缩放比例, 默认是10
   */
  minCount?: number;
}

export interface ZoomState {
  range: {
    x?: ZoomRange;
    y?: ZoomRange;
  };
}

function cloneScale(scale: Scale, scaleConfig?: ScaleConfig) {
  // @ts-ignore
  return new scale.constructor({
    // @ts-ignore
    ...scale.__cfg__,
    ...scaleConfig,
  });
}

export default (View) => {
  return class Zoom<
    P extends ZoomProps = ZoomProps,
    S extends ZoomState = ZoomState
  > extends Component<P & ChartChildProps, S> {
    startRange: {
      x?: ZoomRange;
      y?: ZoomRange;
    };
    scale: {} = {};
    originScale: {} = {};
    // 最小的缩放比例
    minScale: number;
    dims: Array<String>;
    //swipe end x y
    swipeEnd = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    };

    loop: number;

    constructor(props: P) {
      const defaultProps = {
        onPanStart: () => {},
        onPinchStart: () => {},
        onPan: () => {},
        onPinch: () => {},
        onInit: () => {},
        onPanEnd: () => {},
        onPinchEnd: () => {},
        minCount: 10,
      };
      super({ ...defaultProps, ...props });
      const { mode } = props;

      this.dims = isArray(mode) ? mode : [mode];
    }

    didMount(): void {
      const { scale } = this;
      const { onInit } = this.props;
      onInit({ scale });
    }

    willReceiveProps(nextProps: P): void {
      const { range: nextRange } = nextProps;
      const { range: lastRange } = this.props;
      if (!isEqual(nextRange, lastRange)) {
        const cacheRange = {};
        each(this.dims, (dim) => {
          cacheRange[dim] = nextRange;
        });

        this.state = {
          range: cacheRange,
        } as S;
      }
    }

    willMount(): void {
      const { props, dims } = this;
      const { minCount, range } = props;
      let valueLength = Number.MIN_VALUE;
      const cacheRange = {};

      each(dims, (dim) => {
        const scale = this._getScale(dim);
        const { values } = scale;
        valueLength = values.length > valueLength ? values.length : valueLength;
        this.scale[dim] = scale;
        this.originScale[dim] = cloneScale(scale);

        this.updateRange(range, dim);
        cacheRange[dim] = range;
      });

      // 图表上最少显示 MIN_COUNT 个数据
      this.minScale = minCount / valueLength;
      this.state = {
        range: cacheRange,
      } as S;
    }

    didUnmount(): void {
      this.loop && cancelAnimationFrame(this.loop);
    }

    onStart = () => {
      const { state } = this;
      const { range } = state;
      this.startRange = range;
      this.loop && cancelAnimationFrame(this.loop);
    };

    onPan = (ev) => {
      const { dims } = this;

      const range = {};
      each(dims, (dim) => {
        if (dim === 'x') {
          range['x'] = this._doXPan(ev);
          return;
        }
        if (dim === 'y') {
          range['y'] = this._doYPan(ev);
          return;
        }
      });
      if (isEqualRange(range, this.state.range)) return;

      this.setState({
        range,
      } as S);
    };

    update() {
      const { startX, startY, endX, endY } = this.swipeEnd;
      const x = lerp(startX, endX, 0.05);
      const y = lerp(startY, endY, 0.05);
      this.swipeEnd = {
        startX: x,
        startY: y,
        endX,
        endY,
      };

      const { props } = this;
      const { coord } = props;
      const { width: coordWidth, height: coordHeight } = coord;
      const range = {};

      range['x'] = this._doPan((x - startX) / coordWidth, 'x');
      range['y'] = this._doPan((y - startY) / coordHeight, 'y');

      this.setState({
        range,
      } as S);

      this.startRange = range;

      this.loop = requestAnimationFrame(() => this.update());
      if (Math.abs(x - endX) < 0.0005 && Math.abs(y - endY) < 0.0005) {
        this.onEnd();
        cancelAnimationFrame(this.loop);
      }
    }

    onSwipe = (ev) => {
      const { swipe } = this.props;
      if (this.props.mode.length < 2 || !swipe) return;

      const { velocityX = 0, velocityY = 0, points } = ev;
      const { range } = this.state;

      const { x, y } = points[0];

      // 边界处理
      if (Math.abs(range?.x[0] - 0) < 0.0005 && velocityX > 0) return;
      if (Math.abs(range?.x[1] - 1) < 0.0005 && velocityX < 0) return;

      if (Math.abs(range?.y[0] - 0) < 0.0005 && velocityY < 0) return;
      if (Math.abs(range?.x[1] - 1) < 0.0005 && velocityY > 0) return;

      this.swipeEnd = {
        startX: x,
        startY: y,
        endX: x + velocityX * 50,
        endY: y - velocityY * 50,
      };

      this.onStart();
      this.update();
    };

    onPinch = (ev) => {
      const { dims } = this;
      const range = {};
      each(dims, (dim) => {
        if (dim === 'x') {
          range['x'] = this._doXPinch(ev);
          return;
        }
        if (dim === 'y') {
          range['y'] = this._doYPinch(ev);
          return;
        }
      });
      if (isEqualRange(range, this.state.range)) return;
      this.setState({
        range,
      } as S);
    };

    onEnd = () => {
      this.startRange = null;
    };

    _doXPan(ev) {
      const { direction, deltaX } = ev;
      if (this.props.mode.length === 1 && (direction === 'up' || direction === 'down')) {
        return this.state.range['x'];
      }
      ev.preventDefault && ev.preventDefault();

      const { props } = this;
      const { coord, panSensitive = 1 } = props;
      const { width: coordWidth } = coord;

      const ratio = (deltaX / coordWidth) * panSensitive;
      const newRange = this._doPan(ratio, 'x');
      return newRange;
    }

    _doYPan(ev) {
      const { direction, deltaY } = ev;
      if (this.props.mode.length === 1 && (direction === 'left' || direction === 'right')) {
        return this.state.range['y'];
      }
      ev.preventDefault && ev.preventDefault();

      const { props } = this;
      const { coord, panSensitive = 1 } = props;
      const { height: coordHeight } = coord;
      const ratio = (-deltaY / coordHeight) * panSensitive;
      const newRange = this._doPan(ratio, 'y');
      return newRange;
    }

    _doPan(ratio: number, dim: string) {
      const { startRange } = this;
      const [start, end] = startRange[dim];
      const rangeLen = end - start;
      const rangeOffset = rangeLen * ratio;
      const newStart = start - rangeOffset;
      const newEnd = end - rangeOffset;
      const newRange = this.updateRange([newStart, newEnd], dim);
      return newRange;
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
      const newRange = this._doPinch(leftZoom, rightZoom, zoom, 'x');
      return newRange;
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
      const newRange = this._doPinch(topZoom, bottomZoom, zoom, 'y');
      return newRange;
    }

    _doPinch(startRatio: number, endRatio: number, zoom: number, dim: string) {
      const { startRange, minScale, props } = this;
      const { pinchSensitive = 1 } = props;
      const [start, end] = startRange[dim];

      const zoomOffset = zoom < 1 ? (1 / zoom - 1) * pinchSensitive : (1 - zoom) * pinchSensitive;
      const rangeLen = end - start;
      const rangeOffset = rangeLen * zoomOffset;

      const startOffset = rangeOffset * startRatio;
      const endOffset = rangeOffset * endRatio;

      const newStart = Math.max(0, start - startOffset);
      const newEnd = Math.min(1, end + endOffset);

      const newRange: ZoomRange = [newStart, newEnd];
      // 如果已经到了最小比例，则不能再继续再放大
      if (newEnd - newStart < minScale) {
        return this.state.range[dim];
      }
      return this.updateRange(newRange, dim);
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

      if (range && isEqualRange(newRange, range[dim])) return newRange;

      // 更新主 scale
      updateRange(scale[dim], originScale[dim], newRange);

      if (autoFit) {
        const followScale = this._getFollowScales(dim);

        this.updateFollow(followScale, scale[dim], data);
      }
      // 手势变化不执行动画
      const { animate } = chart;
      chart.setAnimate(false);
      chart.forceUpdate(() => {
        chart.setAnimate(animate);
      });
      return newRange;
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

    render() {
      const { scale } = this;
      const {
        coord,
        onPinchStart,
        onPanStart,
        onPanEnd,
        pan,
        pinch,
        swipe,
        onPan,
        onPinch,
        onPinchEnd,
      } = this.props;
      const { width, height, left, top } = coord;

      return (
        <group>
          <rect
            style={{
              zIndex: 10,
              x: left,
              y: top,
              width,
              height,
              fill: 'transparent',
            }}
            onPanStart={() => {
              if (pan === false) return;
              this.onStart();
              onPanStart({ scale });
            }}
            onPan={(ev) => {
              if (pan === false) return;
              this.onPan(ev);
              onPan(ev);
            }}
            onPanEnd={(ev) => {
              if (pan === false) return;
              this.onEnd();
              onPanEnd({ scale });
            }}
            onPinchStart={() => {
              if (pinch === false) return;
              this.onStart();
              onPinchStart();
            }}
            onPinch={(ev) => {
              if (pinch === false) return;
              this.onPinch(ev);
              onPinch(ev);
            }}
            onPinchEnd={() => {
              if (pinch === false) return;
              this.onEnd();
              onPinchEnd({ scale });
            }}
            onSwipe={(ev) => {
              if (swipe === false) return;
              this.onSwipe(ev);
            }}
          />
          <View {...this.props} {...this.state} />
        </group>
      );
    }
  };
};
