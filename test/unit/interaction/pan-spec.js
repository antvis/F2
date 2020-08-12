import Pan from '../../../src/interaction/pan';
import * as F2 from '../../../src/core';
import '../../../src/geom/line';
import ScrollBar from '../../../src/plugin/scroll-bar';

function snapEqual(v1, v2) {
  return Math.abs(v1 - v2) < 0.01;
}

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 200;
canvas.id = 'pan';
document.body.appendChild(canvas);

const data = [];
const dates = [ '2018-08-01', '2018-08-02', '2018-08-03', '2018-08-04', '2018-08-05', '2018-08-06', '2018-08-07', '2018-08-08', '2018-08-09', '2018-08-10', '2018-08-11', '2018-08-12', '2018-08-13', '2018-08-14', '2018-08-15', '2018-08-16', '2018-08-17', '2018-08-18', '2018-08-19', '2018-08-20' ];
const yValues = [ 3, 5.6, 7, 7, 10, 11, 3, 8, 9, 5.6, 12, 14, 10, 8, 9, 5, 17, 3, 8, 9 ];
for (let i = 0; i < 20; i++) {
  const obj = {};
  obj.x1 = i + 1;
  obj.y = yValues[i];
  obj.x2 = i + 1 + '';
  obj.x3 = dates[i];
  data.push(obj);
}

describe('Pan', function() {
  const chart = new F2.Chart({
    id: 'pan',
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    x1: {
      min: 3,
      max: 10,
      nice: false
    }
  });
  chart.line().position('x1*y');
  chart.render();


  it('touch', function() {
    const pan = new Pan({}, chart);
    let eventObj = {
      type: 'touchstart',
      touches: [
        { x: 112, y: 20 }
      ]
    };
    pan.start(eventObj);
    expect(pan.currentDeltaX).toBe(0);
    expect(pan.currentDeltaY).toBe(0);
    expect(pan.lastPoint).toEqual({
      x: 112,
      y: 20
    });

    eventObj = {
      type: 'touchmove',
      touches: [
        { x: 50, y: 20 }
      ]
    };
    pan.process(eventObj);
    expect(pan.lastPoint).toEqual({
      x: 50, y: 20
    });
    const xScale = chart.getXScale();
    expect(xScale.min).toBeCloseTo(4.329738321916591, 3);
    expect(xScale.max).toBeCloseTo(11.329738321916592, 3);


    pan.end();
    expect(pan.currentDeltaX).toBeNull();
    expect(pan.currentDeltaY).toBeNull();
    expect(pan.lastPoint).toBeNull();
    expect(pan._panCumulativeDelta).toBe(0);
  });

  it('pan', function() {
    const pan = new Pan({}, chart);
    let eventObj = {
      type: 'pan',
      deltaX: 0,
      deltaY: 0
    };
    pan.start(eventObj);

    eventObj = {
      type: 'pan',
      deltaX: 3000,
      deltaY: 0
    };
    pan.process(eventObj);
    const xScale = chart.getXScale();
    expect(xScale.min).toBe(1);
    expect(xScale.max).toBe(8);
    expect(pan.currentDeltaX).toBe(3000);
    expect(pan.currentDeltaY).toBe(0);

    pan.end();
    chart.destroy();
  });
});

