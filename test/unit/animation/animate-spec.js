const expect = require('chai').expect;
const Animate = require('../../../src/animation/animate');
// const Action = require('../../../src/animation/shape-action');
// const Polar = require('../../../src/coord/polar');
// const Rect = require('../../../src/coord/cartesian');

describe('Animate', function() {
  // Animate.Action = Action;
  // Animate.defaultCfg = {
  //   interval: {
  //     enter(coord) {
  //       if (coord.isPolar && coord.transposed) { // 饼图特殊处理
  //         return 'pie'
  //       }
  //       return Action.fadeIn;
  //     }
  //   },
  //   area: {
  //     enter(coord) {
  //       if (coord.isPolar) return null;
  //       return Action.fadeIn;
  //     },
  //     cfg: {
  //       appear: {
  //         duration: 500,
  //         easing: 'easeQuadOut'
  //       },
  //       update: {
  //         duration: 450,
  //         easing: 'easeQuadInOut'
  //       },
  //       enter: {
  //         duration: 600,
  //         delay: 150,
  //         easing: 'easeQuadInOut'
  //       },
  //       leave: {
  //         easing: 'easeQuadOut',
  //         duration: 350
  //       }
  //     }
  //   },
  //   line: {
  //     enter(coord) {
  //       if (coord.isPolar) return null;

  //       return Action.fadeIn;
  //     }
  //   },
  //   path: {
  //     enter(coord) {
  //       if (coord.isPolar) return null;

  //       return Action.fadeIn;
  //     }
  //   }
  // };

  // it('Animate.getAnimateCfg', () => {
  //   let geomType = 'line';
  //   let animationType = 'appear';

  //   let result = Animate.getAnimateCfg(geomType, animationType);
  //   expect(result).to.eql({
  //     duration: 450,
  //     easing: 'quadraticOut'
  //   });

  //   geomType = 'area';
  //   animationType = 'update';
  //   result = Animate.getAnimateCfg(geomType, animationType);
  //   expect(result).to.be.false;
  // });

  // it('Animate.getAnimation', () => {
  //   let coord = new Polar({
  //     start: {
  //       x: 0,
  //       y: 300
  //     },
  //     end: {
  //       x: 200,
  //       y: 0
  //     },
  //     transposed: true
  //   });
  //   let geomType = 'interval';
  //   let animationType = 'enter';
  //   let result = Animate.getAnimation(geomType, coord, animationType);
  //   expect(result).to.equal('pie');

  //   geomType = 'area';
  //   animationType = 'enter';
  //   result = Animate.getAnimation(geomType, coord, animationType);
  //   expect(result).to.be.null;

  //   coord = new Rect({
  //     start: {
  //       x: 0,
  //       y: 300
  //     },
  //     end: {
  //       x: 200,
  //       y: 0
  //     }
  //   });
  //   geomType = 'interval';
  //   animationType = 'enter';
  //   result = Animate.getAnimation(geomType, coord, animationType);
  //   expect(result).to.eql(Action.fadeIn);
  // });

  it('Animate.registerAnimation', () => {
    Animate.registerAnimation('myAnimation', function() {
      return 'success';
    });

    expect(Animate.Action.myAnimation).to.be.an.instanceof(Function);
    expect(Animate.Action.myAnimation()).to.equal('success');
  });
});
