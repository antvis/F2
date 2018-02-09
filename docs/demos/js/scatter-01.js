(() => {
   $.getJSON('https://gw.alipayobjects.com/os/rmsportal/vakepBshjEeCVieCvlcH.json', data => {
    const chart = new F2.Chart({
      id: 'scatter1',
      width: window.innerWidth,
      height: window.innerWidth * 0.64,
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
      label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        }
        if (index === total - 1) {
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
})();
