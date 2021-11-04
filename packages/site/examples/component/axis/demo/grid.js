import F2 from '@antv/f2';

// 格式化数字
function numberToMoney(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

fetch('https://gw.alipayobjects.com/os/antfincdn/6gvW0Eksw7/bubble.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      'Pro-Kopf-BIP (USD)': {
        formatter: function formatter(val) {
          return numberToMoney(val);
        }
      },
      'Anzahl Flüchtlinge': {
        formatter: function formatter(val) {
          return numberToMoney(val);
        }
      }
    });
    // 分别配置 X 轴和 Y 轴的网格线
    chart.axis('Pro-Kopf-BIP (USD)', {
      grid: {
        lineDash: null,
        stroke: '#e8e8e8',
        lineWidth: 1
      }
    });
    chart.axis('Anzahl Flüchtlinge', {
      grid: {
        lineDash: null
      }
    });
    chart.point()
      .position('Pro-Kopf-BIP (USD)*Anzahl Flüchtlinge')
      .color('#F04864')
      .size('Einwohner')
      .style({
        fillOpacity: 0.7
      });
    chart.render();
  });
