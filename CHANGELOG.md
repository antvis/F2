#### 3.0.3 (2018-01-26)

##### Chores

* **dev:**
  * upgrade vulnerable jquery ([d00c2009](https://github.com/antvis/f2/commit/d00c2009efc3bde666cc044a8f78ee35ab6af736))
  * always exports the latest version ([ac768901](https://github.com/antvis/f2/commit/ac768901be268c84b6e511be93b2b19462c3e0ab))
  * standardize npm pkg, provide ES5 version source ([5dc4374e](https://github.com/antvis/f2/commit/5dc4374e2eaafb54cd27f4f4114d955ac1f2511f))

##### New Features

* support setting axis's position. ([2a157f25](https://github.com/antvis/f2/commit/2a157f25dbbfc3f501eed919fb2aef51665e0849))

#### 3.0.2 (2018-01-18)

##### New Features

* add guide-tag ([1e0aba0f](https://github.com/antvis/f2/commit/1e0aba0fc9292eea409f2e5820d4aeb7dc86b81a))
* add startOnZero property for geom. ([2c78f9fc](https://github.com/antvis/f2/commit/2c78f9fc74de2a811cbed44f863d43b6c960c14e))

#### 3.0.1 (2017-12-27)

##### Chores

* **demo:** demo for drawing labels on pie plot, etc. ([232b717f](https://github.com/antvis/f2/commit/232b717fef04616f85a9e83c9ffc92ac4b47ea94))
* **demos:** fix title of demos ([82acc214](https://github.com/antvis/f2/commit/82acc2146774a117cb7b11a56874a1e27b021945))
* remove useless dependencies ([f43b42ce](https://github.com/antvis/f2/commit/f43b42cee178e85215a5df93a5734f4e51f27f51))
* add something for github. ([572204fd](https://github.com/antvis/f2/commit/572204fd30bff6b5025a0d03ca5e1cef19a876c4))
* **contribute:** add contribute.md ([b6b4e3ec](https://github.com/antvis/f2/commit/b6b4e3ec58f64e512205fb3f704af945bc1fc3fe))

##### New Features

* **guide:** support offset setting for Guide.Text. ([c0564ae6](https://github.com/antvis/f2/commit/c0564ae61dc7a7c0666a583172436119d0c746d5))
* support F2.Util. ([b83b5e95](https://github.com/antvis/f2/commit/b83b5e95e6f541707be53fb099c9a34820a77ebf))
* support CanvasRenderingContext2D instance. ([ff2cd37f](https://github.com/antvis/f2/commit/ff2cd37ff3a3f82222f437b3d65577c016d60b12))
* better script ([1d1cc799](https://github.com/antvis/f2/commit/1d1cc799b7b6c2c6d65e82e6c1cea1eb007b7f87))

##### Bug Fixes

* should use canvas dom's width. ([ca6c040a](https://github.com/antvis/f2/commit/ca6c040aa3ffa4c1e136f40338e012e458e853fb))
* dist/f2.js => dist/f2.min.js ([24c5b060](https://github.com/antvis/f2/commit/24c5b060baf543b3cf7669a9c2631ff4fb7afacb))
* **scale:** fixed bug of first record with null ([f94cf376](https://github.com/antvis/f2/commit/f94cf3763f73d253f398183c9608763e18add8d9))
* **chart:** fixed bug of [#15](https://github.com/antvis/f2/pull/15), getSnapRecords of pie ([9b0169b3](https://github.com/antvis/f2/commit/9b0169b3947c41e7478d46a9b1d809c958b8ab30))

#### 3.0.0

跟 g2-mobile 2.x 相比 F2 3.0 的变化：

* 命名空间 GM 改成 F2 ==不兼容==
* animate 接口简化 ==不兼容==
  ```js
   // 2.0
   chart.aniamte().wavec({
    duration: 2000,
    easing: 'elastic',
    success: function() {
      alert('ok');
    } 
   });
   
   // 3.0
   chart.animate({
    type: 'wavec',
    duration: 2000,
    easing: 'elastic',
    success: function() {
      alert('ok');
    } 
   });
  ```
  
* new chart() 时的配置项
  + margin 改成 padding
  为了升级方面，margin 还保留支持
  ```js
  // 2.0
  var chart = new Chart({
    margin: 20
  });
  // 3.0
  var chart = new Chart({
    padding: 20
  });
  ```
  
  + 增加 width, height 属性，可以不在 canvas 上指定宽高
  + 增加 pixelRatio 属性
  
* intevalStack,intervalDodge,areaStack 不再在chart 上支持 ==不兼容==

  F2 3.0 所有的geomety 都支持数据调整
  ```js
    // 2.0
    chart.intervalStack().position('a*b');
  // 3.0
  chart.interval().position().adjust('stack')
  ```
  
* 自定义Shape 的接口，更改了函数名称，但是保留原先函数名的支持
  + registShape 改成  registerShape
  + getShapePoints 改成 getPoints
  + drawShape 改成 draw

  ```js
  // 2.0
  G2.Shape.registShape('interval', 'custom', {
    getShapePoints(cfg) {},
  drawShape(cfg, canvas) {}
  });
  
  G2.Shape.registerShape('interval', 'custom', {
    getPoints(cfg) {},
  draw(cfg, canvas) {}
  });
  ```
  
* 时间分类（timeCat) 类型数据的 mask 改成标准格式 ==不兼容==
    新的 mask 参考[fecha](https://github.com/taylorhakes/fecha)

#### 2.2.0
* 修复数据为空，同时设置列定义里面 min: 0，死循环的问题

#### 2.1.19

* 修复销毁时动画未完成的 bug

#### 2.1.18

* 修复 timeCat 类型的 getSnapRecords 方法返回空值的问题

#### 2.1.17
* 支持外部传入 context 对象

#### 2.1.16
* 支持传入 canvas 对象
* 新增半圆处理

#### 2.1.14
* 新增销毁功能
* 性能优化

#### 2.1.13
* 支持缓动函数 `easing` 自定义
* 支持传入 `canvas` 对象

#### 2.1.12
* 修复平铺动画重复绘制问题
* 修复 `guide` 辅助元素模块引入时自动创建dom的问题

#### 2.1.11
* 动画新增参数配置和回调
* 修复极坐标下`getRecord`方法获取数据范围不在0-1内的问题
* 给 `getSnapRecords` 方法新增逼近维度配置

#### 2.1.10
* 绘图库绘制文字的方法添加旋转`rotate`功能

#### 2.1.9
* 给 guide 的 rect 方法新增圆角配置
* 给 geom 中折线图的虚线 dash 添加全局样式配置

#### 2.1.8
* 给 `axis` 的 `label` 配置项添加定义文本内容功能

#### 2.1.7
* 修复线图和区域图使用时间轴数据超过10条在chrome浏览器排序出错的问题

#### 2.1.6
* 修复guide的clear方法没有清空html的dom元素问题

#### 2.1.5
* 添加window变量保护

#### 2.1.4
* 优化getSnapRecord方法

#### 2.1.3
* 添加 `fillOpacity` 和 `strokeOpacity` 两个图形绘图属性；
* geom 对象开放 `getAllShapeData()` 接口，返回 geom 上所有 shape 的绘制数据；
* 修复参与映射的数据属性的数据值全为 undefined 导致栈溢出的问题;
* 添加环形平铺动画方法`wavec()`;
* 修复辅助html文本结构混乱问题.

#### 2.1.2
* 在数据结构frame中添加源数据，供用户在扩展接口上使用

#### 2.1.1
* 优化动画模块
* 给定默认颜色，将color方法变成可选项
* 修复area模块的自定义shape接口

#### 2.1.0
* 新增动画功能，支持水平方向的平铺(waveh)、x轴上的缩放(scalex)、y轴上的缩放(scaley)、x和y轴同时缩放(scalexy)
* 修复shape接口
* 给line的shape新增dash方法
* 将getSnapRecords方法在chart中抛出

#### 2.0.1
* guide 新增html对齐功能，支持9点对齐方式：tr、tc、tl、br、bc、bl、lc、rc、cc
* geom 添加getSnapRecords方法，提供根据画布坐标获取数据的功能

#### 2.0.0
* 集成g2-core，并统一API与G2一致
* guide 拓展
  * line
  * arc
  * text
  * html

#### 1.0.7
* 修复了环图在UC上的bug
* 新增加 timeCat 类型
* 调整scale tickcount 自动计算向上逼近
* 修复scale linear 的几个bug

#### 1.0.4
* scale 增加了offset属性，自动计算时min,max各自浮动 百分比
* 增加了自动计算精度的功能，用户只需要传入单精度的值
* 提供了自定义样式功能，拆分坐标轴的全局配置信息
* 修复点图，边框没有颜色的问题

#### 1.0.0
`new` It is the first version of g-mobile.
