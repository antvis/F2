const expect = require('chai').expect;
const Group = require('../../../src/graphic/group');
const Shape = require('../../../src/graphic/shape/index');
const Canvas = require('../../../src/graphic/canvas');

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

    expect(g.get('isGroup')).to.be.true;
    expect(g.get('children')).not.to.be.undefined;
    expect(g.get('children').length).to.equal(0);
    expect(g.get('visible')).to.be.true;
  });

  it('addGroup', function() {
    const parent = new Group();
    parent.addGroup();
    parent.addGroup({
      className: 'groupTwo'
    });
    const children = parent.get('children');
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

    expect(group.get('children').length).to.equal(1);
    expect(child.get('parent')).to.eql(group);
  });

  it('add(Shape)', function() {
    const group = new Group();
    const arc = new Shape.Arc({
      attrs: {
        startAngle: -Math.PI,
        endAngle: Math.PI / 2,
        clockwise: false,
        x: 60,
        y: 60,
        r: 20,
        stroke: '#18901f',
        lineWidth: 4
      }
    });
    group.add(arc);
    expect(group.get('children').length).to.equal(1);
    expect(group.get('children')[0]).to.eql(arc);
  });

  it('add(Shape), the shape is belonged to another group', function() {
    const group1 = new Group();
    const arc = new Shape.Arc({
      attrs: {
        startAngle: -Math.PI,
        endAngle: Math.PI / 2,
        clockwise: false,
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
    expect(group1.get('children').length).to.equal(0);
    expect(group2.get('children').length).to.equal(1);
    expect(arc.get('parent')).to.eql(group2);
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

    expect(group.get('children').length).to.equal(2);
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
    expect(group.get('children')[0].get('className')).to.equal('circle1');
    expect(group.get('children')[1].get('className')).to.equal('circle2');
    expect(group.get('children')[2].get('className')).to.equal('circle3');
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

    expect(g2.get('children').length).to.equal(1);
    expect(g1.get('children').length).to.equal(5);
    e1.remove(true);
    expect(g1.get('children').length).to.equal(4);
    expect(e1.get('destroyed')).to.be.true;
    e2.remove();
    expect(g1.get('children').length).to.equal(3);
    expect(e2.get('destroyed')).to.be.false;
    e3.remove(false);
    expect(g1.get('children').length).to.equal(2);
    expect(e3.get('destroyed')).to.be.false;
    g2.add(g1);
    expect(g2.get('children').length).to.equal(1);
    g1.remove();
    expect(g2.get('children').length).to.equal(0);
    expect(g1.get('destroyed')).to.be.false;
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

    expect(g.get('children').length).to.equal(3);
    g.clear();
    expect(g.get('children').length).to.equal(0);
    expect(e1.get('destroyed')).to.be.true;
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
    expect(g.get('children').length).to.equal(3);
    g.destroy();

    expect(g.get('children')).to.undefined;
    expect(g.get('destroyed')).to.be.true;
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
    const arc = new Shape.Arc({
      attrs: {
        x: 20,
        y: 20,
        r: 50,
        startAngle: 0,
        endAngle: Math.PI / 2,
        lineWidth: 2,
        stroke: '#18901f'
      }
    });
    const text = new Shape.Text({
      attrs: {
        x: 100,
        y: 50,
        text: '你好\nHello\nworld',
        fill: 'black',
        stroke: 'red',
        textBaseline: 'top',
        fontSize: 8,
        lineHeight: 18,
        lineWidth: 1
      }
    });
    const group = canvas.addGroup();
    group.add([ polyline, arc, text ]);

    const bbox = group.getBBox();
    canvas.draw();
    expect(group.get('children').length).to.equal(3);
    expect(canvas.get('children').length).to.equal(1);
    expect(bbox.x).to.equal(10);
    expect(bbox.y).to.equal(10);
    expect(bbox.width).to.equal(102.74479166666667);
    expect(bbox.height).to.equal(70);
  });
});
