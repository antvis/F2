// https://f2.antv.vision/zh/examples/point/scatter#scatter

import F2 from '@antv/f2';

fetch('../data/scatter.json')
  .then(res => res.json())
  .then(
    (
      data: Array<{
        gender: string;
        weight: number;
        height: number;
      }>,
    ) => {
      const chart = new F2.Chart<typeof data[0]>({
        id: 'container',
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(data, {
        height: {
          tickCount: 5,
        },
        weight: {
          tickCount: 5,
        },
      });
      chart.axis('height', {
        label: function label(text, index, total) {
          const textCfg: F2.AxisLabelParams = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        },
      });
      chart.tooltip(false);
      chart.point().position(['height', 'weight']).color('gender').style({
        fillOpacity: 0.65,
      });
      chart.render();
    },
  );
