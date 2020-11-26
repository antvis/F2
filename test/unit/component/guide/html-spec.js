import { expect } from 'chai';
import { Canvas } from '../../../../src/graphic/engine/index';
import Coord from '../../../../src/coord/index';
import { Html } from '../../../../src/component/guide/index';
import Scale from '../../../../src/scale/index';

const canva1s = document.createElement('canvas');
canva1s.id = 'guideHTML';
canva1s.style.position = 'fixed';
canva1s.style.top = 0;
canva1s.style.left = 0;
document.body.appendChild(canva1s);

const canvas = new Canvas({
  el: 'guideHTML',
  width: 500,
  height: 500,
  pixelRatio: 2
});

const container = canvas.addGroup();

const xScale = new Scale.Cat({
  values: [ '一月', '二月', '三月', '四月', '五月' ]
});

const yScale = new Scale.Linear({
  min: 0,
  max: 1200
});

const coord = new Coord.Rect({
  start: {
    x: 50,
    y: 50
  },
  end: {
    x: 400,
    y: 400
  }
});

describe('Guide.Html', function() {
  it('offset', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '五月', 500 ],
      offsetX: 50,
      offsetY: 50,
      html: "<div style='background-color:blue;width:20px;height:20px;border-radius:10px;'></div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '五月', 500 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(left + 40);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(top + 40);
    guide.remove();
  });
  it('default', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '九月', 900 ],
      html: "<div style='background-color:red;width:20px;height:20px;border-radius:10px;'></div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '九月', 900 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(left - 10);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(top - 10);
    guide.remove();
  });
  it('rc', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '八月', 800 ],
      alignX: 'right',
      alignY: 'middle',
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>rc</div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '八月', 800 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(left - 20);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(top - 10);
    guide.remove();
  });
  it('lc', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '六月', 600 ],
      alignX: 'left',
      alignY: 'middle',
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>lc</div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '六月', 600 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(left);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(top - 10);
    guide.remove();
  });
  it('tc', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '四月', 400 ],
      alignX: 'center',
      alignY: 'top',
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>tc</div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '四月', 400 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(left - 10);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(top);
    guide.remove();
  });
  it('bc', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '二月', 200 ],
      alignX: 'center',
      alignY: 'bottom',
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>bc</div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '二月', 200 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(left - 10);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(top - 20);
    guide.remove();
  });
  it('tl', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '一月', 100 ],
      alignX: 'left',
      alignY: 'top',
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>tl</div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '一月', 100 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(left);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(top);
    guide.remove();
  });
  it('tr', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '三月', 300 ],
      alignX: 'right',
      alignY: 'top',
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>tr</div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '三月', 300 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(left - 20);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(top);
    guide.remove();
  });
  it('bl', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '五月', 500 ],
      alignX: 'left',
      alignY: 'bottom',
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>bl</div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '五月', 500 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(left);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(top - 20);
    guide.remove();

  });
  it('br', function() {
    const guide = new Html({
      xScale,
      yScales: [ yScale ],
      position: [ '七月', 700 ],
      alignX: 'right',
      alignY: 'bottom',
      html: "<div style='background-color:blue;width:20px;height:20px;color:#fff;'>br</div>"
    });
    guide.render(coord, container);
    const position = guide.parsePoint(coord, [ '七月', 700 ]);
    const left = Math.floor(position.x);
    const top = Math.floor(position.y);
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.left)).eql(Math.floor(left - 20));
    expect(parseInt(document.getElementsByClassName('guideWapper')[0].childNodes[0].style.top)).eql(Math.floor(top - 20));

    guide.changeVisible(false);
    expect(guide.element.style.display).to.equal('none');

    guide.remove();
  });
});
