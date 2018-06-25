const expect = require('chai').expect;
const F2 = require('../../src/core');
const $ = require('jquery');
require('../../src/geom/line');
require('../../src/component/guide/html');
const Guide = require('../../src/plugin/guide');

$(`
  <div style="width: 500px;height: 100%;posion: fixed;top:0;left:0;" id="chartWrapper">
    <h1 style="width: 100%;height: 30px;">The chart title</h1>
    <canvas id="guide-html" style="width: 100%;height: 300px;"></canvas>
  </div>
`).appendTo('body');

describe('The position calculate of Guide.HTML', () => {
  it('should consider the canvas offset', function() {
    const data = [{ day: '周一', value: 300 }, { day: '周二', value: 400 }, { day: '周三', value: 350 }, { day: '周四', value: 500 }, { day: '周五', value: 490 }, { day: '周六', value: 600 }, { day: '周日', value: 900 }];
    const chart = new F2.Chart({
      id: 'guide-html',
      pixelRatio: window.devicePixelRatio,
      plugins: Guide
    });

    chart.source(data, {
      value: {
        tickCount: 5,
        min: 0
      },
      day: {
        range: [ 0, 1 ]
      }
    });

    chart.guide().html({
      position: [ '周三', 350 ],
      html: '<div id="guide" style="width: 30px;height: 30px;line-height: 30px;background-color: #1890ff;color: #fff;border-radius: 50%;font-size: 12px;text-align: center;">350</div>'
    });
    chart.line().position('day*value');
    chart.render();

    const guideEle = $('#guide');
    expect(guideEle.position().top).to.eql(216);
    expect(guideEle.position().left).to.eql(172);
    const wrapper = $('#chartWrapper')[0];
    document.body.removeChild(wrapper);
  });
});
