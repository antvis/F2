/** @jsxImportSource .. */
import { context } from './global';
import Chart from '../src/index';

describe('index', () => {
  it('render', async () => {
    const chart = new Chart({
      context,
      pixelRatio: window.devicePixelRatio
    }, [
      {
        name: 'Legend',
        props: {
          xField: 'time',
          yField: 'value',
        },
        actions: [
          {
            event: 'tooltip:show',
            method: 'show'
          },
        ]
      }
    ]);

    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    chart.source(data);

    chart.interval()
      .position('genre*sold')
      .color('genre');

    chart.render();

  });
});
