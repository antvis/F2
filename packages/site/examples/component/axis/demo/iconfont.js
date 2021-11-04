import F2 from '@antv/f2';

import insertCss from 'insert-css';

insertCss(`
  @font-face {
    font-family: 'iconfont';  /* project id 470089 */
    src: url('//at.alicdn.com/t/font_470089_9m0keqj54r.eot');
    src: url('//at.alicdn.com/t/font_470089_9m0keqj54r.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_470089_9m0keqj54r.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_470089_9m0keqj54r.woff') format('woff'),
    url('//at.alicdn.com/t/font_470089_9m0keqj54r.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_470089_9m0keqj54r.svg#iconfont') format('svg');
  }
`);

const iconfontMap = {
  苹果: 'e60d', // unicode
  梨子: 'e60e',
  香蕉: 'e60f',
  葡萄: 'e610',
  西瓜: 'e60c'
};
const data = [{
  fruit: '苹果',
  value: 26
}, {
  fruit: '梨子',
  value: 40
}, {
  fruit: '香蕉',
  value: 30
}, {
  fruit: '葡萄',
  value: 24
}, {
  fruit: '西瓜',
  value: 15
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});

chart.source(data);
chart.legend(false);

// 使用 iconfont 显示 X 轴坐标轴文本
chart.axis('fruit', {
  label: function label(text) {
    return {
      fontSize: 20,
      fontFamily: 'charts-icon',
      text: String.fromCharCode(parseInt(iconfontMap[text], 16))
    };
  }
});

chart.interval().position('fruit*value').color('fruit');
chart.render();
