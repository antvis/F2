import F2 from '../../src/index-all';
import data from '../../examples/data/steps.json';

const canvas = document.createElement('canvas');
canvas.style.width = '370px';
canvas.style.height = '300px';
document.body.appendChild(canvas);

function formatNumber(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

describe('issue 954', () => {
  it('pan移动后，interval不显示', () => {
    const originDates = [];
    const originSteps = [];
    const firstDayArr = [];
    data.forEach(function(obj) {
      if (obj.date >= '2018-05-01') {
        originDates.push(obj.date);
        originSteps.push(obj.steps);
      }

      if (obj.first) {
        firstDayArr.push(obj);
      }
    });

    const chart = new F2.Chart({
      el: canvas,
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      date: {
        type: 'timeCat',
        tickCount: 5,
        values: originDates,
        mask: 'MM-DD'
      },
      steps: {
        tickCount: 5
      }
    });

    chart.axis('date', {
      tickLine: {
        length: 4,
        stroke: '#cacaca'
      },
      label: {
        fill: '#cacaca'
      },
      line: {
        top: true
      }
    });
    chart.axis('steps', {
      position: 'right',
      label: function label(text) {
        return {
          text: formatNumber(text * 1),
          fill: '#cacaca'
        };
      },

      grid: {
        stroke: '#d1d1d1'
      }
    });
    chart.interval().position('date*steps');

    chart.interaction('pan');
    // 定义进度条
    chart.scrollBar({
      mode: 'x',
      xStyle: {
        backgroundColor: '#e8e8e8',
        fillerColor: '#808080',
        offsetY: -2
      }
    });
    chart.render();


    const geom = chart.get('geoms')[0];
    let mappingData = geom.get('dataArray')[0];

    expect(mappingData[mappingData.length - 1].x).toBeCloseTo(310, 0);
    expect(mappingData[mappingData.length - 1].y).toBeCloseTo(196.88828125, 0);

    const interaction = chart._interactions.pan;
    interaction._doMove(80, 1);
    chart.repaint();

    mappingData = geom.get('dataArray')[0];
    expect(mappingData[mappingData.length - 1].x).toBeCloseTo(577, 0);
    expect(mappingData[mappingData.length - 1].y).toBeCloseTo(196.88828125, 0);
  });
});
