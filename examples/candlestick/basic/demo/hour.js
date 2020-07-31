import F2 from '@antv/f2';
import insertCss from 'insert-css';

insertCss(`
  .chart-wrapper {
    background-color: #101419;
  }
  .chart-container {
    position: relative;
  }
  .chart-title {
    width: 100%;
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    color: #676C79;
    font-size: 12px;
    font-weight: bold;
    border-bottom: 1px solid #191E26;
  }
  canvas#chart {
    height: 212px;
    border-bottom: 1px solid #191E26;
  }
  canvas#volumn {
    height: 50px;
    border-bottom: 1px solid #191E26;
  }
  .tooltip-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    visibility: hidden;
    padding: 0 10px;
    border-bottom: 1px solid #191E26;
    background-color: #101419;
  }
  .tooltip-item {
    width: 21.25%;
    height: 16px;
    line-height: 16px;
    vertical-align: middle;
  }
  .tooltip-item.first {
    width: 15%;
  }
  .tooltip-item span {
    display: inline;
    color: #899198;
    font-size: 12px;
  }
  .tooltip-item span {
    font-weight: bold;
  }
`);

$('#container').before(`
<div class="chart-wrapper">
  <div class="chart-container">
    <div class="chart-title">分时</div>
    <div class="tooltip-wrapper" id="tooltip">
      <div class="tooltip-item first">
        <span class="item-value" data-type="time"></span>
      </div>
      <div class="tooltip-item">
        <span>价</span>
        <span class="item-value" data-type="price"></span>
      </div>
      <div class="tooltip-item">
        <span>幅</span>
        <span class="item-value" data-type="rate"></span>
      </div>
      <div class="tooltip-item">
        <span>额</span>
        <span class="item-value" data-type="amount"></span>
      </div>
      <div class="tooltip-item last">
        <span>量</span>
        <span class="item-value" data-type="volumn"></span>
      </div>
    </div>
    <canvas id="chart"></canvas>
  </div>
  <div class="chart-container">
    <canvas id="volumn"></canvas>
  </div>
</div>
`);

const COLOR_MAP = [ '#FF4433', '#32A532' ]; // 涨跌
const BASIC_PRICE = 3.55;
let barChart;
let lineChart;

fetch('https://gw.alipayobjects.com/os/antfincdn/GGGAHoT2ap/hour-k.json')
  .then(res => res.json())
  .then(data => {
    const prices = [];
    let lastVolumn = data[0].volumn;
    // 构造数据结构
    data.forEach(function(obj, index) {
      obj.trend = (obj.price > BASIC_PRICE) ? 0 : 1; // 0 表示涨，1 表示跌
      if (index > 0) {
        obj.text = obj.volumn - lastVolumn;
        lastVolumn = obj.volumn;
      } else {
        obj.text = obj.volumn;
      }
      prices.push(obj.price);
    });
    const maxPrice = Math.max.apply(null, prices);
    const minPrice = (BASIC_PRICE - (maxPrice - BASIC_PRICE)).toFixed(2) * 1;
    // 绘制分时折线图
    lineChart = drawlineChart(data, maxPrice, minPrice);
    // 绘制成交量柱状图
    barChart = drawBarChart(data);
  });

// 绘制成交量柱状图
function drawBarChart(data) {
  const chart = new F2.Chart({
    id: 'volumn',
    padding: 0,
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data);
  chart.axis(false);
  chart.tooltip({
    alwaysShow: true,
    showCrosshairs: true,
    crosshairsStyle: {
      stroke: '#D1D3D4',
      lineWidth: 1
    },
    showTooltipMarker: false,
    custom: true,
    onChange(obj) {
      const currentPoint = {
        x: obj.x,
        y: obj.y
      };
      lineChart.showTooltip(currentPoint);
    }
  });
  chart.interval().position('time*text')
    .color('trend', val => {
      return COLOR_MAP[val];
    });
  chart.render();
  return chart;
}

function drawlineChart(data, max, min) {
  const chart = new F2.Chart({
    id: 'chart',
    padding: [ 5, 0, 15 ],
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    time: {
      ticks: [ '09:30', '11:30', '15:00' ]
    },
    price: {
      min,
      max,
      ticks: [ min, max ]
    }
  });
  chart.axis('time', {
    labelOffset: 1,
    label(text, index, total) {
      const cfg = {
        fill: '#818991',
        textAlign: 'center',
        text
      };
      if (index === 0) {
        cfg.textAlign = 'start';
      } else if (index === total - 1) {
        cfg.textAlign = 'end';
      } else {
        cfg.text += '/1300';
      }
      return cfg;
    },
    line: {
      stroke: '#181D26'
    },
    grid: {
      lineWidth: 1,
      stroke: '#181D26'
    }
  });
  chart.axis('price', {
    line: {
      stroke: '#181D26'
    },
    grid: {
      stroke: '#181D26'
    },
    labelOffset: -2,
    label(text, index, total) {
      const cfg = {
        textAlign: 'start',
        text,
        fill: '#818991'
      };
      if (index === 0) {
        cfg.textBaseline = 'bottom';
      } else if (index === (total - 1)) {
        cfg.textBaseline = 'top';
      }
      return cfg;
    }
  });
  chart.tooltip({
    alwaysShow: true,
    showCrosshairs: true,
    crosshairsType: 'xy',
    showYTip: true,
    crosshairsStyle: {
      stroke: '#D1D3D4',
      lineWidth: 1
    },
    yTip(val) {
      return {
        fill: '#80888F',
        fontSize: 10,
        text: val.toFixed(2)
      };
    },
    yTipBackground: {
      fill: '#232C39',
      fillOpacity: 0.95,
      radius: 2,
      stroke: '#252F3D'
    },
    custom: true,
    onChange(obj) {
      const currentPoint = {
        x: obj.x,
        y: obj.y
      };
      barChart.showTooltip(currentPoint);
      const data = obj.items[0].origin;
      $('#tooltip .item-value').each((index, ele) => {
        const type = $(ele).data('type');
        let value = data[type];
        let color = data.trend === 0 ? COLOR_MAP[0] : COLOR_MAP[1];
        if (type === 'volumn') {
          color = '#FFF';
          value = data.text + ' 手';
        } else if (type === 'time') {
          color = '#FFF';
        } else if (type === 'rate') { // 涨跌幅度
          value = (data.price - BASIC_PRICE) / BASIC_PRICE;
          value = (value * 100).toFixed(2) + '%';
        } else if (type === 'amount') {
          value = (data.price - BASIC_PRICE).toFixed(2);
        } else if (type === 'price') {
          value = value.toFixed(2);
        }
        $(ele).css({ color });
        $(ele).text(value);
      });
      $('#tooltip').css('visibility', 'visible');
    },
    onHide() {
      $('#tooltip').css('visibility', 'hidden');
    }
  });
  chart.guide().line({
    start: [ 'min', BASIC_PRICE ],
    end: [ 'max', BASIC_PRICE ],
    style: {
      lineDash: [ 8 ],
      stroke: '#728B6E'
    }
  });
  chart.guide().text({
    position: [ 'min', BASIC_PRICE ],
    content: BASIC_PRICE,
    style: {
      fill: '#878F92',
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'start',
      textBaseline: 'bottom'
    }
  });
  chart.line().position('time*price').color('#98BCDE');
  chart.area().position('time*price').color('#98BCDE');
  chart.render();
  return chart;
}
