const expect = require('chai').expect;
const { Canvas } = require('../../../src/graphic/index');
const Tooltip = require('../../../src/component/tooltip/index');

const dom = document.createElement('canvas');
dom.id = 'tooltip';
dom.style.margin = '50px';
document.body.appendChild(dom);

const canvas = new Canvas({
  domId: 'tooltip',
  width: 500,
  height: 500
});

const colors = [ '#ff6600', '#b01111', '#ac5724', '#572d8a', '#333333', '#7bab12', '#c25e5e', '#a6c96a', '#133960', '#2586e7' ];

describe('tooltip', function() {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        value: 'value ' + i,
        name: 'name' + i,
        marker: 'circle',
        color: colors[i]
      });
    }
    const tooltip = new Tooltip({
      // items,
      titleGap: 20,
      itemMarginBottom: 8,
      titleStyle: {
        fill: '#f80',
        fontSize: 12,
        lineHeight: 20,
        textAlign: 'start',
        textBaseline: 'top'
      },
      textStyle: {
        fill: 'green',
        fontSize: 12
      },
    });
    tooltip.setContent('test', items);
    const legendContainer = tooltip.container;
    canvas.add(legendContainer);
    canvas.draw();
});
