import React, { RefObject, forwardRef } from 'react';
import { Canvas, Children } from '@antv/f2';

type ReactErrorBoundaryProps = {
  fallback: React.Component;
  onError: (error: Error) => void;
};
class ErrorBoundary extends React.Component<ReactErrorBoundaryProps, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, _errorInfo) {
    const { onError } = this.props;

    console.error('图表渲染失败: ', error);

    if (typeof onError === 'function') {
      onError(error);
    }
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

function pickElement(children) {
  if (!children) return children;
  const result = Children.map(children, (item) => {
    if (!item) return item;

    const { key, ref, type, props } = item;
    return {
      key,
      ref,
      type,
      props: {
        ...props,
        children: pickElement(props.children),
      },
    };
  });
  return result;
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
  onError?: (error: Error) => void;
  children?: React.ReactElement | React.ReactElement[] | null;
  autoFit?: boolean;
}

class ReactCanvas extends React.Component<CanvasProps> {
  canvasRef: RefObject<HTMLCanvasElement>;
  canvas: Canvas;
  parentNode: {
    width: number;
    height: number;
  };
  observer: ResizeObserver;

  constructor(props: CanvasProps) {
    super(props);
    const { canvasRef } = props;
    this.canvasRef = canvasRef || React.createRef();
  }

  getProps = () => {
    const { canvasRef, props } = this;
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext('2d');

    //  去掉 react 生成的 element 中无用属性
    const children = pickElement(props.children);

    return {
      // 已经有高清方案，这里默认用1
      pixelRatio: 1,
      ...props,
      children,
      // context 内部创建，不能被覆盖
      context,
    };
  };

  observeElement() {
    if (!this.props?.autoFit) return;
    const targetNode = this.canvasRef.current?.parentElement;
    window?.addEventListener('resize', () => {
      this.resize();
    });

    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(() => {
        this.resize();
      });
      this.observer.observe(targetNode);
    }
  }

  resize() {
    const targetNode = this.canvasRef.current?.parentElement;
    const { width: lastWidth, height: lastHeight } = targetNode.getBoundingClientRect();
    if (
      (lastWidth === this.parentNode.width && lastHeight === this.parentNode.height) ||
      !lastWidth ||
      !lastHeight
    )
      return;
    this.parentNode = {
      width: lastWidth,
      height: lastHeight,
    };

    this.canvas.resize(lastWidth, lastHeight);
  }

  componentDidMount() {
    const pickProps = this.getProps();
    const canvas = new Canvas(pickProps);
    this.canvas = canvas;
    canvas.render();
    this.observeElement();
  }

  componentDidUpdate() {
    const { canvas } = this;
    const pickProps = this.getProps();
    canvas.update(pickProps);
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
  const { fallback, onError } = props;
  return React.createElement(ErrorBoundary, {
    fallback,
    onError,
    children: React.createElement(ReactCanvas, {
      ...props,
      ref,
    }),
  });
}) as any;
