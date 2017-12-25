const expect = require('chai').expect;
const Guide = require('../../../src/guide/index');
const { Canvas } = require('../../../src/graphic/index');

const Scale = require('../../../src/scale/');
const Coord = require('../../../src/coord/');
const Plot = require('../../../src/plot');
const $ = require('jquery');

const plot = new Plot({
  start: {
    x: 50,
    y: 50
  },
  end: {
    x: 400,
    y: 400
  }
});

const coord = new Coord.Rect({
  plot
});

const circleCoord = new Coord.Circle({
  plot
});

const div = document.createElement('div');
document.body.appendChild(div);

const dom = document.createElement('canvas');
dom.width = 500;
dom.height = 500;
div.appendChild(dom);

const canvas = new Canvas({
  el: dom,
  width: 500,
  height: 500
});

const container = canvas.addGroup();

const xScale = new Scale.cat({
  values: [ '一月', '二月', '三月', '四月', '五月' ]
});

const yScale = new Scale.linear({
  min: 0,
  max: 1200
});

describe('guide test', function() {

  it('Base class method: parsePoint(coord, point)', function() {
    const point = [ '三月', 600 ];
    const cfg = {
      xScale,
      yScale
    };
    const guide = new Guide(cfg);

    const result = guide.parsePoint(coord, point);
    expect(result.x).to.be.equal(225);
    expect(result.y).to.be.equal(225);
  });

  it('Base class method: paint()', function() {
    const guide = new Guide();
    expect(guide.paint()).to.be.equal(undefined);
  });

  it('guide text', function() {
    const text = new Guide.Text({
      xScale,
      yScale,
      text: '(一月，200)',
      position: [ '一月', 200 ]
    });
    text.paint(coord, container);
    text.position = [ '五月', 1000 ];
    text.text = '(五月,1000)';
    text.paint(coord, container);
  });

  it('guide rect', function() {
    const rect = new Guide.Rect({
      xScale,
      yScale,
      start: [ '一月', 200 ],
      end: [ '五月', 1000 ],
      cfg: {
        fillStyle: 'red',
        opacity: 0.2
      }
    });
    rect.paint(coord, container);
  });

  it('guide line', function() {
    const line = new Guide.Line({
      xScale,
      yScale,
      start: [ '一月', 200 ],
      end: [ '五月', 1000 ],
      cfg: {
        strokeStyle: 'red',
        lineWidth: 1
      }
    });
    line.paint(coord, container);
  });

  it('arc', function() {
    const arc = new Guide.Arc({
      xScale,
      yScale,
      start: [ 0, 1200 ],
      end: [ 2.999, 1200 ],
      cfg: {
        strokeStyle: 'blue',
        lineWidth: 10
      }
    });
    arc.paint(circleCoord, container);
  });

  it('arc, yScale is undefined.', function() {
    const arc = new Guide.Arc({
      xScale,
      start: [ 0, 1200 ],
      end: [ 2.999, 1200 ],
      cfg: {
        strokeStyle: 'yellow',
        lineWidth: 8
      }
    });

    arc.paint(circleCoord, container);

  });

  it('arc, xScale and yScale are undefined.', function() {
    const arc = new Guide.Arc({
      start: [ 0, 1200 ],
      end: [ 2.999, 1200 ],
      cfg: {
        strokeStyle: 'pink',
        lineWidth: 4
      }
    });

    arc.paint(circleCoord, container);
  });

  it('clear', function() {
    canvas.get('context').clearRect(0, 0, 500, 500);
  });

  it('min,max,medium', function() {
    new Guide.Text({
      xScale,
      yScale,
      text: 'min-min',
      position: [ 'min', 'min' ]
    }).paint(coord, container);

    new Guide.Text({
      xScale,
      yScale,
      text: 'min-max',
      position: [ 'min', 'max' ]
    }).paint(coord, container);

    new Guide.Text({
      xScale,
      yScale,
      text: 'max-max',
      position: [ 'max', 'max' ]
    }).paint(coord, container);

    new Guide.Text({
      xScale,
      yScale,
      text: 'medium-max',
      position: [ 'medium', 'max' ]
    }).paint(coord, container);

    new Guide.Text({
      xScale,
      yScale,
      text: 'max-min',
      position: [ 'max', 'min' ]
    }).paint(coord, container);
  });

  it('clear', function() {
    canvas.get('context').clearRect(0, 0, 500, 500);
  });
});

