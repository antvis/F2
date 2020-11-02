import F2 from '@antv/f2';
import insertCss from 'insert-css';

insertCss(`
  canvas.guage {
    border-radius: 5px;
    background-color: #1890ff;
    background-image: linear-gradient(#246BFF, #2797FF);
  }
`);
// 设置独立的css
const container = document.getElementById('container');
container.className = 'guage';

const {
  Shape,
  G,
  Util,
  Global
} = F2;
const Vector2 = G.Vector2;

// 注册自定义Shape, 极坐标下带圆角的条形，只对极坐标生效
Shape.registerShape('interval', 'polar-tick', {
  draw: function draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const style = Util.mix({
      stroke: cfg.color
    }, Global.shape.interval, cfg.style);

    let newPoints = points.slice(0);
    if (this._coord.transposed) {
      newPoints = [ points[0], points[3], points[2], points[1] ];
    }

    const center = cfg.center;
    const x = center.x,
      y = center.y;


    const v = [ 1, 0 ];
    const v0 = [ newPoints[0].x - x, newPoints[0].y - y ];
    const v1 = [ newPoints[1].x - x, newPoints[1].y - y ];
    const v2 = [ newPoints[2].x - x, newPoints[2].y - y ];

    let startAngle = Vector2.angleTo(v, v1);
    let endAngle = Vector2.angleTo(v, v2);
    const r0 = Vector2.length(v0);
    const r = Vector2.length(v1);

    if (startAngle >= 1.5 * Math.PI) {
      startAngle = startAngle - 2 * Math.PI;
    }

    if (endAngle >= 1.5 * Math.PI) {
      endAngle = endAngle - 2 * Math.PI;
    }

    const lineWidth = r - r0;
    const newRadius = r - lineWidth / 2;

    return container.addShape('Arc', {
      className: 'interval',
      attrs: Util.mix({
        x,
        y,
        startAngle,
        endAngle,
        r: newRadius,
        lineWidth,
        lineCap: 'round'
      }, style)
    });
  }
});

const data = [{
  const: 'a',
  actual: 75,
  expect: 100
}];

// 创建图表
const chart = new F2.Chart({
  id: 'container',
  padding: [ 0, 30, 60 ],
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  actual: {
    max: 100,
    min: 0,
    nice: false
  }
});

// 设定极坐标系
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.8,
  startAngle: -Math.PI,
  endAngle: 0
});
chart.axis(false);

// 绘制两个条形，分别作为背景和实际的百分比进度。
chart.interval()
  .position('const*expect')
  .shape('polar-tick')
  .size(10)
  .color('rgba(80, 143, 255, 0.95)')
  .animate(false);
chart.interval()
  .position('const*actual')
  .shape('polar-tick')
  .size(10)
  .color('#fff')
  .animate({
    appear: {
      duration: 1100,
      easing: 'linear',
      animation: function animation(shape, animateCfg) {
        const startAngle = shape.attr('startAngle');
        let endAngle = shape.attr('endAngle');
        if (startAngle > endAngle) {
          endAngle += Math.PI * 2;
        }
        shape.attr('endAngle', startAngle);
        shape.animate().to(Util.mix({
          attrs: {
            endAngle
          }
        }, animateCfg)).onUpdate(function(frame) {
          const textEl = document.querySelector('#text');
          if (textEl) textEl.innerHTML = parseInt(frame * 75) + '%';
        });
      }
    }
  });

// 添加辅助元素作为提示
chart.guide().html({
  position: [ '50%', '80%' ],
  html: `
    <div style="width: 120px;color: #fff;white-space: nowrap;text-align:center;">
      <p style="font-size: 18px;margin:0;">本月进度</p>
      <p id="text" style="font-size: 48px;margin:0;font-weight: bold;">0</p>
    </div>`
});
chart.render();
