import F2 from '../../src/index';

const canvas = document.createElement('canvas');
canvas.style.width = '350px';
canvas.style.height = '300px';
document.body.appendChild(canvas);

describe('issue 1004', () => {
  it('双y轴，getPosition', () => {
    const series = [
      { type: 'www', date: '201805', AA: 70294 },
      { type: 'www', date: '201806', AA: 72487 },
      { type: 'www', date: '201807', AA: 73983 },
      { type: 'www', date: '201808', AA: 74169 },
      { type: 'www', date: '201809', AA: 74799 },
      { type: 'www', date: '201810', AA: 72403 },
      { type: 'eee', date: '201805', BB: 47273 },
      { type: 'eee', date: '201806', BB: 48219 },
      { type: 'eee', date: '201807', BB: 48757 },
      { type: 'eee', date: '201808', BB: 49131 },
      { type: 'eee', date: '201809', BB: 48868 },
      { type: 'eee', date: '201810', BB: 47638 }
    ];
    const chart = new F2.Chart({
      el: canvas,
      syncY: true,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(series, {
      AA: {
        type: 'linear',
        ticks: [ 40000, 60000, 80000 ]
      },
      BB: {
        type: 'linear',
        ticks: [ 40000, 60000, 80000 ]
      }
    });
    chart.line().position('date*AA').color('type');
    chart.line().position('date*BB').color('type');

    chart.render();

    // 第一个y轴
    const position = chart.getPosition({ date: '201810', AA: 72403 });
    expect(position.x).toBeCloseTo(278.9166768391927, 1);
    expect(position.y).toBeCloseTo(96.97921249999999, 1);

    // 第二个y轴
    const position1 = chart.getPosition({ date: '201810', BB: 47638 });
    expect(position1.x).toBeCloseTo(278.9166768391927, 1);
    expect(position1.y).toBeCloseTo(227.305025, 1);

    // 包含2部分数据
    const position2 = chart.getPosition({ date: '201810', AA: 72403, BB: 47638 });
    expect(position2.x).toBeCloseTo(278.9166768391927, 1);
    expect(position2.y).toBeCloseTo(96.97921249999999, 1);

    // 没有y轴数据
    const position3 = chart.getPosition({ date: '201810' });
    expect(position3.x).toBeCloseTo(278.9166768391927, 1);
    expect(position3.y).toBeNaN();

    // 空对象
    const position4 = chart.getPosition({ });
    expect(position4.x).toBeNaN();
    expect(position4.y).toBeNaN();
  });
});
