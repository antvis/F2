// https://f2.antv.vision/zh/examples/point/scatter#ordered-bubble

import F2 from '@antv/f2';

const Shape = F2.Shape;
Shape.registerShape('point', 'with-text', {
  draw: function draw(cfg: any, container: any) {
    const size = cfg.size;
    const x = cfg.x;
    const y = cfg.y;
    const circle = container.addShape('Circle', {
      className: 'point',
      attrs: {
        x,
        y,
        r: size,
        fill: cfg.color,
      },
    });
    const origin = cfg.origin._origin;
    const text = container.addShape('Text', {
      className: 'text',
      attrs: {
        x,
        y: y - size - 4,
        fill: '#000',
        text: origin.name + '\n$' + origin.volumes + 'billion',
        textBaseline: 'bottom',
        textAlign: 'center',
        fontSize: 10,
      },
    });
    return [circle, text];
  },
});
const data = [
  {
    name: 'Stripe',
    volumes: 1.5,
    x: 0.8,
    y: 50,
  },
  {
    name: 'Swipely',
    volumes: 2,
    x: 2.5,
    y: 50,
  },
  {
    name: 'Square',
    volumes: 30,
    x: 4.2,
    y: 50,
  },
  {
    name: 'Alipay',
    volumes: 150,
    x: 6.7,
    y: 50,
  },
  {
    name: 'Paypal',
    volumes: 180,
    x: 10.5,
    y: 50,
  },
];
const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});
chart.source(data, {
  y: {
    min: 0,
    max: 100,
  },
  x: {
    max: 12,
    tickInterval: 1,
  },
});
chart.axis(false);
chart.tooltip(false);
chart.legend(false);
chart
  .point()
  .position(['x', 'y'])
  .color('volumes', '#BAE7FF-#1890FF-#0050B3')
  .size('volumes', [10, 50])
  .shape('with-text');
chart.render();
