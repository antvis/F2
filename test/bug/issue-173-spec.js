import { expect } from 'chai';

import * as F2 from '../../src/core';
import '../../src/geom/point';
import '../../src/geom/adjust/stack';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue173';
document.body.appendChild(canvas);

describe('issue 173', () => {
  it('存在空值的层叠点图', function() {
    const data = [
      { country: 'Asia', year: '1750', value: 1502 },
      { country: 'Asia', year: '1800', value: null },
      { country: 'Asia', year: '1850', value: 1809 },
      { country: 'Asia', year: '1900', value: 5268 },
      { country: 'Asia', year: '1950', value: 2400 },
      { country: 'Asia', year: '1999', value: 3634 },
      { country: 'Asia', year: '2050', value: 1947 },
      { country: 'Africa', year: '1750', value: 1106 },
      { country: 'Africa', year: '1800', value: null },
      { country: 'Africa', year: '1850', value: 1011 },
      { country: 'Africa', year: '1900', value: 1266 },
      { country: 'Africa', year: '1950', value: 1221 },
      { country: 'Africa', year: '1999', value: 767 },
      { country: 'Africa', year: '2050', value: 1330 },
      { country: 'Oceania', year: '1750', value: 1200 },
      { country: 'Oceania', year: '1800', value: null },
      { country: 'Oceania', year: '1850', value: 2000 },
      { country: 'Oceania', year: '1900', value: 460 },
      { country: 'Oceania', year: '1950', value: 530 },
      { country: 'Oceania', year: '1999', value: 300 },
      { country: 'Oceania', year: '2050', value: 800 }
    ];
    const chart = new F2.Chart({
      id: 'issue173',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      year: {
        range: [ 0, 1 ]
      }
    });
    const geom = chart.point()
      .position('year*value')
      .color('country')
      .adjust('stack');
    chart.render();

    const container = geom.get('container');
    expect(container.get('children').length).to.equal(18);
  });
});
