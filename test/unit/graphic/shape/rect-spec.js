import { expect } from 'chai';
import Rect from '../../../../src/graphic/engine/shape/rect';
import Canvas from '../../../../src/graphic/engine/canvas';

const dom = document.createElement('canvas');
dom.id = 'canvas-rect';
document.body.appendChild(dom);

describe('Rect', function() {
  const canvas = new Canvas({
    el: 'canvas-rect',
    width: 200,
    height: 200,
    pixelRatio: 1
  });
  const rect = new Rect({
    attrs: {
      x: 50,
      y: 50,
      height: 20,
      width: 80,
      lineWidth: 1,
      fill: '#1890FF',
      strokeStyle: '#000'
    }
  });

  it('init attr', function() {
    expect(rect.getType()).to.equal('rect');
    expect(rect.get('canStroke')).to.be.true;
    expect(rect.get('canFill')).to.be.true;
    expect(rect.attr('x')).to.equal(50);
    expect(rect.attr('y')).to.equal(50);
    expect(rect.attr('strokeStyle')).to.equal('#000');
    expect(rect.attr('fillStyle')).to.equal('#1890FF');
    expect(rect.attr('fill')).to.equal('#1890FF');
  });

  it('draw', function() {
    canvas.add(rect);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('getBBox', function() {
    const bbox = rect.getBBox();
    expect(bbox.x).to.equal(50);
    expect(bbox.y).to.equal(50);
    expect(bbox.width).to.equal(80);
    expect(bbox.height).to.equal(20);
  });

  it('destroy', function() {
    rect.destroy();
    expect(canvas.get('children').length).to.equal(0);
  });

  it('rect with radius', function() {
    const rect = new Rect({
      attrs: {
        x: 10,
        y: 10,
        height: 20,
        width: 80,
        radius: [ 4, 0, 5 ],
        lineWidth: 1,
        fill: '#1890FF',
        strokeStyle: '#000'
      }
    });
    canvas.add(rect);

    canvas.set('animateHandler', false);
    canvas.draw();


    const context = canvas.get('context');
    // 第一个image圆角区域
    const imageData1 = context.getImageData(10, 10, 1, 1).data;
    // 第二个image圆角区域
    const imageData2 = context.getImageData(89, 10, 1, 1).data;


    expect(canvas.get('children').length).to.equal(1);
    expect(imageData1[0]).to.equal(0);
    expect(imageData1[1]).to.equal(0);
    expect(imageData1[2]).to.equal(0);
    expect(imageData1[3]).to.equal(0);

    expect(imageData2[0]).not.equal(0);
    expect(imageData2[1]).not.equal(0);
    expect(imageData2[2]).not.equal(0);
    expect(imageData2[3]).not.equal(0);
    rect.destroy();
    // document.body.removeChild(dom);
  });

  it('rect radius greater than width and height', function() {
    const rect = new Rect({
      attrs: {
        x: 10,
        y: 10,
        height: 20,
        width: 80,
        radius: [ 40, 40, 0, 0 ],
        lineWidth: 1,
        fill: '#1890FF',
        strokeStyle: '#000'
      }
    });

    canvas.add(rect);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
    // rect.destroy();
    // document.body.removeChild(dom);
  });
});

