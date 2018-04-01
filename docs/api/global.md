# Global

Global 是 F2 中的全局配置项，全局配置项包含了以下内容：

* 图表本身的一些默认属性，如边框、屏幕像素比、默认字体等
* 数据图形映射相关的属性，例如默认的颜色、默认的形状、默认的大小，柱状图的默认宽度
* 坐标轴、辅助文本的默认样式


## 属性

### 一些全局的参数

```js
const Global = {
  // 宽度的占比
  widthRatio: { // 宽度所占的分类的比例
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.999999, // 玫瑰图的占的宽度
    multiplePie: 3 / 4, // 多层饼图的宽度
    dodgeMargin: 0 // 分组柱状图的间距
  },
  // 虚线配置
  lineDash: [ 4, 4 ]
};

```

### [皮肤主题相关](#皮肤主题相关)

```js
const color1 = '#E8E8E8'; // 坐标轴线、坐标轴网格线的颜色
const color2 = '#808080'; // 字体颜色
// 坐标轴的默认样式配置
const defaultAxis = {
  label: {
    fill: color2,
    fontSize: 10
  }, // 坐标轴文本的样式
  line: {
    stroke: color1,
    lineWidth: 1,
    top: true
  }, // 坐标轴线的样式
  grid: {
    stroke: color1,
    lineWidth: 1,
    lineDash: [ 2 ]
  }, // 坐标轴网格线的样式
  tickLine: null, // 坐标轴刻度线，默认不展示
  labelOffset: 7.5 // 坐标轴文本距离坐标轴线的距离
};

const Theme = {
  fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif', // 默认字体
  defaultColor: '#1890FF', // 默认颜色
  pixelRatio: 1, // 默认像素比，具体参数由用户自己设置
  padding: 'auto', // 图表边距，默认自动计算
  appendPadding: 15, // 默认留白，15 像素
  colors: [
    '#1890FF',
    '#2FC25B',
    '#FACC14',
    '#223273',
    '#8543E0',
    '#13C2C2',
    '#3436C7',
    '#F04864'
  ], // 默认色系
  shapes: {
    line: [ 'line', 'dash' ],
    point: [ 'circle', 'hollowCircle' ]
  },
  sizes: [ 4, 10 ], // 默认的大小范围
  axis: {
    bottom: Util.mix({}, defaultAxis, {
      grid: null
    }), // 底部坐标轴配置
    left: Util.mix({}, defaultAxis, {
      line: null
    }), // 左侧坐标轴配置
    right: Util.mix({}, defaultAxis, {
      line: null
    }), // 右侧坐标轴配置
    circle: Util.mix({}, defaultAxis, {
      line: null
    }), // 极坐标下的圆弧坐标轴配置
    radius: Util.mix({}, defaultAxis, {
      labelOffset: 4
    }) // 极坐标下的半径坐标轴配置
  }, // 各种坐标轴配置
  shape: {
    line: {
      lineWidth: 2, // 线的默认宽度
      lineJoin: 'round',
      lineCap: 'round'
    }, // 线图样式配置
    point: {
      lineWidth: 0,
      size: 3 // 圆的默认半径
    }, // 点图样式配置
    area: {
      fillOpacity: 0.1
    } // 区域图样式配置
  },
  _defaultAxis: defaultAxis // 用于获取默认的坐标轴配置
};
```

## 方法

`F2.Global` 提供了一个方法：`setTheme(cfg)` 设置主题。

### Global.setTheme

`Global.setTheme(cfg)`

- cfg: Object
  
  用户自定义的主题配置。

常用配置示例

```javascript
F2.Global.setTheme({
  pixelRatio : 2
}); // 设为双精度
```

### 修改全局配置项的方式

可以有两种方式来改变全局的配置项：

*  修改具体的某个配置，直接通过 F2.Global 来修改对应属性的配置信息
*  通过设置皮肤样式，修改一系列的配置项

#### 修改单个配置项

```js
F2.Global.pixelRatio = 2;

F2.Global.colors = [ 'red', 'blue' ];
```

#### 设置皮肤

```js
F2.Global.setTheme({
  colors: [ 'red','blue' ],
  pixelRatio: 2,
  guide: {
    line: {
      stroke: 'red',
      lineWidth: 2
    }
  }
});
```
