import F2 from '@antv/f2';
import insertCss from 'insert-css';

insertCss(`
  .candlestick-daily .chart-wrapper {
    background-color: #101419;
  }
  .candlestick-daily .chart-container {
    position: relative;
  }
  .candlestick-daily .chart-title {
    width: 100%;
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    color: #676C79;
    font-size: 12px;
    font-weight: bold;
    border-bottom: 1px solid #191E26;
  }
  .candlestick-daily canvas#chart {
    height: 212px;
    border-bottom: 1px solid #191E26;
    margin-top: 16px;
  }
  .candlestick-daily canvas#volumn {
    height: 50px;
    border-bottom: 1px solid #191E26;
  }
  .candlestick-daily .tooltip-wrapper {
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
  .candlestick-daily .tooltip-wrapper .tooltip-item {
    width: 15%;
    height: 16px;
    line-height: 16px;
    vertical-align: middle;
  }
  .candlestick-daily .tooltip-wrapper .tooltip-item.last {
    width: 40%;
  }
  .candlestick-daily .tooltip-wrapper .tooltip-item span {
    display: inline;
    color: #899198;
    font-size: 12px;
  }
  .candlestick-daily .tooltip-wrapper .tooltip-item span.item-value {
    font-weight: bold;
  }
  .candlestick-daily #barTooltip .tooltip-item {
    width: 100%;
  }
  .candlestick-daily .ma-wrapper {
    position: absolute;
    top: 20px;
    visibility: hidden;
    width: 100%;
    height: 16px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 0 10px 0 8px;
    border-bottom: 1px solid #191E26;
    background-color: #101419;
  }
  .candlestick-daily .ma-wrapper .tooltip-item {
    width: auto;
    height: 16px;
    line-height: 16px;
    vertical-align: middle;
    font-size: 10px;
    transform: scale(0.83);
  }
  .candlestick-daily .ma-wrapper .tooltip-item.first {
    width: 7%;
  }
  .candlestick-daily .ma-wrapper .tooltip-item.first span {
    background: #676C79;
    padding: 0 4px;
  }
  .candlestick-daily .ma-wrapper .tooltip-item span {
    display: inline;
    color: #899198;
  }
`);

$('#container').before(`
<div class="candlestick-daily">
  <div class="chart-wrapper">
    <div class="chart-container">
      <div class="chart-title">日 K</div>
      <div class="tooltip-wrapper" id="kTooltip">
        <div class="tooltip-item">
          <span>开</span>
          <span class="item-value" data-type="start"></span>
        </div>
        <div class="tooltip-item">
          <span>收</span>
          <span class="item-value" data-type="end"></span>
        </div>
        <div class="tooltip-item">
          <span>高</span>
          <span class="item-value" data-type="high"></span>
        </div>
        <div class="tooltip-item">
          <span>低</span>
          <span class="item-value" data-type="low"></span>
        </div>
        <div class="tooltip-item last">
          <span>成交</span>
          <span class="item-value" data-type="volumn"></span>
        </div>
      </div>
      <div class="ma-wrapper" id="ma">
        <div class="tooltip-item first">
          <span>MA</span>
        </div>
        <div class="tooltip-item">
          <span style="color:#C6268B;">5:</span>
          <span class="item-value" data-type="MA5"></span>
        </div>
        <div class="tooltip-item">
          <span style="color:#D7A429;">10:</span>
          <span class="item-value" data-type="MA10"></span>
        </div>
        <div class="tooltip-item">
          <span style="color: #227BAF;">20:</span>
          <span class="item-value" data-type="MA20"></span>
        </div>
        <div class="tooltip-item">
          <span style="color:#6960C4;">30:</span>
          <span class="item-value" data-type="MA30"></span>
        </div>
      </div>
      <canvas id="chart"></canvas>
    </div>
    <div class="chart-container">
      <div class="chart-title">成交量</div>
      <div class="tooltip-wrapper" id="barTooltip">
        <div class="tooltip-item">
          <span>成交量:</span>
          <span class="item-value" data-type="volumn"></span>
        </div>
      </div>
      <canvas id="volumn"></canvas>
    </div>
  </div>
</div>
`);

