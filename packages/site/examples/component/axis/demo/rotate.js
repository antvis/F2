import F2 from '@antv/f2';

const data = [{
  Year: '1987',
  NumberNewMicroBrewery: 1
}, {
  Year: '1989',
  NumberNewMicroBrewery: 1
}, {
  Year: '1995',
  NumberNewMicroBrewery: 2
}, {
  Year: '1996',
  NumberNewMicroBrewery: 2
}, {
  Year: '1997',
  NumberNewMicroBrewery: 1
}, {
  Year: '1998',
  NumberNewMicroBrewery: 3
}, {
  Year: '1999',
  NumberNewMicroBrewery: 2
}, {
  Year: '2006',
  NumberNewMicroBrewery: 1
}, {
  Year: '2007',
  NumberNewMicroBrewery: 1
}, {
  Year: '2008',
  NumberNewMicroBrewery: 1
}, {
  Year: '2009',
  NumberNewMicroBrewery: 2
}, {
  Year: '2010',
  NumberNewMicroBrewery: 3
}, {
  Year: '2011',
  NumberNewMicroBrewery: 4
}, {
  Year: '2012',
  NumberNewMicroBrewery: 5
}, {
  Year: '2013',
  NumberNewMicroBrewery: 11
}, {
  Year: '2014',
  NumberNewMicroBrewery: 20
}, {
  Year: '2015',
  NumberNewMicroBrewery: 16
}, {
  Year: '2016',
  NumberNewMicroBrewery: 13
}, {
  Year: '2017',
  NumberNewMicroBrewery: 6
}, {
  Year: '2018',
  NumberNewMicroBrewery: 1
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
  padding: [ 'auto', 'auto', 40, 'auto' ]
});
chart.source(data);
chart.tooltip(false);
// 坐标轴文本旋转
chart.axis('Year', {
  label: {
    rotate: -Math.PI / 2,
    textAlign: 'end',
    textBaseline: 'middle'
  }
});
chart.interval().position('Year*NumberNewMicroBrewery').color('NumberNewMicroBrewery', function(val) {
  if (val === 20) {
    return '#1890ff';
  }
  return '#66B5FF';
});

// 柱状图添加文本
data.forEach(function(obj) {
  chart.guide().text({
    position: [ obj.Year, obj.NumberNewMicroBrewery ],
    content: obj.NumberNewMicroBrewery,
    style: {
      textAlign: 'center',
      textBaseline: 'bottom'
    },
    offsetY: -4
  });
});

chart.render();
