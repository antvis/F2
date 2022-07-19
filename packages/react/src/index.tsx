import React, { RefObject, forwardRef } from 'react';
import { Canvas } from '@antv/f2';
export interface CanvasProps {
  className?: string;
  pixelRatio?: number;
  width?: number | string;
  height?: number | string;
  padding?: (string | number)[];
  animate?: boolean;
  canvasRef?: RefObject<HTMLCanvasElement>;
  ref?: RefObject<HTMLCanvasElement>;
  fallback?: React.Component;
  onError?: (error: Error) => void;
  children?: React.ReactElement | React.ReactElement[] | null;
}

type CanvasState = { error: string | null };
export default class ReactCanvas extends React.Component<CanvasProps, CanvasState> {
  canvasRef: RefObject<HTMLCanvasElement>;
  canvas: Canvas;
  ready: Promise<null>;
  resolveFn;

  constructor(props: CanvasProps) {
    super(props);
    const { canvasRef } = props;
    this.state = { error: null };
    this.canvasRef = canvasRef || React.createRef();
    this.ready = new Promise((resolve, reject) => {
      this.resolveFn = resolve;
    });
  }

  componentDidMount = async () => {
    const { canvasRef, props } = this;
    const { onError } = props;
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext('2d');
    const canvas = new Canvas({
      // 已经有高清方案，这里默认用1
      pixelRatio: 1,
      ...props,
      // context 内部创建，不能被覆盖
      context,
    });
    this.canvas = canvas;

    try {
      await canvas.render();
    } catch (error) {
      this.setState({ error });
      console.error('图表渲染失败: ', error);
      if (typeof onError === 'function') {
        onError(error);
      }
    }
    this.resolveFn();
  };

  componentDidUpdate = async () => {
    const { canvas, props } = this;
    await canvas.update(props);
  };

  componentWillUnmount() {
    const { canvas } = this;
    canvas.destroy();
  }

  render() {
    const { props } = this;
    const { className = '', fallback } = props;
    if (this.state.error) {
      return fallback || React.createElement('div', {}, 'error');
    } else {
      return React.createElement('canvas', {
        className: `f2-chart ${className}`,
        ref: this.canvasRef,
        style: {
          width: '100%',
          height: '100%',
          display: 'block',
          padding: 0,
          margin: 0,
        },
      });
    }
  }
}