describe('guide html test', function() {
  it('base line', function() {
    const line = new Guide.Line({
      xScale,
      yScale,
      start: [ '一月', 100 ],
      end: [ '九月', 900 ],
      cfg: {
        strokeStyle: 'red',
        lineWidth: 1
      }
    });
    line.paint(coord, container);
  });

  it('offset', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '五月', 500 ],
      cfg: {
        offset: [ 50, 50 ]
      },
      html: "<div style='background-color:blue;width:20px;height:20px;border-radius:10px;'></div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '五月', 500 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[0].style.left)).eql(left + 50);
    expect(parseInt($('.guideWapper').find('div')[0].style.top)).eql(top + 50);
  });
  it('default', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '九月', 900 ],
      html: "<div style='background-color:red;width:20px;height:20px;border-radius:10px;'></div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '九月', 900 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[1].style.left)).eql(left - 10);
    expect(parseInt($('.guideWapper').find('div')[1].style.top)).eql(top - 10);
  });
  it('rc', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '八月', 800 ],
      cfg: {
        align: 'rc'
      },
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>rc</div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '八月', 800 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[2].style.left)).eql(left - 20);
    expect(parseInt($('.guideWapper').find('div')[2].style.top)).eql(top - 10);
  });
  it('lc', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '六月', 600 ],
      cfg: {
        align: 'lc'
      },
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>lc</div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '六月', 600 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[3].style.left)).eql(left);
    expect(parseInt($('.guideWapper').find('div')[3].style.top)).eql(top - 10);
  });
  it('tc', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '四月', 400 ],
      cfg: {
        align: 'tc'
      },
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>bc</div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '四月', 400 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[4].style.left)).eql(left - 10);
    expect(parseInt($('.guideWapper').find('div')[4].style.top)).eql(top - 20);
  });
  it('bc', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '二月', 200 ],
      cfg: {
        align: 'bc'
      },
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>tc</div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '二月', 200 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[5].style.left)).eql(left - 10);
    expect(parseInt($('.guideWapper').find('div')[5].style.top)).eql(top);
  });
  it('tl', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '一月', 100 ],
      cfg: {
        align: 'tl'
      },
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>tl</div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '一月', 100 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[6].style.left)).eql(left);
    expect(parseInt($('.guideWapper').find('div')[6].style.top)).eql(top);
  });
  it('tr', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '三月', 300 ],
      cfg: {
        align: 'tr'
      },
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>tr</div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '三月', 300 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[7].style.left)).eql(left - 20);
    expect(parseInt($('.guideWapper').find('div')[7].style.top)).eql(top);
  });
  it('bl', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '五月', 500 ],
      cfg: {
        align: 'bl'
      },
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>bl</div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '五月', 500 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[8].style.left)).eql(left);
    expect(parseInt($('.guideWapper').find('div')[8].style.top)).eql(top - 20);
  });
  it('br', function() {
    const Html = new Guide.Html({
      xScale,
      yScale,
      position: [ '七月', 700 ],
      cfg: {
        align: 'br'
      },
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>br</div>"
    });
    Html.paint(coord, container);
    const position = Html.parsePoint(coord, [ '七月', 700 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt($('.guideWapper').find('div')[9].style.left)).eql(Math.floor(left - 20));
    expect(parseInt($('.guideWapper').find('div')[9].style.top)).eql(Math.floor(top - 20));
  });
});
