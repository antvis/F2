import { expect } from 'chai';
import Animator from '../../../src/graphic/animate/animator';
import Timeline from '../../../src/graphic/animate/timeline';
import Canvas from '../../../src/graphic/canvas';
import '../../../src/graphic/shape/rect';
import '../../../src/graphic/shape/polyline';

const dom = document.createElement('canvas');
dom.id = 'animate';
document.body.appendChild(dom);

const canvas = new Canvas({
  el: 'animate',
  width: 500,
  height: 500,
  pixelRatio: 2
});

const rect = canvas.addShape('rect', {
  attrs: {
    x: 10,
    y: 10,
    width: 30,
    height: 0,
    fill: '#18901f'
  }
});

describe('Do Animation', function() {
  let animator;
  const timeline = new Timeline();
  timeline.play();
  it('initial', function() {
    const initialAttrs = {
      height: 0
    };
    animator = new Animator(rect, initialAttrs, timeline);

    expect(animator.hasStarted).to.be.false;
    expect(animator.hasEnded).to.be.false;
    expect(animator.animate).to.be.null;
  });

  it('do animation', function(done) {
    let isStarted = false;
    let isEnded = false;
    let isUpdate = false;

    animator
      .to({
        attrs: {
          height: 100
        },
        duration: 800
      })
      .onStart(function() {
        isStarted = true;
      })
      .onUpdate(function() {
        isUpdate = true;
      })
      .onEnd(function() {
        isEnded = true;
      });

    setTimeout(function() {
      expect(isStarted).to.be.true;
      expect(isEnded).to.be.true;
      expect(isUpdate).to.be.true;
      expect(rect.attr('height')).to.equal(100);
      expect(parseInt(animator.animate.endTime - animator.animate.startTime)).to.equal(800);
      // expect(animator.animGroups.length).to.equal(1);
      timeline.stop();
      done();
    }, 1000);
  });

  it('do matrix animation', function(done) {
    expect(timeline.playing).to.be.false;

    timeline.play();
    animator.to({
      attrs: {
        matrix: [ 1, 0, 0, 1, 20, 20 ]
      },
      duration: 800
    });

    setTimeout(function() {
      expect(rect.getMatrix()).to.eql([ 1, 0, 0, 1, 20, 20 ]);
      // expect(parseInt(animator.animate.endTime - animator.animate.startTime)).to.equal(800);
      // expect(animator.animGroups.length).to.equal(2);
      done();
    }, 1200);
  });

  it('do points animation', function(done) {
    const polyline = canvas.addShape('polyline', {
      attrs: {
        points: [
          { x: 10, y: 10 },
          { x: 15, y: 15 },
          { x: 25, y: 5 },
          { x: 50, y: 25 }
        ],
        lineWidth: 2,
        stroke: '#f80'
      }
    });
    const initialAttrs = {
      points: [
        { x: 10, y: 10 },
        { x: 15, y: 15 },
        { x: 25, y: 5 },
        { x: 50, y: 25 }
      ]
    };
    const animator = new Animator(polyline, initialAttrs, timeline);
    animator.to({
      attrs: {
        points: [
          { x: 20, y: 20 },
          { x: 25, y: 25 },
          { x: 35, y: 15 },
          { x: 60, y: 35 }
        ]
      },
      duration: 800
    });

    setTimeout(function() {
      expect(polyline.attr('points')).to.eql([
        { x: 20, y: 20 },
        { x: 25, y: 25 },
        { x: 35, y: 15 },
        { x: 60, y: 35 }
      ]);
      expect(parseInt(animator.animate.endTime - animator.animate.startTime)).to.be.within(799, 800);

      // expect(animator.animGroups.length).to.equal(1);
      timeline.stop();
      document.body.removeChild(dom);
      done();
    }, 1200);
  });

});
