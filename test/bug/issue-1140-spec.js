import F2 from '../../src/index';

const canvas = document.createElement('canvas');
canvas.style.width = '350px';
canvas.style.height = '300px';
document.body.appendChild(canvas);

describe('issue 1140', () => {
  it('hollowCircle 和 tooltip crosshairs 都正常显示', () => {
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
      type: '实际收益率1'
    }, {
      time: '2016-08-09 01:20:00',
      value: 9,
      type: '实际收益率1'
    }, {
      time: '2016-08-10 01:40:00',
      value: 13,
      type: '实际收益率1'
    }, {
      time: '2016-08-10 02:00:00',
      value: -3,
      type: '实际收益率1'
    }, {
      time: '2016-08-10 02:20:00',
      value: 11,
      type: '实际收益率1'
    }];

    const chart = new F2.Chart({
      el: canvas,
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      time: {
        type: 'timeCat',
        tickCount: 3,
        mask: 'hh:mm',
        range: [ 0, 1 ]
      },
      value: {
        tickCount: 3,
        formatter: function formatter(ivalue) {
          return ivalue + '%';
        }
      }
    });

    chart.tooltip({
      showCrosshairs: true
    });

    chart.line()
      .position('time*value')
      .color('type');

    chart.point()
      .position('time*value')
      .color('type')
      .shape('type', [ 'circle', 'hollowCircle', 'rect' ]);

    chart.render();

    const point = chart.getPosition({
      time: '2016-08-09 01:00:00',
      value: 1,
      type: '实际收益率1'
    });
    chart.showTooltip(point);

    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;

    expect(tooltip.showCrosshairs).toBe(true);
  });
});