const COLOR_MAP = [ '#FF4433', '#32A532' ]; // 涨跌
let barChart;
let kChart;
function updateMATip(data, index) {
  const currItem = data[index];
  $('#ma .item-value').each((index, ele) => {
    const type = $(ele).data('type');
    const value = currItem[type];
    $(ele).text(value);
  });
  $('#ma').css('visibility', 'visible');
}

fetch('../data/1d-k.json')
  .then(res => res.json())
  .then(data => {
    // 构造数据结构
    const reportDates = [];
    data.forEach(function(obj) {
      reportDates.push(obj.reportDate);
      obj.range = [ obj.start, obj.end, obj.high, obj.low ];
      obj.trend = (obj.start <= obj.end) ? 0 : 1; // 0 表示涨，1 表示跌
    });
    const firstShowDates = reportDates.slice(75); // 首屏展示的日期
    // 绘制 K 线图
    kChart = drawKChart(data, firstShowDates, reportDates);
    // 绘制成交量柱状图
    barChart = drawBarChart(data, firstShowDates);
  });

// 绘制成交量柱状图
function drawBarChart(data, firstShowDates) {
  const chart = new F2.Chart({
    id: 'volumn',
    padding: [ 0, 0, 6 ],
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    reportDate: {
      type: 'timeCat',
      values: firstShowDates
    }
  });
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
      kChart.showTooltip(currentPoint);
      const data = obj.items[0].origin;
      $('#barTooltip .item-value').each((index, ele) => {
        const type = $(ele).data('type');
        const value = data[type];
        $(ele).css({ color: '#FFFFFF' });
        $(ele).text(value);
      });
      $('#barTooltip').css('visibility', 'visible');
    },
    onHide() {
      $('#barTooltip').css('visibility', 'hidden');
    }
  });
  chart.interval().position('reportDate*volumn')
    .color('trend', val => {
      return COLOR_MAP[val];
    });
  chart.interaction('pinch', {
    maxScale: 25,
    onProcess() {
      if (this.pressed) return;
      const currentValues = chart.getXScale().values; // 获取平移后的当前展示 values
      kChart.scale('reportDate', {
        type: 'timeCat',
        values: currentValues,
        ticks: [ '2018-06-08', '2018-07-02', '2018-08-01', '2018-09-03', '2018-10-08', '2018-11-01' ]
      });
      kChart.repaint();
    },
    onEnd() {
      kChart.hideTooltip();
      chart.hideTooltip();
    }
  });
  chart.interaction('pan', {
    onProcess() {
      if (this.pressed) return;
      const currentValues = chart.getXScale().values; // 获取平移后的当前展示 values
      kChart.scale('reportDate', {
        type: 'timeCat',
        values: currentValues,
        ticks: [ '2018-06-08', '2018-07-02', '2018-08-01', '2018-09-03', '2018-10-08', '2018-11-01' ]
      });
      kChart.repaint();
    },
    onEnd() {
      kChart.hideTooltip();
      chart.hideTooltip();
    }
  });
  // 添加进度条
  chart.scrollBar({
    mode: 'x',
    xStyle: {
      backgroundColor: 'rgba(202, 215, 239, .2)',
      fillerColor: '#818991',
      size: 4,
      lineCap: 'square',
      offsetX: 0,
      offsetY: 1
    }
  });
  chart.render();
  return chart;
}

