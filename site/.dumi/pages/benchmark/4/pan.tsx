import React, { useEffect, useRef } from 'react';
import Stats from 'stats.js';
import { gestureSimulator } from '../../../utils';
import data from '../data.json';

import { Axis, Canvas, Chart, Line, ScrollBar } from './f2';

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
    const vNode = (
      <Canvas
        context={canvasEl.getContext('2d')}
        pixelRatio={window.devicePixelRatio}
        animate={false}
      >
        <Chart data={data}>
          <Axis field="rate" />
          <Axis field="reportDate" type="timeCat" tickCount={5} />
          <Line x="reportDate" y="rate" color="codeType" />
          <ScrollBar mode="x" range={[0, 0.2]} />
        </Chart>
      </Canvas>
    );

    return vNode.props;
  }

  const props = getProps(data.data);
  // @ts-ignore
  const canvas = new Canvas(props);
  // @ts-ignore
  const gcanvas = canvas.canvas;

  gcanvas.on('afterdraw', () => {
    stats.update();
  });

  canvas.render();

  let i = 0;
  const loopTouchmove = () => {
    i++;
    gestureSimulator(canvasEl, 'touchmove', {
      x: i,
      y: 35,
    });
    if (i >= canvasEl.width / 2) i = 0;
    window.requestAnimationFrame(loopTouchmove);
  };

  setTimeout(async () => {
    gestureSimulator(canvasEl, 'touchstart', { x: 350, y: 35 });
    loopTouchmove();
  });

  return canvas;
}

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    renderChart(canvasEl);
  }, []);

  return (
    <div style={{ paddingTop: '50px' }}>
      <h2>Pan</h2>
      <canvas ref={canvasRef} style={{ width: '100%', height: '260px' }} />
    </div>
  );
};
