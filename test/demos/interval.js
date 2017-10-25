const F2 = require('../../index');

describe('interval', () => {
  describe('normal', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'interval';

    document.body.appendChild(canvas);
    const data = [
      { tem: 10, city: 'tokyo' },
      { tem: 4, city: 'newYork' },
      { tem: 3, city: 'berlin' }
    ];
    const chart = new F2.Chart({
      id: 'interval'
    });
    chart.source(data, {
      tem: {
        tickCount: 5
      }
    });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('city', {
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
    chart.interval().position('city*tem').color('city');
    chart.render();
  });

  describe('range', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'interval-range';

    document.body.appendChild(canvas);

    const data = [
      { month: '周一', tem: [ 0, 7 ] },
      { month: '周二', tem: [ 7, 5 ] },
      { month: '周三', tem: [ 5, 9.5 ] },
      { month: '周四', tem: [ 9.5, 14.5 ] },
      { month: '周五', tem: [ 14.5, 10.2 ] },
      { month: '周六', tem: [ 10.2, 21.5 ] },
      { month: '周日', tem: [ 21.5, 25.2 ] }
    ];
    const chart = new F2.Chart({
      id: 'interval-range'
    });
    chart.source(data, {
      tem: {
        tickCount: 5
      }
    });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('month', {
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
    chart.interval().position('month*tem')
      .color('tem', function(tem) {
        if (tem[1] >= tem[0]) {
          return 'red';
        }
        return 'green';

      });
    chart.render();
  });

  describe('interval stack', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'interval-stack';

    document.body.appendChild(canvas);
    const data = [
      { time: '周一', tem: 6.9, city: 'tokyo' },
      { time: '周二', tem: 9.5, city: 'tokyo' },
      { time: '周三', tem: 14.5, city: 'tokyo' },
      { time: '周四', tem: 18.2, city: 'tokyo' },
      { time: '周五', tem: 21.5, city: 'tokyo' },
      { time: '周六', tem: 25.2, city: 'tokyo' },
      { time: '周日', tem: 26.5, city: 'tokyo' },
      { time: '周一', tem: 0.8, city: 'newYork' },
      { time: '周二', tem: 5.7, city: 'newYork' },
      { time: '周三', tem: 11.3, city: 'newYork' },
      { time: '周四', tem: 17, city: 'newYork' },
      { time: '周五', tem: 22, city: 'newYork' },
      { time: '周六', tem: 24.8, city: 'newYork' },
      { time: '周日', tem: 24.1, city: 'newYork' },
      { time: '周一', tem: 0.6, city: 'berlin' },
      { time: '周二', tem: 3.5, city: 'berlin' },
      { time: '周三', tem: 8.4, city: 'berlin' },
      { time: '周四', tem: 13.5, city: 'berlin' },
      { time: '周五', tem: 17, city: 'berlin' },
      { time: '周六', tem: 18.6, city: 'berlin' },
      { time: '周日', tem: 17.9, city: 'berlin' }
    ];
    const chart = new F2.Chart({
      id: 'interval-stack'
    });
    chart.source(data, {
      tem: {
        tickCount: 5
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
    chart.interval().position('time*tem')
      .color('city')
      .adjust('stack');
    chart.render();
  });

  describe('interval dodge', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'interval-dodge';

    document.body.appendChild(canvas);
    const data = [
      { time: '周一', tem: 6.9, city: 'tokyo' },
      { time: '周二', tem: 9.5, city: 'tokyo' },
      { time: '周三', tem: 14.5, city: 'tokyo' },
      { time: '周四', tem: 18.2, city: 'tokyo' },
      { time: '周五', tem: 21.5, city: 'tokyo' },
      { time: '周六', tem: 25.2, city: 'tokyo' },
      { time: '周日', tem: 26.5, city: 'tokyo' },
      { time: '周一', tem: 0.8, city: 'newYork' },
      { time: '周二', tem: 5.7, city: 'newYork' },
      { time: '周三', tem: 11.3, city: 'newYork' },
      { time: '周四', tem: 17, city: 'newYork' },
      { time: '周五', tem: 22, city: 'newYork' },
      { time: '周六', tem: 24.8, city: 'newYork' },
      { time: '周日', tem: 24.1, city: 'newYork' },
      { time: '周一', tem: 0.6, city: 'berlin' },
      { time: '周二', tem: 3.5, city: 'berlin' },
      { time: '周三', tem: 8.4, city: 'berlin' },
      { time: '周四', tem: 13.5, city: 'berlin' },
      { time: '周五', tem: 17, city: 'berlin' },
      { time: '周六', tem: 18.6, city: 'berlin' },
      { time: '周日', tem: 17.9, city: 'berlin' }
    ];
    const chart = new F2.Chart({
      id: 'interval-dodge'
    });
    chart.source(data, {
      tem: {
        tickCount: 5
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
    chart.interval().position('time*tem')
      .color('city')
      .adjust('dodge');
    chart.render();
  });

  describe('transpose', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'interval-transpose';

    document.body.appendChild(canvas);
    const data = [
      { tem: 10, city: 'tokyo' },
      { tem: 4, city: 'newYork' },
      { tem: 3, city: 'berlin' }
    ];
    const chart = new F2.Chart({
      id: 'interval-transpose'
    });
    chart.source(data);
    chart.coord({
      transposed: true
    });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('city', {
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
    chart.interval().position('city*tem').color('city');
    chart.render();
  });

  describe('polar transpose', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'interval-dodge-polar';

    document.body.appendChild(canvas);
    const data = [
      { time: '周一', tem: 6.9, city: 'tokyo' },
      { time: '周二', tem: 9.5, city: 'tokyo' },
      { time: '周三', tem: 14.5, city: 'tokyo' },
      { time: '周四', tem: 18.2, city: 'tokyo' },
      { time: '周五', tem: 21.5, city: 'tokyo' },
      { time: '周六', tem: 25.2, city: 'tokyo' },
      { time: '周日', tem: 26.5, city: 'tokyo' },
      { time: '周一', tem: 0.8, city: 'newYork' },
      { time: '周二', tem: 5.7, city: 'newYork' },
      { time: '周三', tem: 11.3, city: 'newYork' },
      { time: '周四', tem: 17, city: 'newYork' },
      { time: '周五', tem: 22, city: 'newYork' },
      { time: '周六', tem: 24.8, city: 'newYork' },
      { time: '周日', tem: 24.1, city: 'newYork' },
      { time: '周一', tem: 0.6, city: 'berlin' },
      { time: '周二', tem: 3.5, city: 'berlin' },
      { time: '周三', tem: 8.4, city: 'berlin' },
      { time: '周四', tem: 13.5, city: 'berlin' },
      { time: '周五', tem: 17, city: 'berlin' },
      { time: '周六', tem: 18.6, city: 'berlin' },
      { time: '周日', tem: 17.9, city: 'berlin' }
    ];
    const chart = new F2.Chart({
      id: 'interval-dodge-polar'
    });
    chart.coord('polar', {
      transposed: true,
      endAngle: Math.PI
    });

    chart.source(data, {
      tem: {
        tickCount: 5
      }
    });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('time', {
      label: {
        fontSize: 14
      },
      grid: null,
      line: false
    });
    chart.axis('tem', false);
    chart.interval().position('time*tem').
      color('city')
      .adjust('dodge');
    chart.render();
  });
});
