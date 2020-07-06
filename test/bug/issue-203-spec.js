import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/line';
import '../../src/component/guide/text'; // 加载 guide 组件
import * as Guide from '../../src/plugin/guide';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue203';
document.body.appendChild(canvas);

describe('issue 203', () => {
  it('set guide limit in plot', () => {
    const data = [
      { day: '周一', value: 300 },
      { day: '周二', value: 400 },
      { day: '周三', value: 350 },
      { day: '周四', value: 500 },
      { day: '周五', value: 490 },
      { day: '周六', value: 600 },
      { day: '周日', value: 900 }
    ];
    const chart = new F2.Chart({
      id: 'issue203',
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
    chart.guide().text({
      position: [ -0.4, 300 ],
      content: '旋转跳跃',
      top: false,
      limitInPlot: true
    });
    chart.line().position('day*value');
    chart.render();

    const guideController = chart.get('guideController');
    expect(guideController.backPlot.get('children').length).to.equal(0);
  });
});
