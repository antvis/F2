import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/interval';
import * as Legend from '../../src/plugin/legend';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue190';
document.body.appendChild(canvas);

describe('issue 190', () => {
  it('当关闭图例，chart.getLegendItems() 获取不到信息。', done => {
    const data = [
      { country: '中国', cost: 96 },
      { country: '德国', cost: 121 },
      { country: '美国', cost: 100 },
      { country: '日本', cost: 111 },
      { country: '韩国', cost: 102 },
      { country: '法国', cost: 124 },
      { country: '意大利', cost: 123 },
      { country: '荷兰', cost: 111 },
      { country: '比利时', cost: 123 },
      { country: '英国', cost: 109 },
      { country: '加拿大', cost: 115 },
      { country: '俄罗斯', cost: 99 },
      { country: '墨西哥', cost: 91 },
      { country: '印度', cost: 87 },
      { country: '瑞士', cost: 125 },
      { country: '澳大利亚', cost: 130 },
      { country: '西班牙', cost: 109 },
      { country: '巴西', cost: 123 },
      { country: '泰国', cost: 91 },
      { country: '印尼', cost: 83 },
      { country: '波兰', cost: 101 },
      { country: '瑞典', cost: 116 },
      { country: '奥地利', cost: 111 },
      { country: '捷克', cost: 107 }
    ];

    const chart = new F2.Chart({
      el: canvas,
      plugins: Legend,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    // chart.legend(false);
    chart.axis('country', {
      label: {
        rotate: Math.PI / 2,
        textAlign: 'start'
      }
    });

    chart.interval()
      .position('country*cost')
      .color('country')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();

    // 开始自定义图例
    let legendItems = chart.getLegendItems();
    expect(legendItems.country.length).to.equal(24);

    setTimeout(() => {
      chart.changeData(data.slice(0, 15));
      legendItems = chart.getLegendItems();
      expect(legendItems.country.length).to.equal(15);
      done();
    }, 200);
  });
});
