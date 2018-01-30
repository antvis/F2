const Guide = require('../../../src/guide/');
const GuideAssist = require('../../../src/chart/assist/guide');
const Scale = require('../../../src/scale/');
const Coord = require('../../../src/coord/');
const Plot = require('../../../src/chart/plot');

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
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
div.appendChild(canvas);
document.body.appendChild(div);

const xScale = new Scale.cat({
  values: [ '一月', '二月', '三月', '四月', '五月' ]
});

const yScale = new Scale.linear({
  min: 0,
  max: 1200
});

describe('guide assist', function() {

  it('assist method:arc(start, end, cfg)', function() {
    const cfg = {
      strokeStyle: 'red',
      lineWidth: 2
    };

    const start = [ 0, 1200 ];
    const end = [ 2.999, 1200 ];
    const assist = new GuideAssist({});

    assist.setScale(xScale, yScale);
    assist.arc(start, end, cfg);
    assist.paint(coordCircle, canvas);
  });

  it('assist method:line(from,to,cfg)', function() {
    const cfg = {
      strokeStyle: 'red',
      lineWidth: 2
    };
    const from = [ '一月', 200 ];
    const to = [ '五月', 1000 ];
    const assist = new GuideAssist({});

    assist.setScale(xScale, yScale);
    assist.line(from, to, cfg);
    assist.paint(coord, canvas);
  });
  it('assist method:text(position,text,cfg)', function() {
    const cfg = {
      strokeStyle: 'red',
      lineWidth: 2
    };
    const position = [ '五月', 1000 ];
    const text = '(五月,1000)';

    const assist = new GuideAssist({});

    assist.setScale(xScale, yScale);
    assist.text(position, text, cfg);
    assist.paint(coord, canvas);
  });
  it('assist method:html(poinf,html,cfg)', function() {
    const point = [ '一月', 200 ];
    const cfg = {
      align: 'tc'
    };
    const assist = new GuideAssist({});
    const html = '<button>a</button>';
    assist.setScale(xScale, yScale);
    assist.html(point, html, cfg);
    assist.paint(coord, canvas);
  });
  it('assist method:rect(start,end,cfg)', function() {
    const start = [ '一月', 200 ];
    const end = [ '二月', 400 ];
    const cfg = {
      fillStyle: '#fafafa'
    };
    const assist = new GuideAssist({
      guide: new Guide()
    });
    assist.setScale(xScale, yScale);
    assist.rect(start, end, cfg);
    assist.paint(coord, canvas);
  });
});
