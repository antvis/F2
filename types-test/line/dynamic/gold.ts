// https://f2.antv.vision/zh/examples/line/dynamic#gold

import F2 from '@antv/f2';

const data = [
  {
    date: '2017-06-05',
    value: 116,
  },
  {
    date: '2017-06-06',
    value: 129,
  },
  {
    date: '2017-06-07',
    value: 135,
  },
  {
    date: '2017-06-08',
    value: 86,
  },
  {
    date: '2017-06-09',
    value: 73,
  },
  {
    date: '2017-06-10',
    value: 85,
  },
  {
    date: '2017-06-11',
    value: 73,
  },
  {
    date: '2017-06-12',
    value: 68,
  },
  {
    date: '2017-06-13',
    value: 92,
  },
  {
    date: '2017-06-14',
    value: 130,
  },
  {
    date: '2017-06-15',
    value: 245,
  },
  {
    date: '2017-06-16',
    value: 139,
  },
  {
    date: '2017-06-17',
    value: 115,
  },
  {
    date: '2017-06-18',
    value: 111,
  },
  {
    date: '2017-06-19',
    value: 309,
  },
  {
    date: '2017-06-20',
    value: 206,
  },
  {
    date: '2017-06-21',
    value: 137,
  },
  {
    date: '2017-06-22',
    value: 128,
  },
  {
    date: '2017-06-23',
    value: 85,
  },
  {
    date: '2017-06-24',
    value: 94,
  },
  {
    date: '2017-06-25',
    value: 71,
  },
  {
    date: '2017-06-26',
    value: 106,
  },
  {
    date: '2017-06-27',
    value: 84,
  },
  {
    date: '2017-06-28',
    value: 93,
  },
  {
    date: '2017-06-29',
    value: 85,
  },
  {
    date: '2017-06-30',
    value: 73,
  },
  {
    date: '2017-07-01',
    value: 83,
  },
  {
    date: '2017-07-02',
    value: 125,
  },
  {
    date: '2017-07-03',
    value: 107,
  },
  {
    date: '2017-07-04',
    value: 82,
  },
  {
    date: '2017-07-05',
    value: 44,
  },
  {
    date: '2017-07-06',
    value: 72,
  },
  {
    date: '2017-07-07',
    value: 106,
  },
  {
    date: '2017-07-08',
    value: 107,
  },
  {
    date: '2017-07-09',
    value: 66,
  },
  {
    date: '2017-07-10',
    value: 91,
  },
  {
    date: '2017-07-11',
    value: 92,
  },
  {
    date: '2017-07-12',
    value: 113,
  },
  {
    date: '2017-07-13',
    value: 107,
  },
  {
    date: '2017-07-14',
    value: 131,
  },
  {
    date: '2017-07-15',
    value: 111,
  },
  {
    date: '2017-07-16',
    value: 64,
  },
  {
    date: '2017-07-17',
    value: 69,
  },
  {
    date: '2017-07-18',
    value: 88,
  },
  {
    date: '2017-07-19',
    value: 77,
  },
  {
    date: '2017-07-20',
    value: 83,
  },
  {
    date: '2017-07-21',
    value: 111,
  },
  {
    date: '2017-07-22',
    value: 57,
  },
  {
    date: '2017-07-23',
    value: 55,
  },
  {
    date: '2017-07-24',
    value: 60,
  },
];

function drawXText(chart: F2.Chart<typeof data[0]>) {
  const texts = [
    {
      content: '00:00',
      x: '2017-06-05',
    },
    {
      content: '02:30',
      x: '2017-06-23',
    },
    {
      content: '24:00',
      x: '2017-07-24',
    },
  ];

  texts.forEach(function (item, index) {
    chart.guide().text({
      // 位置可以选择实际数值
      // 也可以选实际数值的索引
      // 甚至 min、max、median
      position: [item.x, 'min'],
      content: item.x.slice(5, 10),
      style: (function () {
        const s: F2.CanvasProps = {
          textBaseline: 'bottom',
          fill: '#999',
        };

        if (index === 0) {
          s.textAlign = 'left';
        } else if (index === texts.length - 1) {
          s.textAlign = 'right';
        } else {
          s.textAlign = 'center';
        }

        return s;
      })(),
      offsetY: 20,
    });
  });
}

const result: string[] = [];
data.forEach(function (obj) {
  result.push(obj.date);
});
const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
  padding: ['auto', 'auto', 40, 'auto'],
});

// 渲染折线取部分数据，values 作为数据映射取全部数据
// 这样折线图就不会撑满整个 canvas
chart.source(data.slice(0, 30), {
  value: {
    tickCount: 5,
    min: 0,
  },
  date: {
    type: 'timeCat',
    range: [0, 1],
    mask: 'shortDate',
    values: result,
  },
});

// 隐藏默认的 x 轴
chart.axis('date', false);
// 自定义 x 轴的标签文案
drawXText(chart);
chart.line().position(['date', 'value']);
chart.render();
