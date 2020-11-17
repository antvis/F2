import { expect } from 'chai';
import { Canvas } from '../../../../src/graphic/engine/index';
import Coord from '../../../../src/coord/index';
import { Text } from '../../../../src/component/guide/index';
import Scale from '../../../../src/scale/index';

const canvas1 = document.createElement('canvas');
canvas1.id = 'guideText';
document.body.appendChild(canvas1);


describe('Guide.Text', function() {
  const coord = new Coord.Rect({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 }
  });

  const canvas = new Canvas({
    el: 'guideText',
    width: 500,
    height: 500,
    pixelRatio: 2
  });

  const group = canvas.addGroup();

  const xScale = new Scale.Cat({
    values: [ '一月', '二月', '三月', '四月', '五月' ]
  });

  const yScale = new Scale.Linear({
    min: 0,
    max: 1200
  });

  it('guide text', function() {
    const text = new Text({
      xScale,
      yScales: [ yScale ],
      content: '(一月，200)',
      position: [ '三月', 'min' ]
    });
    text.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].get('className')).to.equal('guide-text');
    expect(children[0].attr('x')).to.equal(260);
    expect(children[0].attr('y')).to.equal(460);
  });

  it('guide text has some offset', function() {
    group.clear();
    const text = new Text({
      xScale,
      yScales: [ yScale ],
      content: '(一月，200)',
      position: [ '三月', 'max' ],
      style: {
        fill: 'rgb(251, 192, 45)',
        fontSize: 24,
        fontWeight: 600,
        shadowBlur: 12,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffsetX: 2,
        shadowOffsetY: 4,
        textAlign: 'center'
      },
      offsetX: 100,
      offsetY: 100
    });
    text.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].get('className')).to.equal('guide-text');
    expect(children[0].attr('x')).to.equal(360);
    expect(children[0].attr('y')).to.equal(160);
    // expect(children[0].attr('rotate')).to.equal(Math.PI);
    document.body.removeChild(canvas1);
  });
});
