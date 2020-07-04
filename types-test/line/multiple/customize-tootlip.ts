// https://f2.antv.vision/zh/examples/line/multiple#customize-tootlip

import F2 from '@antv/f2';

declare const $: any;

const data = [
  {
    date: '2017-06-05',
    value: 11.6,
    tag: 0,
  },
  {
    date: '2017-06-06',
    value: 12.9,
    tag: 0,
  },
  {
    date: '2017-06-07',
    value: 13.5,
    tag: 0,
  },
  {
    date: '2017-06-08',
    value: 8.6,
    tag: 2,
  },
  {
    date: '2017-06-09',
    value: 7.3,
    tag: 2,
  },
  {
    date: '2017-06-10',
    value: 8.5,
    tag: 0,
  },
  {
    date: '2017-06-11',
    value: 7.3,
    tag: 0,
  },
  {
    date: '2017-06-12',
    value: 6.8,
    tag: 0,
  },
  {
    date: '2017-06-13',
    value: 9.2,
    tag: 0,
  },
  {
    date: '2017-06-14',
    value: 13.0,
    tag: 1,
  },
  {
    date: '2017-06-15',
    value: 24.5,
    tag: 0,
  },
  {
    date: '2017-06-16',
    value: 13,
    tag: 0,
  },
  {
    date: '2017-06-17',
    value: 11.5,
    tag: 1,
  },
  {
    date: '2017-06-18',
    value: 11.1,
    tag: 0,
  },
  {
    date: '2017-06-19',
    value: 30.9,
    tag: 0,
  },
  {
    date: '2017-06-20',
    value: 20.6,
    tag: 1,
  },
  {
    date: '2017-06-21',
    value: 13.7,
    tag: 1,
  },
  {
    date: '2017-06-22',
    value: 12.8,
    tag: 1,
  },
  {
    date: '2017-06-23',
    value: 8.5,
    tag: 0,
  },
  {
    date: '2017-06-24',
    value: 9.4,
    tag: 1,
  },
  {
    date: '2017-06-25',
    value: 7.1,
    tag: 0,
  },
  {
    date: '2017-06-26',
    value: 10.6,
    tag: 0,
  },
  {
    date: '2017-06-27',
    value: 8.4,
    tag: 0,
  },
  {
    date: '2017-06-28',
    value: 9.3,
    tag: 0,
  },
  {
    date: '2017-06-29',
    value: 8.5,
    tag: 0,
  },
  {
    date: '2017-06-30',
    value: 7.3,
    tag: 0,
  },
];

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
  padding: [45, 'auto', 'auto'],
});

chart.source(data, {
  value: {
    tickCount: 5,
    min: 0,
    formatter: function formatter(val) {
      return val.toFixed(2) + '%';
    },
  },
  date: {
    type: 'timeCat',
    range: [0, 1],
    tickCount: 3,
  },
});

chart.axis('date', {
  label: function label(text, index, total) {
    const textCfg: F2.AxisLabelParams = {};
    if (index === 0) {
      textCfg.textAlign = 'left';
    } else if (index === total - 1) {
      textCfg.textAlign = 'right';
    }
    return textCfg;
  },
});
chart.axis('value', {
  label: function label(text, index, total) {
    const textCfg: F2.AxisLabelParams = {};
    if (index === 0) {
      textCfg.textBaseline = 'bottom';
    } else if (index === total - 1) {
      textCfg.textBaseline = 'top';
    }
    return textCfg;
  },
});
chart.legend({
  custom: true,
  itemWidth: null,
  items: [
    {
      name: '买入点',
      marker: 'circle',
      fill: '#F35833',
    },
    {
      name: '卖出点',
      marker: 'circle',
      fill: '#518DFE',
    },
  ],
});
chart.guide().html({
  position: ['min', 'max'],
  html: `<div id="tooltipWrapper" style="height: 30px;background-color:#E9F1FF;line-height: 30px;">
      <div id="tooltipName" style="float:left;font-size:12px;color:#2E2E2E;"></div>
      <div id="tooltipValue" style="float:right;font-size:12px;color:#2E2E2E;"></div>
    </div>`,
  offsetY: -22.5,
});
chart.tooltip({
  showCrosshairs: true,
  custom: true, // 自定义 tooltip 内容框
  onChange: function onChange(obj) {
    const items = obj.items;
    const originData = items[0].origin;
    const date = originData.date;
    const value = originData.value;
    const tag = originData.tag;

    $('#tooltipWrapper').width($('#container').width());
    $('#tooltipWrapper').css('left', 0);
    $('#tooltipName').css('margin-left', 15);
    $('#tooltipValue').css('margin-right', 15);

    if (tag === 1) {
      $('#tooltipName').html(
        date +
          '<img style="width:27.5px;vertical-align:middle;margin-left:3px;" src="https://gw.alipayobjects.com/zos/rmsportal/RcgYrLNGIUfTytjjijER.png">',
      );
    } else if (tag === 2) {
      $('#tooltipName').html(
        date +
          '<img style="width:27.5px;vertical-align:middle;margin-left:3px;" src="https://gw.alipayobjects.com/zos/rmsportal/XzNFpOkuSLlmEWUSZErB.png">',
      );
    } else {
      $('#tooltipName').text(date);
    }
    const color = value >= 0 ? '#FA541C' : '#1CAA3D';

    $('#tooltipValue').html(
      '涨幅：<span style="color:' + color + '">' + items[0].value + '</span>',
    );
    $('#tooltipWrapper').show();
  },
  onHide: function onHide() {
    $('#tooltipWrapper').hide();
  },
});
chart.line().position(['date', 'value']).color('#518DFE');
chart
  .point()
  .position(['date', 'value'])
  .size('tag', function (val) {
    return val ? 3 : 0;
  })
  .style('tag', {
    fill: function fill(val) {
      if (val === 2) {
        return '#518DFE';
      } else if (val === 1) {
        return '#F35833';
      }
    },
    stroke: '#fff',
    lineWidth: 1,
  });
chart.render();
