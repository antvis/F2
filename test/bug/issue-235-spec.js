import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/area';
import * as Animation from '../../src/animation/detail';

const canvas = document.createElement('canvas');
canvas.width = 360;
canvas.height = 360;
canvas.id = 'issue235';
document.body.appendChild(canvas);

describe('issue 235', () => {
  it('Smooth area', () => {
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
      id: 'issue235',
      plugins: Animation,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    const geom = chart.area().position('day*value').shape('smooth');
    chart.render();

    const geomContainer = geom.get('container');
    const areaShape = geomContainer.get('children')[0];
    expect(areaShape.attr('points')).to.be.an.instanceof(Array);
    expect(areaShape.attr('points').length).to.equal(14);

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
