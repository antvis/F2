import { expect } from 'chai';
import { Canvas } from '../../../../src/graphic/engine/index';
import Coord from '../../../../src/coord/index';
import { Arc } from '../../../../src/component/guide/index';
import Scale from '../../../../src/scale/index';

import '../../../../src/coord/polar';

const dom = document.createElement('canvas');
dom.id = 'guideArc';
document.body.appendChild(dom);

describe('Guide.Arc', function() {
  const coord = new Coord.Polar({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 },
    startAngle: -9 / 8 * Math.PI,
    endAngle: 1 / 8 * Math.PI
  });

  const canvas = new Canvas({
    el: 'guideArc',
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

  it('guide arc', function() {
    const arc = new Arc({
      xScale,
      yScales: [ yScale ],
      start: [ 0, 1200 ],
      end: [ 4, 1200 ],
      style: {
        lineWidth: 3,
        stroke: 'blue'
      }
    });
    arc.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].get('className')).to.equal('guide-arc');
    expect(children[0].attr('r')).to.equal(200);
    expect(children[0].attr('startAngle')).to.equal(2.7488935718910694);
    expect(children[0].attr('endAngle')).to.equal(0.39269908169872403);
    document.body.removeChild(dom);
  });
});
