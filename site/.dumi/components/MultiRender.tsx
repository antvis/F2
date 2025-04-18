import { Renderer as CanvasRenderer } from '@antv/g-mobile-canvas';
import { Renderer as SVGRenderer } from '@antv/g-mobile-svg';
import { Renderer as WebGLRenderer } from '@antv/g-mobile-webgl';
import React, { useRef, useState } from 'react';
import Stats from 'stats.js';
import data from './data.json';
import { safeDocument } from '../utils';

safeDocument((document) => {
  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  // const $stats = stats.dom;
  // $stats.style.position = 'relative';
  // $stats.style.left = '0px';
  // $stats.style.top = '0px';

  document.body.insertBefore(stats.dom, document.body.firstChild);
});

function renderChart(F2, options) {
  const { Canvas, Chart, Axis, Line } = F2;
  function getProps(data) {
    const { props } = (
      // @ts-ignore
      <Canvas pixelRatio={window.devicePixelRatio} animate={false} {...options}>
        <Chart data={data}>
          <Axis field="rate" />
          <Axis field="reportDate" type="timeCat" tickCount={5} />
          <Line x="reportDate" y="rate" color="codeType" />
        </Chart>
      </Canvas>
    );

    return props;
  }

  const props = getProps(data.data);
  const canvas = new Canvas(props);
  // @ts-ignore
  const gcanvas = canvas.canvas;

  let flag = true;
  gcanvas.addEventListener('afterrender', () => {
    stats.update();
    flag = !flag;
    canvas.update(getProps(data.data.slice(flag ? 0 : 1)));
  });

  canvas.render();

  return canvas;
}

export default ({ F2 }) => {
  if (!F2) return null;
  const { Canvas } = F2;
  const [canvasInstance, setCanvas] = useState<typeof Canvas | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const onRender = () => {
    const container = containerRef.current;
    if (!container) return;
    const value = selectRef.current?.value;
    if (value === 'canvas') {
      const canvasEl = document.createElement('canvas');
      canvasEl.style.width = '100%';
      canvasEl.style.height = '100%';
      container.appendChild(canvasEl);
      const canvasRenderer = new CanvasRenderer();
      const canvas = renderChart(F2, {
        renderer: canvasRenderer,
        context: canvasEl.getContext('2d'),
      });
      setCanvas(canvas);
      return;
    }
    if (value === 'svg') {
      const svgRenderer = new SVGRenderer();
      const { width, height } = container.getBoundingClientRect();
      const canvas = renderChart(F2, { renderer: svgRenderer, container, width, height });
      setCanvas(canvas);
      return;
    }
    if (value === 'webgl') {
      const webglRenderer = new WebGLRenderer();
      const canvasEl = document.createElement('canvas');
      canvasEl.style.width = '100%';
      canvasEl.style.height = '100%';
      container.appendChild(canvasEl);
      const canvas = renderChart(F2, {
        renderer: webglRenderer,
        context: canvasEl.getContext('webgl'),
      });
      setCanvas(canvas);
      return;
    }
  };

  const onSelectChange = () => {
    try {
      canvasInstance?.destroy();
    } catch (e) {}
    if (containerRef?.current?.firstChild) {
      containerRef?.current?.removeChild(containerRef?.current?.firstChild as Node);
    }
    setCanvas(null);
  };

  return (
    <div style={{ paddingTop: '50px' }}>
      <h2>二次渲染</h2>
      <select ref={selectRef} onChange={onSelectChange}>
        <option value="canvas">canvas 2d</option>
        <option value="svg">svg</option>
        <option value="webgl">webgl</option>
      </select>
      <div ref={containerRef} style={{ width: '100%', height: '260px' }}></div>
      <button onClick={onRender} style={{ marginRight: '10px' }}>
        render
      </button>
    </div>
  );
};
