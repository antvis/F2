const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/line');
require('../../src/geom/interval');
require('../../src/interaction/interval-select');


const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 260;
canvas.id = 'issue355';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('Issue 355', () => {
  it('Issue 355', () => {
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 }
    ];
    const chart = new F2.Chart({
      id: 'issue355',
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });

    chart.line().position('year*sales').color('black');
    chart.interval().position('year*sales');
    chart.render();

    // 配置柱状图点击交互
    chart.interaction('interval-select', {
      mode: 'range',
      defaultSelected: {
        year: '1962 年',
        sales: 38
      }
    });

    const interaction = chart._interactions['interval-select'];
    const { selectedAxisShape, selectedShape } = interaction;

    expect(selectedAxisShape.attr('text')).to.equal('1962 年');
    expect(selectedShape.get('origin')._origin.year).to.equal('1962 年');

    const eventObj = {
      type: 'tap',
      center: {
        x: 179,
        y: 141
      }
    };
    interaction.start(eventObj);
    expect(eventObj.selected).to.be.true;
    expect(eventObj.data).to.eql({ year: '1957 年', sales: 145 });

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
