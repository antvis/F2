import React, { RefObject, forwardRef } from 'react';
import { Canvas } from '@antv/f2';

class ErrorBoundary extends React.Component<{ fallback: React.Component }, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, _errorInfo) {
    console.error('图表渲染失败: ', error);
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      return fallback || null;
    }
    // @ts-ignore
    return this.props.children || null;
  }
}

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
  children?: React.ReactElement | React.ReactElement[] | null;
}

class ReactCanvas extends React.Component<CanvasProps> {
  canvasRef: RefObject<HTMLCanvasElement>;
  canvas: Canvas;

  constructor(props: CanvasProps) {
    super(props);
    const { canvasRef } = props;
    this.canvasRef = canvasRef || React.createRef();
  }

  componentDidMount() {
    const { canvasRef, props } = this;
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
    canvas.render();
  }

  componentDidUpdate() {
    const { canvas, props } = this;
    canvas.update(props);
  }

  render() {
    const { props } = this;
    const { className = '' } = props;
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

  componentWillUnmount() {
    const { canvas } = this;
    canvas.destroy();
  }
}

export default forwardRef((props: CanvasProps, ref: RefObject<HTMLCanvasElement>) => {
  const { fallback } = props;
  return React.createElement(ErrorBoundary, {
    fallback: fallback,
    children: React.createElement(ReactCanvas, {
      ...props,
      ref,
    }),
  });
}) as any;
