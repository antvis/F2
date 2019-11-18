---
title: Tooltip
order: 6
---

Tooltip 作为 F2 的插件，如要使用，请将其注册如 Chart 类或者 chart 实例。

如果你默认加载的是完整的 F2 代码，那么 Tooltip 已经注册至 Chart 类中，如果您采用动态引用的策略，那么需要先将该组件注册入 Chart 类或者 Chart 实例。

```javascript
const F2 = require('@antv/f2/lib/core');
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
F2.Chart.plugins.register(Tooltip); // 方式一：全局注册

// 方式二：具体的 chart 实例注册
const chart = new F2.Chart({
  id: 'canvas',
  plugins: Tooltip
});
```

## API

```javascript
chart.tooltip(false); // 关闭 tooltip
chart.tooltip({
  alwaysShow: false, // 当移出触发区域，是否仍显示提示框内容，默认为 false，移出触发区域 tooltip 消失，设置为 true 可以保证一直显示提示框内容
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
  }, // tooltip 内容发生改变时的回调函数
  crosshairsType: {String}, // 辅助线的种类
  showXTip: {Boolean}, // 是否展示 X 轴的辅助信息
  showYTip: {Boolean}, // 是否展示 Y 轴的辅助信息
  xTip: {Object}/{Function}, // X 轴辅助信息的文本样式
  yTip: {Object}/{Function, // Y 轴辅助信息的文本样式
  xTipBackground: {Object}, // X 轴辅助信息的背景框样式
  yTipBackground: {Object}, // Y 轴辅助信息的背景框样式  
  snap: {Boolean} // 是否将辅助线准确定位至数据点
});
```

**以下为 F2 3.3 版本 Tooltip 新增配置项**：

![](https://cdn.nlark.com/yuque/0/2018/png/98090/1541566891522-57066463-bf66-4b13-9187-56a0680673fb.png#width=375)

| **属性** | **类型** | **默认值** | **说明** |
| --- | --- | --- | --- |
| `crosshairsType`  | String | 'y' | 配置辅助线的类型，可选值为：'x'，'y'，'xy'。 |
| `showXTip`  | Boolean | false | x 轴辅助信息的开关，默认关闭不展示。 |
| `showYTip`  | Boolean | false | y 轴辅助信息的开关，默认关闭不展示。 |
| `xTip`  | Object/Function |  | 配置 x 轴辅助信息的文本样式，可以是回调函数，用于格式化文本。 |
| `yTip`  | Object/Function |  | 配置 y 轴辅助信息的文本样式，可是回调函数，用于格式化文本。 |
| `xTipBackground`  | Object | ```javascript
{
  radius: 1,
  fill: 'rgba(0, 0, 0, 0.65)',
  padding: [ 3, 5 ]
}
```
 | 配置 x 轴辅助信息的背景框样式。 |
| `yTipBackground`  | Object | ```javascript
{
  radius: 1,
  fill: 'rgba(0, 0, 0, 0.65)',
  padding: [ 3, 5 ] 
}
```
 | 配置 y 轴辅助信息的背景框样式。 |
| `snap`  | Boolean | false | 是否将辅助线准确定位至数据点，默认为 false。 |

### xTip, yTip回调函数用法

```javascript
chart.tooltip({
  // 回调函数用法
  // 参数： val，yTip 显示的文本内容
  yTip(val) {
    // 返回值必须是对象
    return {
      val: val.toFixed(2) 
    };
  },
  // 对象用法，直接定义文本的显示样式
  xTip: {
    fontSize: 10, // 字体大小
    fill: '#1890ff' // 字体颜色
  }
});
```


## 示例

在移动端，我们经常会将 tooltip 同 legend 一起使用，这个时候我们就可以通过配置 `custom` 属性来实现。(手机端观看)

![](https://cdn.nlark.com/yuque/0/2018/png/98090/1539849652230-469fa395-6a99-4a41-98a3-3af221bd6d9a.png#width=400)

```javascript
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
      width: 400,
      height: 260
    });
    chart.source(data);
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
      onChange: function(obj) {
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

## DEMO
| 场景描述 | demo |
| --- | --- |
| `snap: true` <br />[辅助线准确定位至数据点](https://antv.alipay.com/zh-cn/f2/3.x/demo/line/basic.html) | ![](https://cdn.nlark.com/yuque/0/2018/gif/98090/1542203051089-4e610efa-c9bf-4d2a-9dff-ac0866e359d4.gif#width=354) |
| [自定义 HTML tooltip](https://antv.alipay.com/zh-cn/f2/3.x/demo/component/tooltip-custom.html) | ![](https://gw.alipayobjects.com/zos/rmsportal/GXqFyFmzhrVvJeWNSHDL.png#width=) |
| [初始化显示 tooltip](https://antv.alipay.com/zh-cn/f2/3.x/demo/component/tooltip-showTooltip.html) | ![](https://gw.alipayobjects.com/zos/rmsportal/xxBHLpazEZJgfEkSrdZj.png#width=) |
| [自定义样式](https://antv.alipay.com/zh-cn/f2/3.x/demo/component/tooltip-style.html) | ![](https://gw.alipayobjects.com/zos/rmsportal/oLwGTmcnQLqzvfigSwoO.png#width=) |
| [带标题的 tooltip](https://antv.alipay.com/zh-cn/f2/3.x/demo/component/tooltip-showTitle.html) | ![](https://gw.alipayobjects.com/zos/rmsportal/AdLPFtRaMxXIATwBAKKx.png#width=) |
| [内容项垂直布局](https://antv.alipay.com/zh-cn/f2/3.x/demo/component/tooltip-layout.html) | ![](https://gw.alipayobjects.com/zos/rmsportal/tKpCnCjXUrfMaYTPLLnO.png#width=) |
| [十字辅助线](https://antv.alipay.com/zh-cn/f2/3.x/demo/k/basic.html) | ![](https://cdn.nlark.com/yuque/0/2018/png/98090/1541567654558-9af9077c-bd98-472b-8cb8-590602bdf5d9.png#width=354) |

