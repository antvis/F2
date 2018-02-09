(() => {
  $.getJSON('https://gw.alipayobjects.com/os/rmsportal/hicjNXYpVBvsbMDqXSMI.json', data => {
    const chart = new F2.Chart({
      id: 'scatter2',
      width: window.innerWidth,
      height: window.innerWidth * 0.64,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      LifeExpectancy: {
        alias: '人均寿命（年）',
        tickCount: 5
      },
      GDP: {
        alias: '人均国内生产总值($)'
      },
      Country: {
        alias: '国家/地区'
      }
    });
    chart.axis('GDP', {
      label(value){
        return {
          text: (value / 1000).toFixed(0) + 'k'
        };
      }
    });
    chart.axis('GDP', {
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
    chart.point().position('GDP*LifeExpectancy')
      .size('Population', [ 4, 65 ])
      .color('continent')
      .style({
        fillOpacity: 0.65
      });
    chart.render();
  });
})();
