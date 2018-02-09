(() => {
  const data = [
    { country: '中国', cost: 96 },
    { country: '德国', cost: 121 },
    { country: '美国', cost: 100 },
    { country: '日本', cost: 111 },
    { country: '韩国', cost: 102 },
    { country: '法国', cost: 124 },
    { country: '意大利', cost: 123 },
    { country: '荷兰', cost: 111 }
  ];
  const chart = new F2.Chart({
    id: 'pie2',
    width: window.innerWidth,
    height: window.innerWidth * 0.64,
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    'cost': {
      min: 0
    }
  });
  chart.coord('polar');
  chart.legend({
    position: 'right',
    triggerOn: 'touchstart'
  });
  chart.tooltip({
    offsetY: -20
  });
  chart.axis('cost', {
    label: {
      top: true
    },
    grid(text, index) {
      if (text === '140') {
        return {
          lineDash: null
        };
      }
    },
    line: {
      top: false
    }
  });
  chart.interval()
    .position('country*cost')
    .color('country')
    .style({
      lineWidth: 1,
      stroke: '#fff'
    });
  chart.render();
})();
