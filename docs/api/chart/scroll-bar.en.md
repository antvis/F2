---
title: ScrollBar
order: 11
---

![](https://gw.alipayobjects.com/zos/rmsportal/eQcMeCRSfQoOTRhBhxVZ.png#width=)

Scroll bar 是一个静态插件，主要用于辅助 pan 和 pinch 交互。

## API

### 如何引入

```javascript
const F2 = require('@antv/f2/lib/index');
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar');

// 注册插件 ScrollBar
F2.Chart.plugins.register(ScrollBar); // 这里进行全局注册，也可以给 chart 的实例注册

// 或者给具体的 chart 实例注册
const chart = new F2.Chart({
  id: 'canvas',
  plugins: ScrollBar
});
```

引入插件之后，就可以调用 `chart.scrollBar()` 方法了。

```javascript
chart.scrollBar({
  // 一些配置项
});
```

### 配置项
| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `mode`  | String | 'x'  | 用于确定进度条的渲染方向，可选值为 'x', 'y', 'xy' |
| `xStyle`  | Object | ```javascript
{
    backgroundColor: 'rgba(202, 215, 239, .2)',
    fillerColor: 'rgba(202, 215, 239, .5)',
    size: 4,
    lineCap: 'round',
    offsetX: 0,
    offsetY: 8
  }
```
 | 用于设置 x 轴方向进度条的样式，其中：<br /><br />- `backgroundColor`：进度条背景色
<br />- `fillColor`: 范围进度条的背景色
<br />- `size`: 进度条线宽
<br />- `lineCap`: line 的图形属性
<br />- `offsetX`: 进度条 x 方向的偏移量
<br />- `offsetY`: 进度条 y 方向的偏移量
<br /> |
| `yStyle` | Obect | ```javascript
{
    backgroundColor: 'rgba(202, 215, 239, .2)',
    fillerColor: 'rgba(202, 215, 239, .5)',
    size: 4,
    lineCap: 'round',
    offsetX: 8,
    offsetY: 0
  }
```

| 用于设置 y 轴方向进度条的样式，其中：<br /><br />- `backgroundColor`：进度条背景色
- `fillColor`: 范围进度条的背景色
- `size`: 进度条线宽
- `lineCap`: line 的图形属性
- `offsetX`: 进度条 x 方向的偏移量
- `offsetY`: 进度条 y 方向的偏移量


## 实例

- [折线图平移](/en/examples/line/basic#pan)



