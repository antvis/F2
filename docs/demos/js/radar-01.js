(() => {
  const { Util, Global } = F2;
  const data = [
    { item: 'Design', user: '用户 A', score: 70 },
    { item: 'Design', user: '用户 B', score: 30 },
    { item: 'Development', user: '用户 A', score: 60 },
    { item: 'Development', user: '用户 B', score: 70 },
    { item: 'Marketing', user: '用户 A', score: 50 },
    { item: 'Marketing', user: '用户 B', score: 60 },
    { item: 'Users', user: '用户 A', score: 40 },
    { item: 'Users', user: '用户 B', score: 50 },
    { item: 'Test', user: '用户 A', score: 60 },
    { item: 'Test', user: '用户 B', score: 70 },
    { item: 'Language', user: '用户 A', score: 70 },
    { item: 'Language', user: '用户 B', score: 50 },
    { item: 'Technology', user: '用户 A', score: 70 },
    { item: 'Technology', user: '用户 B', score: 40 },
    { item: 'Support', user: '用户 A', score: 60 },
    { item: 'Support', user: '用户 B', score: 40 }
  ];
  const chart = new F2.Chart({
    id: 'radar1',
    width: window.innerWidth,
    height: window.innerWidth * 0.75,
    pixelRatio: window.devicePixelRatio
  });

  chart.coord('polar');
  chart.source(data, {
    score: {
      min: 0,
      max: 120,
      nice: false,
      tickCount: 4
    }
  });
  chart.tooltip({
    custom(obj) {
      const legend = chart.get('legendController').legends.top[0];
      const tooltipItems = obj.items;
      const legendItems = legend.items;
      const map = {};
      legendItems.map(item => {
        map[item.name] = _.clone(item);
      });
      tooltipItems.map(item => {
        const { name, value } = item;
        if (map[name]) {
          map[name].value = value;
        }
      });
      legend.setItems(Object.values(map));
    },
    onHide(tooltip) {
      const legend = chart.get('legendController').legends.top[0];
      legend.setItems(chart.getLegendItems().country);
    }
  });
  chart.axis('score', {
    label(text, index, total) {
      if (index === total - 1) {
        return null;
      }
      return {
        top: true
      }
    },
    grid(text, index) {
      if (text === '120') {
        return {
          lineDash: null
        };
      }
    },
    line: {
      top: false
    }
  });
  chart.area().position('item*score').color('user');
  chart.line().position('item*score').color('user');
  chart.point().position('item*score').color('user').style({
    stroke: '#fff',
    lineWidth: 1
  });
  chart.render();
})();
