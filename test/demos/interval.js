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

    canvas.onclick = function(ev) {
      const point = chart.getPointByClient(ev.clientX, ev.clientY);
      const records = chart.getSnapRecords(point, 'b');
      console.log(records);
    };
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

  describe('custom shape', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'interval-tri';
    div.appendChild(canvas);

    const data = [
      { tem: 500, city: '3月' },
      { tem: -50, city: '4月' },
      { tem: 450, city: '5月' },
      { tem: -40, city: '6月' },
      { tem: 690, city: '7月' },
      { tem: 346, city: '8月' }
    ];
    const drawShape = function(points, canvas, cfg) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      if (points.length > 1) {
        for (let i = 1; i <= points.length - 1; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }
      ctx.fillStyle = cfg.fill;
      ctx.fill();
    };
    // 自定义绘制数据的的形状
    const Shape = F2.Shape;
    Shape.registerShape('interval', 'polygon', {
      getPoints(cfg) {
        const x = cfg.x;
        const y = cfg.y;
        const y0 = cfg.y0;
        const width = cfg.size;
        return [
          { x: x - width / 2, y: y0 },
          { x, y },
          { x: x + width / 2, y: y0 }
        ];
      },
      draw(cfg, canvas) {
        const points = this.parsePoints(cfg.points);
        const style = cfg.style || {};
        style.fill = cfg.color;
        drawShape(points, canvas, style);
      }
    });
    const chart = new F2.Chart({
      id: 'interval-tri'
    });
    chart.source(data, {
      tem: {
        tickCount: 5
      }
    });
    chart.axis('city', {
      label: {
        font: 'sans-serif '
      },
      line: null,
      grid: null
    });
    chart.axis('tem', {
      label: null,
      grid: {
        stroke: '#f8f8f8'
      }
    });
    chart.interval().position('city*tem')
      .color('tem*city', function(tem, city) {
        if (city === '8月') {
          return '#f5623a';
        }
        if (tem >= 0) {
          return '#f8bdad';
        }
        if (tem < 0) {
          return '#99d6c0';
        }
      })
      .shape('polygon');
    // 绘制数据
    data.forEach(function(obj) {
      const offsetY = obj.tem > 0 ? -14 : 14;
      chart.guide().html([ obj.city, obj.tem ], `<div style='color: #999999;'><span>${obj.tem}</span></div>`, {
        align: 'cc',
        offset: [ 0, offsetY ]
      });
    });
    chart.render();
  });

  describe('inteval animate', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'interval-animate';
    div.appendChild(canvas);
    const data = [
      { tem: 500, month: '3月' },
      { tem: -50, month: '4月' },
      { tem: 450, month: '5月' },
      { tem: -40, month: '6月' },
      { tem: 690, month: '7月' },
      { tem: 346, month: '8月' }
    ];
    const chart = new F2.Chart({
      id: 'interval-animate'
    });
    chart.source(data, {
      tem: {
        tickCount: 5
      }
    });
    chart.axis('month', {
      label: {
        font: 'sans-serif '
      },
      line: null,
      grid: null
    });
    chart.axis('tem', {
      label: null,
      grid: {
        stroke: '#f8f8f8'
      }
    });
    chart.interval().position('month*tem').color('tem*month', function(tem, month) {
      if (month === '8月') {
        return '#f5623a';
      }
      if (tem >= 0) {
        return '#f8bdad';
      }
      if (tem < 0) {
        return '#99d6c0';
      }
    });
    // y轴方向的缩放动画
    chart.animate({
      type: 'scaley'
    });
    // 辅助元素
    data.forEach(function(obj, index) {
      // 文字部分
      const offsetY = obj.tem > 0 ? -16 : 14;
      chart.guide().html([ obj.month, obj.tem ], `<div style='color: #999999;'><span>${obj.tem}</span></div>`, {
        align: 'cc',
        offset: [ 0, offsetY ]
      });
      // 背景部分
      const offset = 0.25;
      chart.guide().rect([ index - offset, 'max' ], [ index + offset, 'min' ], { fill: '#f8f8f8' });
    });
    chart.render();
  });
});
