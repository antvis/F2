import F2 from '@antv/f2';
import _ from 'lodash';

const data = [{
  year: '2010',
  type: 'Thailand',
  value: 1645304
}, {
  year: '2011',
  type: 'Thailand',
  value: 1457795
}, {
  year: '2012',
  type: 'Thailand',
  value: 2453717
}, {
  year: '2013',
  type: 'Thailand',
  value: 2457057
}, {
  year: '2014',
  type: 'Thailand',
  value: 1880007
}, {
  year: '2015',
  type: 'Thailand',
  value: 1913002
}, {
  year: '2016',
  type: 'Thailand',
  value: 1808625
}, {
  year: '2010',
  type: 'ASEAN',
  value: 1456866
}, {
  year: '2011',
  type: 'ASEAN',
  value: 1536834
}, {
  year: '2012',
  type: 'ASEAN',
  value: 1784263
}, {
  year: '2013',
  type: 'ASEAN',
  value: 1982417
}, {
  year: '2014',
  type: 'ASEAN',
  value: 2104870
}, {
  year: '2015',
  type: 'ASEAN',
  value: 1983965
}, {
  year: '2016',
  type: 'ASEAN',
  value: 1908434
}];
const chart = new F2.Chart({
  id: 'container',
  padding: [ 'auto', 'auto', 'auto', 16 ],
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  year: {
    range: [ 0.16, 0.95 ]
  },
  value: {
    tickInterval: 500000,
    formatter: function formatter(val) {
      return String(Math.floor(val * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
});
chart.axis('value', {
  label: function label(text, index, total) {
    const cfg = {
      textAlign: 'start',
      top: true,
      text
    };
    if (index === total - 1) {
      cfg.text = cfg.text + ' vehicles';
    }
    return cfg;
  }
});

chart.guide().rect({
  start: [ '0%', '0%' ],
  end: [ '12%', '99%' ],
  style: {
    lineWidth: 1,
    stroke: '#fff',
    fill: '#fff',
    opacity: 1
  }
});
chart.legend({
  marker: 'square'
});
// tooltip 与图例结合
chart.tooltip({
  showXTip: true,
  xTipBackground: {
    stroke: '#fff',
    lineWidth: 1,
    radius: 3
  },
  custom: true, // 自定义 tooltip 内容框
  onChange: function onChange(obj) {
    const legend = chart.get('legendController').legends.top[0];
    const tooltipItems = obj.items;
    const legendItems = legend.items;
    const map = {};
    legendItems.forEach(function(item) {
      map[item.name] = _.clone(item);
    });
    tooltipItems.forEach(function(item) {
      const name = item.name;
      const value = item.value;
      if (map[name]) {
        map[name].value = value;
      }
    });
    legend.setItems(_.values(map));
  },
  onHide: function onHide() {
    const legend = chart.get('legendController').legends.top[0];
    legend.setItems(chart.getLegendItems().country);
  }
});
chart.interval()
  .position('year*value')
  .color('type', [ '#ab5787', '#51b2e5' ])
  .adjust({
    type: 'dodge',
    marginRatio: 0.3
  });
chart.render();
