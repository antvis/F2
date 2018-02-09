const F2 = require('../../src/index-simple');
const { Guide } = require('../../src/plugin/');
require('../../src/component/guide/text');

const dom = document.createElement('canvas');
dom.id = 'mountNode';
document.body.appendChild(dom);

describe('debug', () => {
  it('chart.guide().html()', () => {
    const data = [
      { name: '芳华', proportion: 0.4, a: '1' },
      { name: '妖猫传', proportion: 0.2, a: '1' },
      { name: '机器之血', proportion: 0.18, a: '1' },
      { name: '心理罪', proportion: 0.15, a: '1' },
      { name: '寻梦环游记', proportion: 0.05, a: '1' },
      { name: '其他', proportion: 0.02, a: '1' }
    ];
    const chart = new F2.Chart({
      id: 'mountNode',
      width: 500,
      height: 450,
      pixelRatio: window.devicePixelRatio,
      plugins: Guide
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.6
    });
    chart.axis(false);
    chart.interval()
      .position('a*proportion')
      .color('name', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0' ])
      .adjust('stack');
    chart.guide().text({
      position: [ '50%', '50%' ],
      content: '测试测试',
      style: {
        fontSize: 24
      }
    });
    chart.render();
  });
});