function drawKChart(data, firstShowDates, allDates) {
  const chart = new F2.Chart({
    id: 'chart',
    padding: [ 0, 0, 18 ],
    pixelRatio: window.devicePixelRatio,
    syncY: true
  });
  chart.source(data, {
    reportDate: {
      type: 'timeCat',
      ticks: [ '2018-06-08', '2018-07-02', '2018-08-01', '2018-09-03', '2018-10-08', '2018-11-01' ],
      values: firstShowDates
    }
  });
  chart.axis('reportDate', {
    labelOffset: 1,
    label(text, index, total) {
      let textAlign = 'center';
      if (index === 0) {
        textAlign = 'start';
      } else if (index === total - 1) {
        textAlign = 'end';
      }
      return {
        text: text.slice(0, 7),
        fill: '#818991',
        textAlign
      };
    },
    line: {
      stroke: '#181D26'
    },
    grid: {
      lineWidth: 1,
      stroke: '#181D26'
    }
  });
  chart.axis('range', {
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
        text: parseFloat(text).toFixed(2),
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
  chart.axis('MA5', false);
  chart.axis('MA10', false);
  chart.axis('MA20', false);
  chart.axis('MA30', false);
  chart.tooltip({
    showTooltipMarker: false,
    alwaysShow: true,
    showCrosshairs: true,
    crosshairsType: 'xy',
    showXTip: true,
    showYTip: true,
    crosshairsStyle: {
      stroke: '#D1D3D4',
      lineWidth: 1
    },
    xTip: {
      fill: '#80888F',
      fontSize: 10
    },
    yTip(val) {
      return {
        fill: '#80888F',
        fontSize: 10,
        text: val.toFixed(3)
      };
    },
    xTipBackground: {
      fill: '#232C39',
      fillOpacity: 0.75,
      radius: 2
    },
    yTipBackground: {
      fill: '#232C39',
      fillOpacity: 0.75,
      radius: 2
    },
    custom: true,
    onChange(obj) {
      const currentPoint = {
        x: obj.x,
        y: obj.y
      };
      barChart.showTooltip(currentPoint);
      const currData = obj.items[0].origin;
      $('#kTooltip .item-value').each((index, ele) => {
        const type = $(ele).data('type');
        const value = currData[type];
        let color;
        if (type === 'volumn') {
          color = '#FFF';
        } else {
          color = currData.trend === 0 ? COLOR_MAP[0] : COLOR_MAP[1];
        }
        $(ele).css({ color });
        $(ele).text(value);
      });
      $('#kTooltip').css('visibility', 'visible');
      updateMATip(data, allDates.indexOf(currData.reportDate));
    },
    onHide() {
      $('#kTooltip').css('visibility', 'hidden');
      $('#ma').css('visibility', 'hidden');
    }
  });
  chart.schema().position('reportDate*range')
    .color('trend', val => {
      return COLOR_MAP[val];
    })
    .shape('candle');
  chart.line()
    .position('reportDate*MA5')
    .color('#C6268B')
    .size(1)
    .animate(false);
  chart.line()
    .position('reportDate*MA10')
    .color('#D7A429')
    .size(1)
    .animate(false);
  chart.line()
    .position('reportDate*MA20')
    .color('#227BAF')
    .size(1)
    .animate(false);
  chart.line()
    .position('reportDate*MA30')
    .color('#6960C4')
    .size(1)
    .animate(false);
  chart.interaction('pinch', {
    maxScale: 25,
    onProcess() {
      if (this.pressed) return;
      const currentValues = chart.getXScale().values; // 获取平移后的当前展示 values
      barChart.scale('reportDate', {
        type: 'timeCat',
        values: currentValues
      });
      barChart.repaint();
    },
    onEnd() {
      barChart.hideTooltip();
      chart.hideTooltip();
    }
  });
  chart.interaction('pan', {
    onProcess() {
      if (this.pressed) return; // TODO, 这个标识位好恶心
      const currentValues = chart.getXScale().values; // 获取平移后的当前展示 values
      barChart.scale('reportDate', {
        type: 'timeCat',
        values: currentValues
      });
      barChart.repaint();
    },
    onEnd() {
      barChart.hideTooltip();
      chart.hideTooltip();
    }
  });
  chart.render();
  return chart;
}