describe('chart pan', function() {
  const chart = new F2.Chart({
    id: 'pan',
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    x1: {
      min: 3,
      max: 10,
      nice: false
    }
  });
  chart.line().position('x1*y');
  chart.interaction('pan');
  chart.render();

  it('Register successfully', function() {
    const Chart = F2.Chart;
    expect(Chart._Interactions.pan).not.toBeUndefined();
  });

  it('pan x axis, and x field is a linear type.', function() {
    const interaction = chart._interactions.pan;
    interaction._doMove(20, 0);

    const limitRange = interaction.limitRange;
    expect(limitRange).toEqual({ x1: { min: 1, max: 20 } });
    const xScale = chart.getXScale();
    expect(xScale.min).toBeCloseTo(2.5710521542204545, 3);
    expect(xScale.max).toBeCloseTo(9.571052154220455, 3);

    const xRange = interaction.xRange;
    expect(xRange[0]).toBeCloseTo(0.08268695548528708, 3);
    expect(xRange[1]).toBeCloseTo(0.4511080081168661, 3);

  });

  it('pan y axis, and field is a linear type.', function() {
    const yMax = Math.max.apply(null, yValues);
    chart.scale({
      x1: null,
      y: {
        min: 6,
        max: 10
      }
    });
    chart.interaction('pan', {
      mode: 'y'
    });
    chart.repaint();

    const interaction = chart._interactions.pan;
    interaction._doMove(0, 300);

    const limitRange = interaction.limitRange;
    expect(limitRange).toEqual({
      y: {
        min: Math.min.apply(null, yValues),
        max: Math.max.apply(null, yValues)
      }
    });
    const yScale = chart.getYScales()[0];
    expect(yScale.max).toEqual(yMax);
    const yRange = interaction.yRange;
    expect(snapEqual(yRange[0], 0.7142857142857143)).toBeTruthy();
    expect(yRange[1]).toBe(1);
  });

  it('pan x axis, and x field is a cat type.', function() {
    chart.clear();
    chart.source(data, {
      x2: {
        range: [ 0, 1 ],
        values: [ '4', '5', '6', '7', '8' ]
      },
      y: null
    });
    chart.line().position('x2*y');
    chart.interaction('pan');
    chart.render();
    const interaction = chart._interactions.pan;
    interaction._doMove(-50, 0);

    const limitRange = interaction.limitRange;

    expect(limitRange).toEqual({
      x2: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20' ]
    });
    const xScale = chart.getXScale();
    expect(xScale.values).toEqual([ '5', '6', '7', '8', '9' ]);

    const xRange = interaction.xRange;
    expect(snapEqual(xRange[0], 0.21052631578947367)).toBeTruthy();
    expect(snapEqual(xRange[1], 0.42105263157894735)).toBeTruthy();
  });

  it('pan x axis, and with ticks', function() {
    chart.clear();
    chart.source(data, {
      x2: {
        range: [ 0, 1 ],
        values: [ '4', '5', '6', '7', '8' ],
        ticks: [ '4', '6', '8' ]
      },
      y: null
    });
    chart.line().position('x2*y');
    chart.interaction('pan');
    chart.render();
    const interaction = chart._interactions.pan;
    interaction._doMove(-50, 0);
    const xScale = chart.getXScale();
    expect(xScale.values).toEqual([ '5', '6', '7', '8', '9' ]);
    expect(xScale.ticks).toEqual([ '4', '6', '8' ]);
  });

  it('pan x axis, and x field is a timeCat type.', function() {
    chart.clear();
    chart.source(data, {
      x3: {
        type: 'timeCat',
        range: [ 0, 1 ],
        mask: 'MM-DD',
        values: dates.slice(8, 15)
      },
      y: null
    });
    chart.line().position('x3*y');
    chart.interaction('pan', {
      speed: 2
    });
    chart.render();

    const interaction = chart._interactions.pan;
    interaction._doMove(-40, 0);

    const limitRange = interaction.limitRange;
    expect(limitRange.x3.length).toBe(20);
    const xScale = chart.getXScale();
    expect(xScale.values.length).toBe(7);
    expect(xScale.ticks.length).toBe(8);

    const xRange = interaction.xRange;
    expect([ xRange[0], xRange[1] ]).toEqual([ 0.47368421052631576, 0.7894736842105263 ]);

  });

  it('pan x axis with speed and step control.', function() {
    chart.clear();
    chart.source(data, {
      x2: {
        range: [ 0, 1 ],
        values: [ '6', '7', '8' ]
      },
      y: null
    });
    chart.line().position('x2*y');
    chart.interaction('pan', {
      speed: 3,
      step: 3
    });
    chart.render();

    const interaction = chart._interactions.pan;
    interaction._doMove(-50, 0);

    const xScale = chart.getXScale();
    expect(xScale.values).toEqual([ '9', '10', '11' ]);

    const xRange = interaction.xRange;
    expect(snapEqual(xRange[0], 0.42105263157894735)).toBeTruthy();
    expect(snapEqual(xRange[1], 0.5263157894736842)).toBeTruthy();
  });

  it('pan x axis with small distance.', function() {
    chart.clear();
    chart.source(data, {
      x2: {
        range: [ 0, 1 ],
        values: [ '6', '7', '8' ]
      },
      y: null
    });
    chart.line().position('x2*y');
    chart.interaction('pan');
    chart.render();

    const interaction = chart._interactions.pan;
    interaction._doMove(2, 0); // 移动像素太小

    const xScale = chart.getXScale();
    expect(xScale.values).toEqual([ '6', '7', '8' ]);

    interaction._doMove(-2, 0); // 移动像素太小
    expect(xScale.values).toEqual([ '6', '7', '8' ]);
  });

  it('with scrollbar', function(done) {
    chart.clear();
    chart.registerPlugins(ScrollBar);
    chart.source(data, {
      x3: {
        type: 'timeCat',
        range: [ 0, 1 ],
        ticks: [ '2018-08-01', '2018-08-05', '2018-08-10', '2018-08-15', '2018-08-20' ],
        values: dates.slice(5, 17)
      },
      y: null
    });
    chart.line().position('x3*y');
    chart.scrollBar({
      mode: 'x'
    });
    chart.interaction('pan');
    chart.render();

    const hBar = chart.get('_horizontalBar');
    const highlightLine = hBar.get('children')[1];

    expect(highlightLine.attr('x1')).toBeCloseTo(119.50947008634868, 2);
    expect(highlightLine.attr('x2')).toBeCloseTo(308.4663150185033, 2);

    setTimeout(() => {
      const interaction = chart._interactions.pan;
      interaction._doMove(120, 0);
      const hBar = chart.get('_horizontalBar');
      const highlightLine = hBar.get('children')[1];
      expect(highlightLine.attr('x1')).toBeCloseTo(50.79789011101974, 2);
      expect(highlightLine.attr('x2')).toBeCloseTo(239.75473504317432, 2);
      chart.destroy();
      document.body.removeChild(canvas);
      done();
    }, 300);
  });
});
