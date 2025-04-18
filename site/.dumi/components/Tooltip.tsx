import React, { useEffect, useRef } from 'react';
import Stats from 'stats.js';
import { delay, gestureSimulator, isTouchEvent, safeDocument } from '../utils';
import data from './data.json';

safeDocument((document) => {
  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  // const $stats = stats.dom;
  // $stats.style.position = 'relative';
  // $stats.style.left = '0px';
  // $stats.style.top = '0px';

  document.body.insertBefore(stats.dom, document.body.firstChild);
});

function renderChart(F2, canvasEl: HTMLCanvasElement) {
  const { Axis, Canvas, Chart, Line, Tooltip } = F2;

  // 清空画布
  canvasEl.width = 0;
  canvasEl.height = 0;

  function getProps(data) {
    const vNode = (
      // @ts-ignore
      <Canvas
        context={canvasEl.getContext('2d')}
        pixelRatio={window.devicePixelRatio}
        animate={false}
      >
        <Chart data={data}>
          <Axis field="rate" />
          <Axis field="reportDate" type="timeCat" tickCount={5} />
          <Line x="reportDate" y="rate" color="codeType" />
          <Tooltip showCrosshairs crosshairsType="xy"></Tooltip>
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
  gcanvas.isTouchEvent = isTouchEvent;
  canvas.render();

  gcanvas.addEventListener('afterrender', () => {
    stats.update();
  });

  let i = 0;
  const loopTouchmove = () => {
    i++;
    gestureSimulator(canvasEl, 'touchmove', {
      x: i,
      y: 35,
    });
    if (i >= canvasEl.width - 400) i = 0;
    window.requestAnimationFrame(loopTouchmove);
  };

  setTimeout(async () => {
    gestureSimulator(canvasEl, 'touchstart', { x: 60, y: 170 });
    await delay(450);
    loopTouchmove();
  });

  return canvas;
}

export default ({ F2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    renderChart(F2, canvasEl);
  }, []);

  return (
    <div style={{ paddingTop: '50px' }}>
      <h2>Tooltip</h2>
      <canvas ref={canvasRef} style={{ width: '100%', height: '260px' }} />
    </div>
  );
};
