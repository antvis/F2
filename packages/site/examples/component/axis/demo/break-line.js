import F2 from '@antv/f2';

// 格式化数字
function numberToMoney(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const data = [{
  time: 'Jan.\n一月',
  value: 551990
}, {
  time: 'Feb.\n二月',
  value: 513513
}, {
  time: 'Mar.\n三月',
  value: 538780
}, {
  time: 'Apr.\n四月',
  value: 419562
}, {
  time: 'May.\n五月',
  value: 332167
}, {
  time: 'Jun.\n六月',
  value: 297956
}, {
  time: 'Jul.\n七月',
  value: 311760
}, {
  time: 'Aug.\n八月',
  value: 330824
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  value: {
    formatter: function formatter(val) {
      return numberToMoney(val);
    }
  }
});
chart.interval().position('time*value').color('#2FC25B');
chart.render();
