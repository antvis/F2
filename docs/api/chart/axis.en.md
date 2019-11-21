---
title: Axis
order: 4
---

坐标轴配置。F2 的坐标轴的组成如下：![](https://gw.alipayobjects.com/zos/rmsportal/YhhBplZmzxzwvUBeEvPE.png#width=500)

| **术语** | **英文** |
| --- | --- |
| 坐标轴文本 | label |
| 坐标轴线 | line |
| 坐标轴刻度线 | tickLine |
| 坐标轴网格线 | grid |


## API

### chart.axis(false)

不渲染坐标轴。

### chart.axis(field, false)

关闭 field 对应的坐标轴。

- `field`: String


代表坐标轴对应的数据字段名。

### chart.axis(field, config)

为 field 对应的坐标轴进行配置。

- `field`: String


代表坐标轴对应的数据字段名。

- `config`: Object


坐标轴的配置信息，可对坐标轴的各个组成元素进行配置，`config` 是由以下参数组成的对象：

| **属性** | **类型** | **使用说明** |
| --- | --- | --- |
| `line` | Object/null | 坐标轴线的配置信息，设置 null 时不显示，支持所有的 canvas 属性，参考[绘图属性](https://www.yuque.com/antv/f2/canvas)，**如需调整显示层级，可设置 `top: true` 展示在最上层图形或者 `top: false` 展示在最下层图形**。 |
| `labelOffset` | Number | 坐标轴文本距离轴线的距离 |
| `grid` | Object/Function/null | 坐标轴网格线的配置项，设置 null 时不显示，支持所有的 canvas 属性，参考[绘图属性](https://www.yuque.com/antv/f2/canvas)，支持回调函数，**另外在极坐标下，可以通过配置 `type: 'arc'` 将其绘制为圆弧**；**如需调整显示层级，可设置 `top: true` 展示在最上层图形或者 `top: false` 展示在最下层图形**。 |
| `tickLine` | Object/null | 坐标轴刻度线的样式配置，设置 null 不显示，支持所有的 canvas 属性，参考[绘图属性](https://www.yuque.com/antv/f2/canvas) ，**如需调整显示层级，可设置 `top: true` 展示在最上层图形或者 `top: false` 展示在最下层图形**。 |
| `label` | Object/Function/null | 坐标轴文本配置，设置 null 不显示, 支持所有的 canvas 属性，参考[绘图属性](https://www.yuque.com/antv/f2/canvas)，支持回调函数，**如需调整显示层级，可设置 `top: true` 展示在最上层图形或者 `top: false` 展示在最下层图形**。 |
| `position` | String | 坐标轴显示位置配置，x 轴默认位于底部 'bottom'，y 轴可设置 position 为 'left'、'right' |


**注意：grid 和 label 为回调函数时，返回值必须是对象!**

示例：

```javascript
chart.axis('field', {
  line: {
    lineWidth: 1,
    stroke: '#ccc',
    top: true, // 展示在最上层
  }, // 设置坐标轴线的样式，如果值为 null，则不显示坐标轴线，图形属性
  labelOffset: 20, // 坐标轴文本距离轴线的距离
  tickLine: {
    lineWidth: 1,
    stroke: '#ccc',
    length: 5,// 刻度线长度
  }, // 坐标点对应的线，null 不显示，图形属性
  grid: (text, index, total) => {
    if(text === '0%') { // 0％ 处的栅格线着重显示
      return {
        stroke: '#efefef'
      };
    }
    return {
      stroke: '#f7f7f7'
    }
  },
  label: (text, index, total) => {
    const cfg = {
      textAlign: 'center'
    };
    // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
    if (index === 0) {
      cfg.textAlign = 'start';
    }
    if (index > 0 && index === total - 1) {
      cfg.textAlign = 'end';
    }
    cfg.text = text + '%';  // cfg.text 支持文本格式化处理
    return cfg;
  }
});
```

## DEMO
| 场景描述 | demo |
| --- | --- |
| [label 文本换行](/en/examples/component/axis#break-line) | ![](https://gw.alipayobjects.com/zos/rmsportal/DEwVBFoGLbnMrwHxauyp.png#width=) |
| [label 文本旋转](/en/examples/component/axis#rotate) | ![](https://gw.alipayobjects.com/zos/rmsportal/aZQMEqhJsZrHBPVvfwVu.png#width=) |
| [label 回调](/en/examples/component/axis#label-callback) | ![](https://gw.alipayobjects.com/zos/rmsportal/JNURaLRrBdyAFOgatkwO.png#width=) |
| [grid 样式配置](/en/examples/component/axis#grid) | ![](https://gw.alipayobjects.com/zos/rmsportal/WgyBJAgRVIwsjaIyPhvA.png#width=) |
| [grid 回调](/en/examples/component/axis#grid-callback) | ![](https://gw.alipayobjects.com/zos/rmsportal/dWXDCtnpVQFhvhtgSmWy.png#width=) |
| [弧形网格线](/en/examples/component/axis#circle-grid) | ![](https://gw.alipayobjects.com/zos/rmsportal/CnTYvcQBFcUeWmcKutse.png#width=) |
| [iconfont 文本](/en/examples/component/axis#iconfont) | ![](https://gw.alipayobjects.com/zos/rmsportal/wBAMqyEGjiKXvVfkAzSr.png#width=) |



