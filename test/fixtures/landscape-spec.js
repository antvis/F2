import F2 from '../../src/index';
import { gestureSimulator } from '../unit/test-util';

const canvas = document.createElement('canvas');
canvas.style.width = '370px';
canvas.style.height = '300px';
canvas.style.verticalAlign = 'top';

const div = document.createElement('div');
div.appendChild(canvas);

div.style.border = '1px solid #000';
div.style.transformOrigin = 'left top';
div.style.transform = 'translate(300px, 0) rotate(90deg)';
document.body.appendChild(div);


describe('canvas 旋转', () => {
  it('landscape', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new F2.Chart({
      el: canvas,
      pixelRatio: window.devicePixelRatio
    });

    chart.landscape(true);

    chart.source(data);

    chart.interval()
      .position('genre*sold')
      .color('genre');

    chart.render();

    gestureSimulator(canvas, 'click', {
      touches: {
        clientX: 285,
        clientY: 150
      }
    });
  });
});
