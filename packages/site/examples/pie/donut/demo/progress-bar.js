import F2 from '@antv/f2';

const data = [{
  x: '1',
  y: 85
}];

const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  y: {
    max: 100,
    min: 0
  }
});
chart.axis(false);
chart.tooltip(false);
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.8,
  radius: 0.85
});
chart.guide().arc({
  start: [ 0, 0 ],
  end: [ 1, 99.98 ],
  top: false,
  style: {
    lineWidth: 20,
    stroke: '#ccc'
  }
});
chart.guide().text({
  position: [ '50%', '50%' ],
  content: '85%',
  style: {
    fill: '#1890FF'
  }
});
chart.interval()
  .position('x*y')
  .size(20)
  .animate({
    appear: {
      duration: 1200,
      easing: 'cubicIn'
    }
  });
chart.render();
