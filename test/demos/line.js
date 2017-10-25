const F2 = require('../../index');
describe('line', function() {
  describe('normal line', function() {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);

    const data = [
      { time: '2016-08-08 00:00:00', tem: 10 },
      { time: '2016-08-08 00:10:00', tem: 22 },
      { time: '2016-08-08 00:30:00', tem: 20 },
      { time: '2016-08-09 00:35:00', tem: 26 },
      { time: '2016-08-09 01:00:00', tem: 20 },
      { time: '2016-08-09 01:20:00', tem: 26 },
      { time: '2016-08-10 01:40:00', tem: 28 },
      { time: '2016-08-10 02:00:00', tem: 20 },
      { time: '2016-08-10 02:20:00', tem: 28 }
    ];
    const chart = new F2.Chart({
      el: canvas
    });
    const defs = {
      time: {
        type: 'timeCat',
        mask: 'MM/DD',
        tickCount: 3,
        range: [ 0, 1 ]
      },
      tem: {
        tickCount: 5,
        min: 0
      }
    };
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
    chart.source(data, defs);
    chart.line().position('time*tem');
    chart.render();
  });

  describe('smooth line', function() {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'line-smooth';
    document.body.appendChild(canvas);
    const data = [
        { time: '周一', tem: 10, city: 'beijing' },
        { time: '周二', tem: 22, city: 'beijing' },
        { time: '周三', tem: 20, city: 'beijing' },
        { time: '周四', tem: 26, city: 'beijing' },
        { time: '周五', tem: 20, city: 'beijing' },
        { time: '周六', tem: 26, city: 'beijing' },
        { time: '周日', tem: 28, city: 'beijing' },
        { time: '周一', tem: 5, city: 'newYork' },
        { time: '周二', tem: 12, city: 'newYork' },
        { time: '周三', tem: 26, city: 'newYork' },
        { time: '周四', tem: 20, city: 'newYork' },
        { time: '周五', tem: 28, city: 'newYork' },
        { time: '周六', tem: 26, city: 'newYork' },
        { time: '周日', tem: 20, city: 'newYork' }
    ];
    const chart = new F2.Chart({
      id: 'line-smooth'
    });
    const defs = {
      time: {
        tickCount: 7,
        range: [ 0, 1 ]
      },
      tem: {
        tickCount: 5,
        min: 0
      }
    };
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
      // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('tem', {
      label: {
        fontSize: 14
      }
    });
    chart.source(data, defs);
    chart.line().position('time*tem')
      .color('city')
      .shape('smooth');
    chart.render();
  });

  describe('point with line', function() {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'line-point';
    document.body.appendChild(canvas);

    const data = [
      { time: '2016-08-08 00:00:00', tem: 10 },
      { time: '2016-08-08 00:10:00', tem: 22 },
      { time: '2016-08-08 00:30:00', tem: 20 },
      { time: '2016-08-09 00:35:00', tem: 26 },
      { time: '2016-08-09 01:00:00', tem: 20 },
      { time: '2016-08-09 01:20:00', tem: 26 },
      { time: '2016-08-10 01:40:00', tem: 28 },
      { time: '2016-08-10 02:00:00', tem: 20 },
      { time: '2016-08-10 02:20:00', tem: 28 }
    ];
    const chart = new F2.Chart({
      id: 'line-point'
    });
    const defs = {
      time: {
        type: 'timeCat',
        tickCount: 3,
        range: [ 0, 1 ]
      },
      tem: {
        tickCount: 5,
        min: 0
      }
    };
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
    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('tem', {
      label: {
        fontSize: 14
      }
    });
    chart.source(data, defs);
    chart.line().position('time*tem').shape('smooth');
    chart.point().position('time*tem');
    chart.render();
  });

  describe('line guide', function() {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'line-guide';
    div.appendChild(canvas);

    const data = [
        { time: '2016-08-08 00:00:00', tem: 10, city: 'beijing' },
        { time: '2016-08-08 00:10:00', tem: 22, city: 'beijing' },
        { time: '2016-08-08 00:30:00', tem: 20, city: 'beijing' },
        { time: '2016-08-09 00:35:00', tem: 26, city: 'beijing' },
        { time: '2016-08-09 01:00:00', tem: 20, city: 'beijing' },
        { time: '2016-08-09 01:20:00', tem: 26, city: 'beijing' },
        { time: '2016-08-10 01:40:00', tem: 28, city: 'beijing' },
        { time: '2016-08-10 02:00:00', tem: 20, city: 'beijing' },
        { time: '2016-08-10 02:20:00', tem: 28, city: 'beijing' },
        { time: '2016-08-09 00:35:00', tem: 25.8, city: 'tokyo' },
        { time: '2016-08-09 01:00:00', tem: 24, city: 'tokyo' },
        { time: '2016-08-09 01:20:00', tem: 28, city: 'tokyo' },
        { time: '2016-08-10 01:40:00', tem: 22, city: 'tokyo' },
        { time: '2016-08-10 02:00:00', tem: 24, city: 'tokyo' },
        { time: '2016-08-10 02:20:00', tem: 20, city: 'tokyo' }
    ];
    const chart = new F2.Chart({
      id: 'line-guide'
    });
    const defs = {
      time: {
        type: 'timeCat',
        tickCount: 2,
        range: [ 0.1, 1 ]
      },
      tem: {
        tickCount: 5,
        min: 0
      }
    };
    chart.axis('tem', {
      label: {
        textAlign: 'start',
        textBaseline: 'bottom',
        offset: 0,
        fontSize: 14
      }
    });
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
    // 坐标点
    const changePoint = [ '2016-08-09 00:35:00', 25.8 ];
    const endPoint = [ '2016-08-10 02:20:00', 28 ];
    // html字符串
    const pointHtml1 = "<div style='border-radius: 12px;border: none;width: 22px;height: 22px;background-color: rgba(102, 182, 241, 0.5);'></div>";
    const pointHtml2 = "<div style='border-radius: 7px;border: none;width: 12px;height: 12px;background-color: rgb(15, 141, 232);'></div>";
    const tooltipHtml = "<div style='border: 1px solid #0f8de8;width: 34px;height: 34px;color: #0f8de8;position: relative;'>" +
        '<span>方案调整</span>' +
        "<div style='width: 0;height: 0;border-bottom: 8px solid #0f8de8;border-right:10px solid transparent;position: absolute;top: 25px;left: 34px;'></div>" +
        '</div>';
    const changePointHtml = "<div style='border-radius: 8px;border: none;width: 6px;height: 6px;background-color: #0f8de8;'></div>";
    chart.source(data, defs);
    chart.guide().html(endPoint, pointHtml1, { align: 'cc' });
    chart.guide().html(endPoint, pointHtml2, { align: 'cc' });
    chart.guide().html(changePoint, tooltipHtml, { align: 'br', offset: [ -17, 0 ] });
    chart.guide().html(changePoint, changePointHtml, { align: 'cc' });
    // var canvas = document.getElementById('c1');
    const linear_gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 200);
    linear_gradient.addColorStop(0.5, '#fff');
    linear_gradient.addColorStop(0, 'rgb(15, 141, 232)');
    // 绘制渐变色区域图
    chart.area().position('time*tem')
      .color('city', function(city) {
        if (city === 'beijing') {
          return linear_gradient;
        }
        return 'rgba(1, 1, 1, 0)';

      })
      .style({
        opacity: 0.6
      });
    // 绘制线图
    chart.line().position('time*tem')
      .color('city')
      .size('city', function(city) {
        if (city === 'beijing') {
          return 3;
        }
        return 2;

      });
    chart.render();
  });

  describe('line animate', function() {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.id = 'line-animate';
    div.appendChild(canvas);

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
      { time: '2016-08-08 00:00:00', tem: 4, city: 'hangzhou' },
      { time: '2016-08-08 00:10:00', tem: 3, city: 'hangzhou' },
      { time: '2016-08-08 00:30:00', tem: 6, city: 'hangzhou' },
      { time: '2016-08-09 00:35:00', tem: -12, city: 'hangzhou' },
      { time: '2016-08-09 01:00:00', tem: 1, city: 'hangzhou' },
      { time: '2016-08-09 01:20:00', tem: 9, city: 'hangzhou' },
      { time: '2016-08-10 01:40:00', tem: 13, city: 'hangzhou' },
      { time: '2016-08-10 02:00:00', tem: -3, city: 'hangzhou' },
      { time: '2016-08-10 02:20:00', tem: 11, city: 'hangzhou' }
    ];
    const chart = new F2.Chart({
      id: 'line-animate',
      pixelRatio: 2
    });
    chart.source(data, {
      time: {
        type: 'timeCat',
        tickCount: 3,
        mask: 'hh:mm',
        range: [ 0, 1 ]
      },
      tem: {
        tickCount: 3,
        formatter(item) {
          return item + '%';
        }
      }
    });
    chart.axis('tem', {
      grid(text) {
        if (text === '0%') {
          return {
            stroke: '#efefef'
          };
        }
        return {
          stroke: '#f7f7f7'
        };

      },
      label: {
        fontSize: 14
      }
    });
    chart.axis('time', {
      line: null,
      label: {
        fontSize: 14
      }
    });
    // 添加辅助元素
    const point = [ '2016-08-10 02:20:00', 12 ];
    chart.guide().html(point, "<div style='border-radius: 12px;border: none;width: 22px;height: 22px;background-color: rgba(102, 182, 241, 0.5);'></div>", { align: 'cc' });
    chart.guide().html(point, "<div style='border-radius: 7px;border: none;width: 12px;height: 12px;background-color: rgb(15, 141, 232);'></div>", { align: 'cc' });
    chart.line().position('time*tem')
      .color('city')
      .size(3)
      .shape('city', function(city) {
        if (city === 'beijing') {
          return 'line';
        }
        if (city === 'hangzhou') {
          return 'dash';
        }
      });
    // 水平方向的平铺动画
    chart.animate({
      type: 'waveh'
    });

    chart.render();

  });
});
