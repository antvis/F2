const F2 = require('../../index');

describe('area', () => {
  describe('area normal', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);
    const data = [
        { time: '2016-08-08 00:00:00', tem: 10, city: 'beijing' },
        { time: '2016-08-08 00:10:00', tem: 22, city: 'beijing' },
        { time: '2016-08-08 00:30:00', tem: 16, city: 'beijing' },
        { time: '2016-08-09 00:35:00', tem: 26, city: 'beijing' },
        { time: '2016-08-09 01:00:00', tem: 12, city: 'beijing' },
        { time: '2016-08-09 01:20:00', tem: 26, city: 'beijing' },
        { time: '2016-08-10 01:40:00', tem: 18, city: 'beijing' },
        { time: '2016-08-10 02:00:00', tem: 26, city: 'beijing' },
        { time: '2016-08-10 02:20:00', tem: 12, city: 'beijing' },
        { time: '2016-08-08 00:00:00', tem: 28, city: 'newYork' },
        { time: '2016-08-08 00:10:00', tem: 16, city: 'newYork' },
        { time: '2016-08-08 00:30:00', tem: 26, city: 'newYork' },
        { time: '2016-08-09 00:35:00', tem: 12, city: 'newYork' },
        { time: '2016-08-09 01:00:00', tem: 26, city: 'newYork' },
        { time: '2016-08-09 01:20:00', tem: 20, city: 'newYork' },
        { time: '2016-08-10 01:40:00', tem: 29, city: 'newYork' },
        { time: '2016-08-10 02:00:00', tem: 16, city: 'newYork' },
        { time: '2016-08-10 02:20:00', tem: 22, city: 'newYork' }
    ];
    const chart = new F2.Chart({
      el: canvas
    });
    chart.source(data, {
      time: {
        type: 'timeCat',
        tickCount: 3,
        range: [ 0, 1 ]
      },
      tem: {
        tickCount: 5,
        min: 0
      }
    });
      // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('tem', {
      label: {
        fontSize: 14
      }
    });
      // 配置time刻度文字样式
    const label = {
      fill: '#979797',
      font: '14px san-serif',
      offset: 6
    };
    chart.axis('time', {
      label(text, index, total) {
        const cfg = label;
          // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
        if (index === 0) {
          cfg.textAlign = 'start';
        }
        if (index > 0 && index === total - 1) {
          cfg.textAlign = 'end';
        }
        return cfg;
      }
    });
    chart.area().position('time*tem')
      .color('city')
      .shape('smooth')
      .style({
        opacity: 0.6
      });
    chart.render();
  });

  describe('area stack', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);
    const data = [
      { month: 12, tem: 7, city: 'tokyo' },
      { month: 1, tem: 6.9, city: 'tokyo' },
      { month: 2, tem: 9.5, city: 'tokyo' },
      { month: 3, tem: 14.5, city: 'tokyo' },
      { month: 4, tem: 18.2, city: 'tokyo' },
      { month: 5, tem: 21.5, city: 'tokyo' },
      { month: 6, tem: 25.2, city: 'tokyo' },
      { month: 7, tem: 26.5, city: 'tokyo' },
      { month: 8, tem: 23.3, city: 'tokyo' },
      { month: 9, tem: 18.3, city: 'tokyo' },
      { month: 10, tem: 13.9, city: 'tokyo' },
      { month: 11, tem: 9.6, city: 'tokyo' },
      { month: 12, tem: 0, city: 'newYork' },
      { month: 1, tem: 0.8, city: 'newYork' },
      { month: 2, tem: 5.7, city: 'newYork' },
      { month: 3, tem: 11.3, city: 'newYork' },
      { month: 4, tem: 17, city: 'newYork' },
      { month: 5, tem: 22, city: 'newYork' },
      { month: 6, tem: 24.8, city: 'newYork' },
      { month: 7, tem: 24.1, city: 'newYork' },
      { month: 8, tem: 20.1, city: 'newYork' },
      { month: 9, tem: 14.1, city: 'newYork' },
      { month: 10, tem: 8.6, city: 'newYork' },
      { month: 11, tem: 2.5, city: 'newYork' },
      { month: 12, tem: 2, city: 'berlin' },
      { month: 1, tem: 0.6, city: 'berlin' },
      { month: 2, tem: 3.5, city: 'berlin' },
      { month: 3, tem: 8.4, city: 'berlin' },
      { month: 4, tem: 13.5, city: 'berlin' },
      { month: 5, tem: 17, city: 'berlin' },
      { month: 6, tem: 18.6, city: 'berlin' },
      { month: 7, tem: 17.9, city: 'berlin' },
      { month: 8, tem: 14.3, city: 'berlin' },
      { month: 9, tem: 9, city: 'berlin' },
      { month: 10, tem: 3.9, city: 'berlin' },
      { month: 11, tem: 1, city: 'berlin' }
    ];
    const chart = new F2.Chart({
      el: canvas
    });
    chart.source(data, {
      month: {
        tickCount: 12
      },
      tem: {
        tickCount: 5
      }
    });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('tem', {
      label: {
        fontSize: 14
      }
    });
    chart.axis('time', {
      label: {
        fontSize: 14
      }
    });
    chart.area().position('month*tem').color('city')
      .shape('smooth')
      .style({
        opacity: 0.6
      })
      .adjust('stack');
    chart.render();
    function getPoint(canvas, x, y) {
      const bbox = canvas.getBoundingClientRect();
      return {
        x: x - bbox.left,
        y: y - bbox.top
      };
    }
    canvas.onclick = function(e) {
      const point = getPoint(e.target, e.clientX, e.clientY);
      const data = chart.getSnapRecords(point);
      // let html = '';
      // data.forEach(function(item) {
      //   html += 'city:' + item._origin.city + ',tem:' + item._origin.tem + ',month:' + item._origin.month + '\b\n';
      // });
      console.log(data);
    };
  });

  describe.only('area gradient', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);

    const data = [
      { month: 12, tem: 7, city: 'tokyo' },
      { month: 1, tem: 6.9, city: 'tokyo' },
      { month: 2, tem: 9.5, city: 'tokyo' },
      { month: 3, tem: 14.5, city: 'tokyo' },
      { month: 4, tem: 18.2, city: 'tokyo' },
      { month: 5, tem: 21.5, city: 'tokyo' },
      { month: 6, tem: 25.2, city: 'tokyo' },
      { month: 7, tem: 26.5, city: 'tokyo' },
      { month: 8, tem: 23.3, city: 'tokyo' },
      { month: 9, tem: 18.3, city: 'tokyo' },
      { month: 10, tem: 13.9, city: 'tokyo' },
      { month: 11, tem: 9.6, city: 'tokyo' }
      /* { month: 12, tem: 0, city: 'newYork' },
      { month: 1, tem: 0.8, city: 'newYork' },
      { month: 2, tem: 5.7, city: 'newYork' },
      { month: 3, tem: 11.3, city: 'newYork' },
      { month: 4, tem: 17, city: 'newYork' },
      { month: 5, tem: 22, city: 'newYork' },
      { month: 6, tem: 24.8, city: 'newYork' },
      { month: 7, tem: 24.1, city: 'newYork' },
      { month: 8, tem: 20.1, city: 'newYork' },
      { month: 9, tem: 14.1, city: 'newYork' },
      { month: 10, tem: 8.6, city: 'newYork' },
      { month: 11, tem: 2.5, city: 'newYork' }
      */
    ];
    const chart = new F2.Chart({
      el: canvas
    });
    chart.source(data, {
      month: {
        tickCount: 12
      },
      tem: {
        tickCount: 5
      }
    });
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('tem', {
      label: {
        fontSize: 14
      }
    });
    chart.axis('time', {
      label: {
        fontSize: 14
      }
    });
    const linear_gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 500);
    linear_gradient.addColorStop(1, '#fff');
    linear_gradient.addColorStop(0, 'rgb(15, 141, 232)');
    chart.area().position('month*tem').color(linear_gradient)
      .shape('smooth')
      .style({
        opacity: 0.6
      })
      .adjust('stack');
    chart.render();
  });
});
