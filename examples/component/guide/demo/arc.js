import F2 from '@antv/f2';

// customize the interval shape, now set the rect to be a line
const Shape = F2.Shape;
const G = F2.G;
const Util = F2.Util;
const Global = F2.Global;
const Vector2 = G.Vector2;

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
          lineCap: 'round'
        }, style)
      });
    }
  }
});

const data = [{
  x: '1',
  y: 85
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  y: {
    max: 100,
    min: 0
  }
});
chart.axis(false); // hide all axis
chart.tooltip(false); // hide tooltip
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.8,
  radius: 0.85
}); // set polar coordinate

chart.guide().arc({
  start: [ 0, 0 ],
  end: [ 1, 99.98 ],
  top: false,
  style: {
    lineWidth: 15,
    stroke: '#ccc'
  }
}); // draw a cricle
chart.guide().html({
  position: [ '50%', '50%' ],
  html: '<p id="number" style="font-size: 32px;margin: 0;color: #1890ff;">0%</p>'
}); // draw a text
chart.interval().position('x*y').size(15)
  .shape('tick')
  .animate({
    appear: {
      duration: 1200,
      easing: 'cubicIn',
      animation: function animation(shape, animateCfg) {
        const startAngle = shape.attr('startAngle');
        const endAngle = shape.attr('endAngle');
        shape.attr('endAngle', startAngle);
        shape.animate().to(Util.mix({
          attrs: {
            endAngle
          }
        }, animateCfg)).onUpdate(function(frame) {
          $('#number').text(parseInt(frame * 85) + '%');
        });
      }
    }
  });
chart.render();
