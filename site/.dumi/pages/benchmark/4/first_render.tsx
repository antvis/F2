import React, { useEffect, useRef } from 'react';
import Stats from 'stats.js';
import data from '../data.json';
import { Axis, Canvas, Chart, Line } from '../../../statics/f2_v4';
import { safeDocument } from '../../../utils';

safeDocument((document) => {
  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  // const $stats = stats.dom;
  // $stats.style.position = 'relative';
  // $stats.style.left = '0px';
  // $stats.style.top = '0px';

  document.body.insertBefore(stats.dom, document.body.firstChild);
});

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
        </Chart>
      </Canvas>
    );

    return vNode.props;
  }

  const props = getProps(data.data);
  // @ts-ignore
  const canvas = new Canvas(props);

  canvas.render();

  stats.update();

  window.requestAnimationFrame(() => renderChart(canvasEl));
}

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    window.requestAnimationFrame(() => renderChart(canvasEl));
  }, []);

  return (
    <div style={{ paddingTop: '50px' }}>
      <h2>F2 4.x</h2>
      <canvas ref={canvasRef} style={{ width: '100%', height: '260px' }} />
    </div>
  );
};
