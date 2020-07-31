import F2 from '@antv/f2';
import insertCss from 'insert-css';

insertCss(`
  canvas.fitness-ring {
    background-color: #151515;
    box-shadow: 0px 0px 1px 0px #06060d;
  }
`);
// 设置独立的css
const container = document.getElementById('container');
container.className = 'fitness-ring';

const {
  Shape,
  Util,
  Global,
  G,
  Animate
} = F2;
const { Vector2 } = G;

// 注册自定义Shape——极坐标下的条形
Shape.registerShape('interval', 'tick', {
  draw: function draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const style = Util.mix({
      stroke: cfg.color
    }, Global.shape.interval, cfg.style);
    if (cfg.isInCircle) {
      let newPoints = points.slice(0);
      if (this._coord.transposed) {
        newPoints = [ points[0], points[3], points[2], points[1] ];
      }

      const _cfg$center = cfg.center,
        x = _cfg$center.x,
        y = _cfg$center.y;

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
          lineCap: 'round',
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 0,
          shadowOffsetY: -5,
          shadowBlur: 50
        }, style)
      });
    }
  }
});

// 注册自定义动画
Animate.registerAnimation('waveIn', function(shape, animateCfg) {
  const startAngle = shape.attr('startAngle');
  const endAngle = shape.attr('endAngle');
  shape.attr('endAngle', startAngle);
  shape.animate().to(Util.mix({
    attrs: {
      endAngle
    }
  }, animateCfg));
});


const data = [
  {
    name: 'activity1',
    percent: 2370,
    color: '#1ad5de',
    icon: 'stand.png',
    bgColor: '#183C3D'
  }, {
    name: 'activity2',
    percent: 80,
    color: '#a0ff03',
    icon: 'walk.png',
    bgColor: '#324214'
  }, {
    name: 'activity3',
    percent: 65,
    color: '#e90b3a',
    icon: 'run.png',
    bgColor: '#40131D'
  }
];

// 创建chart
const chart = new F2.Chart({
  id: 'container',
  width: 375,
  height: 260,
  pixelRatio: window.devicePixelRatio
});

chart.source(data, {
  percent: {
    max: 100
  }
});
chart.legend(false);
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.382,
  radius: 0.8
});
chart.axis(false);

// 将数据映射到上面注册的Shape——interval，并绑定动画
chart.interval()
  .position('name*percent')
  .color('color', function(val) {
    return val;
  })
  .shape('tick')
  .size(18)
  .animate({
    appear: {
      animation: 'waveIn',
      duration: 1500,
      easing: 'elasticOut'
    },
    update: {
      duration: 1500,
      easing: 'elasticOut'
    }
  });

// 使用guide绘制辅助元素，添加背景和icon
data.forEach(function(obj) {
  chart.guide().arc({
    start: [ obj.name, 0 ],
    end: [ obj.name, 99.98 ],
    top: false,
    style: {
      lineWidth: 18,
      stroke: obj.bgColor
    }
  });
  chart.guide().html({
    position: [ obj.name, 0 ],
    html: `<div style="width: 16px;height: 16px;">
        <img
          style="width: 16px;height: 16px;display: block;"
          src="http://www.adeveloperdiary.com/wp-content/uploads/2015/11/${obj.icon}"
        />
      </div>`
  });
});
chart.render();

// 动态更新数据
const updateData = function updateData() {
  for (let i = 0; i < data.length; ++i) {
    data[i].percent = Math.floor(Math.random() * 60 + 20);
  }
  chart.changeData(data);
  setTimeout(updateData, 1500);
};

setTimeout(updateData, 1500);
