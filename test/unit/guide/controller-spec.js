const Guide = require('../../../src/guide/');
const GuideController = require('../../../src/chart/controller/guide');
const Scale = require('../../../src/scale/');
const Coord = require('../../../src/coord/');
const Plot = require('../../../src/chart/plot');
const { Canvas } = require('../../../src/g/index');

const plot = new Plot({
  start: {
    x: 0,
    y: 0
  },
  end: {
    x: 400,
    y: 400
  }
});

const coord = new Coord.Rect({
  plot
});
const coordCircle = new Coord.Circle({
  plot
});
const div = document.createElement('div');
const dom = document.createElement('canvas');
dom.width = 500;
dom.height = 500;
div.appendChild(dom);
document.body.appendChild(div);

const canvas = new Canvas({
  el: dom,
  width: 500,
  height: 500
});

const frontPlot = canvas.addGroup();
const backPlot = canvas.addGroup();

const xScale = new Scale.cat({
  values: [ '一月', '二月', '三月', '四月', '五月' ]
});

const yScale = new Scale.linear({
  min: 0,
  max: 1200
});

describe('guide controller', function() {

  it('controller method:arc(start, end, cfg)', function() {
    const cfg = {
      strokeStyle: 'red',
      lineWidth: 2
    };

    const start = [ 0, 1200 ];
    const end = [ 2.999, 1200 ];
    const controller = new GuideController({
      frontPlot,
      backPlot
    });

    controller.setScale(xScale, yScale);
    controller.arc(start, end, cfg);
    controller.paint(coordCircle);
  });

  it('controller method:line(from,to,cfg)', function() {
    const cfg = {
      strokeStyle: 'red',
      lineWidth: 2
    };
    const from = [ '一月', 200 ];
    const to = [ '五月', 1000 ];
    const controller = new GuideController({
      frontPlot,
      backPlot
    });

    controller.setScale(xScale, yScale);
    controller.line(from, to, cfg);
    controller.paint(coord);
  });
  it('controller method:text(position,text,cfg)', function() {
    const cfg = {
      strokeStyle: 'red',
      lineWidth: 2
    };
    const position = [ '五月', 1000 ];
    const text = '(五月,1000)';

    const controller = new GuideController({
      frontPlot,
      backPlot
    });

    controller.setScale(xScale, yScale);
    controller.text(position, text, cfg);
    controller.paint(coord);
  });
  it('controller method:html(poinf,html,cfg)', function() {
    const point = [ '一月', 200 ];
    const cfg = {
      align: 'tc'
    };
    const controller = new GuideController({
      frontPlot,
      backPlot
    });
    const html = '<button>a</button>';
    controller.setScale(xScale, yScale);
    controller.html(point, html, cfg);
    controller.paint(coord);
  });
  it('controller method:rect(start,end,cfg)', function() {
    const start = [ '一月', 200 ];
    const end = [ '二月', 400 ];
    const cfg = {
      fillStyle: '#fafafa'
    };
    const controller = new GuideController({
      guide: new Guide(),
      frontPlot,
      backPlot
    });
    controller.setScale(xScale, yScale);
    controller.rect(start, end, cfg);
    controller.paint(coord);
  });
});
