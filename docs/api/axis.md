# Axis

坐标轴配置。F2 的坐标轴的组成如下：

<img src="https://gw.alipayobjects.com/zos/rmsportal/YhhBplZmzxzwvUBeEvPE.png" style="width: 500px;">

| 术语 | 英文 |
| -------- | -------- |
| 坐标轴文本     | label  |
| 坐标轴线     | line  |
| 坐标轴刻度线    | tickLine  |
| 坐标轴网格线  | grid  |

## API

### `chart.axis(false)`

不渲染坐标轴。

### `chart.axis(field, false)`

关闭 field 对应的坐标轴。

- `field`: String

代表坐标轴对应的数据字段名。

### `chart.axis(field, config)`

为 field 对应的坐标轴进行配置。

- `field`: String

代表坐标轴对应的数据字段名。

- `config`: Object

坐标轴的配置信息，可对坐标轴的各个组成元素进行配置：

| 属性 | 类型 | 使用说明 |
| -------- | -------- | -------- |
| `line`     |   Object/null   |  坐标轴线的配置信息，设置 null 时不显示，支持所有的 canvas 属性，参考[绘图属性](./canvas.md)  |
| `labelOffset`     |  Number    |   坐标轴文本距离轴线的距离  |
| `grid`     |   Object/Function/null  |  坐标轴网格线的配置项，设置 null 时不显示，支持所有的 canvas 属性，参考[绘图属性](./canvas.md)，支持回调函数，**另外在极坐标下，可以通过配置 `type: 'arc'` 将其绘制为圆弧** |
| `tickLine`     |  Object/null    |  坐标轴刻度线的样式配置，设置 null 不显示，支持所有的 canvas 属性，参考[绘图属性](./canvas.md)   |
| `label`     |   Object/Function/null   |  坐标轴文本配置，设置 null 不显示, 支持所有的 canvas 属性，参考[绘图属性](./canvas.md)，支持回调函数    |
| `position`     | String     | 坐标轴显示位置配置，x 轴默认位于底部 'bottom'，y 轴可设置 position 为 'left'、'right' |
| `top`     | Boolean     | 调整图层层级，true 表示展示在最上层图形，false 表示展示在最下层图形 |


注意：grid 和 label 为回调函数时，返回值必须是对象。

示例：

```js
chart.axis('field', {
  // 设置坐标轴线的样式，如果值为 null，则不显示坐标轴线，图形属性
  line: {
    lineWidth: 1,
    stroke: '#ccc'
  },
  // 坐标轴文本距离轴线的距离
  labelOffset: 20,
  // 坐标点对应的线，null 不显示，图形属性
  tickLine: {
    lineWidth: 1,
    stroke: '#ccc',
    length: 5,// 刻度线长度
  },
  // 0％ 处的栅格线着重显示
  grid: (text, index) => {
    if(text === '0%') {
      return {
        stroke: '#efefef'
      };
    }
    return {
      stroke: '#f7f7f7'
    }
  },
  // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
  label: (text, index, total) => {
    const cfg = {
      textAlign: 'center'
    };
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
