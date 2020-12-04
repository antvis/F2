import F2 from '../../src/index';

const canvas = document.createElement('canvas');
canvas.style.width = '350px';
canvas.style.height = '300px';
document.body.appendChild(canvas);

describe('issue 1102', () => {
  it('repaint shape属性不生效', done => {
    const data = [{
      date: '2017-06-05',
      value: 116
    }, {
      date: '2017-06-06',
      value: 129
    }, {
      date: '2017-06-07',
      value: 135
    }, {
      date: '2017-06-08',
      value: 86
    }, {
      date: '2017-06-09',
      value: 73
    }, {
      date: '2017-06-10',
      value: 85
    }, {
      date: '2017-06-11',
      value: 73
    }, {
      date: '2017-06-12',
      value: 68
    }];

    const chart = new F2.Chart({
      el: canvas,
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      date: {
        type: 'timeCat',
        tickCount: 3
      }
    });
    const line = chart.line().position('date*value');
    chart.render();

    setTimeout(() => {
      line.shape('smooth').color('red');
      chart.repaint();
      setTimeout(() => {
        const container = line.get('container');
        const shape = container.get('children')[0];
        expect(shape._attrs.attrs.strokeStyle).toBe('red');
        done();
      }, 200);
    }, 100);
  });
});
