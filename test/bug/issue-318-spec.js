const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/interval');
require('../../src/geom/line');
const Animation = require('../../src/animation/detail');

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 260;
canvas.id = 'issue318';
document.body.appendChild(canvas);

describe('Issue 318', () => {
  it('Issue 318', done => {
    const data = [
      { name: 'Jon', score: 282, avgScore: 94, value: 75 },
      { name: 'Aaron', score: 208, avgScore: 41.6, value: 32 }
    ];
    const chart = new F2.Chart({
      id: 'issue318',
      pixelRatio: window.devicePixelRatio,
      padding: [ 'auto', 'auto', 90, 'auto' ],
      plugins: Animation
    });

    chart.source(data, {
      score: {
        tickInterval: 50,
        alias: '个人分数'
      },
      avgScore: {
        ticks: [ 0, 17, 33, 50, 67, 83, 100 ],
        alias: '平均分数'
      },
      value: {
        ticks: [ 0, 17, 33, 50, 67, 83, 100 ],
        alias: '历史分数'
      }
    });
    chart.axis(false);
    chart.interval().position('name*score').color('#0cc');
    chart.line().position('name*value').color('#ffc26a');
    chart.line().position('name*avgScore').color('#ff7f8d');
    chart.render();

    const canvas = chart.get('canvas');
    const caches = canvas.get('caches');
    expect(caches).to.have.all.keys('geom0-interval-Aaron', 'geom0-interval-Jon', 'geom1-line-line', 'geom2-line-line');

    setTimeout(() => {
      const newData = [
        { name: 'Jon', score: 282, avgScore: 94, value: 60 },
        { name: 'Aaron', score: 208, avgScore: 41.6, value: 60 },
        { name: 'Warren', score: 186, avgScore: 46.5, value: 60 },
        { name: 'David', score: 184, avgScore: 30.67, value: 60 },
        { name: 'Joel', score: 177, avgScore: 44.25, value: 60 },
        { name: 'Kyle', score: 150, avgScore: 50, value: 60 },
        { name: 'Jordan', score: 148, avgScore: 24.67, value: 80 },
        { name: 'Jack', score: 138, avgScore: 34.5, value: 60 },
        { name: 'Kuldeep', score: 130, avgScore: 32.5, value: 60 },
        { name: 'Max', score: 128, avgScore: 32, value: 60 },
        { name: 'Angus', score: 127, avgScore: 62.5, value: 60 }
      ];
      chart.changeData(newData);

      const geoms = chart.get('geoms');
      const interval = geoms[0];
      const line1 = geoms[1];
      const line2 = geoms[2];
      expect(interval.get('shapes')[0].attr('fill')).to.equal('#0cc');
      expect(line1.get('shapes')[0].attr('strokeStyle')).to.equal('#ffc26a');
      expect(line2.get('shapes')[0].attr('strokeStyle')).to.equal('#ff7f8d');
      done();
    }, 450);
  });
});
