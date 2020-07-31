import F2 from '@antv/f2';
import insertCss from 'insert-css';

insertCss(`
  canvas.steps-record {
    border-radius: 5px;
    background-image: linear-gradient(-135deg, #874BFF 0%, #6854EE 43%, #6052F2 63%, #534FFA 100%);
  }
  .chart-tooltip {
    position: absolute;
    z-index: 99;
    font-size: 12px;
    color: #ADC6FF;
    text-align: center;
    top: 38vw;
    left: 0;
    margin-top: 3px;
    visibility: hidden;
    transition: top 0.4s cubic-bezier(0.23, 1, 0.32, 1)
  }
`);
// 设置独立的css
const container = document.getElementById('container');
container.className = 'steps-record';
$(container).after('<div class="chart-tooltip" id="tooltip"></div>');

const data = [{
  date: '2018-04-21',
  steps: 59
}, {
  date: '2018-04-22',
  steps: 2515
}, {
  date: '2018-04-23',
  steps: 6524
}, {
  date: '2018-04-24',
  steps: 26044
}, {
  date: '2018-04-25',
  steps: 29763
}, {
  date: '2018-04-26',
  steps: 10586
}, {
  date: '2018-04-27',
  steps: 14758
}, {
  date: '2018-04-29',
  steps: 549
}, {
  date: '2018-04-30',
  steps: 21
}, {
  date: '2018-05-01',
  steps: 1069
}, {
  date: '2018-05-02',
  steps: 7918
}, {
  date: '2018-05-03',
  steps: 5381
}, {
  date: '2018-05-04',
  steps: 11549
}, {
  date: '2018-05-06',
  steps: 19461
}, {
  date: '2018-05-07',
  steps: 22487
}, {
  date: '2018-05-08',
  steps: 11062
}, {
  date: '2018-05-09',
  steps: 7101
}, {
  date: '2018-05-10',
  steps: 12776
}, {
  date: '2018-05-11',
  steps: 12919
}, {
  date: '2018-05-12',
  steps: 7216
}, {
  date: '2018-05-13',
  steps: 4867
}, {
  date: '2018-05-14',
  steps: 8725
}, {
  date: '2018-05-15',
  steps: 8983
}, {
  date: '2018-05-16',
  steps: 22348
}, {
  date: '2018-05-17',
  steps: 17142
}, {
  date: '2018-05-18',
  steps: 8715
}, {
  date: '2018-05-19',
  steps: 3861
}, {
  date: '2018-05-20',
  steps: 8
}, {
  date: '2018-05-21',
  steps: 24365
}, {
  date: '2018-05-22',
  steps: 14271
}];


const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
  padding: [ 20, 30, 'auto', 'auto' ]
});
chart.source(data, {
  date: {
    type: 'timeCat',
    range: [ 0, 1 ],
    mask: 'MM-D'
  },
  steps: {
    ticks: [ 10000 ],
    formatter: function formatter(val) {
      return val === 10000 ? '1W' : 0;
    }
  }
});

// 分别设置x、y轴，自定义label的内容和样式。
chart.axis('date', {
  line: {
    stroke: '#85A5FF'
  },
  label: function label(text, index, total) {
    const cfg = {
      textAlign: 'center',
      fill: '#85A5FF',
      fontSize: 12,
      fontWeight: 300
    };
    if (index === 0) {
      cfg.textAlign = 'start';
      cfg.text = text.split('-').join('月');
    } else {
      cfg.text = text.split('-')[1];
    }

    if (index === total - 1) {
      cfg.textAlign = 'end';
      cfg.fill = '#ADC6FF';
      cfg.fontWeight = 'normal';
    }

    return cfg;
  }
});
chart.axis('steps', {
  position: 'right',
  label: {
    fill: '#CFFFFE',
    fillOpacity: 0.5,
    fontSize: 9,
    fontWeight: 300
  },
  grid: {
    stroke: '#85A5FF'
  }
});

// 设置tooltip
chart.tooltip({
  custom: true,
  showCrosshairs: true,
  showTooltipMarker: false,
  crosshairsStyle: {
    lineDash: [ 2 ],
    stroke: '#77C0B3'
  },
  onChange: function onChange(e) {
    const item = e.items[0];
    const origin = item.origin;
    const tooltipEl = $('#tooltip');
    tooltipEl.text(origin.steps);
    // 设置 tooltip 位置
    const canvasOffsetTop = $('#container').position().top;
    const canvasOffsetLeft = $('#container').position().left;
    const tooltipWidth = tooltipEl.outerWidth();
    tooltipEl.css({
      visibility: 'visible',
      left: canvasOffsetLeft + item.x - tooltipWidth / 2,
      top: canvasOffsetTop
    });
  },
  onHide: function onHide() {
    const tooltipEl = $('#tooltip');
    tooltipEl.css({
      visibility: 'hidden'
    });
  }
});

// 分别绘制area、折线和点
chart.area().position('date*steps').style({
  fill: 'l(-90) 0.03:rgba(216,216,216,0.10) 1:#6E6CD8',
  fillOpacity: 1
});
chart.line()
  .position('date*steps')
  .color('#EFDBFF')
  .size(1.5);
chart.point()
  .position('date*steps')
  .color('#EED5FF')
  .size(2.5);
chart.render();
