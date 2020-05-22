import { expect } from 'chai';

import * as F2 from '../../src/core';
import '../../src/geom/schema';
const data = require('../fixtures/mobile-k.json');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = '586';
document.body.appendChild(canvas);

describe('issue 586', () => {
  let canvas;
  let chart;
  beforeAll(() => {
    canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'issue550';
    document.body.appendChild(canvas);
  });

  it('issue#586', () => {
    const throwFn = () => {
      try {
        data.sort((obj1, obj2) => {
          return obj1.time > obj2.time ? 1 : -1;
        });
        data.forEach(obj => {
          obj.range = [ obj.start, obj.end, obj.max, obj.min ];
          obj.trend = (obj.start <= obj.end) ? 0 : 1;
        });

        chart = new F2.Chart({
          id: '586',
          width: 400,
          height: 300
        });
        chart.source(data);
        chart.schema().position('time*range')
          .color('trend', trend => [ '#C00000', '#19B24B' ][trend])
          .shape('candle');
        chart.render();
      } catch (err) {
        throw new Error(err);
      }
    };
    expect(throwFn).to.not.throw();

    const legendItems = chart.getLegendItems();
    expect(legendItems).to.be.empty;
  });

  afterAll(() => {
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
