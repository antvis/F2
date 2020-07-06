import { expect } from 'chai';
import Text from '../../../../src/graphic/shape/text';
import Canvas from '../../../../src/graphic/canvas';

const dom = document.createElement('canvas');
dom.id = 'canvas-text';
document.body.appendChild(dom);

describe('Text', function() {
  const canvas = new Canvas({
    el: 'canvas-text',
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
        fill: 'red',
        lineWidth: 1
      }
    });
    expect(text.getType()).to.equal('text');
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

    text.attr('fontFamily', 'Arial');
    expect(text.attr('fontFamily')).to.equal('Arial');
    expect(text.attr('font')).to.equal('italic small-caps bolder 12px Arial');

    text.attr('text', 'italic');
    canvas.add(text);
    // bbox
    canvas.draw();
    const bbox = text.getBBox();
    expect(bbox.x).to.equal(30);
    expect(bbox.y).to.equal(18);
    expect(bbox.width).to.equal(25.1796875);
    expect(bbox.height).to.equal(12);
  });

  it('fill', function() {
    const text1 = new Text({
      attrs: {
        x: 30,
        y: 90,
        text: 'fill',
        fontSize: 12,
        fontFamily: 'Arial',
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
    expect(bbox.x).to.equal(30);
    expect(bbox.y).to.equal(78);
    expect(bbox.width).to.equal(11.33203125);
    expect(bbox.height).to.equal(12);

    canvas.draw();
  });

  it('fontSize', function() {
    const text1 = new Text({
      attrs: {
        fontSize: 20,
        fontFamily: 'Arial',
        text: 'fontSize',
        x: 10,
        y: 60,
        stroke: '#000',
        lineWidth: 1
      }
    });
    expect(text1.attr('fontSize')).to.equal(20);
    expect(text1.attr('font')).to.equal('normal normal normal 20px Arial');
    canvas.add(text1);
    // bbox
    const bbox = text1.getBBox();
    expect(bbox.x).to.equal(10);
    expect(bbox.y).to.equal(40);
    expect(bbox.width).to.equal(72.265625);
    expect(bbox.height).to.equal(20);

    canvas.draw();
  });

  xit('fontSize < 12', function() {
    const text = new Text({
      attrs: {
        fontSize: 10,
        text: 'size 10',
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
        text: 'haha\nHello\nworld',
        fill: 'black',
        stroke: 'red',
        textBaseline: 'top',
        fontSize: 12,
        fontFamily: 'Arial',
        lineHeight: 18,
        lineWidth: 1
      }
    });
    expect(text.attr('textArr').length).to.equal(3);
    expect(text._getTextHeight()).to.equal(48);
    canvas.add(text);
    // bbox
    const bbox = text.getBBox();
    expect(bbox.x).to.equal(100);
    expect(bbox.y).to.equal(50);
    expect(bbox.width).to.equal(28.67578125);
    expect(bbox.height).to.equal(48);
    canvas.draw();
  });

  it('rotate', function() {
    const text = new Text({
      attrs: {
        x: 100,
        y: 50,
        text: 'haha\nHello\nworld',
        textAlign: 'end',
        textBaseline: 'middle',
        fontSize: 12,
        fontFamily: 'Arial',
        lineHeight: 18,
        lineWidth: 1,
        rotate: Math.PI / 2
      }
    });
    canvas.add(text);
    // bbox
    const bbox = text.getBBox();
    expect(bbox.width).to.equal(48);
    expect(bbox.height).to.equal(28.67578125);
    canvas.draw();
    document.body.removeChild(dom);
  });
});
