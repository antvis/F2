import F2 from '@antv/f2';

fetch('https://gw.alipayobjects.com/os/antfincdn/SSZfL%26susr/valuation.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      value: {
        ticks: [ -6, -3, 0, 3, 6 ],
        formatter: function formatter(val) {
          return val.toFixed(2) + '%';
        }
      }
    });

    chart.axis('index', {
      label: function label(text, index, total) {
        const cfg = {};

        if (index === 0) {
          cfg.textAlign = 'start';
        } else if (index === total - 1) {
          cfg.textAlign = 'end';
        }
        return cfg;
      }
    });
    chart.axis('value', {
      label: function label(text) {
        const number = parseInt(text);
        const cfg = {};
        if (number > 0) {
          cfg.text = '+' + text;
          cfg.fill = '#F5222D';
        } else if (number === 0) {
          cfg.fill = '#000';
          cfg.fontWeight = 'bold';
        } else {
          cfg.fill = '#52C41A';
        }
        return cfg;
      }
    });
    chart.line({
      sortable: false // 数据已在外部排序，提升性能
    }).position('index*value');
    chart.render();
  });
