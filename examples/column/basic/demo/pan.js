import F2 from '@antv/f2';

function formatNumber(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

fetch('../data/steps.json')
  .then(res => res.json())
  .then(data => {
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
      id: 'container',
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
    chart.tooltip({
      showItemMarker: false,
      background: {
        radius: 2,
        padding: [ 3, 5 ]
      },
      onShow: function onShow(ev) {
        const items = ev.items;
        items[0].name = '';
        items[0].value = items[0].value + ' 步';
      }
    });
    chart.interval().position('date*steps').style({
      radius: [ 2, 2, 0, 0 ]
    });

    firstDayArr.forEach(function(obj) {
      chart.guide().line({
        top: false,
        start: [ obj.date, 'min' ],
        end: [ obj.date, 'max' ],
        style: {
          lineWidth: 1,
          stroke: '#A4A4A4'
        }
      });
      chart.guide().text({
        position: [ obj.date, 'max' ],
        content: obj.date,
        style: {
          textAlign: 'start',
          fill: '#cacaca',
          textBaseline: 'top'
        },
        offsetX: 5,
        offsetY: 5
      });
    });
    // 定义进度条
    chart.scrollBar({
      mode: 'x',
      xStyle: {
        backgroundColor: '#e8e8e8',
        fillerColor: '#808080',
        offsetY: -2
      }
    });
    chart.interaction('pan');
    chart.render();
  });
