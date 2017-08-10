# History

---

## 2.2.22

* 增加 interval dodge 功能
* 修复 数据为空时，列定义设置了 0 时出现的死循环问题
* 修复 interval dodge 后 get snap 的问题

## 2.1.19

* 修复销毁时动画未完成的 bug

## 2.1.18

* 修复 timeCat 类型的 getSnapRecords 方法返回空值的问题

## 2.1.17
* 支持外部传入 context 对象

## 2.1.16
* 支持传入 canvas 对象
* 新增半圆处理

## 2.1.14
* 新增销毁功能
* 性能优化

## 2.1.13
* 支持缓动函数 `easing` 自定义
* 支持传入 `canvas` 对象

## 2.1.12
* 修复平铺动画重复绘制问题
* 修复 `guide` 辅助元素模块引入时自动创建dom的问题

## 2.1.11
* 动画新增参数配置和回调
* 修复极坐标下`getRecord`方法获取数据范围不在0-1内的问题
* 给 `getSnapRecords` 方法新增逼近维度配置

## 2.1.10
* 绘图库绘制文字的方法添加旋转`rotate`功能

## 2.1.9
* 给 guide 的 rect 方法新增圆角配置
* 给 geom 中折线图的虚线 dash 添加全局样式配置

## 2.1.8
* 修复区域图绘制问题

## 2.1.7
* 修复线图和区域图使用时间轴数据超过10条在chrome浏览器排序出错的问题

## 2.1.6
* 修复guide的clear方法没有清空html的dom元素问题

## 2.1.5
* 添加window变量保护

## 2.1.4
* 优化getSnapRecord方法

## 2.1.3

* 添加 `fillOpacity` 和 `strokeOpacity` 两个图形绘图属性；
* geom 对象开放 `getAllShapeData()` 接口，返回 geom 上所有 shape 的绘制数据；
* 修复参与映射的数据属性的数据值全为 undefined 导致栈溢出的问题；
* 添加环形平铺动画方法｀wavec()｀；
* 修复辅助html文本结构混乱问题。

## 2.1.2
* 在数据结构frame中添加源数据，供用户在扩展接口上使用

## 2.1.1
* 优化动画模块
* 给定默认颜色，将color方法变成可选项
* 修复area模块的自定义shape接口

## 2.1.0
* 新增动画功能，支持水平方向的平铺(waveh)、x轴上的缩放(scalex)、y轴上的缩放(scaley)、x和y轴同时缩放(scalexy)
* 修复shape接口
* 给line的shape新增dash方法
* 将getSnapRecords方法在chart中抛出

## 2.0.1
* guide 新增html对齐功能，支持9点对齐方式：tr、tc、tl、br、bc、bl、lc、rc、cc
* geom 添加getSnapRecords方法，提供根据画布坐标获取数据的功能

## 2.0.0
* 集成g2-core，并统一API与G2一致
* guide 拓展
* line
* arc
* text
* html

## 1.0.7

* 修复了环图在UC上的bug
* 新增加 timeCat 类型
* 调整scale tickcount 自动计算向上逼近
* 修复scale linear 的几个bug

## 1.0.4

* scale 增加了offset属性，自动计算时min,max各自浮动 百分比
* 增加了自动计算精度的功能，用户只需要传入单精度的值
* 提供了自定义样式功能，拆分坐标轴的全局配置信息
* 修复点图，边框没有颜色的问题

## 1.0.0

`new` It is the first version of g-mobile.
