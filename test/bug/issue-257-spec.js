import { expect } from 'chai';
import * as F2 from '../../src/core';
import '../../src/geom/line';

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 260;
canvas.id = 'issue257';
document.body.appendChild(canvas);

describe('issue 257', () => {
  it('Issue257', () => {
    const data = [
      { year: '2013', manage: 100, netAmount: 200, name: '经营活动产生现金流' },
      { year: '2014', manage: 110, netAmount: 150, name: '经营活动产生现金流' },
      { year: '2015', manage: 115, netAmount: 123, name: '经营活动产生现金流' },
      { year: '2016', manage: 230, netAmount: 250, name: '经营活动产生现金流' },
      { year: '2017', manage: 180, netAmount: 280, name: '经营活动产生现金流' },
      { year: '2018', manage: 160, netAmount: 230, name: '经营活动产生现金流' },
      { year: '2013', manage: 200, netAmount: 200, name: '投资活动产生现金流' },
      { year: '2014', manage: 140, netAmount: 150, name: '投资活动产生现金流' },
      { year: '2015', manage: 150, netAmount: 123, name: '投资活动产生现金流' },
      { year: '2016', manage: 230, netAmount: 250, name: '投资活动产生现金流' },
      { year: '2017', manage: 196, netAmount: 280, name: '投资活动产生现金流' },
      { year: '2018', manage: 150, netAmount: 230, name: '投资活动产生现金流' },
      { year: '2013', manage: 200, netAmount: 200, name: '筹资活动产生现金流' },
      { year: '2014', manage: 370, netAmount: 150, name: '筹资活动产生现金流' },
      { year: '2015', manage: 400, netAmount: 123, name: '筹资活动产生现金流' },
      { year: '2016', manage: -450, netAmount: 250, name: '筹资活动产生现金流' },
      { year: '2017', manage: 260, netAmount: 280, name: '筹资活动产生现金流' },
      { year: '2018', manage: 140, netAmount: 230, name: '筹资活动产生现金流' }]
      ;

    const chart = new F2.Chart({
      id: 'issue257',
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data);

    const geom = chart.line().position('year*netAmount');
    chart.render();

    const geomData = geom.get('dataArray')[0];

    expect(geomData.length).to.equal(18);
    geomData.map((obj, index) => {
      if (index < 3) {
        expect(obj._originY).to.equal(200);
      } else if (index < 6) {
        expect(obj._originY).to.equal(150);
      } else if (index < 9) {
        expect(obj._originY).to.equal(123);
      } else if (index < 12) {
        expect(obj._originY).to.equal(250);
      } else if (index < 15) {
        expect(obj._originY).to.equal(280);
      } else {
        expect(obj._originY).to.equal(230);
      }

      return obj;
    });

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
