const expect = require('chai').expect;
const Text = require('../../../../src/graphic/shape/text');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-text';
document.body.appendChild(dom);

describe('Text', function() {
  const canvas = new Canvas({
    domId: 'canvas-text',
    width: 200,
    height: 200,
    pixelRatio: 2
  });

  it('init attrs', function() {
    const text = new Text({
      attrs: {
        x: 30,
        y: 30,
        fontFamily: 'Arial',
        fill: 'red'
      }
    });

    expect(text.attr('x')).to.equal(30);
    expect(text.attr('y')).to.equal(30);
    expect(text.attr('text')).to.be.undefined;
    expect(text.attr('textAlign')).to.equal('start');
    expect(text.attr('fontSize')).to.equal(12);
    expect(text.attr('fontFamily')).to.equal('Arial');
    expect(text.attr('fontStyle')).to.equal('normal');
    expect(text.attr('fontWeight')).to.equal('normal');
    expect(text.attr('fontVariant')).to.equal('normal');
    expect(text.attr('font')).to.equal('normal normal normal 12px Arial');
    expect(text.attr('textBaseline')).to.equal('bottom');
    expect(text.attr('lineWidth')).to.equal(1);

    text.attr('fontStyle', 'italic');
    expect(text.attr('fontStyle')).to.equal('italic');
    expect(text.attr('font')).to.equal('italic normal normal 12px Arial');

    text.attr('fontWeight', 'bolder');
    expect(text.attr('fontWeight')).to.equal('bolder');
    expect(text.attr('font')).to.equal('italic normal bolder 12px Arial');

    text.attr('fontVariant', 'small-caps');
    expect(text.attr('fontVariant')).to.equal('small-caps');
    expect(text.attr('font')).to.equal('italic small-caps bolder 12px Arial');

    text.attr('fontFamily', '宋体');
    expect(text.attr('fontFamily')).to.equal('宋体');
    expect(text.attr('font')).to.equal('italic small-caps bolder 12px 宋体');

    text.attr('text', 'italic');
    canvas.add(text);
    // bbox
    const bbox = text.getBBox();
    canvas.addShape('Rect', {
      attrs: {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height,
        stroke: 'red',
        lineWidth: 1
      }
    });
    canvas.draw();
  });

  it('fill', function() {
    const text1 = new Text({
      attrs: {
        x: 30,
        y: 90,
        text: '填充描边',
        font: '20px Arial',
        fill: 'rgb(255, 0, 255)',
        stroke: '#8543E0',
        lineWidth: 1
      }
    });
    expect(text1.attr('fill')).to.equal('rgb(255, 0, 255)');
    expect(text1.attr('strokeStyle')).to.equal('#8543E0');
    canvas.add(text1);
    // bbox
    const bbox = text1.getBBox();
    canvas.addShape('Rect', {
      attrs: {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height,
        stroke: 'red',
        lineWidth: 1
      }
    });

    canvas.draw();
  });

  it('fontSize', function() {
    const text1 = new Text({
      attrs: {
        fontSize: 20,
        text: '字体大小',
        x: 10,
        y: 60,
        stroke: '#000'
      }
    });
    expect(text1.attr('fontSize')).to.equal(20);
    expect(text1.attr('font')).to.equal('normal normal normal 20px sans-serif');
    canvas.add(text1);
     // bbox
    const bbox = text1.getBBox();
    canvas.addShape('Rect', {
      attrs: {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height,
        stroke: 'red',
        lineWidth: 1
      }
    });

    canvas.draw();
  });

  it('fontSize < 12', function() {
    const text = new Text({
      attrs: {
        fontSize: 10,
        text: '10 号字体',
        x: 10,
        y: 95,
        stroke: '#000'
      }
    });
    expect(text.attr('fontSize')).to.equal(10);
    expect(text.attr('font')).to.equal('normal normal normal 10px sans-serif');
    expect(text.getMatrix()).not.eql([ 1, 0, 0, 1, 0, 0 ]);
    canvas.add(text);
    // bbox
    const bbox = text.getBBox();
    canvas.addShape('Rect', {
      attrs: {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height,
        stroke: 'red',
        lineWidth: 1
      }
    });

    canvas.draw();
  });

  it('text has \n', function() {
    const text = new Text({
      attrs: {
        x: 100,
        y: 50,
        text: '你好\nHello\nworld',
        fill: 'black',
        stroke: 'red',
        textBaseline: 'top',
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center'
      }
    });
    expect(text.attr('textArr').length).to.equal(3);
    expect(text._getTextHeight()).to.equal(48);
    canvas.add(text);
// bbox
    const bbox = text.getBBox();
    canvas.addShape('Rect', {
      attrs: {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height,
        stroke: 'red',
        lineWidth: 1
      }
    });
    canvas.draw();
  });
});

