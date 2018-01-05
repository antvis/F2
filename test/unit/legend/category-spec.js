const expect = require('chai').expect;
// const Util = require('../../../../src/util');
const { Canvas } = require('../../../src/graphic/index');
const Legend = require('../../../src/component/legend/category');

const dom = document.createElement('canvas');
dom.id = 'legend';
dom.style.margin = '50px';
document.body.appendChild(dom);

const canvas = new Canvas({
  domId: 'legend',
  width: 500,
  height: 500
});

const symbols = [ 'circle', 'diamond', 'square', 'triangle', 'triangle-down' ];
const colors = [ '#ff6600', '#b01111', '#ac5724', '#572d8a', '#333333', '#7bab12', '#c25e5e', '#a6c96a', '#133960', '#2586e7' ];

describe('分类图例', function() {
  it('垂直布局图例', function() {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        value: 'test ' + i,
        marker: {
          symbol: symbols[i],
          radius: 5,
          fill: colors[i]
        },
        checked: i === 2// 选中状态
      });
    }
    const legend = new Legend({
      items,
      titleGap: 20,
      itemMarginBottom: 8,
      title: {
        fill: '#f80',
        fontSize: 12,
        lineHeight: 20,
        textAlign: 'start',
        textBaseline: 'top',
        text: '垂直图例'
      },
      textStyle: {
        fill: 'green'
      },
      layout: 'vertical'
    });
    const legendContainer = legend.container;
    const itemsGroup = legend.itemsGroup;
    const titleShape = legend.titleShape;
    legendContainer.transform([
      [ 't', 100, 50 ]
    ]);
    canvas.add(legendContainer);
    expect(legendContainer.get('children').length).to.equal(2);
    expect(itemsGroup.get('children').length).to.equal(5);
    expect(titleShape).not.to.be.undefined;
    canvas.draw();
  });

  it('水平布局图例', function() {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        value: 'test ' + i,
        marker: {
          symbol: symbols[i],
          radius: 5,
          fill: colors[i]
        },
        checked: true
      });
    }

    const legend = new Legend({
      items,
      // allowAllCanceled: true,
      itemGap: 15,
      layout: 'horizontal',
      title: {
        fill: '#f80',
        fontSize: 14,
        textAlign: 'start',
        textBaseline: 'middle',
        text: '水平图例'
      },
      unCheckColor: '#ccc',
      textStyle: {
        fill: '#000'
      }
    });
    const legendContainer = legend.container;
    const itemsGroup = legend.itemsGroup;
    const titleShape = legend.titleShape;
    legendContainer.transform([
      [ 't', 0, 10 ]
    ]);
    canvas.add(legendContainer);
    canvas.draw();
    expect(legendContainer.get('children').length).to.equal(2);
    expect(itemsGroup.get('children').length).to.equal(5);
    expect(titleShape).not.to.be.undefined;
  });

  it('水平布局，但是总长度超出了容器宽度，自动换行', function() {
    canvas.clear();
    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        value: 'test ' + i,
        attrValue: colors[i % 10],
        marker: {
          symbol: 'circle',
          radius: 5,
          fill: colors[i % 10]
        },
        checked: !(i >= 20)
      });
    }

    const legend = new Legend({
      items,
      // allowAllCanceled: true,
      titleGap: 20,
      itemGap: 10,
      itemMarginBottom: 5,
      title: {
        fill: '#f80',
        fontSize: 16,
        textAlign: 'start',
        textBaseline: 'top',
        text: 'Legend-title'
      },
      maxLength: 400,
      layout: 'horizontal'
    });

    const legendContainer = legend.container;
    const itemsGroup = legend.itemsGroup;
    const titleShape = legend.titleShape;
    canvas.add(legendContainer);
    canvas.draw();
    const legendBBox = legendContainer.getBBox();
    expect(legendBBox.width).to.be.below(400);
    expect(itemsGroup.get('children').length).to.equal(25);
  });

  it('水平布局，但是总长度超出了容器宽度，自动换行，且每行列对齐', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        value: 'test ' + i,
        attrValue: colors[i % 10],
        marker: {
          symbol: 'triangle',
          radius: 5,
          fill: colors[i % 10]
        },
        checked: true
      });
    }

    const legend = new Legend({
      items,
      allowAllCanceled: true,
      itemGap: 10,
      maxLength: 500,
      itemMarginBottom: 5,
      itemWidth: 60,
      layout: 'horizontal'
    });
    const legendContainer = legend.container;
    const itemsGroup = legend.itemsGroup;
    const titleShape = legend.titleShape;
    canvas.add(legendContainer);
    canvas.draw();
    const legendBBox = legendContainer.getBBox();
    expect(legendBBox.width).to.be.equal(481);
    expect(itemsGroup.get('children').length).to.equal(25);
  });

  it('垂直布局图例，超出容器高度，自动生列', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 25; i++) {
      items.push({
        value: 'test ' + i,
        attrValue: colors[i % 10],
        marker: {
          symbol: 'square',
          radius: 5,
          fill: colors[i % 10]
        },
        checked: true
      });
    }

    const legend = new Legend({
      items,
      allowAllCanceled: true,
      itemGap: 10, // 水平距离
      itemMarginBottom: 20, // 垂直距离
      layout: 'vertical',
      titleGap: 20,
      maxLength: 200
    });
    const legendContainer = legend.container;
    const itemsGroup = legend.itemsGroup;
    const titleShape = legend.titleShape;
    canvas.add(legendContainer);
    canvas.draw();
    legendContainer.moveTo(0, 20);
    canvas.draw();
    const legendBBox = legendContainer.getBBox();
    expect(legendBBox.height).to.be.below(200);
  });

  it('垂直布局图例，设置了 itemWidth, 超出容器高度，自动生列', function() {
    canvas.clear();

    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        value: i + '',
        attrValue: colors[ i % 10 ],
        marker: {
          symbol: 'diamond',
          radius: 5,
          fill: colors[ i % 10 ]
        },
        checked: true
      });
    }

    const legend = new Legend({
      items,
      allowAllCanceled: true,
      itemGap: 30, // 水平距离
      itemMarginBottom: 20, // 垂直距离
      layout: 'vertical',
      titleGap: 20,
      itemWidth: 30,
      maxLength: 100,
      title: {
        text: '我是一个帅气的标题啊'
      }
    });

    const legendContainer = legend.container;
    const itemsGroup = legend.itemsGroup;
    const titleShape = legend.titleShape;
    canvas.add(legendContainer);
    canvas.draw();
    const legendBBox = legendContainer.getBBox();
    expect(legendBBox.height).to.be.below(100);
    // expect(legendBBox.width).to.equal(192.34765625);
  });
});
