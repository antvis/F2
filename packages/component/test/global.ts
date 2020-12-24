// import * as F2 from '@antv/f2';

// const { G } = F2;

// let canvas;
// let context: CanvasRenderingContext2D;
const canvasEl = document.createElement('canvas');
canvasEl.style.width = '100%';
canvasEl.style.height = '400px';
document.body.appendChild(canvasEl);
const context = canvasEl.getContext('2d');

// afterAll(() => {
//   canvas.width = 0;
//   canvas.height = 0;
//   document.body.removeChild(canvas);
// });

export { context };
