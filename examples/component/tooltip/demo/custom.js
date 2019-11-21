import F2 from '@antv/f2';
import insertCss from 'insert-css';

insertCss(`
  .chart-wrapper {
    position: relative;
  }
  .f2-tooltip {
    -moz-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 1px 0.5px 0.5px rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 99;
    background-color: #1890ff;
    padding: 5px;
    border-radius: 3px;
    text-align: center;
    width: 120px;
    opacity: 0;
  }
  .f2-tooltip:after {
    content: " ";
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #1890ff;
    position: absolute;
    left: 50%;
    margin-left: -6px;
    bottom: -8px;
  }
  .f2-tooltip span {
    display: block;
    color: #fff;
  }
  .f2-tooltip span:nth-child(1) {
    font-size: 11px !important;
  }
  .f2-tooltip span:nth-child(2) {
    font-size: 13px !important;
  }
`);

$('\n  <div class="f2-tooltip">\n    <span> </span>\n    <span> </span>\n  </div>\n').insertBefore('#container');

const canvasOffsetTop = $('#container').position().top;
const canvasOffsetLeft = $('#container').position().left;

const dataPoints = [{
  date: '2015-01-01',
  value: 570
}, {
  date: '2015-01-05',
  value: 525
}, {
  date: '2015-01-09',
  value: 560
}, {
  date: '2015-01-13',
  value: 550
}, {
  date: '2015-01-17',
  value: 555
}, {
  date: '2015-01-21',
  value: 580
}, {
  date: '2015-01-25',
  value: 560
}, {
  date: '2015-01-29',
  value: 560
}];

const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
  padding: [ 30, 50, 'auto' ]
});
chart.source(dataPoints, {
  date: {
    type: 'timeCat',
    mask: 'D.MMM',
    range: [ 0, 1 ],
    tickCount: 8
  },
  value: {
    tickCount: 5
  }
});
chart.axis('date', {
  tickLine: {
    length: 5,
    stroke: '#e8e8e8',
    lineWidth: 1
  }
});
chart.axis('value', {
  grid: {
    lineDash: null
  }
});
chart.tooltip({
  custom: true,
  showCrosshairs: false,
  onChange: function onChange(ev) {
    const tooltipEl = $('.f2-tooltip');
    const currentData = ev.items[0];
    const text = currentData.value;
    tooltipEl.html([ '<span>' + currentData.origin.date + '</span>', '<span>Web Visits: <b>' + text + '</b></span>' ].join(''));

    tooltipEl.css({
      opacity: 1,
      left: canvasOffsetLeft + currentData.x - tooltipEl.outerWidth() / 2 + 'px',
      top: canvasOffsetTop + currentData.y - tooltipEl.outerHeight() - 15 + 'px'
    });
  },
  onHide: function onHide() {
    const tooltipEl = $('.f2-tooltip');
    tooltipEl.css({
      opacity: 0
    });
  }
});
chart.area()
  .position('date*value')
  .shape('smooth')
  .style({
    fillOpacity: 0.85
  });
chart.render();
