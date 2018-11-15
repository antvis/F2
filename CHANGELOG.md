#### 3.1.22 (2018-11-15)

##### Bug Fixes

* Enhance the judgment of the browser environment for react native.

#### 3.1.21 (2018-08-21)

##### Bug Fixes

* animate type undefined ([0e2b45f2](https://github.com/antvis/f2/commit/0e2b45f296532e39df74dcc0ad0c96bc99848987))

#### 3.1.20 (2018-08-13)

##### Bug Fixes

* fix the error caused by empty data.Closed [#238](https://github.com/antvis/f2/pull/238). ([09de7614](https://github.com/antvis/f2/commit/09de7614ff239e5717dcdc53a05a4468e13bfb7a))

#### 3.1.19 (2018-08-12)

##### Bug Fixes

* fix the problem that tooltipMarker not show. Closed [#234](https://github.com/antvis/f2/pull/234). ([334eb765](https://github.com/antvis/f2/commit/334eb7659d6ec7d9ec767443ca5b3eb87d363fd3))
* fix smooth area chart's update animation does not work. Closed [#235](https://github.com/antvis/f2/pull/235). ([53124c33](https://github.com/antvis/f2/commit/53124c338adbb1d2bec65e2933c3c756bf847898))

#### 3.1.18 (2018-08-09)

##### Bug Fixes

* when chart.clear() be called, the padding should be recalculated. Closed [#228](https://github.com/antvis/f2/pull/228). ([dd1a0137](https://github.com/antvis/f2/commit/dd1a01375620839b437911a9978e7b1364651e0f))

#### 3.1.17 (2018-08-03)

##### New Features

* support guide animation. ([51fd1dd8](https://github.com/antvis/f2/commit/51fd1dd8ea303a44745bca29151828869dcf838c))

##### Bug Fixes

* fix the error of F2.Global.setTheme(). Closed [#224](https://github.com/antvis/f2/pull/224). ([15547c1a](https://github.com/antvis/f2/commit/15547c1aa698aa7929e5831e18a240fb37d6e6d5))

##### Refactors

* Optimize automatic position adjustment of Guide Tag. Closed [#225](https://github.com/antvis/f2/issues/225). ([2c0c18a2](https://github.com/antvis/f2/commit/2c0c18a22bb52731fd98aeb34d75982d5e6512e7))
* Not support triggerOn callback usage for tooltip and legend any more. ([33624cb1](https://github.com/antvis/f2/commit/33624cb1b9dd9647222306f3da3effe36a9636af))

#### 3.1.16 (2018-07-26)

##### New Features

* appendPadding support Array, just like padding. Closed [#195](https://github.com/antvis/f2/pull/195)。 ([606c996c](https://github.com/antvis/f2/commit/606c996cff6847cf621fa7ab2fbb866b6bc55bd4))

##### Bug Fixes

* Guarantee the accuracy of the trigger point coordinates. Closed [#210](https://github.com/antvis/f2/pull/210) ([db3d25c8](https://github.com/antvis/f2/commit/db3d25c8ffb284a211775c5775bed29a16e3e1e5))
* when set chart.legend(false), chart.getLegendItems() return empty. Closed [#190](https://github.com/antvis/f2/pull/190). ([c75fdb82](https://github.com/antvis/f2/commit/c75fdb82097f9532d7c90d6fdafa89b32edcbaf9))

#### 3.1.15 (2018-07-12)

##### Bug Fixes

* fix the padding value error when chart.changeSize() been called. Closed [#186](https://github.com/antvis/f2/pull/186) ([9edb3a91](https://github.com/antvis/f2/commit/9edb3a91ef45a6d40fdd5274f140945d9290670b))


#### 3.1.14 (2018-07-10)

##### New Features

* add alwaysShow(Boolean) for tooltip, to controller the display of tooltip. Closed [#177](https://github.com/antvis/f2/pull/177) ([4ad4b9fa](https://github.com/antvis/f2/commit/4ad4b9fa0188881524fe4d7d22a7210dd44e542f))

##### Bug Fixes

* fix radar chart drawing path error. Closed [#180](https://github.com/antvis/f2/pull/180) ([257e2030](https://github.com/antvis/f2/commit/257e20302120298744154e28d3442e7ee4ab8160))
* negative data, drawing graphics(bar chart and area chart) beyond the canvas. Closed [#179](https://github.com/antvis/f2/pull/179) ([3767e386](https://github.com/antvis/f2/commit/3767e386854c8904d3c7100b68ab819e423c255d))


#### 3.1.13 (2018-06-28)

##### New Features

* add connectNulls for geometry to connect null points. Closed [#171](https://github.com/antvis/f2/pull/171). ([8729e8ce](https://github.com/antvis/f2/commit/8729e8ce77bc2dc87a222c0f787ec15e4108ae1f))

##### Bug Fixes

* filter null values when draw stacked point chart. Closed [#173](https://github.com/antvis/f2/pull/173). ([662e1632](https://github.com/antvis/f2/commit/662e1632057a245d6cd63fc2f8452299e84461e1))

#### 3.1.12 (2018-06-20)

##### New Features

* add f2 track, [issue #156](https://github.com/antvis/f2/issues/156). ([a301f3ab](https://github.com/antvis/f2/commit/a301f3ab164ee002f5f486a3b1064a605caeb7a4))

##### Bug Fixes

* fix main entry configuration. ([352dcefa](https://github.com/antvis/f2/commit/352dcefabe086a6ec451f08d131401336af79a88))


#### 3.1.10 (2018-06-11)

##### New Features

* add joinString property for legend. ([7bc76763](https://github.com/antvis/f2/commit/7bc76763a95f47363062e56650286af7ef56f3de))
* add unCheckStyle for legend. ([bab731bd](https://github.com/antvis/f2/commit/bab731bd85c826fb475ba69c70670eb625a3c6ae))

##### Bug Fixes

* make sure timeCat scale to sort by default. Closed [#151](https://github.com/antvis/f2/pull/151). ([a9e7fee6](https://github.com/antvis/f2/commit/a9e7fee68e020d07b1eaafa8042c4a28f7408c32))

#### 3.1.9 (2018-06-08)

##### Chores

* update package.json configuration. ([6f3ee61f](https://github.com/antvis/f2/commit/6f3ee61fef0c43c31252e27e74bf2a6fd929288d))

##### Bug Fixes

* when data changed, the padding should be recalculated. ([fe7c2215](https://github.com/antvis/f2/commit/fe7c2215f2bdacf8514b65f4c07f649e061cfdf7))
* fix the error when values are all null in linear scale. ([54787f36](https://github.com/antvis/f2/commit/54787f36779c9cd223d2f1e166c5928744879a71))
* fix the interval y scale unable to set min. ([9c124f9d](https://github.com/antvis/f2/commit/9c124f9d039f270130ef4801949b2b73ea0c7a3f))


#### 3.1.8 (2018-05-25)

##### New Features

*  chart legend support single select mode. ([ebf6db35](https://github.com/antvis/f2/commit/ebf6db35349b22b8b735a6f4f28afd1580ba9074))

##### Bug Fixes

*  prevent same plugins repeat init. ([89874884](https://github.com/antvis/f2/commit/89874884689bf282217349be2060eb1b4ab2c33b))

#### 3.1.7 (2018-05-17)

##### New Features

* add chart.registerPlugins() method. Closed [#116](https://github.com/antvis/f2/pull/116). ([e578106e](https://github.com/antvis/f2/commit/e578106e184767c3acf7e9a2fb642bbbe806e986))

##### Bug Fixes

* when chart is clear, chart.getSnapRecords() should not be affected. ([1dbdd79b](https://github.com/antvis/f2/commit/1dbdd79b4f56a8b60b0466f794fbeb91d89cdd3c))
* fixed stack point chart draw error. Closed [#119](https://github.com/antvis/f2/pull/119) ([d3632781](https://github.com/antvis/f2/commit/d363278194cfcae63aca121bb5a7cb8151fc3b23))

#### 3.1.6 (2018-05-08)

##### Bug Fixes

*  auto padding calculate should consider legend's offsetX and offsetY. ([93f75681](https://github.com/antvis/f2/commit/93f756815561d8246e56d6ac6f6f16e25460befc))
*  getSnapRecords() - pick data more accurate in pie chart. ([d3d6ddc2](https://github.com/antvis/f2/commit/d3d6ddc2ca4a1d8be33dcb453416025f1999e389))
*  the drawing problem when the data of rounded interval shape is zero. ([ee79a36c](https://github.com/antvis/f2/commit/ee79a36cab337780538ee99376359a9a67aad2a5))


#### 3.1.5 (2018-05-04)

##### New Features

* Support for rotation of text shapes. ([8d01b4d6](https://github.com/antvis/f2/commit/8d01b4d6a18f330fb5a4df8a219f37c970cf4658))
* Support polar coordinate grid lines can be drawn as arcs. ([e8178a99](https://github.com/antvis/f2/commit/e8178a99926e20103ed74cd8f2eb2c063869f5ae))

##### Bug Fixes

* Optimize shape's unique id generation strategy. ([09036bad](https://github.com/antvis/f2/commit/09036badea11bbab4d1213c3f45639b91f3e9a44))
* add isCategory property for TimeCat scale. ([6299df3a](https://github.com/antvis/f2/commit/6299df3a8d60fd3117db48d830fe575cafb18441))
* **animate:** fixed issue where geometry animation could not be closed. ([e0c39b2b](https://github.com/antvis/f2/commit/e0c39b2b229d57019c50e79105a12cdf71d61325))
* **theme:** adjust axis-line's display position. ([423b05cc](https://github.com/antvis/f2/commit/423b05ccd7b52fa03e89bad4b519e686b6a9e621))


#### 3.1.4 (2018-05-02)

##### Chores

* **dev:** require on demand: bundler app ([b6fc228c](https://github.com/antvis/f2/commit/b6fc228c0a56b7ed5a88cd629a847c52d34ef264))

##### New Features

* Group support matrix animation ([0789075f](https://github.com/antvis/f2/commit/0789075fdf7994e95f8a4b555ec60945b231b737))
* add chart.animate() method to support more shapes' animation. ([bac28f85](https://github.com/antvis/f2/commit/bac28f85920129723f41f3a71673959322ac05a3))
* add env detect variables, support node-canvas ([fcc792f2](https://github.com/antvis/f2/commit/fcc792f2d59ca2b7092203aa98ad1d9c8e3d9b80))
* gesture-plugin ([4de892c9](https://github.com/antvis/f2/commit/4de892c9b85491877b9bbf0d1ff8d388cdef0f02))
* **animate:**
  * support customize animation for each frame. ([5685e242](https://github.com/antvis/f2/commit/5685e242f91dcf1088e61c094f32361ba06e9d05))
  * `easing` support function ([8fb20b8c](https://github.com/antvis/f2/commit/8fb20b8cffd8ce1d10cdac35be8c6f053ff0c74b))

##### Bug Fixes

* support pixelRatio setting for node-canvas. ([85cb71d0](https://github.com/antvis/f2/commit/85cb71d0e067a82ce2a107964e6e389da1ac13ab))

##### Other Changes

* demo: add rotation interactive of pie chart. ([cfff6817](https://github.com/antvis/f2/commit/cfff6817fc801da53e3cb942f9069e7726c91ec6))


#### 3.1.3 (2018-04-13)

##### New Features

* canvas support [alipay miniprogram](https://open.alipay.com/channel/miniIndex.htm) ([58cc8375](https://github.com/antvis/f2/commit/58cc8375ce7f8f97e23517f6d1085c3fe4ff0c99))
* canvas support [wx miniprogram](https://developers.weixin.qq.com/miniprogram/introduction/index.html?t=1523604294). ([f6c327a4](https://github.com/antvis/f2/commit/f6c327a404621145b81afe9bfbcfecf252fbe190))

##### Bug Fixes

* fix delay causes the chart not be completely drawed. ([c6023c1e](https://github.com/antvis/f2/commit/c6023c1e2fce6c5cc57aa35e5216b3aa41ee83ea))


#### 3.1.2 (2018-04-08)

##### Bug Fixes

* fix bug when get records in polar coordinate. Closed [#83](https://github.com/antvis/f2/pull/83). ([1813bef9](https://github.com/antvis/f2/commit/1813bef968281ed60c34acead9e6cc70ebc60d37))
* adjust the zIndex of axis, guide, tooltip container. ([b1d4e597](https://github.com/antvis/f2/commit/b1d4e5978d4c2a9ad98652db3acbfbb8e5e60240))
* axis label fontFamily ([e6620f16](https://github.com/antvis/f2/commit/e6620f16908d5f58a1ac6c53409887ae867dbc08))

##### Performance Improvements

* stop canvas draw when animation stop. ([adc33eb4](https://github.com/antvis/f2/commit/adc33eb4e145df029fe4231571627d11661fdaf9))


#### 3.1.1 (2018-04-02)

##### New Features

* support chart animation. See [API](https://antvis.github.io/f2/api/animation.html)
* add `chart.changeSize(width, height)` method. ([58c605f6](https://github.com/antvis/f2/commit/58c605f6479826caccd4eb96b2a0ab4bfbd6df45))
* add `chart.guide().tag()`. ([f4c88331](https://github.com/antvis/f2/commit/f4c88331c354acc0a5407c9ad4206baadb1a2d3d))
* support multiple y axis for guide. Closed [#64](https://github.com/antvis/f2/pull/64) ([6463787b](https://github.com/antvis/f2/commit/6463787bc11060f7495534f71be11fea3d7ef7b7))

##### Bug Fixes

* scale formatter not work in tooltip. ([c6aff75b](https://github.com/antvis/f2/commit/c6aff75b12847a24a88b159c44c67fffb4c817f1))
* support area with null data ([b555d7c7](https://github.com/antvis/f2/commit/b555d7c7182db80bc54fb4b01da5fd8b02eb4bd5))
* set min and max for interval is not work. Closed [#57](https://github.com/antvis/f2/pull/57) ([1a3dde5a](https://github.com/antvis/f2/commit/1a3dde5a9f90f0bf44389126d0843e21afa62529))
* 修复 linear scale tickCount 为 1 卡死浏览器的问题 ([86f16009](https://github.com/antvis/f2/commit/86f160093e7d1650956d6c14c592d9576b30450a))
* hidden point draw error. ([78fcd53b](https://github.com/antvis/f2/commit/78fcd53b5036337568af833702fd1d12ecda02f9))
* chart.getSnapRecords() uncorrect in pie chart. Closed [#67](https://github.com/antvis/f2/pull/67) ([53fd40ff](https://github.com/antvis/f2/commit/53fd40ff3ca55cd8cc75af9b63ef1b6a61ab0547))

##### Tests

* Add complete test cases.



#### 3.1.0 (2018-02-09)

##### New Features

* 添加底层绘图引擎，详见 [graphic](./docs/developer/graphic.md)
* 新增插件机制，更好支持图表功能扩展，详见 [plugin](./docs/developer/plugin.md)
* 扩展图表功能组件：[Tooltip](./docs/api/tooltip.md)、[Legend](./docs/api/legend.md)，[扩展 Guide 功能](./docs/api/guide.md)
* 更灵活的模块按需引用，详见[按需引用](./docs/getting-started/require-on-demand.md)
* 全新的图表样式，详见 [demos](https://antvis.github.io/f2/demos/)
* 支持图表布局 padding 的自动计算，详见 [padding](./docs/api/chart.md#padding)
* 添加 [`chart.scale()`](./docs/api/chart.md#scale) 方法，用于列定义
* 扩展 [`adjust()`](./docs/api/geometry.md#adjust) 方法，支持传入对象，dodge 方式支持设置 `marginRatio` 属性用于调整间距
* `chart.coord('polar')` 新增 `radius` 属性，用于调整半径大小，详见 [Coordinate API](./docs/api/coordinate.md#%E6%9E%81%E5%9D%90%E6%A0%87%E7%B3%BB)

##### 不兼容性接口说明

1. `chart.guide()` 各个方法的参数格式同 G2 统一，详见 [Guide API](./docs/api/guide.md)
2. `F2.G`，原先的绘图接口全部废弃，新的 API 参见：[graphic](./docs/developer/graphic.md)



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
