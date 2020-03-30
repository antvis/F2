#### 3.6.3 (2020-03-30)

##### Bug Fixes

*  after changeData, scale incorrect. Closed [#804](https://github.com/antvis/f2/pull/804) ([2dd9c26a](https://github.com/antvis/f2/commit/2dd9c26ac59fe078ba97d5f9ff3d9c1c0c9f42d6))

#### 3.6.2 (2020-03-24)

##### New Features

*  把helper和component透出来 ([3bc0220d](https://github.com/antvis/f2/commit/3bc0220da7d8445cbdaf43c639126e79deba4334))

##### Bug Fixes

*  render 之后再次修改geom的size. Closed [#797](https://github.com/antvis/f2/pull/797) ([a90d9608](https://github.com/antvis/f2/commit/a90d96083c7204483ea25d448f94d715de085ffc))
*  修复官网的链接问题 ([1e8c0bfe](https://github.com/antvis/f2/commit/1e8c0bfec92a979de940900285e4e91aa51d3cf0))

#### 3.6.1 (2020-03-19)

##### Chores

*  调整geom attr的映射代码 ([441e2408](https://github.com/antvis/f2/commit/441e24089845406e48035bc51787e4bcdc4d4f55))
* **deps:**  upgrade eslint 3.19.0 to 6.7.2 ([234edfc1](https://github.com/antvis/f2/commit/234edfc1d23d9d4962f768c68e82070523fb1f89))
* **deps-dev:**  bump open from 0.0.5 to 7.0.0 ([cba92c2a](https://github.com/antvis/f2/commit/cba92c2adb24c1d73f42e5cbd0236bd5406d43f6))

##### New Features

*  pinch 添加range配置 ([9560f70d](https://github.com/antvis/f2/commit/9560f70de8b9c32f99f4274c4dc21d9e09811659))
*  复杂交互支持小程序 ([707f6198](https://github.com/antvis/f2/commit/707f61980dce403967d9fd800a898d7d946d53a6))
*  chart添加事件处理 ([bc9afcda](https://github.com/antvis/f2/commit/bc9afcda4c2a453bf0614d6ccef1bd55f16d2ed6))
*  添加内部的事情处理 ([9209b635](https://github.com/antvis/f2/commit/9209b635011fcc920a5ded7f1f38844c6724c2ba))
*  升级@antv/util ([30babec1](https://github.com/antvis/f2/commit/30babec11ba4169f5c420360dbcb9337ba884414))

##### Bug Fixes

*  添加browser字段。Closed [#789](https://github.com/antvis/f2/pull/789) ([e5a798f1](https://github.com/antvis/f2/commit/e5a798f18d51910f62c61109ec0f1aa09a8d7373))
*  ios spa多次创建导致canvas白屏。Closed [#630](https://github.com/antvis/f2/pull/630) ([ea3f84f4](https://github.com/antvis/f2/commit/ea3f84f4bcddb4d296b4977504121dd0a7cbc838))
*  preventDefault添加空判断 ([ec99ed5a](https://github.com/antvis/f2/commit/ec99ed5ab5dbb916afa887470f17cd1b979a7c41))
*  再初始完成后，需要跟新ticks ([54a11e9d](https://github.com/antvis/f2/commit/54a11e9dab685adf5802decae3a78260dc089ce3))
*  修复ci的报错 ([ce404908](https://github.com/antvis/f2/commit/ce404908f44cd26668fdee9649998a5ba832e9ff))
*  scale锁定0.1.3 ([0fe2de5c](https://github.com/antvis/f2/commit/0fe2de5cdf30fd5ebed9bacc1283714d48fb2d8a))
*  修复touchstart时，会触发pan事件 ([1be26b83](https://github.com/antvis/f2/commit/1be26b834ab28425ebcfa19d6d9157e18c6219d1))
*  缩放后，legend点击会让缩放失效 ([b490bbe0](https://github.com/antvis/f2/commit/b490bbe051316ce7803ea00acd12066bb4107e3b))
*  添加swipe事件 ([eaa89f9c](https://github.com/antvis/f2/commit/eaa89f9c703b59f2888b223275fdae92df464080))
*  修复tag位置为NaN时的绘制问题 ([3aee6443](https://github.com/antvis/f2/commit/3aee644349caf2b30cecf2f90b547fa6ddbe2aee))
*  修复事件删除的bug，并补充单测 ([a7f37899](https://github.com/antvis/f2/commit/a7f3789942c65fa3c6a964990e4dfb92dae05539))
*  修复x, y为0的情况 ([1dcb5f92](https://github.com/antvis/f2/commit/1dcb5f92ce1b9d282842b9b021f118f874c25b41))
*  touchend时，timeount没有清除导致报错 ([1059bdd0](https://github.com/antvis/f2/commit/1059bdd0e526971aa89693d6738a90f436c1b063))
*  优化press事件的处理 ([5b0153dc](https://github.com/antvis/f2/commit/5b0153dcb7ecf0d6234b6af928dcddf606e59d3c))
*  修复tooltip touchend不消失的问题 ([cb834770](https://github.com/antvis/f2/commit/cb834770bcc7c9683e7f6f76e91bfaab6cf33046))
*  未设置geometry时，clear报错 ([065c7ea3](https://github.com/antvis/f2/commit/065c7ea3b77a175ffdc3b582ce9d9490cb57efbb))
*  修复非浏览器环境时，currentStyle报错 ([f90affa3](https://github.com/antvis/f2/commit/f90affa3440e6c18a118400305aa62ae60e66b5e))

##### Refactors

*  tooltip响应事件改成press ([9a1a21a6](https://github.com/antvis/f2/commit/9a1a21a6cea41fb1c5d06e9aae131bba835d3c77))
*  为mapping增加缓存，减少计算耗时 ([f96a452d](https://github.com/antvis/f2/commit/f96a452d52cf8aa86596aedfb74b9e40ac1fa2fc))
*  attr模块迁移内部 ([d13ca752](https://github.com/antvis/f2/commit/d13ca752de9ea6a0a2bba0c99165b44c52fa82f6))
*  调整二次绘制的性能 ([05c6c2c4](https://github.com/antvis/f2/commit/05c6c2c4b1e8617884f4505e18442a78fcabd2fe))

#### 3.5.0 (2020-01-12)

##### Chores

*  npm包添加src源文件 ([16d026c4](https://github.com/antvis/f2/commit/16d026c45461c0d9848199c9beb4db74d2d6f8e2))
* **deps:**  upgrade eslint 3.19.0 to 6.7.2 ([234edfc1](https://github.com/antvis/f2/commit/234edfc1d23d9d4962f768c68e82070523fb1f89))
* **deps-dev:**  bump open from 0.0.5 to 7.0.0 ([cba92c2a](https://github.com/antvis/f2/commit/cba92c2adb24c1d73f42e5cbd0236bd5406d43f6))

##### Documentation Changes

*  添加filter的使用说明 ([79038d47](https://github.com/antvis/f2/commit/79038d47d1c976494d05ac2c1f269ee703e34acf))

##### New Features

*  添加漏斗图 ([47c8a233](https://github.com/antvis/f2/commit/47c8a233d802a7546ffa5af826101a456d470f80))
*  多端多环境的适配与支持 ([458c3fbf](https://github.com/antvis/f2/commit/458c3fbf576b3123a1527adc5f7fbb99a0762c7d))

##### Bug Fixes

*  未设置geometry时，clear报错 ([065c7ea3](https://github.com/antvis/f2/commit/065c7ea3b77a175ffdc3b582ce9d9490cb57efbb))
*  修复非浏览器环境时，currentStyle报错 ([f90affa3](https://github.com/antvis/f2/commit/f90affa3440e6c18a118400305aa62ae60e66b5e))

##### Refactors

*  去掉eventemitter，只要简单的事件处理就可以了 ([b63c63a6](https://github.com/antvis/f2/commit/b63c63a600d900253d6a1ce982a894639770b541))

#### 3.4.4 (2019-12-06)

##### Documentation Changes

*  update links in README ([e6f8bba5](https://github.com/antvis/f2/commit/e6f8bba55e79fff9ad4fa55145e2ebad4e2d0388))
*  fix example throws error ([c2072b91](https://github.com/antvis/f2/commit/c2072b91f69d7e5e17e61f3b9e8593d9276a0b37))

##### New Features

* **GeomBase:**  add ignoreEmptyGroup config to geom base ([bb1b0107](https://github.com/antvis/f2/commit/bb1b010720694220255d322e522b05329ffbe265))

##### Bug Fixes

* 滑动x轴时，cat的ticks会被置成null ([49d4a86b](https://github.com/antvis/f2/commit/49d4a86b1d7f916296b9cb809195fbea55d4b9c4))
* 修复Shape.Text 在设置 rotate 之后 Box 宽高不正确的问题 ([27e3eec](https://github.com/antvis/f2/commit/27e3eecc3c33b646eef5f5f73ad54587410a254f))

#### 3.4.3 (2019-11-20)

##### Bug Fixes

* 修复只有1个点时，tooltip不显示的问题 ([da62475](https://github.com/antvis/f2/commit/da624751e72fb74351f3278444ed5ec5977915cb))
* 修复多类型换图点击选中的问题 ([10c4b04](https://github.com/antvis/f2/commit/10c4b0416ae9f2b18c8aa98e055f0948755adc2b))


#### 3.4.2 (2019-10-15)

##### Chores

*  发布时候babelrc & webpackrc & lintrc都带上了 这会影响工程本身 ([4c6f3b47](https://github.com/antvis/f2/commit/4c6f3b47963638f1cd0e4ab385fd3b790967d874))

##### New Features

*  默认增加guide point插件 ([28d9e0c4](https://github.com/antvis/f2/commit/28d9e0c4778280fc04b037420b51f4231ce5855a))

##### Bug Fixes

*  图例只支持分类数据 ([bfe50422](https://github.com/antvis/f2/commit/bfe5042207c916e17a1143329fd8cd123a077053))
*  修复图例过滤不考虑空数据的问题。 ([78ee9fca](https://github.com/antvis/f2/commit/78ee9fcaf6c2b657a05cbeaa6f696ff9a407f8c1))
*  Guide 的 position 百分比解析需要考虑原始数据中本身包含 '%' 的情况.Closed [#590](https://github.com/antvis/f2/pull/590). ([b299390c](https://github.com/antvis/f2/commit/b299390c45bb1c61ea2bb453b3cd5de8dff18db3))

#### 3.3.8 (2019-04-02)

##### Bug Fixes

* 当只有1个扇形时，角度计算-6.285040585751744e-7和0，相减小于0.0001，也不绘制

#### 3.3.7 (2019-03-15)

##### Bug Fixes

* **bbox.js:**  getBBoxFromArc方法对于整圆的判断错误，导致半圆弧的最小包围盒计算错误 ([8763929f](https://github.com/antvis/f2/commit/8763929f71b6f7620044e2be662fb7fe41da5253))
*  fix the error when pie chart data difference is very large. Closed [#514](https://github.com/antvis/f2/pull/514) ([b3bf2932](https://github.com/antvis/f2/commit/b3bf293253ddcf91ca43de19105a856ea0f123ff))
*  add null value judgment to prevent error. ([c9be938a](https://github.com/antvis/f2/commit/c9be938a864264167c1d2a0a6aeae2beb754d824))

##### Other Changes

*  update @antv/scale version ([b09219ef](https://github.com/antvis/f2/commit/b09219ef066f1df5d5884e33e9d0ca8760288fe5))
*  update @antv/scale version ([002b4b71](https://github.com/antvis/f2/commit/002b4b712799fecf6c29bd3569e6a74037fc82f8))

#### 3.3.5 (2019-02-11)

##### Chores

*  npm publish ignore src folder. Closed [#472](https://github.com/antvis/f2/pull/472) ([7e4a7616](https://github.com/antvis/f2/commit/7e4a7616728497899d662bf9f544db2a42f80aae))

##### New Features

*  add `shadow` graphic property for ant-mini-program. Closed [#486](https://github.com/antvis/f2/pull/486) ([b558eada](https://github.com/antvis/f2/commit/b558eada94993267e6c5c67190f1b93abfcf9152))

##### Bug Fixes

*  legend filter should work during pan or pinch. Closed [#467](https://github.com/antvis/f2/pull/467) ([3be0359f](https://github.com/antvis/f2/commit/3be0359f57fa92745aeb2d20fd24e432cb25e454))
*  should filter the points when calculate the polyline shape's bounding box. Closed [#468](https://github.com/antvis/f2/pull/468) ([00883059](https://github.com/antvis/f2/commit/00883059895ec7246676185ab670eaed167eff36))

##### Other Changes

*  update @antv/adjust version. Related to [#488](https://github.com/antvis/f2/pull/488) ([41a93d8c](https://github.com/antvis/f2/commit/41a93d8cf4eadae11890bdef65b1f2d4686cf7e9))

##### Tests

*  add test case for issue 488, the bug has fixed at https://github.com/antvis/adjust/pull/2, Closed [#488](https://github.com/antvis/f2/pull/488). ([e4381e0a](https://github.com/antvis/f2/commit/e4381e0a553f39d4bc390ebb1dc3edbefdfbc887))

#### 3.3.4 (2018-12-27)

##### Chores

*  close F2.track(). ([ae6331b5](https://github.com/antvis/f2/commit/ae6331b5152bdde3ca763b4886997213e29bce7b))

#### 3.3.3 (2018-12-20)

##### New Features

* **tooltip:**  miniprogram support xTip. ([e9115c38](https://github.com/antvis/f2/commit/e9115c385d09c04b670e9970b496e5f1f58698be))

#### 3.3.2 (2018-12-19)

##### New Features

* add label1offsetY, label2OffsetY to adjust label position for pie-label. ([7cac3ce4](https://github.com/antvis/f2/commit/7cac3ce4f25171de03063012367bfaccad837043))

##### Bug Fixes

* Guide.Point, fix the bug caused by parsePoint() return null. Closed [#458](https://github.com/antvis/f2/pull/458). ([2edbb03f](https://github.com/antvis/f2/commit/2edbb03f243cfaf564f4c9e41e946627070042e7))
* pieLabel getBBox() should compact node and mini program env. Closed [#448](https://github.com/antvis/f2/pull/448). ([29ebd491](https://github.com/antvis/f2/commit/29ebd491746910e692ff4d3d8b00e7ff41d5cb71))
* fix the bug that axis configuration not work when data is empty. Closed [#439](https://github.com/antvis/f2/pull/439). ([594e4f84](https://github.com/antvis/f2/commit/594e4f84344f557814b9c788c65cb7d2b410b81e))
* fix the bug that grid callback return null did not work. Closed [#437](https://github.com/antvis/f2/pull/437) ([717f2bf6](https://github.com/antvis/f2/commit/717f2bf664f02ffc5ef402db12b22412288a086e))
* **syncYScales:** scale should re-calculate the ticks ([ef68c0c8](https://github.com/antvis/f2/commit/ef68c0c84e46ebbd0b919d4db459a14ff5cc9ee7))


#### 3.3.1 (2018-11-30)

##### Bug Fixes

* Arc shape support fill. Closed [#429](https://github.com/antvis/f2/pull/429). ([dc4981fc](https://github.com/antvis/f2/commit/dc4981fced90488ca98108c41e3a39e2463b1813))
* filter grid points which not in the range 0 to 1. ([f25b1300](https://github.com/antvis/f2/commit/f25b13007db21ce91c9692ac630241a27b820747))

#### 3.3.0 (2018-11-20)

##### Chores

* add stock chart demos. ([b2600d6d](https://github.com/antvis/f2/commit/b2600d6d0ff22ed0b7290c47fcf329b99ca04e20))
* add 1d k chart ([442d9088](https://github.com/antvis/f2/commit/442d9088566bd16c0be5e7e8add1f323612e411d))

##### New Features

* support snap property for crosshairs. ([267e59eb](https://github.com/antvis/f2/commit/267e59ebe249ebc38bad2abed0f3e6ca29933d4c))
* Guide component support change visible. ([1ba0db13](https://github.com/antvis/f2/commit/1ba0db13eaea3d24c82cb16646136636e032cfdb))
* PieLabel plugin support active selected shape. ([fc06bca3](https://github.com/antvis/f2/commit/fc06bca3bd07f8ffe32935ab7ec9ad0b64ed9dd8))
* optimize category scale's normalization of non-drawing data. For pan and swipe interaction. ([14556a29](https://github.com/antvis/f2/commit/14556a294b3922c5219b0017a5437898bbd3fa4b))
* tooltip tip content support callback. ([506b1fb2](https://github.com/antvis/f2/commit/506b1fb259a8acaf496995549bf894278e56b60b))
* auto adjust tooltip's tips position. ([5b13ecde](https://github.com/antvis/f2/commit/5b13ecde2a86f23ca820ee65042a8106613a8801))
* support swipe interaction. ([5fb037f9](https://github.com/antvis/f2/commit/5fb037f9d7b8f0c059af10b885184a3363b933c2))
* support speed and step setting for category scale pan interaction.Closed [#357](https://github.com/antvis/f2/pull/357),[#343](https://github.com/antvis/f2/pull/343). ([fbcf0c89](https://github.com/antvis/f2/commit/fbcf0c89f0224e4bc118aed8e6de82664457c7ff))
* add F2.Global.legend.common and F2.Global.axis.common for generic theme configuration. ([becd26c0](https://github.com/antvis/f2/commit/becd26c0917ae4307bf8551fe7a70b320dda8acc))
* add PieLabel plugin for rendering the labels of pie chart. ([6ba1c70e](https://github.com/antvis/f2/commit/6ba1c70e3768fbdb1d28b05e41875104b97e24ef))
* support 'x', 'y', 'xy' three types for tooltip crosshairs, and support xTip and yTip display for tooltip. Closed [#369](https://github.com/antvis/f2/pull/369). ([7fad5c78](https://github.com/antvis/f2/commit/7fad5c78eeeb782a498668cae56af82bfa24de30))

##### Bug Fixes

* fix the gradient color bug. Closed [#389](https://github.com/antvis/f2/pull/389). ([5cf6e442](https://github.com/antvis/f2/commit/5cf6e44248507e18b4f4ac5fbdee33fe3407a9f9))
* fix pinch errors of category scale. Closed [#342](https://github.com/antvis/f2/pull/342). ([d41802f2](https://github.com/antvis/f2/commit/d41802f294a01c70af5f8b178c1c8362add395d9))


#### 3.2.4 (2018-10-25)

##### Bug Fixes

* fix angle calculation problem with linear gradient. ([4adbb845](https://github.com/antvis/f2/commit/4adbb8450235764e2bc9bff42eb1a90b299dd5fd))
* fix the draw error caused by smooth area animation. Closed [#373](https://github.com/antvis/f2/pull/373). ([407fdf5c](https://github.com/antvis/f2/commit/407fdf5cb56646b0a8ea175e2a61a946c29bdcb1))
* fix the draw error of polyline which has empty points but still fill the area. Closed [#363](https://github.com/antvis/f2/pull/363). ([2c336837](https://github.com/antvis/f2/commit/2c336837b59ad4140a32b80c8401f7a4e9fbbc77))
* let 'interval-select' interaction work for mixed charts. Closed [#355](https://github.com/antvis/f2/pull/355). ([b80aa3ff](https://github.com/antvis/f2/commit/b80aa3ff31d157346bf98783c9bbd99b169ccaef))

#### 3.2.3 (2018-09-27)

##### Chores

* upgrade @antv/util to 1.2.5 ([ff8eb0f7](https://github.com/antvis/f2/commit/ff8eb0f7036c216e5259cba7f6b3ec5d4e97526f))

##### Bug Fixes

* fix the error when draw Guide.regionFilter for area chart. Closed [#345](https://github.com/antvis/f2/pull/345). ([3900565d](https://github.com/antvis/f2/commit/3900565d132eebb43e36822e9d067a0656ae7e3c))
* add some padding in the vertical direction of chart clip area. Closed [#336](https://github.com/antvis/f2/pull/336). ([ab485d15](https://github.com/antvis/f2/commit/ab485d1555448f95f469f0cc52cfe5086ec4c890))
* fix the error that when the grid is a function and specify the type as 'arc'. Closed [#331](https://github.com/antvis/f2/pull/331). ([b27a0727](https://github.com/antvis/f2/commit/b27a0727d109c109532a226a04d28c84d2ea7b7b))
* when the points is empty, return. Closed [#316](https://github.com/antvis/f2/pull/316). ([82d5c2c7](https://github.com/antvis/f2/commit/82d5c2c768c80d7356fe72b7408713eb5992e453))
* fix the bug when customizing the legend, the function type marker not work. Closed [#317](https://github.com/antvis/f2/pull/317). ([d631466c](https://github.com/antvis/f2/commit/d631466c9d9dc2a3679164348ded1717a3b48077))
* Optimized geometry shape's id generation strategy. Closed [#318](https://github.com/antvis/f2/pull/318). ([ea7adc9d](https://github.com/antvis/f2/commit/ea7adc9df8a3943f235e970e66c98f6580186dc7))

#### 3.2.2 (2018-09-06)

##### Chores

* upgrade babel7. ([ee2087e2](https://github.com/antvis/f2/commit/ee2087e23ef61293395048306d9db1b6a2205e26))

##### Bug Fixes

* Guide.point, the render method should return the point shape. ([e83a3a1c](https://github.com/antvis/f2/commit/e83a3a1cc7f4a16cf83d371818d07235e6ede061))
* attrs should be deep clone. Closed [#288](https://github.com/antvis/f2/pull/288). ([2e4a90b9](https://github.com/antvis/f2/commit/2e4a90b9d16224d217a8f1b6c935c4847e9c5599))
* when Text shape's text attribute is updated, the textArr attribute should be reset. Closed [#302](https://github.com/antvis/f2/pull/302). ([1625a22e](https://github.com/antvis/f2/commit/1625a22e52e529d3c5bf2c45b620c95d139fd160))
* if text shape's x or y is NaN, there will be a drawing error in webchart mini program. Related to https://github.com/antvis/wx-f2/issues/81. ([4f0ca529](https://github.com/antvis/f2/commit/4f0ca529731476d9618c32bc911f1b6e7c17a873))
* if there is a point with NaN value in the Polyline's points, there will be a drawing error in webchart mini program. ([d5b39bef](https://github.com/antvis/f2/commit/d5b39bef589197544a4df29a81581610d50af562))
* when text shape's content is 0, ensure it will be rendered. Closed [#282](https://github.com/antvis/f2/pull/282). ([b35dedf2](https://github.com/antvis/f2/commit/b35dedf2512b86f4332df3440b6a9151cb2693dd))

##### Other Changes

* add Node.js 10 ([c6adb987](https://github.com/antvis/f2/commit/c6adb9871debcc81e36e9513aab65f6b8a3f770b))


#### 3.2.1 (2018-08-24)

##### New Features

* support set gradient color in default. Closed [#243](https://github.com/antvis/f2/pull/243). ([20b18a90](https://github.com/antvis/f2/commit/20b18a90c42b75eb98b60c1fa31d72db20152ffc))
* support `syncY` property to unify multiple Y-axis data ranges. Related to [#258](https://github.com/antvis/f2/pull/258). ([854685e8](https://github.com/antvis/f2/commit/854685e829b160583cf62ede0a9faf621a572e75))
* support set default selected shape for pie-select and interval-select interaction. Related to [#248](https://github.com/antvis/f2/pull/248). ([55364d59](https://github.com/antvis/f2/commit/55364d598065fbc414e6c4c39bb9d6e56bda1214))

##### Bug Fixes

* when geom clear, the `_width` should be reset. Closed [#273](https://github.com/antvis/f2/pull/273). ([a36aa67f](https://github.com/antvis/f2/commit/a36aa67f7c5a36be81fdbcc1d38dd305973c596a))
* when chart update, tooltip's `_lastActive` should be reset. Closed [#271](https://github.com/antvis/f2/pull/271). ([297ae475](https://github.com/antvis/f2/commit/297ae47518ecb73807aa51c1683a5a1bd02f8390))
* define calculateBBox method for smooth area shape for getBBox(). ([ebf8539d](https://github.com/antvis/f2/commit/ebf8539d73a62f4ed720a11feda50410a3d10ca1))
* Fix sorting problem for categorical data. Closed [#257](https://github.com/antvis/f2/pull/257). ([3a129289](https://github.com/antvis/f2/commit/3a129289515fff4a04e84823a517e38b2f103356))

#### 3.2.0 (2018-08-16)

##### New Features

* add interactions for chart, includes: 'pie-select', 'interval-select', 'pan' and 'pinch'.
* add chart.guide().regionFilter({}).
* add chart.guide().point({}).
* add scrollBar plugin for pan and pinch interaction. ([08b18c38](https://github.com/antvis/f2/commit/08b18c388242bb19fa38831942c1c8a8aa86834a))
* add guide.repaint() method. ([e626def6](https://github.com/antvis/f2/commit/e626def63607f86b2ef2cfb6ebd12defa1f7a570))
* Guide component add `limitInPlot` property to limit guide draw in chart plot area. Closed [#203](https://github.com/antvis/f2/pull/203) ([05bf832c](https://github.com/antvis/f2/commit/05bf832c195338973bc76104dfe7480708f42ed5))
* add show() and hide() methods for `Geometry` instance. ([652ce741](https://github.com/antvis/f2/commit/652ce741d44087bec8a00de79608ec2913ed34b8))
* add `limitInPlot` property for chart, to limit the drawing area of geometrys. ([74e53218](https://github.com/antvis/f2/commit/74e53218e9bc970feeab5e79ffb62310c31444cf))
* the drawing order of geoms can be decided by scale values. ([1f2993e6](https://github.com/antvis/f2/commit/1f2993e6ba818d795108522b56f9d5949a8b7d2c))

##### Bug Fixes

* Fix problem with element zIndex in tooltip. Closed [#216](https://github.com/antvis/f2/pull/216) ([2b83bb83](https://github.com/antvis/f2/commit/2b83bb83ab881b9ab073998e59355309126f00c6))
* fix axis label animation. ([8b1f7b19](https://github.com/antvis/f2/commit/8b1f7b19d19c3a62af7d7033f7d0fc4154251429))
* when x scale is category, do not need to sort data. Closed [#202](https://github.com/antvis/f2/pull/202). ([184f3937](https://github.com/antvis/f2/commit/184f3937822f7b05ac689ec44e634a10d1c2105e))
* The position of the canvas in the parent container needs to be considered when calculating the Guide.Html position. ([512e025d](https://github.com/antvis/f2/commit/512e025d6d60a4e9837722b6585b7ac296a73a9e))
* timeCat type scale setting values caused an error in chart drawing. ([d1391bd3](https://github.com/antvis/f2/commit/d1391bd33440e5d817e984a333da268bba8e6a27))

##### Chores

* remove index-common and update index. ([38e89096](https://github.com/antvis/f2/commit/38e89096c8a7e96e086d62efdf8bf43d27812ff5))
* configuration update. ([45333936](https://github.com/antvis/f2/commit/453339369509c439ad024dba18670e61af0b260f))
* handle the compatibility of Element.prototype.remove(). ([97215b9a](https://github.com/antvis/f2/commit/97215b9ad0c9ea2cf723f3b00a63e5f9fe457b6d))
* require from lib folder. ([b06507b1](https://github.com/antvis/f2/commit/b06507b1d75d77c73814e3ce8fd649214e564de9))
* use public package `@antv/scale` and `@antv/adjust`. ([84e9a90f](https://github.com/antvis/f2/commit/84e9a90f8614967abab393ac287af9142eea8ce2))
* use public module `@antv/attr`. ([357679bc](https://github.com/antvis/f2/commit/357679bc298f998d20ef0bfda3250dbc868a64a8))
* use @antv/util as utility methods. ([c619b66b](https://github.com/antvis/f2/commit/c619b66b1dffef5cea94cb1bbd7f3eb4d36192fa))

##### Other Changes

* optimize the process of data. ([6f00f7ec](https://github.com/antvis/f2/commit/6f00f7ecb7e820420502bd7f157a5a09c0f8adb0))
* add 16ms delay for canvas draw. ([012c9fcc](https://github.com/antvis/f2/commit/012c9fcc51a0fae11eca797741e941df31aed89d))


##### Tests

* add test cases for all of the interactions. ([77ffa62c](https://github.com/antvis/f2/commit/77ffa62c27e2287931479a8d6ac10744aaf17c8c))
* add test case for scrollBar plugin. ([b8ac2974](https://github.com/antvis/f2/commit/b8ac29745e735c145e063a435a42ecf2ea967019))


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
