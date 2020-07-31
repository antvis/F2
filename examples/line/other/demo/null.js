import F2 from '@antv/f2';
import _ from 'lodash';

fetch('https://gw.alipayobjects.com/os/antfincdn/2TgqDdsXzK/usa-medals-won.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      animate: false,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.axis('year', {
      tickLine: {
        length: 4,
        stroke: '#e8e8e8',
        lineWidth: 1
      },
      label: {
        textAlign: 'start',
        textBaseline: 'middle',
        rotate: Math.PI / 2
      }
    });
    chart.tooltip({
      showCrosshairs: true,
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

    chart.line().position('year*count').adjust('stack')
      .color('medalType', function(val) {
        if (val === 'Gold Medals') {
          return '#f3ac32';
        } else if (val === 'Silver Medals') {
          return '#b8b8b8';
        } else if (val === 'Bronze Medals') {
          return '#bb6e36';
        }
      });
    chart.point().position('year*count').adjust('stack')
      .style('medalType', {
        lineWidth: 1,
        fill: '#fff',
        stroke: function stroke(val) {
          if (val === 'Gold Medals') {
            return '#f3ac32';
          } else if (val === 'Silver Medals') {
            return '#b8b8b8';
          } else if (val === 'Bronze Medals') {
            return '#bb6e36';
          }
        }
      });
    chart.render();
  });
