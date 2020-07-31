import F2 from '@antv/f2';

fetch('https://gw.alipayobjects.com/os/antfincdn/6HodecuhvM/scatter.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      height: {
        tickCount: 5
      },
      weight: {
        tickCount: 5
      }
    });
    chart.axis('height', {
      label: function label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.tooltip(false);
    chart.point()
      .position('height*weight')
      .color('gender')
      .style({
        fillOpacity: 0.65
      });
    chart.render();
  });
