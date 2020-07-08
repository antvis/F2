// https://f2.antv.vision/zh/examples/line/dynamic#dynamic

import F2 from '@antv/f2';

// 自定义线图变更动画
F2.Animate.registerAnimation('lineUpdate', function (updateShape, animateCfg) {
  const cacheShape = updateShape.get('cacheShape'); // 该动画 shape 的前一个状态
  const cacheAttrs = cacheShape.attrs; // 上一个 shape 属性
  const oldPoints = cacheAttrs.points; // 上一个状态的关键点
  const newPoints = updateShape.attr('points'); // 当前 shape 的关键点

  const oldLength = oldPoints.length;
  const newLength = newPoints.length;
  const deltaLength = newLength - oldLength;

  const lastPoint = newPoints[newPoints.length - 1];
  for (let i = 0; i < deltaLength; i++) {
    oldPoints.push(lastPoint);
  }

  updateShape.attr(cacheAttrs);
  updateShape.animate().to({
    attrs: {
      points: newPoints,
    },
    duration: 800,
    easing: animateCfg.easing,
  });
});

const data: Array<{
  time: number;
  value: number;
}> = [];
// 添加数据，模拟数据，可以指定当前时间的偏移的秒
function getRecord(offset?: number): typeof data[0] {
  offset = offset || 0;
  return {
    time: new Date().getTime() + offset * 1000,
    value: Math.random() + 10,
  };
}

data.push(getRecord(-2));
data.push(getRecord(-1));
data.push(getRecord());

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

const defs: F2.DataRecordScale<typeof data[0]> = {
  time: {
    type: 'timeCat',
    mask: 'HH:mm:ss',
    range: [0, 1],
  },
  value: {
    tickCount: 5,
    min: 8,
  },
};
chart.source(data, defs);
chart.axis('time', {
  label: function label(text, index, total) {
    const textCfg: F2.AxisLabelParams = {
      text: '',
    };
    if (index === 0) {
      textCfg.textAlign = 'left';
      textCfg.text = String(text);
    } else if (index === total - 1) {
      textCfg.textAlign = 'right';
      textCfg.text = String(text);
    }
    return textCfg;
  },
});

chart
  .line()
  .position(['time', 'value'])
  .animate({
    update: {
      animation: 'lineUpdate',
    },
  });

chart.render();

setInterval(function () {
  data.push(getRecord());
  chart.changeData(data);
}, 1000);
