import F2 from '@antv/f2';

fetch('https://gw.alipayobjects.com/os/antfincdn/RJW3vmCf7v/area-none.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.scale('year', {
      tickCount: 5,
      range: [ 0, 1 ]
    });
    chart.axis('year', {
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
    chart.legend(false);
    chart.tooltip({
      showCrosshairs: true
    });
    chart.area()
      .position('year*value')
      .color('type')
      .shape('smooth');
    chart.line()
      .position('year*value')
      .color('type')
      .shape('smooth');
    chart.render();
  });
