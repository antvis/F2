const expect = require('chai').expect;
const F2 = require('../../../src/core');

require('../../../src/geom/interval');
require('../../../src/geom/line');
require('../../../src/geom/point');
const GroupAnimation = require('../../../src/animation/group');
const Chart = F2.Chart;

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'group-animation';
document.body.appendChild(canvas);

describe('Group animation', function() {
  Chart.plugins.register(GroupAnimation);

  it('multiple chart animation', function(done) {
    const data = [
      { time: '周一', tem: 6.9, rain: 10 },
      { time: '周二', tem: 9.5, rain: 13 },
      { time: '周三', tem: 14.5, rain: 14 },
      { time: '周四', tem: 18.2, rain: 10 },
      { time: '周五', tem: 21.5, rain: 12 },
      { time: '周六', tem: 25.2, rain: 16 },
      { time: '周日', tem: 26.5, rain: 13 }
    ];
    const chart = new F2.Chart({
      id: 'group-animation',
      width: 400,
      height: 300,
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      tem: {
        tickCount: 5,
        max: 30,
        min: 0
      },
      rain: {
        tickCount: 5,
        min: 0,
        max: 30
      }
    });

    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('time', {
      label: {
        fontSize: 14
      },
      grid: null
    });
    chart.axis('tem', {
      label: {
        fontSize: 14
      }
    });
    chart.axis('rain', {
      label: {
        fontSize: 14
      }
    });
    const interval = chart.interval().position('time*tem').animate(false);
    const line = chart.line().position('time*rain')
      .color('#5ed470')
      .shape('smooth')
      .animate({
        appear: {
          duration: 800
        }
      });
    const point = chart.point()
      .position('time*rain')
      .color('#5ed470')
      .animate({
        appear: {
          duration: 800
        }
      });
    chart.render();

    setTimeout(function() {
      expect(interval.get('container').attr('clip')).to.be.undefined;
      expect(line.get('container').attr('clip')).to.be.null;
      // expect(point.get('container').attr('clip')).to.be.null;
      const shapes = point.get('container').get('children');
      expect(shapes[0].attr('matrix')).to.eql([ 1, 0, 0, 1, 0, 0 ]);
      document.body.removeChild(canvas);
      Chart.plugins.unregister(GroupAnimation);
      done();
    }, 1700);
  });
});
