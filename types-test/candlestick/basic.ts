// https://f2.antv.vision/zh/examples/candlestick/basic#basic

import F2 from '@antv/f2';

declare const $: any;

fetch('../data/candle-sticks.json')
  .then(res => res.json())
  .then(
    (
      data: Array<{
        end: number;
        max: number;
        min: number;
        money: number;
        start: number;
        time: string;
        volumn: number;
        range: number[];
        trend: 0 | 1;
      }>,
    ) => {
      data = data.slice(0, 150); // 截取数据，只展示 200 条
      const BASIC_PRICE = 6.95;
      // 数据处理，按照时间排序
      data.sort(function (obj1, obj2) {
        return obj1.time > obj2.time ? 1 : -1;
      });
      data.forEach(function (obj) {
        obj.range = [obj.start, obj.end, obj.max, obj.min];
        obj.trend = obj.start <= obj.end ? 0 : 1;
      });
      const chart = new F2.Chart<typeof data[0]>({
        id: 'container',
        pixelRatio: window.devicePixelRatio,
      });

      chart.source(data, {
        range: {
          tickCount: 5,
        },
        time: {
          tickCount: 3,
        },
      });
      chart.tooltip({
        showCrosshairs: true,
        showXTip: true,
        showYTip: true,
        crosshairsType: 'xy',
        custom: true,
        yTip: function yTip(val) {
          return {
            fill: '#333',
            fontSize: 10,
          };
        },

        xTip: {
          fill: '#333',
          fontSize: 10,
        },
        xTipBackground: {
          fill: '#EDF2FE',
        },
        yTipBackground: {
          fill: '#EDF2FE',
        },
        crosshairsStyle: {
          stroke: '#0F8DE8',
        },
        onChange: function onChange(obj) {
          const data = obj.items[0].origin;
          $('#tooltip .item-value').each(function (index: any, ele: any) {
            const type = $(ele).data('type');
            const value = (data as any)[type];
            let color;
            if (type === 'time') {
              color = '#000000';
            } else {
              color = data.trend === 0 ? '#F4333C' : '#1CA93D';
            }
            $(ele).css({
              color,
            });
            $(ele).text(value);
          });
          $('#tooltip').css('visibility', 'visible');
        },
        onHide: function onHide() {
          $('#tooltip').css('visibility', 'hidden');
        },
      });
      chart.axis('range', {
        grid: {
          stroke: '#ddd',
          lineWidth: 1,
          lineDash: null,
        },
        label: {
          fill: '#999',
        },
      });
      chart.axis('time', {
        label: function label(text, index, total) {
          const textCfg: F2.AxisLabelParams = {
            fill: '#999',
          };
          if (index === 0) {
            textCfg.textAlign = 'left';
          }
          if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        },

        grid: {
          lineWidth: 1,
          stroke: '#ddd',
        },
      });
      chart.guide().line({
        start: ['min', BASIC_PRICE],
        end: ['max', BASIC_PRICE],
        style: {
          lineDash: [8],
          stroke: '#F68300',
        },
      });
      chart.guide().text({
        position: ['min', BASIC_PRICE],
        content: BASIC_PRICE,
        style: {
          fill: '#808080',
          textAlign: 'start',
          textBaseline: 'bottom',
          fontSize: 10,
          fontWeight: 'bold',
        },
        offsetX: 2,
      });
      chart.guide().rect({
        start: ['0%', '0%'],
        end: ['100%', '100%'],
        style: {
          stroke: '#ddd',
          lineWidth: 1,
          fill: '#fff',
          opacity: 1,
          fillOpacity: 0,
        },
      });
      chart
        .schema()
        .position(['time', 'range'])
        .color('trend', function (trend) {
          return ['#F4333C', '#1CA93D'][trend];
        })
        .shape('candle');
      chart.render();
    },
  );
