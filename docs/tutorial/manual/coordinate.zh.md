---
title: 坐标系
order: 6
---

坐标系是将两种位置标度结合在一起组成的 2 维定位系统，描述了数据是如何映射到图形所在的平面。

F2 提供了直角坐标系和极坐标两种类型，目前所有的坐标系均是 2 维的。

## 如何设置坐标系

F2 默认提供的坐标系类型为笛卡尔坐标系，当需要切换坐标系时，可以通过调用下面的语法声明需要使用的坐标系：

```javascript
chart.coord('coordType'); // 声明坐标系类型

chart.coord('coordType', {
  // 配置
}); // 声明坐标系类型的同时，声明配置项
```
| **坐标系类型** | **说明** |
| --- | --- |
| `rect` | 直角坐标系，目前仅支持二维，由 x, y 两个互相垂直的坐标轴构成。 |
| `polar` | 极坐标系，由角度和半径 2 个维度构成。 |


## 坐标系类型及配置

坐标系可以分为笛卡尔坐标系和非笛卡尔坐标系，非笛卡尔坐标系即极坐标，由角度和半径这两个维度来确定位置。

利用极坐标可生成饼图、玫瑰图和雷达图等，较适用于周期性数据的可视化场景，比如时间和方向数据。

坐标系类型的变换会改变几何标记的形状，比如在极坐标系中，矩形将变为圆环的一部分。

例如下图展示的柱状图、层叠柱状图，在不同坐标系下就能变换出各种类型：

|  | 直角坐标系 | 极坐标（未转置） | 极坐标（转置） |
| --- | --- | --- | --- |
| 层叠柱状图 | ![](https://gw.alipayobjects.com/zos/skylark/e3c2af2e-8c42-4743-9eb2-00be4beecb50/2018/png/4b932828-aad3-4934-99be-0580dd6b88ba.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/a0e92822-3020-4f2c-b63b-19e9e7204a86/2018/png/cdb767a2-105d-499d-af09-383323b35222.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/5de8fa15-6ea1-4a13-93c0-e4646ca6601c/2018/png/a43c60de-692f-433a-bab2-93fc6e9bba3b.png#width=) |
| 柱状图 | ![](https://gw.alipayobjects.com/zos/skylark/e392736b-86a1-4452-9265-f7a5e8dc1805/2018/png/47caf538-6703-4db5-ae68-6605837f2803.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/383cdf9f-a631-4fc4-9f6a-593a22822242/2018/png/dd798932-1555-4988-bc68-353835d051b3.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/1a056c5c-13da-46d4-9315-2d589588d889/2018/png/4171f504-2f52-4ed6-ba8f-b7b286650692.png#width=) |


### 坐标系配置

#### 直角坐标系

```javascript
// 声明直角坐标系
chart.coord('rect');
// 直角坐标系转置
chart.coord('rect', {
  transposed: true  // 坐标系进行转置
});
```

#### 极坐标

```javascript
// 声明极坐标
chart.coord('polar');
// 极坐标配置
chart.coord('polar', {
  startAngle: {Number}, // 起始弧度
  endAngle: {Number}, // 结束弧度
  innerRadius: {Number}, // 用于空心部分的半径设置
  radius: {Number}, // 实心圆的半径大小设置
  transposed: true // 极坐标转置
});
```

这里需要说明的是，F2 极坐标默认的起始角度和结束角度如下图所示：

![](https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png#width=)
