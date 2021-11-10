import F2 from '@antv/f2';
import _ from 'lodash';

// 格式化数字
function numberToMoney(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const data = [{
  time: 'Jan',
  value: 551990,
  year: '2015'
}, {
  time: 'Feb',
  value: 513513,
  year: '2015'
}, {
  time: 'Mar',
  value: 538780,
  year: '2015'
}, {
  time: 'Apr',
  value: 419562,
  year: '2015'
}, {
  time: 'May',
  value: 332167,
  year: '2015'
}, {
  time: 'Jun',
  value: 297956,
  year: '2015'
}, {
  time: 'Jul',
  value: 311760,
  year: '2015'
}, {
  time: 'Aug',
  value: 330824,
  year: '2015'
}, {
  time: 'Sep',
  value: 265815,
  year: '2015'
}, {
  time: 'Oct',
  value: 327474,
  year: '2015'
}, {
  time: 'Nov',
  value: 468621,
  year: '2015'
}, {
  time: 'Dec',
  value: 489428,
  year: '2015'
}, {
  time: 'Jan',
  value: 531886,
  year: '2016'
}, {
  time: 'Feb',
  value: 434868,
  year: '2016'
}, {
  time: 'Mar',
  value: 485418,
  year: '2016'
}, {
  time: 'Apr',
  value: 462479,
  year: '2016'
}, {
  time: 'May',
  value: 361541,
  year: '2016'
}, {
  time: 'Jun',
  value: 351261,
  year: '2016'
}, {
  time: 'Jul',
  value: 403836,
  year: '2016'
}, {
  time: 'Aug',
  value: 334281,
  year: '2016'
}, {
  time: 'Sep',
  value: 329221,
  year: '2016'
}, {
  time: 'Oct',
  value: 378278,
  year: '2016'
}, {
  time: 'Nov',
  value: 454534,
  year: '2016'
}, {
  time: 'Dec',
  value: 573530,
  year: '2016'
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  value: {
    min: 0,
    formatter: function formatter(val) {
      return numberToMoney(val);
    }
  }
});
chart.coord('polar');
chart.axis('value', {
  label: null,
  grid: function grid(text, index, total) {
    if (index === total - 1) {
      return {
        stroke: 'rgb(113, 113, 112)',
        strokeOpacity: 1,
        lineDash: null
      };
    }

    return {
      lineDash: null,
      stroke: 'rgb(220, 220, 220)',
      strokeOpacity: 0.4
    };
  }
});
chart.axis('time', {
  label: {
    fontSize: 12
  },
  grid: {
    stroke: 'rgb(113, 113, 112)',
    strokeOpacity: 0.4,
    lineDash: null
  }
});
chart.legend({
  align: 'center',
  itemWidth: 100
});
chart.tooltip({
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
chart.area()
  .position('time*value')
  .color('year')
  .style({
    fillOpacity: 0.4
  });
chart.render();
