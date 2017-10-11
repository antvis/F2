const expect = require('chai').expect;
const GuideAssist = require('../../../../src/chart/assist/guide');

describe('guide assist test', function() {
  const guideAssist = new GuideAssist();
  let top = 0;
  let bottom = 0;
  it('init', function() {
    expect(guideAssist.guides.length).equal(0);
  });
  it('add guide', function() {
    guideAssist.addGuide({
      top: true,
      paint() {
        top++;
      }
    });
    expect(guideAssist.guides.length).equal(1);

    guideAssist.addGuide({
      top: false,
      paint() {
        bottom++;
      }
    });
    expect(guideAssist.guides.length).equal(2);
  });

  it('set scale', function() {
    const xScale = {};
    const yScale = {};
    guideAssist.setScale(xScale, yScale);
    expect(guideAssist.guides[0].xScale).equal(xScale);
    expect(guideAssist.guides[1].yScale).equal(yScale);
  });

  it('paint', function() {
    expect(top).equal(0);
    expect(bottom).equal(0);
    guideAssist.paintFront();
    expect(top).equal(1);
    expect(bottom).equal(0);
    guideAssist.paintBack();
    expect(top).equal(1);
    expect(bottom).equal(1);
  });

  it('clear', function() {
    guideAssist.clear();
    expect(guideAssist.guides.length).equal(0);
  });
});
