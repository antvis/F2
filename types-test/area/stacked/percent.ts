// https://f2.antv.vision/zh/examples/area/stacked#percent

import F2 from '@antv/f2';
import _ from 'lodash';

function formatterPercent(value: number) {
  value = value || 0;
  value = value * 100;
  return Math.round(value) + '%';
}

const data = [
  {
    country: 'Asia',
    year: '1750',
    value: 502,
    percent: 0.6511024643320363,
  },
  {
    country: 'Africa',
    year: '1750',
    value: 106,
    percent: 0.13748378728923477,
  },
  {
    country: 'Europe',
    year: '1750',
    value: 163,
    percent: 0.21141374837872892,
  },
  {
    country: 'Asia',
    year: '1800',
    value: 635,
    percent: 0.671957671957672,
  },
  {
    country: 'Africa',
    year: '1800',
    value: 107,
    percent: 0.11322751322751323,
  },
  {
    country: 'Europe',
    year: '1800',
    value: 203,
    percent: 0.21481481481481482,
  },
  {
    country: 'Asia',
    year: '1850',
    value: 809,
    percent: 0.6764214046822743,
  },
  {
    country: 'Africa',
    year: '1850',
    value: 111,
    percent: 0.09280936454849498,
  },
  {
    country: 'Europe',
    year: '1850',
    value: 276,
    percent: 0.23076923076923078,
  },
  {
    country: 'Asia',
    year: '1900',
    value: 947,
    percent: 0.6364247311827957,
  },
  {
    country: 'Africa',
    year: '1900',
    value: 133,
    percent: 0.08938172043010753,
  },
  {
    country: 'Europe',
    year: '1900',
    value: 408,
    percent: 0.27419354838709675,
  },
  {
    country: 'Asia',
    year: '1950',
    value: 1402,
    percent: 0.6460829493087558,
  },
  {
    country: 'Africa',
    year: '1950',
    value: 221,
    percent: 0.10184331797235023,
  },
  {
    country: 'Europe',
    year: '1950',
    value: 547,
    percent: 0.252073732718894,
  },
  {
    country: 'Asia',
    year: '1999',
    value: 3634,
    percent: 0.7083820662768031,
  },
  {
    country: 'Africa',
    year: '1999',
    value: 767,
    percent: 0.14951267056530215,
  },
  {
    country: 'Europe',
    year: '1999',
    value: 729,
    percent: 0.14210526315789473,
  },
  {
    country: 'Asia',
    year: '2050',
    value: 5268,
    percent: 0.687548942834769,
  },
  {
    country: 'Africa',
    year: '2050',
    value: 1766,
    percent: 0.23048812320542938,
  },
  {
    country: 'Europe',
    year: '2050',
    value: 628,
    percent: 0.08196293395980161,
  },
];
const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

chart.source(data, {
  year: {
    range: [0, 1],
  },
  percent: {
    formatter: function formatter(val) {
      return formatterPercent(val);
    },
    alias: 'percent(%)',
  },
});
chart.axis('year', {
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
// 自定义图例项的 marker 图形样式
chart.legend({
  marker: function marker(x, y, r, ctx) {
    // 11px * 9px
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.moveTo(x - 5.5, y - 4);
    ctx.lineTo(x + 5.5, y - 4);
    ctx.stroke();
    ctx.restore();
    ctx.globalAlpha = 0.1;
    ctx.moveTo(x - 5.5, y - 4);
    ctx.lineTo(x + 5.5, y - 4);
    ctx.lineTo(x + 5.5, y + 4);
    ctx.lineTo(x - 5.5, y + 4);
    ctx.closePath();
  },
});
chart.tooltip({
  showCrosshairs: true,
  custom: true, // 自定义 tooltip 内容框
  onChange: function onChange(obj) {
    const legend = chart.get('legendController').legends.top![0];
    const tooltipItems = obj.items;
    const legendItems = legend.items;
    const map: Record<string, F2.LegendItem> = {};
    legendItems.forEach(function (item) {
      map[item.name] = _.clone(item);
    });
    tooltipItems.forEach(function (item) {
      const name = item.name!;
      const value = item.value;
      if (map[name]) {
        map[name].value = value;
      }
    });
    legend.setItems(_.values(map));
  },
  onHide: function onHide() {
    const legend = chart.get('legendController').legends.top![0];
    legend.setItems(chart.getLegendItems().country!);
  },
});
chart.area().position(['year', 'percent']).color('country').adjust('stack');
chart.line().position(['year', 'percent']).color('country').adjust('stack');
chart.render();
