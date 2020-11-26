import F2 from '../../src/index-all';

const canvas = document.createElement('canvas');
canvas.style.width = '370px';
canvas.style.height = '300px';
document.body.appendChild(canvas);

describe('无障碍处理', () => {
  describe('折线图', () => {
    it('折线图', () => {
      const data = [{
        date: '2017-06-05',
        value: 116
      }, {
        date: '2017-06-06',
        value: 129
      }, {
        date: '2017-06-07',
        value: 135
      }, {
        date: '2017-06-08',
        value: 86
      }, {
        date: '2017-06-09',
        value: 73
      }, {
        date: '2017-06-10',
        value: 85
      }, {
        date: '2017-06-11',
        value: 73
      }, {
        date: '2017-06-12',
        value: 68
      }, {
        date: '2017-06-13',
        value: 92
      }, {
        date: '2017-06-14',
        value: 130
      }, {
        date: '2017-06-15',
        value: 245
      }, {
        date: '2017-06-16',
        value: 139
      }, {
        date: '2017-06-17',
        value: 115
      }, {
        date: '2017-06-18',
        value: 111
      }, {
        date: '2017-06-19',
        value: 309
      }, {
        date: '2017-06-20',
        value: 206
      }, {
        date: '2017-06-21',
        value: 137
      }, {
        date: '2017-06-22',
        value: 128
      }, {
        date: '2017-06-23',
        value: 85
      }, {
        date: '2017-06-24',
        value: 94
      }, {
        date: '2017-06-25',
        value: 71
      }, {
        date: '2017-06-26',
        value: 106
      }, {
        date: '2017-06-27',
        value: 84
      }, {
        date: '2017-06-28',
        value: 93
      }, {
        date: '2017-06-29',
        value: 85
      }, {
        date: '2017-06-30',
        value: 73
      }, {
        date: '2017-07-01',
        value: 83
      }, {
        date: '2017-07-02',
        value: 125
      }, {
        date: '2017-07-03',
        value: 107
      }, {
        date: '2017-07-04',
        value: 82
      }, {
        date: '2017-07-05',
        value: 44
      }, {
        date: '2017-07-06',
        value: 72
      }, {
        date: '2017-07-07',
        value: 106
      }, {
        date: '2017-07-08',
        value: 107
      }, {
        date: '2017-07-09',
        value: 66
      }, {
        date: '2017-07-10',
        value: 91
      }, {
        date: '2017-07-11',
        value: 92
      }, {
        date: '2017-07-12',
        value: 113
      }, {
        date: '2017-07-13',
        value: 107
      }, {
        date: '2017-07-14',
        value: 131
      }, {
        date: '2017-07-15',
        value: 111
      }, {
        date: '2017-07-16',
        value: 64
      }, {
        date: '2017-07-17',
        value: 69
      }, {
        date: '2017-07-18',
        value: 88
      }, {
        date: '2017-07-19',
        value: 77
      }, {
        date: '2017-07-20',
        value: 83
      }, {
        date: '2017-07-21',
        value: 111
      }, {
        date: '2017-07-22',
        value: 57
      }, {
        date: '2017-07-23',
        value: 55
      }, {
        date: '2017-07-24',
        value: 60
      }];
      const chart = new F2.Chart({
        el: canvas,
        pixelRatio: window.devicePixelRatio,
        aria: true
      });

      chart.source(data, {
        date: {
          type: 'timeCat'
        }
      });
      chart.line().position('date*value');
      chart.render();

      expect(canvas.getAttribute('aria-label')).toBe('这是一个图表， X轴是时间型，时间范围从2017-06-05到2017-07-24；Y轴是数值型，数据最小值为0，最大值为320； ');
    });

    it('对比折线图', () => {
      const data = [{
        time: '2016-08-08 00:00:00',
        value: 10,
        type: '预期收益率'
      }, {
        time: '2016-08-08 00:10:00',
        value: 22,
        type: '预期收益率'
      }, {
        time: '2016-08-08 00:30:00',
        value: 16,
        type: '预期收益率'
      }, {
        time: '2016-08-09 00:35:00',
        value: 26,
        type: '预期收益率'
      }, {
        time: '2016-08-09 01:00:00',
        value: 12,
        type: '预期收益率'
      }, {
        time: '2016-08-09 01:20:00',
        value: 26,
        type: '预期收益率'
      }, {
        time: '2016-08-10 01:40:00',
        value: 18,
        type: '预期收益率'
      }, {
        time: '2016-08-10 02:00:00',
        value: 26,
        type: '预期收益率'
      }, {
        time: '2016-08-10 02:20:00',
        value: 12,
        type: '预期收益率'
      }, {
        time: '2016-08-08 00:00:00',
        value: 4,
        type: '实际收益率'
      }, {
        time: '2016-08-08 00:10:00',
        value: 3,
        type: '实际收益率'
      }, {
        time: '2016-08-08 00:30:00',
        value: 6,
        type: '实际收益率'
      }, {
        time: '2016-08-09 00:35:00',
        value: -12,
        type: '实际收益率'
      }, {
        time: '2016-08-09 01:00:00',
        value: 1,
        type: '实际收益率'
      }, {
        time: '2016-08-09 01:20:00',
        value: 9,
        type: '实际收益率'
      }, {
        time: '2016-08-10 01:40:00',
        value: 13,
        type: '实际收益率'
      }, {
        time: '2016-08-10 02:00:00',
        value: -3,
        type: '实际收益率'
      }, {
        time: '2016-08-10 02:20:00',
        value: 11,
        type: '实际收益率'
      }];
      const chart = new F2.Chart({
        el: canvas,
        pixelRatio: window.devicePixelRatio,
        aria: true
      });
      chart.source(data, {
        time: {
          type: 'timeCat',
          mask: 'hh:mm'
        }
      });
      chart.line()
        .position('time*value')
        .color('type');

      chart.render();

      expect(canvas.getAttribute('aria-label')).toBe('这是一个图表， 图例分类有： 预期收益率 实际收益率  X轴是时间型，时间范围从12:00到02:20；Y轴是数值型，数据最小值为-12，最大值为36；共有2种分类组成，第1类是预期收益率，共有9项数据，前3项是12:00:10 12:10:22 12:30:16 12:35:26 01:00:12;第2类是实际收益率，共有9项数据，前3项是12:00:4 12:10:3 12:30:6 12:35:-12 01:00:1; ');
    });
  });

  describe('柱状图', () => {
    it('柱状图', () => {
      const data = [{
        name: '其他消费',
        y: 6371664,
        const: 'const'
      }, {
        name: '生活用品',
        y: 7216301,
        const: 'const'
      }, {
        name: '通讯物流',
        y: 1500621,
        const: 'const'
      }, {
        name: '交通出行',
        y: 586622,
        const: 'const'
      }, {
        name: '饮食',
        y: 900000,
        const: 'const'
      }];

      const chart = new F2.Chart({
        el: canvas,
        pixelRatio: window.devicePixelRatio,
        aria: true,
        title: '分类'
      });

      chart.source(data);

      chart.interval()
        .position('name*y')
        .color('name')
        .adjust('stack');
      chart.render();

      expect(canvas.getAttribute('aria-label')).toBe('这是一个关于“分类”的图表。 图例分类有： 其他消费 生活用品 通讯物流 交通出行 饮食  X轴是分类型, 分类类型有：其他消费 生活用品 通讯物流 交通出行 饮食；Y轴是数值型，数据最小值为0，最大值为8000000；共有5种分类组成，第1类是其他消费，数据是6371664;第2类是生活用品，数据是7216301;第3类是通讯物流，数据是1500621;第4类是交通出行，数据是586622;第5类是饮食，数据是900000; ');
    });
  });

  describe('饼图', () => {
    it('饼图', () => {
      const data = [{
        name: '其他消费',
        y: 6371664,
        const: 'const'
      }, {
        name: '生活用品',
        y: 7216301,
        const: 'const'
      }, {
        name: '通讯物流',
        y: 1500621,
        const: 'const'
      }, {
        name: '交通出行',
        y: 586622,
        const: 'const'
      }, {
        name: '饮食',
        y: 900000,
        const: 'const'
      }];

      const chart = new F2.Chart({
        el: canvas,
        pixelRatio: window.devicePixelRatio,
        aria: true,
        title: '分类'
      });

      chart.source(data);
      chart.coord('polar', {
        transposed: true,
        radius: 0.75
      });

      chart.interval()
        .position('const*y')
        .color('name')
        .adjust('stack');
      chart.render();

      expect(canvas.getAttribute('aria-label')).toBe('这是一个关于“分类”的图表。 图例分类有： 其他消费 生活用品 通讯物流 交通出行 饮食  共有5种分类组成，第1类是其他消费，数据是6371664;第2类是生活用品，数据是7216301;第3类是通讯物流，数据是1500621;第4类是交通出行，数据是586622;第5类是饮食，数据是900000; ');
    });
  });

});
