import F2 from '@antv/f2';
import _ from 'lodash';

const data = [{
  name: 'Installation',
  value: 43934,
  year: 2010
}, {
  name: 'Installation',
  value: 52503,
  year: 2011
}, {
  name: 'Installation',
  value: 57177,
  year: 2012
}, {
  name: 'Installation',
  value: 69658,
  year: 2013
}, {
  name: 'Installation',
  value: 97031,
  year: 2014
}, {
  name: 'Installation',
  value: 119931,
  year: 2015
}, {
  name: 'Installation',
  value: 137133,
  year: 2016
}, {
  name: 'Installation',
  value: 154175,
  year: 2017
}, {
  name: 'Manufacturing',
  value: 24916,
  year: 2010
}, {
  name: 'Manufacturing',
  value: 24064,
  year: 2011
}, {
  name: 'Manufacturing',
  value: 29742,
  year: 2012
}, {
  name: 'Manufacturing',
  value: 29851,
  year: 2013
}, {
  name: 'Manufacturing',
  value: 32490,
  year: 2014
}, {
  name: 'Manufacturing',
  value: 30282,
  year: 2015
}, {
  name: 'Manufacturing',
  value: 38121,
  year: 2016
}, {
  name: 'Manufacturing',
  value: 40434,
  year: 2017
}, {
  name: 'Sales & Distribution',
  value: 11744,
  year: 2010
}, {
  name: 'Sales & Distribution',
  value: 17722,
  year: 2011
}, {
  name: 'Sales & Distribution',
  value: 16005,
  year: 2012
}, {
  name: 'Sales & Distribution',
  value: 19771,
  year: 2013
}, {
  name: 'Sales & Distribution',
  value: 20185,
  year: 2014
}, {
  name: 'Sales & Distribution',
  value: 24377,
  year: 2015
}, {
  name: 'Sales & Distribution',
  value: 32147,
  year: 2016
}, {
  name: 'Sales & Distribution',
  value: 39387,
  year: 2017
}, {
  name: 'Project Development',
  value: null,
  year: 2010
}, {
  name: 'Project Development',
  value: null,
  year: 2011
}, {
  name: 'Project Development',
  value: 7988,
  year: 2012
}, {
  name: 'Project Development',
  value: 12169,
  year: 2013
}, {
  name: 'Project Development',
  value: 15112,
  year: 2014
}, {
  name: 'Project Development',
  value: 22452,
  year: 2015
}, {
  name: 'Project Development',
  value: 34400,
  year: 2016
}, {
  name: 'Project Development',
  value: 34227,
  year: 2017
}, {
  name: 'Other',
  value: 12908,
  year: 2010
}, {
  name: 'Other',
  value: 5948,
  year: 2011
}, {
  name: 'Other',
  value: 8105,
  year: 2012
}, {
  name: 'Other',
  value: 11248,
  year: 2013
}, {
  name: 'Other',
  value: 8989,
  year: 2014
}, {
  name: 'Other',
  value: 11816,
  year: 2015
}, {
  name: 'Other',
  value: 18274,
  year: 2016
}, {
  name: 'Other',
  value: 18111,
  year: 2017
}];

const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
  padding: [ 'auto', 180, 'auto', 10 ]
});

chart.source(data, {
  value: {
    tickCount: 5
  }
});

// 默认只勾选一个图例
chart.filter('name', function(val) {
  return val === 'Installation';
});

chart.legend({
  position: 'right',
  selectedMode: 'single', // 设置图例单选模式
  offsetX: -25
});
chart.tooltip({
  custom: true, // 自定义 tooltip 内容框
  onChange: function onChange(obj) {
    const legend = chart.get('legendController').legends.right[0];
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
    const legend = chart.get('legendController').legends.right[0];
    legend.setItems(chart.getLegendItems().country);
  }
});
chart.axis('value', {
  labelOffset: 0,
  label: {
    top: true,
    textAlign: 'start',
    textBaseline: 'bottom'
  }
});
chart.axis('year', {
  label: {
    rotate: -Math.PI / 2,
    textAlign: 'end',
    textBaseline: 'middle'
  }
});
chart.line().position('year*value').color('name');
chart.render();
