import { expect } from 'chai';
import Group from '../../../src/graphic/group';
import Shape from '../../../src/graphic/shape';
import Canvas from '../../../src/graphic/canvas';

import '../../../src/graphic/shape/rect';
import '../../../src/graphic/shape/circle';
import '../../../src/graphic/shape/line';
import '../../../src/graphic/shape/polygon';
import '../../../src/graphic/shape/polyline';
import '../../../src/graphic/shape/arc';
import '../../../src/graphic/shape/sector';
import '../../../src/graphic/shape/text';
import '../../../src/graphic/shape/custom';

const dom = document.createElement('canvas');
dom.id = 'canvas-group';
dom.style.margin = '100px';
document.body.appendChild(dom);

const canvas = new Canvas({
  el: 'canvas-group',
  width: 500,
  height: 500
});

describe('Group', function() {
  it('constructor', function() {
    const g = new Group({
      className: 'groupOne'
    });

    expect(g.isGroup()).to.be.true;
    expect(g.getChildren()).not.to.be.undefined;
    expect(g.getChildren().length).to.equal(0);
    expect(g.isVisible()).to.be.true;
  });

  it('addGroup', function() {
    const parent = new Group();
    parent.addGroup();
    parent.addGroup({
      className: 'groupTwo'
    });
    const children = parent.getChildren();
    expect(children.length).to.equal(2);
    expect(children[0].get('parent')).to.eql(parent);
    expect(children[1].get('className')).to.equal('groupTwo');
  });

  it('add(Group)', function() {
    const group = new Group();
    const child = new Group({
      className: 'g1'
    });
    group.add(child);

    expect(group.getChildren().length).to.equal(1);
    expect(child.get('parent')).to.eql(group);
  });

  it('add(Shape)', function() {
    const group = new Group();
    const arc = new Shape.Arc({
      attrs: {
        startAngle: -Math.PI,
        endAngle: Math.PI / 2,
        anticlockwise: false,
        x: 60,
        y: 60,
        r: 20,
        stroke: '#18901f',
        lineWidth: 4
      }
    });
    group.add(arc);
    expect(group.getChildren().length).to.equal(1);
    expect(group.getChildren()[0]).to.eql(arc);
  });

  it('add(Shape), the shape is belonged to another group', function() {
    const group1 = new Group();
    const arc = new Shape.Arc({
      attrs: {
        startAngle: -Math.PI,
        endAngle: Math.PI / 2,
        anticlockwise: false,
        x: 60,
        y: 60,
        r: 20,
        stroke: '#18901f',
        lineWidth: 4
      }
    });
    group1.add(arc);
    const group2 = new Group();
    group2.add(arc);
    expect(group1.getChildren().length).to.equal(0);
    expect(group2.getChildren().length).to.equal(1);
    expect(arc.get('parent')).to.eql(group2);
  });

  it('add(Shape), the shape has clip', function() {
    const group = new Group();
    const line = new Shape.Line({
      attrs: {
        x1: 50,
        y1: 50,
        x2: 100,
        y2: 100,
        lineWidth: 2,
        strokeStyle: '#223273',
        lineCap: 'round'
      }
    });
    const rect = new Shape.Rect({
      attrs: {
        x: 75,
        y: 75,
        width: 25,
        height: 25
      }
    });
    line.attr('clip', rect);

    group.add(line);
    expect(group.getChildren().length).to.equal(1);
    expect(line.get('parent')).to.eql(group);
    expect(rect.get('parent')).to.eql(group);
    expect(rect.get('context')).to.eql(group.get('context'));
  });

  it('add(Array)', function() {
    const group = new Group();
    const child1 = new Group({
      className: 'g1'
    });
    const child2 = new Group({
      className: 'g2'
    });
    group.add([ child1, child2 ]);

    expect(group.getChildren().length).to.equal(2);
    expect(child1.get('parent')).to.eql(group);
    expect(child2.get('parent')).to.eql(group);
  });

  it('contain', function() {
    const group = new Group();
    const r = new Shape.Rect();
    group.add(r);
    expect(group.contain(r)).to.be.true;
  });

  it('sort', function() {
    const group = new Group({
      className: 'g'
    });

    const circle1 = new Shape.Circle({
      className: 'circle1',
      zIndex: 1
    });

    const circle2 = new Shape.Circle({
      className: 'circle2',
      zIndex: 2
    });

    const circle3 = new Shape.Circle({
      className: 'circle3',
      zIndex: 3
    });

    group.add([ circle3, circle1, circle2 ]);
    group.sort();
    expect(group.getChildren()[0].get('className')).to.equal('circle1');
    expect(group.getChildren()[1].get('className')).to.equal('circle2');
    expect(group.getChildren()[2].get('className')).to.equal('circle3');
  });

  it('remove', function() {
    const g1 = new Group({
      id: 'g1'
    });

    const g2 = new Group({
      id: 'g2'
    });

    const e1 = new Shape.Circle({
      id: 'e1'
    });
    const e2 = new Shape.Circle({
      id: 'e2'
    });
    const e3 = new Shape.Circle({
      id: 'e3'
    });
    const e4 = new Shape.Circle({
      id: 'e4'
    });
    const e5 = new Shape.Circle({
      id: 'e5'
    });

    g1.add(e1);
    g1.add(e2);
    g1.add(e3);
    g1.add(e4);
    g1.add(e5);

    g2.add(g1);

    expect(g2.getChildren().length).to.equal(1);
    expect(g1.getChildren().length).to.equal(5);
    e1.remove(true);
    expect(g1.getChildren().length).to.equal(4);
    expect(e1.isDestroyed()).to.be.true;
    e2.remove();
    expect(g1.getChildren().length).to.equal(3);
    expect(e2.isDestroyed()).to.be.false;
    e3.remove(false);
    expect(g1.getChildren().length).to.equal(2);
    expect(e3.isDestroyed()).to.be.false;
    g2.add(g1);
    expect(g2.getChildren().length).to.equal(1);
    g1.remove();
    expect(g2.getChildren().length).to.equal(0);
    expect(g1.isDestroyed()).to.be.false;
  });

  it('clear', function() {
    const g = new Group({
      id: 'g'
    });

    const e1 = new Shape.Circle({
      id: 'e1'
    });
    const e2 = new Shape.Circle({
      id: 'e2'
    });
    const e3 = new Shape.Circle({
      id: 'e3'
    });

    g.add(e1);
    g.add(e2);
    g.add(e3);

    expect(g.getChildren().length).to.equal(3);
    g.clear();
    expect(g.getChildren().length).to.equal(0);
    expect(e1.isDestroyed()).to.be.true;
  });

  it('destroy', function() {
    const g = new Group({
      id: 'g'
    });

    const e1 = new Shape.Circle({
      id: 'e1'
    });
    const e2 = new Shape.Circle({
      id: 'e2'
    });
    const e3 = new Shape.Circle({
      id: 'e3'
    });

    g.add(e1);
    g.add(e2);
    g.add(e3);
    expect(g.getChildren().length).to.equal(3);
    g.destroy();

    expect(g.getChildren()).to.undefined;
    expect(g.isDestroyed()).to.be.true;
    expect(e1.isDestroyed()).to.be.true;
    expect(e2.isDestroyed()).to.be.true;
    expect(e3.isDestroyed()).to.be.true;

    g.destroy();
    expect(g.getChildren()).to.undefined;
    expect(g.isDestroyed()).to.be.true;
  });

  it('getBBox()', function() {
    const polyline = new Shape.Polyline({
      attrs: {
        points: [
          { x: 10, y: 10 },
          { x: 20, y: 45 },
          { x: 40, y: 80 },
          { x: 13, y: 70 },
          { x: 80, y: 32 }
        ],
        lineWidth: 1,
        stroke: 'red'
      }
    });
    // 当不可见时，不参与计算
    const arc = new Shape.Arc({
      attrs: {
        x: 20,
        y: 20,
        r: 50,
        startAngle: 0,
        endAngle: Math.PI / 2,
        lineWidth: 2,
        stroke: '#18901f'
      },
      visible: false
    });
    const text = new Shape.Text({
      attrs: {
        x: 100,
        y: 50,
        text: '你好\nHello\nworld',
        fill: 'black',
        stroke: 'red',
        textBaseline: 'top',
        fontFamily: 'Arial',
        fontSize: 8,
        lineHeight: 18,
        lineWidth: 1
      }
    });
    const custom = new Shape.Custom({
      createPath() {
        return null;
      },
      calculateBox() {
        return null;
      }
    });
    const group = canvas.addGroup();
    group.add([ polyline, arc, text, custom ]);

    const bbox = group.getBBox();
    canvas.draw();
    expect(group.getChildren().length).to.equal(4);
    expect(canvas.getChildren().length).to.equal(1);
    expect(bbox.x).to.equal(9.5);
    expect(bbox.y).to.equal(9.5);
    expect(bbox.width).to.equal(109.6171875);
    expect(bbox.height).to.equal(84.5);
    group.destroy();
  });

  it('group transform', function() {
    const rect = new Shape.Rect({
      attrs: {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        fill: 'pink'
      }
    });

    const group = canvas.addGroup();
    group.add(rect);

    expect(group.attr('matrix')).to.eql([ 1, 0, 0, 1, 0, 0 ]);

    group.scale(0.5, 0.5);
    expect(group.attr('matrix')).to.eql([ 0.5, 0, 0, 0.5, 0, 0 ]);
    document.body.removeChild(dom);
  });
});
