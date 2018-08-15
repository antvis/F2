const expect = require('chai').expect;
const Interaction = require('../../../src/interaction/base');
const F2 = require('../../../src/core');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

const chart = new F2.Chart({
  el: canvas
});

let aInteraction;

describe('Interaction', () => {
  it('chart.interaction() is defined', () => {
    expect(chart.interaction).to.be.an.instanceof(Function);
  });

  it('Creat an interaction of gesture', () => {
    aInteraction = new Interaction({
      startEvent: 'press'
    }, chart);

    expect(aInteraction.startEvent).to.equal('press');
    expect(aInteraction.hammer).not.to.be.empty;
  });

  it('Interaction instance destroy', () => {
    aInteraction.destroy();
    expect(aInteraction.hammer).to.be.null;
  });

  it('Creat an interaction of touchEvents', () => {
    aInteraction = new Interaction({}, chart);
    expect(aInteraction.startEvent).to.equal('touchstart');
    expect(aInteraction.processEvent).to.equal('touchmove');
    expect(aInteraction.endEvent).to.equal('touchend');
  });

  it('Register interaction', () => {
    F2.Chart.registerInteraction('try', Interaction);

    expect(F2.Chart._Interactions.try).not.to.be.undefined;
  });

  it('getInteraction', () => {
    const result = F2.Chart.getInteraction('try');
    expect(result).not.to.be.null;
  });

  it('call', () => {
    chart.interaction('try', {
      processEvent: 'press'
    });

    expect(chart._interactions).to.be.an.instanceof(Object);
    expect(chart._interactions.try).to.be.an.instanceOf(Interaction);
    expect(chart._interactions.try.processEvent).to.equal('press');
  });

  it('repeat call', () => {
    chart.interaction('try', {
      processEvent: 'pressAagin'
    });
    expect(Object.keys(chart._interactions).length).to.equal(1);
    expect(chart._interactions.try.processEvent).to.equal('pressAagin');
  });

  it('clearInteraction', () => {
    chart.clearInteraction('test');
    expect(Object.keys(chart._interactions).length).to.equal(1);

    chart.clearInteraction();
    expect(Object.keys(chart._interactions).length).to.equal(0);
  });
});
