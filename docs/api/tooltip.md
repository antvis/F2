# Tooltip

Tooltip 作为 F2 的插件，如要使用，请将其注册如 Chart 类或者 chart 实例。

如果你默认加载的是完整的 F2 代码，那么 Tooltip 已经注册至 Chart 类中，如果您采用动态引用的策略，那么需要先将该组件注册入 Chart 类或者 Chart 实例。

```js
const F2 = require('@antv/f2/lib/core');
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
Chart.plugins.register(Tooltip); // 方式一：全局注册 

// 方式二：具体的 chart 实例注册
const chart = new Chart({
  id: 'canvas',
  plugins: Tooltip
});
```

## API

```js
chart.tooltip(false); // 关闭 tooltip
chart.tooltip({
  offsetX: 0, // x 方向的偏移
  offsetY: 0, // y 方向的偏移
  triggerOn: [ 'touchstart', 'touchmove' ], // tooltip 出现的触发行为，可自定义，用法同 legend 的 triggerOn
  triggerOff: 'touchend', // 消失的触发行为，可自定义
  showTitle: false, // 是否展示标题，默认不展示
  showCrosshairs: false, // 是否显示辅助线，点图、路径图、线图、面积图默认展示
  crosshairsStyle: {
    stroke: 'rgba(0, 0, 0, 0.25)',
    lineWidth: 2
  }, // 配置辅助线的样式
  showTooltipMarker: true, // 是否显示 tooltipMarker
  tooltipMarkerStyle: {
    fill: '#fff' // 设置 tooltipMarker 的样式
  },
  background: {
    radius: 2,
    fill: '#1890FF',
    padding: [ 6, 10 ]
  }, // tooltip 内容框的背景样式
  titleStyle: {
    fontSize: 24,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'top'
  }, // tooltip 标题的文本样式配置，showTitle 为 false 时不生效
  nameStyle: {
    fontSize: 24,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'middle'
  }, // tooltip name 项的文本样式配置
  valueStyle: {
    fontSize: 24,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'middle'
  }, // tooltip value 项的文本样式配置
  showItemMarker: true, // 是否展示每条记录项前面的 marker
  itemMarkerStyle: {
    radius: 7,
    symbol: 'circle',
    lineWidth: 2,
    stroke: '#fff'
  }, // 每条记录项前面的 marker 的样式配置
  custom: {Boolean}, // 是否自定义 tooltip 提示框
  onShow(obj) {
    // obj: { x, y, title, items }
  }, // tooltip 显示时的回调函数
  onHide(obj) {
    // obj: { x, y, title, items }
  }, // tooltip 隐藏时的回调函数
  onChange(obj) {
    // obj: { x, y, title, items }
  } // tooltip 内容发生改变时的回调函数
});
```

## 实例

在移动端，我们经常会将 tooltip 同 legend 一起使用，这个时候我们就可以通过配置 `custom` 属性来实现。

<img src="https://gw.alipayobjects.com/zos/rmsportal/RXIEitSiRAzZUDGsYDxm.gif">

```js
    const data =[
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May.', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May.', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 }
    ];
    const chart = new F2.Chart({
      id: 'mountNode',
      pixelRatio: window.devicePixelRatio,
      width: window.innerWidth,
      height: 260
    });
    chart.source(data);
    chart.tooltip({
      custom(obj) {
        const legend = chart.get('legendController').legends.top[0]; // 获取 legend
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.map(item => {
          map[item.name] = F2.Util.mix({}, item);
        });
        tooltipItems.map(item => {
          const { name, value } = item;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(Object.values(map));
      },
      onHide(tooltip) {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });

    chart.interval().position('月份*月均降雨量')
      .color('name')
      .adjust({
        type: 'dodge',
        marginRatio: 0.05
      });
    chart.render();
```

