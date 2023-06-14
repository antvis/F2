import React, { useRef } from 'react';
import Stats from 'stats.js';
import { Canvas, Chart, Axis, Line } from '@antv/f2';
import data from '../data.json';

// @ts-ignore
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// const $stats = stats.dom;
// $stats.style.position = 'relative';
// $stats.style.left = '0px';
// $stats.style.top = '0px';

document.body.insertBefore(stats.dom, document.body.firstChild);

function renderChart(canvasEl: HTMLCanvasElement) {
  // 清空画布
  canvasEl.width = 0;
  canvasEl.height = 0;

  function getProps(data) {
    const { props } = (
      // @ts-ignore
      <Canvas
        // @ts-ignore
        context={canvasEl.getContext('2d')}
        pixelRatio={window.devicePixelRatio}
        animate={false}
      >
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

  const len = data.data.length;
  let i = 0;
  gcanvas.addEventListener('afterrender', () => {
    stats.update();
    if (i > len) return;
    canvas.update(getProps(data.data.slice(++i)));
  });

  canvas.render();

  return canvas;
}

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onRender = () => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    renderChart(canvasEl);
  };

  return (
    <div style={{ paddingTop: '50px' }}>
      <h2>F2 5.x</h2>
      <canvas ref={canvasRef} style={{ width: '100%', height: '260px' }} />
      <button onClick={onRender}>start</button>
    </div>
  );
};
