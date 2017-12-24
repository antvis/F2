// const expect = require('chai').expect;
// const GuideController = require('../../../../src/chart/controller/guide');

// describe('guide assist test', function() {
//   const guideController = new GuideController();
//   // let top = 0;
//   // let bottom = 0;
//   it('init', function() {
//     expect(guideController.guides.length).equal(0);
//   });
//   // it('add guide', function() {
//   //   guideController.addGuide({
//   //     top: true,
//   //     paint() {
//   //       top++;
//   //     }
//   //   });
//   //   expect(guideController.guides.length).equal(1);

//   //   guideController.addGuide({
//   //     top: false,
//   //     paint() {
//   //       bottom++;
//   //     }
//   //   });
//   //   expect(guideController.guides.length).equal(2);
//   // });

//   it('set scale', function() {
//     const xScale = {};
//     const yScale = {};
//     guideController.setScale(xScale, yScale);
//     expect(guideController.guides[0].xScale).equal(xScale);
//     expect(guideController.guides[1].yScale).equal(yScale);
//   });

//   // it('paint', function() {
//   //   expect(top).equal(0);
//   //   expect(bottom).equal(0);
//   //   guideController.paintFront();
//   //   expect(top).equal(1);
//   //   expect(bottom).equal(0);
//   //   guideController.paintBack();
//   //   expect(top).equal(1);
//   //   expect(bottom).equal(1);
//   // });

//   it('clear', function() {
//     guideController.clear();
//     expect(guideController.guides.length).equal(0);
//   });
// });
