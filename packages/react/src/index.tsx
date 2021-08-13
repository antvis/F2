import React, { RefObject } from "react";
import Canvas from "@ali/f2-components";

class ErrorBoundary extends React.Component<
  { fallback: React.Component },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("图表渲染失败: ", error);
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      return fallback || <></>;
    }

    return this.props.children;
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
    const context = canvasEl.getContext("2d");
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
    const { className = "" } = props;
    return React.createElement("canvas", {
      className: `f2-chart ${className}`,
      ref: this.canvasRef,
      style: {
        width: "100%",
        height: "100%",
        display: "block",
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

export default (props) => {
  const { fallback } = props;
  return (
    <ErrorBoundary fallback={fallback}>
      <ReactCanvas {...props} />
    </ErrorBoundary>
  );
};
