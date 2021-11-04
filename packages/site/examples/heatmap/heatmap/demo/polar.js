import F2 from '@antv/f2';

fetch('https://gw.alipayobjects.com/os/antfincdn/CUUfwzGQ%26H/polar-heatmap.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.coord('polar', {
      innerRadius: 0.2
    });
    chart.tooltip(false);
    chart.axis('week', {
      grid: null,
      line: null,
      tickLine: null,
      label: null
    });
    chart.axis('time', {
      line: null,
      tickLine: null,
      grid: null,
      labelOffset: 3
    });
    chart.polygon()
      .position('time*week')
      .color('value', '#BAE7FF-#1890FF-#0050B3')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });

    const values = [ 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.' ];
    values.forEach(function(val, idx) {
      chart.guide().text({
        top: true,
        position: [ 0, idx ],
        content: val,
        style: {
          fill: '#fff',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      });
    });
    chart.render();
  });
