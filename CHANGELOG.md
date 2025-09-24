# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.12.0](https://github.com/antvis/f2/compare/v5.11.0...v5.12.0) (2025-09-24)


### Bug Fixes

* 修复pieLabel自定义records匹配逻辑问题 ([#2121](https://github.com/antvis/f2/issues/2121)) ([fff6401](https://github.com/antvis/f2/commit/fff64012bab0b89c64b94694dc2cd0c3a5f034e5))
* 针对没有找到最佳步长的情况，首尾展示轴文本 ([#2117](https://github.com/antvis/f2/issues/2117)) ([2619cf0](https://github.com/antvis/f2/commit/2619cf054fb5883df37f9e6b79084b1f1ff13cca))


### Features

* autoHide策略调整 ([#2119](https://github.com/antvis/f2/issues/2119)) ([d60aa3f](https://github.com/antvis/f2/commit/d60aa3fe3a3401c3e60e03050c72083c2c3ae097))
* pielabel支持展示指定records ([#2116](https://github.com/antvis/f2/issues/2116)) ([1d380dc](https://github.com/antvis/f2/commit/1d380dc80130c3130a3adc6db44589ea19f92a59))





# [5.11.0](https://github.com/antvis/f2/compare/v5.10.0...v5.11.0) (2025-08-22)


### Bug Fixes

* auto-rotate当label为function失效 ([#2099](https://github.com/antvis/f2/issues/2099)) ([546b359](https://github.com/antvis/f2/commit/546b359f6e57c948c61011e3eeec8ba705f466e7))
* axis旋转情况布局计算 ([#2098](https://github.com/antvis/f2/issues/2098)) ([a4752a6](https://github.com/antvis/f2/commit/a4752a6b5c5fe3237c0540610e32c9f3029c9daf))
* 修复autohide检测遮挡不准确 ([#2105](https://github.com/antvis/f2/issues/2105)) ([f42573a](https://github.com/antvis/f2/commit/f42573a3831d220d2439c1cb300645d3b5759f31))
* 修复角度计算 ([#2100](https://github.com/antvis/f2/issues/2100)) ([4693818](https://github.com/antvis/f2/commit/4693818bb9faad92ab5a4a44c583d2d905f16d97))
* 增加初次检测是否重叠 ([#2103](https://github.com/antvis/f2/issues/2103)) ([e48e5ae](https://github.com/antvis/f2/commit/e48e5aef5cc257635059d2b3bd7a67666299dde0))


### Features

* 增加labelAuto功能 ([#2097](https://github.com/antvis/f2/issues/2097)) ([daddc7f](https://github.com/antvis/f2/commit/daddc7fda88687cab35a6d0c86d0257b854243f8))
* 增加检测是否重叠安全距离属性 ([#2106](https://github.com/antvis/f2/issues/2106)) ([6b4cd71](https://github.com/antvis/f2/commit/6b4cd717fc43cb8557a341dcf118ce7b6ca0410e))





# [5.10.0](https://github.com/antvis/f2/compare/v5.9.0...v5.10.0) (2025-07-21)


### Bug Fixes

* 饼图点击 ([#2079](https://github.com/antvis/f2/issues/2079)) ([d8d9f6a](https://github.com/antvis/f2/commit/d8d9f6a7c5cff36f846363a3620f7d5781a834a3))


### Features

* magnifier支持多条折线情况 ([#2087](https://github.com/antvis/f2/issues/2087)) ([e8c2ee7](https://github.com/antvis/f2/commit/e8c2ee7798166bea2a8f7f06e7662c10af4f8553))
* magnifier组件增加offsetX和offsetY属性 ([#2088](https://github.com/antvis/f2/issues/2088)) ([05b53e2](https://github.com/antvis/f2/commit/05b53e227752401f493eb48dbef562b3c10aaddc))
* 增加magnifier组件 ([#2075](https://github.com/antvis/f2/issues/2075)) ([d1ca559](https://github.com/antvis/f2/commit/d1ca559284377f8618f77acc9eb8c6b6180f3ec7))





# [5.9.0](https://github.com/antvis/f2/compare/v5.8.1...v5.9.0) (2025-06-30)


### Bug Fixes

* height计算 ([#2076](https://github.com/antvis/f2/issues/2076)) ([004d347](https://github.com/antvis/f2/commit/004d347306146fe53a7c77d00216553b65fa57f6))
* ts error ([#2078](https://github.com/antvis/f2/issues/2078)) ([682b942](https://github.com/antvis/f2/commit/682b94227c16babb9a2d351c36d2eb1a3edb8038))
* 修复高度计算逻辑 ([#2074](https://github.com/antvis/f2/issues/2074)) ([502a9b8](https://github.com/antvis/f2/commit/502a9b8088199365094083409953ae5d3b5ea169))


### Features

* 优化饼图显示 ([#2071](https://github.com/antvis/f2/issues/2071)) ([1fa7bc0](https://github.com/antvis/f2/commit/1fa7bc032f75f82f982b33f01c2aa87f55d2c597))
* 增加showAnchor字段 ([#2072](https://github.com/antvis/f2/issues/2072)) ([a7714a0](https://github.com/antvis/f2/commit/a7714a0e4c2b9a09d02836959258c0fee8f7795d))





## [5.8.1](https://github.com/antvis/f2/compare/v5.8.0...v5.8.1) (2025-06-09)


### Bug Fixes

* 渲染多次case ([#2057](https://github.com/antvis/f2/issues/2057)) ([ed18036](https://github.com/antvis/f2/commit/ed18036253282bce0c2cae11d12cc84bf4e9adf1))





# [5.8.0](https://github.com/antvis/f2/compare/v5.7.5...v5.8.0) (2025-04-23)


### Features

* Guide定位支持分组/堆叠等情况 ([#2041](https://github.com/antvis/f2/issues/2041)) ([e974041](https://github.com/antvis/f2/commit/e974041ffc134e0ea0f5f1f1f9834ec4091d4307))
* 官网增加link入口 ([#2039](https://github.com/antvis/f2/issues/2039)) ([f0ada6c](https://github.com/antvis/f2/commit/f0ada6cc273e939760d5361f1c15d73ea25c5203))





## [5.7.5](https://github.com/antvis/f2/compare/v5.7.4...v5.7.5) (2025-01-02)


### Bug Fixes

* EndView动画使用offsetDistance对不齐 ([#2029](https://github.com/antvis/f2/issues/2029)) ([f62abe3](https://github.com/antvis/f2/commit/f62abe3909676248c1928354b0690f90a4f7f97e))





## [5.7.4](https://github.com/antvis/f2/compare/v5.7.3...v5.7.4) (2024-11-25)


### Bug Fixes

* 自定义marker ([#2021](https://github.com/antvis/f2/issues/2021)) ([a91f1b1](https://github.com/antvis/f2/commit/a91f1b18a29d6154eb0fcae7af0997e12dd7bfea))





## [5.7.3](https://github.com/antvis/f2/compare/v5.7.0...v5.7.3) (2024-10-16)


### Bug Fixes

* version --yes ([77c184f](https://github.com/antvis/f2/commit/77c184f7af9706918faadb465284fcb23b104ac3))
* 调整获取版本时机 ([#2009](https://github.com/antvis/f2/issues/2009)) ([f74c17b](https://github.com/antvis/f2/commit/f74c17b362a79e4871f2ef6bfd2f586ee8427eae))





## [5.7.2](https://github.com/antvis/f2/compare/v5.7.0...v5.7.2) (2024-10-15)


### Bug Fixes

* 调整获取版本时机 ([#2009](https://github.com/antvis/f2/issues/2009)) ([f74c17b](https://github.com/antvis/f2/commit/f74c17b362a79e4871f2ef6bfd2f586ee8427eae))
* version --yes ([77c184f](https://github.com/antvis/f2/commit/77c184f7af9706918faadb465284fcb23b104ac3))





## [5.7.1](https://github.com/antvis/f2/compare/v5.7.0...v5.7.1) (2024-10-15)


### Bug Fixes

* 调整获取版本时机 ([#2009](https://github.com/antvis/f2/issues/2009)) ([f74c17b](https://github.com/antvis/f2/commit/f74c17b362a79e4871f2ef6bfd2f586ee8427eae))
* version --yes ([77c184f](https://github.com/antvis/f2/commit/77c184f7af9706918faadb465284fcb23b104ac3))





# [5.7.0](https://github.com/antvis/f2/compare/v5.6.0...v5.7.0) (2024-10-09)


### Bug Fixes

* sample func ([#2004](https://github.com/antvis/f2/issues/2004)) ([41045d2](https://github.com/antvis/f2/commit/41045d2412b4639c8ec5186c9ce5361b080ed944))
* 修复 Tooltip itemMarkerStyle 样式优先级 ([#2002](https://github.com/antvis/f2/issues/2002)) ([ee4f100](https://github.com/antvis/f2/commit/ee4f1003a9d36ae41eaa147e33db08cde032d888))


### Features

* 增加onRangeChange回调函数 ([#2005](https://github.com/antvis/f2/issues/2005)) ([97ba27b](https://github.com/antvis/f2/commit/97ba27b697bd0128ca8bf8e0312ee646352ce178))





# [5.6.0](https://github.com/antvis/f2/compare/v5.5.2...v5.6.0) (2024-09-19)


### Bug Fixes

* 修改注入版本插件 ([#1999](https://github.com/antvis/f2/issues/1999)) ([0d9fe7d](https://github.com/antvis/f2/commit/0d9fe7d813c286d6d37fad5407546677cf8fadb6))
* 升级action-artifact ([#1997](https://github.com/antvis/f2/issues/1997)) ([73c4ff6](https://github.com/antvis/f2/commit/73c4ff6e8812937e9271e34cb3c2f031d955c934))


### Features

* export version ([#1996](https://github.com/antvis/f2/issues/1996)) ([787abb2](https://github.com/antvis/f2/commit/787abb2898cd6f19bcbfef089e7fc7497195990f))
* 增加阶梯图 ([#1998](https://github.com/antvis/f2/issues/1998)) ([e0ccc98](https://github.com/antvis/f2/commit/e0ccc98950985196d406141cc51bfbb5e8168a37))





## [5.5.2](https://github.com/antvis/f2/compare/v5.5.1...v5.5.2) (2024-07-10)

**Note:** Version bump only for package f2





## [5.5.1](https://github.com/antvis/f2/compare/v5.5.0...v5.5.1) (2024-06-14)


### Bug Fixes

* stack scale ([#1978](https://github.com/antvis/f2/issues/1978)) ([441795b](https://github.com/antvis/f2/commit/441795bd06ed3a54550d4263d59b884e30596297))





# [5.5.0](https://github.com/antvis/f2/compare/v5.4.5...v5.5.0) (2024-05-30)


### Bug Fixes

* algorithm package.json ([#1963](https://github.com/antvis/f2/issues/1963)) ([d715549](https://github.com/antvis/f2/commit/d7155498e986aaa966629ed9caf566b7f68c16e4))
* size支持px ([#1975](https://github.com/antvis/f2/issues/1975)) ([6973421](https://github.com/antvis/f2/commit/697342122bb9dfd301cb45afa21c32a98c9c5817))


### Features

*   增加Pictorial组件 ([#1974](https://github.com/antvis/f2/issues/1974)) ([24f5944](https://github.com/antvis/f2/commit/24f59447282d4895a3553a12daca8df879b94e11))
* **guide:** 增加 PolylineGuide ([#1960](https://github.com/antvis/f2/issues/1960)) ([6680534](https://github.com/antvis/f2/commit/66805340d9bbf36b11f03c31733f5bc5191f3eb4))
* image、tag、rect guide 补充字段 ([#1962](https://github.com/antvis/f2/issues/1962)) ([ad38d32](https://github.com/antvis/f2/commit/ad38d32042ea8eb06742e32e1a596733e2178239))





## [5.4.5](https://github.com/antvis/f2/compare/v5.4.4...v5.4.5) (2024-03-28)


### Bug Fixes

* tooltip tips 透出 record 参数 ([#1947](https://github.com/antvis/f2/issues/1947)) ([177fdc6](https://github.com/antvis/f2/commit/177fdc684a1c8f7b731fb1f449b1ee8902861806))





## [5.4.4](https://github.com/antvis/f2/compare/v5.4.3...v5.4.4) (2024-03-22)


### Bug Fixes

* guide超出范围不显示 ([#1944](https://github.com/antvis/f2/issues/1944)) ([b2bee66](https://github.com/antvis/f2/commit/b2bee665bf222b7e9673acd62809cd2869626749))





## [5.4.3](https://github.com/antvis/f2/compare/v5.4.2...v5.4.3) (2024-03-21)


### Bug Fixes

* guide 超出范围不显示 ([#1941](https://github.com/antvis/f2/issues/1941)) ([2ffcc5d](https://github.com/antvis/f2/commit/2ffcc5d59c51a3898f9f407a2903ef6a6cf996f3))





## [5.4.2](https://github.com/antvis/f2/compare/v5.4.1...v5.4.2) (2024-03-11)


### Bug Fixes

* player guide visible ([#1936](https://github.com/antvis/f2/issues/1936)) ([a9c767b](https://github.com/antvis/f2/commit/a9c767b0ab8768a2fdf4fa0415a5808b9a60f50e))





## [5.4.1](https://github.com/antvis/f2/compare/v5.4.0...v5.4.1) (2024-03-06)


### Bug Fixes

* 优化 withGuide ts 定义 ([#1934](https://github.com/antvis/f2/issues/1934)) ([524b506](https://github.com/antvis/f2/commit/524b506a882140ce4221099db625ed5c458e01f9)), closes [#1890](https://github.com/antvis/f2/issues/1890) [#1890](https://github.com/antvis/f2/issues/1890)





# [5.4.0](https://github.com/antvis/f2/compare/v5.3.0...v5.4.0) (2024-02-26)


### Features

* selection 增加 onChange ([#1931](https://github.com/antvis/f2/issues/1931)) ([ca9bd0b](https://github.com/antvis/f2/commit/ca9bd0bc5f42df11c44a39bc472d838fd52d6f93))





# [5.3.0](https://github.com/antvis/f2/compare/v5.2.2...v5.3.0) (2024-02-21)


### Bug Fixes

* transposed为false时饼图交互 ([#1923](https://github.com/antvis/f2/issues/1923)) ([dbfb0ed](https://github.com/antvis/f2/commit/dbfb0ed72563d5575046ba878f785b8c14d782b4))


### Features

* scroll bar 样式支持可配置 ([#1900](https://github.com/antvis/f2/issues/1900)) ([2e84a26](https://github.com/antvis/f2/commit/2e84a266bbb333fccc44ee1704066a723547c5bd))





## [5.2.2](https://github.com/antvis/f2/compare/v5.2.1...v5.2.2) (2024-01-05)


### Bug Fixes

* 蜡烛图切换销毁scrollbar时移除对应事件 ([#1920](https://github.com/antvis/f2/issues/1920)) ([0a6e7e1](https://github.com/antvis/f2/commit/0a6e7e1f9ff75e0fbcbf628ae13402ab50730d04))





## [5.2.1](https://github.com/antvis/f2/compare/v5.2.0...v5.2.1) (2024-01-03)


### Bug Fixes

* **Axis:** 坐标轴文本超界自动对齐 ([#1918](https://github.com/antvis/f2/issues/1918)) ([7bb11e3](https://github.com/antvis/f2/commit/7bb11e335660072730cf6a2d62b97f74afd98028))
* **candlestick:** 蜡烛图开盘价收盘价一致时，颜色用上个交易日的比较 ([#1917](https://github.com/antvis/f2/issues/1917)) ([2446f22](https://github.com/antvis/f2/commit/2446f2280181353ed56bd9fc8e79b6a1d1460a8a))
* 快扫动画进行中时，修改数据，图表显示异常 ([#1916](https://github.com/antvis/f2/issues/1916)) ([095ce5f](https://github.com/antvis/f2/commit/095ce5fff5e16a3bcc9045dee3d4b94b4920e443))





# [5.2.0](https://github.com/antvis/f2/compare/v5.1.0...v5.2.0) (2024-01-02)


### Bug Fixes

* legend resize ([#1912](https://github.com/antvis/f2/issues/1912)) ([8d57a2c](https://github.com/antvis/f2/commit/8d57a2ce8fb3ad67a9f6b5934021585d8ec6a85c))


### Features

* tooltip自动换行 ([#1911](https://github.com/antvis/f2/issues/1911)) ([2aaa51f](https://github.com/antvis/f2/commit/2aaa51f69594a79738806b0d2534abad327e935f))





# [5.1.0](https://github.com/antvis/f2/compare/v5.0.39...v5.1.0) (2023-12-28)


### Bug Fixes

* 修复 ci 报错 ([#1899](https://github.com/antvis/f2/issues/1899)) ([5f017cd](https://github.com/antvis/f2/commit/5f017cd5cc29894a5bd10ed6cc250cd0ab6888b1))


### Features

* 坐标轴支持自定义宽高 ([#1906](https://github.com/antvis/f2/issues/1906)) ([d20ca53](https://github.com/antvis/f2/commit/d20ca5329465a6f33db200864b46a8f739ccbe01))





## [5.0.39](https://github.com/antvis/f2/compare/v5.0.38...v5.0.39) (2023-11-27)


### Bug Fixes

* dodge 平移 scale 不更新 ([#1897](https://github.com/antvis/f2/issues/1897)) ([49b3a72](https://github.com/antvis/f2/commit/49b3a72bb163da59072bf8d99cf44853021839c3))





## [5.0.38](https://github.com/antvis/f2/compare/v5.0.37...v5.0.38) (2023-11-26)


### Bug Fixes

* 修复 dodge 平移显示问题 ([#1895](https://github.com/antvis/f2/issues/1895)) ([07ea4fe](https://github.com/antvis/f2/commit/07ea4fe2bb53f76cdea2db6bc7908f6a6c491f2e))





## [5.0.37](https://github.com/antvis/f2/compare/v5.0.36...v5.0.37) (2023-11-24)


### Bug Fixes

* 修复 tickLine 位置不更新 ([#1893](https://github.com/antvis/f2/issues/1893)) ([d14d0bf](https://github.com/antvis/f2/commit/d14d0bf670982403779015aa80103171d0dfec52))





## [5.0.36](https://github.com/antvis/f2/compare/v5.0.35...v5.0.36) (2023-11-23)


### Bug Fixes

* swipe 支撑单向快扫 ([#1891](https://github.com/antvis/f2/issues/1891)) ([95a2c50](https://github.com/antvis/f2/commit/95a2c50d6d5097e6d458f8b225fd4596aaac5480))





## [5.0.35](https://github.com/antvis/f2/compare/v5.0.34...v5.0.35) (2023-11-22)


### Bug Fixes

* 临时修复 dodge 的平移问题 ([#1888](https://github.com/antvis/f2/issues/1888)) ([0a5dd90](https://github.com/antvis/f2/commit/0a5dd9050ef106b1ec218b5cd9285d551d6a6998))





## [5.0.34](https://github.com/antvis/f2/compare/v5.0.33...v5.0.34) (2023-11-02)


### Bug Fixes

* data数量小于rate ([#1880](https://github.com/antvis/f2/issues/1880)) ([64de0a7](https://github.com/antvis/f2/commit/64de0a7c2ba4a616f1cb14d82719bdadef282dae))
* **geometry:** 修复 record 存在 NaN 时，sort 顺序不对 ([#1878](https://github.com/antvis/f2/issues/1878)) ([7b03b0c](https://github.com/antvis/f2/commit/7b03b0c8108d7e3c4a9dc3194d4f97c83975d3ac))





## [5.0.33](https://github.com/antvis/f2/compare/v5.0.32...v5.0.33) (2023-10-24)


### Bug Fixes

* **Area:** 修复面积图 x 为空时，图形不绘制 Closed [#1867](https://github.com/antvis/f2/issues/1867) ([#1868](https://github.com/antvis/f2/issues/1868)) ([5b8da58](https://github.com/antvis/f2/commit/5b8da58f416942b2c7d5e4032958ccb7cc7efa69))
* pielabel event callback ([#1857](https://github.com/antvis/f2/issues/1857)) ([4b22fe5](https://github.com/antvis/f2/commit/4b22fe5cb6250a63dfd741edd6c8f369d4b01f6b))
* 修复chart未清除缓存的组件的问题 ([#1856](https://github.com/antvis/f2/issues/1856)) ([9216d2b](https://github.com/antvis/f2/commit/9216d2b5900c49a0645a8bab097e8fc9ffa3f824))





## 5.0.32 (2023-09-07)

**Note:** Version bump only for package f2





## [5.0.31](https://github.com/antvis/f2/compare/v5.0.30...v5.0.31) (2023-09-05)


### Bug Fixes

* package name ([#1840](https://github.com/antvis/f2/issues/1840)) ([7d4f5d0](https://github.com/antvis/f2/commit/7d4f5d0d34bf251952bc86aa93fc183e6ba6f543))
* 修复 smooth 时，line 和 area 线条不一致。Closed: [#1835](https://github.com/antvis/f2/issues/1835) ([#1836](https://github.com/antvis/f2/issues/1836)) ([2b39b0c](https://github.com/antvis/f2/commit/2b39b0c3c31d9e34c8baefbe69e322a443a608bf))





## 5.0.30 (2023-08-28)

**Note:** Version bump only for package f2





## 5.0.29 (2023-07-21)

**Note:** Version bump only for package f2





## 5.0.28 (2023-07-18)


### Bug Fixes

*  fix axis style && tooltip ([#1513](https://github.com/antvis/f2/issues/1513)) ([42458a7](https://github.com/antvis/f2/commit/42458a704f9801730bc764f953e4c083d9795588))
*  对叠图最大值有问题，当adjust={{type: 'stack'}}时 & 修复官网条形图&进度条报错 ([#1558](https://github.com/antvis/f2/issues/1558)) ([ac696b1](https://github.com/antvis/f2/commit/ac696b1baba15d6e27c566a8d1a61883781005b7))
*  把 rect 的 util 方法移动到 src/graphic/util 下 ([d5dd608](https://github.com/antvis/f2/commit/d5dd60839a2535051e70e2358463ab543ab9bb50))
* [@jsx](https://github.com/jsx)ImportSource 模式不报错 ([#1409](https://github.com/antvis/f2/issues/1409)) ([393d8f1](https://github.com/antvis/f2/commit/393d8f143f78be66e15bbee86e39e3d94ce2258c))
* add isCategory property for TimeCat scale. ([6299df3](https://github.com/antvis/f2/commit/6299df3a8d60fd3117db48d830fe575cafb18441))
* add null value judgment to prevent error. ([c9be938](https://github.com/antvis/f2/commit/c9be938a864264167c1d2a0a6aeae2beb754d824))
* add player test & fix click test ([#1746](https://github.com/antvis/f2/issues/1746)) ([96a59d7](https://github.com/antvis/f2/commit/96a59d7da4b316e9ac2623bf036b49729319a658))
* add some padding in the vertical direction of chart clip area. Closed [#336](https://github.com/antvis/f2/issues/336). ([ab485d1](https://github.com/antvis/f2/commit/ab485d1555448f95f469f0cc52cfe5086ec4c890))
* add time-cat export ([a66b1eb](https://github.com/antvis/f2/commit/a66b1eb32740a695d750fd5533383d0f8d8585fc))
* add 时 children 有可能为空 ([#1568](https://github.com/antvis/f2/issues/1568)) ([df2dbd0](https://github.com/antvis/f2/commit/df2dbd0e30e37441452112db79e17c98f62397c5))
* adjust scale range ([#1317](https://github.com/antvis/f2/issues/1317)) ([bc04790](https://github.com/antvis/f2/commit/bc04790d05f7021a2677e8b7a47d25c4b85d17f1))
* adjust the zIndex of axis, guide, tooltip container. ([9d0dbe6](https://github.com/antvis/f2/commit/9d0dbe61507a92a1f8a275487a5dfab214dd4347))
* after changeData, scale incorrect. Closed [#804](https://github.com/antvis/f2/issues/804) ([2dd9c26](https://github.com/antvis/f2/commit/2dd9c26ac59fe078ba97d5f9ff3d9c1c0c9f42d6))
* **animate:** fixed issue where geometry animation could not be closed. ([e0c39b2](https://github.com/antvis/f2/commit/e0c39b2b229d57019c50e79105a12cdf71d61325))
* animation clip 支持 function 创建 ([#1514](https://github.com/antvis/f2/issues/1514)) ([98410c8](https://github.com/antvis/f2/commit/98410c83d4810da203b435fb92e9d0f875f46da4))
* Arc shape support fill. Closed [#429](https://github.com/antvis/f2/issues/429). ([dc4981f](https://github.com/antvis/f2/commit/dc4981fced90488ca98108c41e3a39e2463b1813))
* **arc.js:** do not draw when startAngle equal endAngle ([a6b2aad](https://github.com/antvis/f2/commit/a6b2aad0771b7434eb7c2053ab67cf00798f655b))
* area point 没透传 animation ([#1365](https://github.com/antvis/f2/issues/1365)) ([8af4614](https://github.com/antvis/f2/commit/8af461412307c12eff9f9f7648531221a625248d))
* attr 实例化时不判断数据相关的特征 ([#1243](https://github.com/antvis/f2/issues/1243)) ([d94db4f](https://github.com/antvis/f2/commit/d94db4f12715c53e0152d40764ef4eef58def457))
* attrs should be deep clone. Closed [#288](https://github.com/antvis/f2/issues/288). ([2e4a90b](https://github.com/antvis/f2/commit/2e4a90b9d16224d217a8f1b6c935c4847e9c5599))
* attr映射逻辑优化 ([#1261](https://github.com/antvis/f2/issues/1261)) ([7662cc7](https://github.com/antvis/f2/commit/7662cc7d49ad405e427c8d248a6d2fdba9965f13))
* auto padding calculate should consider legend's offsetX and offsetY. ([93f7568](https://github.com/antvis/f2/commit/93f756815561d8246e56d6ac6f6f16e25460befc))
* axis label fontFamily ([6add41f](https://github.com/antvis/f2/commit/6add41fa6e1f2d7e3990825426d4a6c7e77997e7))
* axis 案例补充 ([#1250](https://github.com/antvis/f2/issues/1250)) ([0e456c9](https://github.com/antvis/f2/commit/0e456c9056b413c427a251ca5205f4ad9ebcd602))
* **bbox.js:** getBBoxFromArc方法对于整圆的判断错误，导致半圆弧的最小包围盒计算错误 ([8763929](https://github.com/antvis/f2/commit/8763929f71b6f7620044e2be662fb7fe41da5253))
* cancelable=false 时空白区域点击不消失 ([#1390](https://github.com/antvis/f2/issues/1390)) ([aaefcb8](https://github.com/antvis/f2/commit/aaefcb8effb72787b9326257834d2235ce82f99e))
* cat类型平移后ticks不更新 ([03752e7](https://github.com/antvis/f2/commit/03752e7a3c4eb65ea12048fe575661573df0381f))
* chart.getSnapRecords() uncorrect in pie chart. Closed [#67](https://github.com/antvis/f2/issues/67) ([1d90175](https://github.com/antvis/f2/commit/1d90175238c2be815d6c83d89839a52f594fa0ef))
* **chart:** fixed bug of [#15](https://github.com/antvis/f2/issues/15), getSnapRecords of pie ([8c2c6b5](https://github.com/antvis/f2/commit/8c2c6b55ec9eae622f203fee7d64b8965c75243c))
* chart数据更新后进行forceUpdate ([bb078db](https://github.com/antvis/f2/commit/bb078db46102fad4fafcb03b25479f8570609e4e))
* clean code ([37b2ea0](https://github.com/antvis/f2/commit/37b2ea099400abc2459a1d3ab9032a3a24400650))
* clip bug & symbol 不定义 ([#1669](https://github.com/antvis/f2/issues/1669)) ([5714682](https://github.com/antvis/f2/commit/5714682b980c956a222e2472db614ade588045cf))
* Component Render 返回类型 ([#1340](https://github.com/antvis/f2/issues/1340)) ([2263c89](https://github.com/antvis/f2/commit/2263c89a30cb0e9a535e7d22f19219fdf3325ae6))
* component state 默认为{} ([b2ed61b](https://github.com/antvis/f2/commit/b2ed61b7607dbffc1344363da496f45ab2c69e3b))
* coord range 左边界 ([#1771](https://github.com/antvis/f2/issues/1771)) ([bdc44ed](https://github.com/antvis/f2/commit/bdc44ed343a92afc382f81db5e53846d0082b862))
* CR ([a17cd21](https://github.com/antvis/f2/commit/a17cd216ef3c96182f53fb42432ff8a2ff266af7))
* define calculateBBox method for smooth area shape for getBBox(). ([ebf8539](https://github.com/antvis/f2/commit/ebf8539d73a62f4ed720a11feda50410a3d10ca1))
* delete unused code ([dae63cd](https://github.com/antvis/f2/commit/dae63cdd2953f7764d02d7ca9ee14241fe2e0c1e))
* destroy 组件不再触发 setState 更新 ([#1587](https://github.com/antvis/f2/issues/1587)) ([5adfe8b](https://github.com/antvis/f2/commit/5adfe8bc215f179b30038768b4cd8ccd0937ee68))
* dist/f2.js => dist/f2.min.js ([22def20](https://github.com/antvis/f2/commit/22def20bdf9775e164c605846d69d5b603f80660))
* duplicate xScale calculate [#550](https://github.com/antvis/f2/issues/550) ([cb62656](https://github.com/antvis/f2/commit/cb626565c187bede8dc9ce694c23b7b7dd51d0f3))
* **emit:**  arr len will reduce after splice ([45430d5](https://github.com/antvis/f2/commit/45430d502f14652806169258f8a79ba31a109fcb))
* filter grid points which not in the range 0 to 1. ([f25b130](https://github.com/antvis/f2/commit/f25b13007db21ce91c9692ac630241a27b820747))
* filter null values when draw stacked point chart. Closed [#173](https://github.com/antvis/f2/issues/173). ([662e163](https://github.com/antvis/f2/commit/662e1632057a245d6cd63fc2f8452299e84461e1))
* fix  delay causes the chart not be completely drawed. ([c6023c1](https://github.com/antvis/f2/commit/c6023c1e2fce6c5cc57aa35e5216b3aa41ee83ea))
* fix angle calculation problem with linear gradient. ([4adbb84](https://github.com/antvis/f2/commit/4adbb8450235764e2bc9bff42eb1a90b299dd5fd))
* fix angle calculation problem with linear gradient. ([ecf1835](https://github.com/antvis/f2/commit/ecf1835e699d0e7b5f762de9bd75bdfe4e3bc2c6))
* fix animation register error in codesandbox ([0d64825](https://github.com/antvis/f2/commit/0d64825f6bba485114e35da70b8833aec9367f94))
* fix axis label animation. ([8b1f7b1](https://github.com/antvis/f2/commit/8b1f7b19d19c3a62af7d7033f7d0fc4154251429))
* fix bug when get records in polar coordinate. Closed [#83](https://github.com/antvis/f2/issues/83). ([0d443a1](https://github.com/antvis/f2/commit/0d443a1f3f1751fd5858ea58c33907982dd8cbfa))
* fix demo bugs in sandbox ([294e655](https://github.com/antvis/f2/commit/294e655bae57085ea9290c69eb11fb8cde829c03))
* fix event ([#1523](https://github.com/antvis/f2/issues/1523)) ([67d7a9f](https://github.com/antvis/f2/commit/67d7a9fd2fa30e1c96545c1a0b8e9701e39316ef))
* fix interval-select's reset method. ([8824072](https://github.com/antvis/f2/commit/8824072787723fb3c04c0803d7cebc5620a72d18))
* fix main entry configuration. ([352dcef](https://github.com/antvis/f2/commit/352dcefabe086a6ec451f08d131401336af79a88))
* fix pinch errors of category scale. Closed [#342](https://github.com/antvis/f2/issues/342). ([d41802f](https://github.com/antvis/f2/commit/d41802f294a01c70af5f8b178c1c8362add395d9))
* Fix problem with element zIndex in tooltip. Closed [#216](https://github.com/antvis/f2/issues/216) ([2b83bb8](https://github.com/antvis/f2/commit/2b83bb83ab881b9ab073998e59355309126f00c6))
* fix radar chart drawing path error. Closed [#180](https://github.com/antvis/f2/issues/180) ([257e203](https://github.com/antvis/f2/commit/257e20302120298744154e28d3442e7ee4ab8160))
* fix smooth area chart's update animation does not work. Closed [#235](https://github.com/antvis/f2/issues/235). ([53124c3](https://github.com/antvis/f2/commit/53124c338adbb1d2bec65e2933c3c756bf847898))
* Fix sorting problem for categorical data. Closed [#257](https://github.com/antvis/f2/issues/257). ([3a12928](https://github.com/antvis/f2/commit/3a129289515fff4a04e84823a517e38b2f103356))
* fix SupportPx type ([#1566](https://github.com/antvis/f2/issues/1566)) ([643f5dd](https://github.com/antvis/f2/commit/643f5dd7f0304937b2f276dae2e4a3d0826f413b))
* fix the bug that axis configuration not work when data is empty. Closed [#439](https://github.com/antvis/f2/issues/439). ([594e4f8](https://github.com/antvis/f2/commit/594e4f84344f557814b9c788c65cb7d2b410b81e))
* fix the bug that grid callback return null did not work. Closed [#437](https://github.com/antvis/f2/issues/437) ([717f2bf](https://github.com/antvis/f2/commit/717f2bf664f02ffc5ef402db12b22412288a086e))
* fix the bug when customizing the legend, the function type marker not work. Closed [#317](https://github.com/antvis/f2/issues/317). ([d631466](https://github.com/antvis/f2/commit/d631466c9d9dc2a3679164348ded1717a3b48077))
* fix the draw error caused by smooth area animation. Closed [#373](https://github.com/antvis/f2/issues/373). ([407fdf5](https://github.com/antvis/f2/commit/407fdf5cb56646b0a8ea175e2a61a946c29bdcb1))
* fix the draw error of polyline which has empty points but still fill the area. Closed [#363](https://github.com/antvis/f2/issues/363). ([2c33683](https://github.com/antvis/f2/commit/2c336837b59ad4140a32b80c8401f7a4e9fbbc77))
* fix the error caused by empty data.Closed [#238](https://github.com/antvis/f2/issues/238). ([09de761](https://github.com/antvis/f2/commit/09de7614ff239e5717dcdc53a05a4468e13bfb7a))
* fix the error of F2.Global.setTheme(). Closed [#224](https://github.com/antvis/f2/issues/224). ([15547c1](https://github.com/antvis/f2/commit/15547c1aa698aa7929e5831e18a240fb37d6e6d5))
* fix the error that when the grid is a function and specify the type as 'arc'. Closed [#331](https://github.com/antvis/f2/issues/331). ([b27a072](https://github.com/antvis/f2/commit/b27a0727d109c109532a226a04d28c84d2ea7b7b))
* fix the error when draw Guide.regionFilter for area chart. Closed [#345](https://github.com/antvis/f2/issues/345). ([3900565](https://github.com/antvis/f2/commit/3900565d132eebb43e36822e9d067a0656ae7e3c))
* fix the error when pie chart data difference is very large. Closed [#514](https://github.com/antvis/f2/issues/514) ([b3bf293](https://github.com/antvis/f2/commit/b3bf293253ddcf91ca43de19105a856ea0f123ff))
* fix the error when values are all null in linear scale. ([54787f3](https://github.com/antvis/f2/commit/54787f36779c9cd223d2f1e166c5928744879a71))
* fix the gradient color bug. Closed [#389](https://github.com/antvis/f2/issues/389). ([5cf6e44](https://github.com/antvis/f2/commit/5cf6e44248507e18b4f4ac5fbdee33fe3407a9f9))
* fix the interval y scale unable to set min. ([9c124f9](https://github.com/antvis/f2/commit/9c124f9d039f270130ef4801949b2b73ea0c7a3f))
* fix the padding value error when chart.changeSize() been called. Closed [#186](https://github.com/antvis/f2/issues/186) ([9edb3a9](https://github.com/antvis/f2/commit/9edb3a91ef45a6d40fdd5274f140945d9290670b))
* fix the problem of zero judgment. ([2ecbade](https://github.com/antvis/f2/commit/2ecbade65a578918ae75b2e2cd3146a624735f94))
* fix the problem that tooltipMarker not show. Closed [#234](https://github.com/antvis/f2/issues/234). ([334eb76](https://github.com/antvis/f2/commit/334eb7659d6ec7d9ec767443ca5b3eb87d363fd3))
* fixed stack point chart draw error. Closed [#119](https://github.com/antvis/f2/issues/119) ([d363278](https://github.com/antvis/f2/commit/d363278194cfcae63aca121bb5a7cb8151fc3b23))
* fragment 类型标签 ([#1422](https://github.com/antvis/f2/issues/1422)) ([28bcc8d](https://github.com/antvis/f2/commit/28bcc8d4351b1a9634e2f5fed6f2d2324f0aa60d))
* geom rerender ([#915](https://github.com/antvis/f2/issues/915)) ([033a366](https://github.com/antvis/f2/commit/033a36684b2335547547fa430aaa2b58b6258032))
* getAttr方法冲突 ([0d4af2f](https://github.com/antvis/f2/commit/0d4af2f73d7d98cfa55cb6456f91d740a4f67b7f))
* getSnapRecords() - pick data more accurate in pie chart. ([d3d6ddc](https://github.com/antvis/f2/commit/d3d6ddc2ca4a1d8be33dcb453416025f1999e389))
* gitee sync fail ([2bdfbf0](https://github.com/antvis/f2/commit/2bdfbf0047a3bc3ffede05e70864f45e16861b28))
* Guarantee the accuracy of the trigger point coordinates. Closed [#210](https://github.com/antvis/f2/issues/210) ([db3d25c](https://github.com/antvis/f2/commit/db3d25c8ffb284a211775c5775bed29a16e3e1e5))
* guide records 数据映射逻辑修改 ([#1308](https://github.com/antvis/f2/issues/1308)) ([3749bc1](https://github.com/antvis/f2/commit/3749bc11c47f36632a8c81b3f5f52eb96089d869))
* Guide 的 position 百分比解析需要考虑原始数据中本身包含 '%' 的情况.Closed [#590](https://github.com/antvis/f2/issues/590). ([b299390](https://github.com/antvis/f2/commit/b299390c45bb1c61ea2bb453b3cd5de8dff18db3))
* Guide.Point, fix the bug caused by parsePoint() return null. Closed [#458](https://github.com/antvis/f2/issues/458). ([2edbb03](https://github.com/antvis/f2/commit/2edbb03f243cfaf564f4c9e41e946627070042e7))
* Guide.point, the render method should return the point shape. ([e83a3a1](https://github.com/antvis/f2/commit/e83a3a1cc7f4a16cf83d371818d07235e6ede061))
* hidden point draw error. ([06bdef1](https://github.com/antvis/f2/commit/06bdef1770309982747293dd06b62def4bb67171))
* if text shape's x or y is NaN, there will be a drawing error in webchart mini program. Related to https://github.com/antvis/wx-f2/issues/81. ([4f0ca52](https://github.com/antvis/f2/commit/4f0ca529731476d9618c32bc911f1b6e7c17a873))
* if there is a point with NaN value in the Polyline's points, there will be a drawing error in webchart mini program. ([d5b39be](https://github.com/antvis/f2/commit/d5b39bef589197544a4df29a81581610d50af562))
* init theme ([2cd3443](https://github.com/antvis/f2/commit/2cd344302b27baabd1c232e2062654e79a818840))
* interval animation ([#1690](https://github.com/antvis/f2/issues/1690)) ([4dd8e7b](https://github.com/antvis/f2/commit/4dd8e7beb19de235040b5c82498718ffbc1a81c3))
* interval style ([#1320](https://github.com/antvis/f2/issues/1320)) ([9520876](https://github.com/antvis/f2/commit/95208767555671e77509c0229423f96d51be94e8))
* interval 默认动画调整 ([#1482](https://github.com/antvis/f2/issues/1482)) ([6bb1c68](https://github.com/antvis/f2/commit/6bb1c6876dc3c9d8fb273e04b02a44661183f764))
* ios spa多次创建导致canvas白屏。Closed [#630](https://github.com/antvis/f2/issues/630) ([ea3f84f](https://github.com/antvis/f2/commit/ea3f84f4bcddb4d296b4977504121dd0a7cbc838))
* itemWidth 改成同步设置 ([#1481](https://github.com/antvis/f2/issues/1481)) ([4784fd8](https://github.com/antvis/f2/commit/4784fd89d37e445d394e8350a3a51279bdac3049))
* jest transform error 和 M1 环境问题 ([ee0388f](https://github.com/antvis/f2/commit/ee0388f5d06f688f9712471ecee2b57ac864bc9e))
* label 为 null 时，图形更小 ([#1443](https://github.com/antvis/f2/issues/1443)) ([966906c](https://github.com/antvis/f2/commit/966906c426dcd3f1e736907d90164e9ead9411d1))
* legend color 与实际渲染颜色不一致 ([#1783](https://github.com/antvis/f2/issues/1783)) ([c922b7b](https://github.com/antvis/f2/commit/c922b7b3eacb0367a98090e43e34b73c77e4d43b))
* legend filter should work during pan or pinch. Closed [#467](https://github.com/antvis/f2/issues/467) ([3be0359](https://github.com/antvis/f2/commit/3be0359f57fa92745aeb2d20fd24e432cb25e454))
* legend 无用参数删除 ([#1483](https://github.com/antvis/f2/issues/1483)) ([1fb6990](https://github.com/antvis/f2/commit/1fb69908dd3a29b1fdc604f9e50d800214afa608))
* let 'interval-select' interaction work for mixed charts. Closed [#355](https://github.com/antvis/f2/issues/355). ([b80aa3f](https://github.com/antvis/f2/commit/b80aa3ff31d157346bf98783c9bbd99b169ccaef))
* line chart demo render error ([4f2a3b5](https://github.com/antvis/f2/commit/4f2a3b515caf0a07846bb7095571562acf94ce68))
* line points 不存在origin ([#1248](https://github.com/antvis/f2/issues/1248)) ([8ae49c2](https://github.com/antvis/f2/commit/8ae49c290e659bccd5595e14f3bbaf4773a913f3))
* linear NaN error ([482c49d](https://github.com/antvis/f2/commit/482c49d07ea177526df7832f7af457799c82735b))
* lineView format points ([a7fe8a0](https://github.com/antvis/f2/commit/a7fe8a03eff63672ac1ebdd8c352dcb03e9495f7))
* lineView 暴露 size smooth 参数 ([d553cfa](https://github.com/antvis/f2/commit/d553cfa3c8ddc77eb22f1aa8976c4bb840d02361))
* **line:** 修复设置 line 宽度无效 ([#1338](https://github.com/antvis/f2/issues/1338)) ([79621d1](https://github.com/antvis/f2/commit/79621d1773d6834514dcb034b63dab6062b0a4d1))
* **line:** 修复雷达图的 records 起点数据重复,导致 tooltip 展示重复 ([#1439](https://github.com/antvis/f2/issues/1439)) ([4a344c8](https://github.com/antvis/f2/commit/4a344c8ecf986825ac0d214fe9109493de334ea8))
* **line:** 数据为空时,图表更新渲染失败 ([#1565](https://github.com/antvis/f2/issues/1565)) ([d5eeee7](https://github.com/antvis/f2/commit/d5eeee7c561cfeb79e3f76d9febe43f89fbedc32))
* lint warning ([#1244](https://github.com/antvis/f2/issues/1244)) ([1911553](https://github.com/antvis/f2/commit/1911553a0eb83445fb0c859de912a1f4f15d1c1b))
* lottie options ([#1673](https://github.com/antvis/f2/issues/1673)) ([7a1ab9a](https://github.com/antvis/f2/commit/7a1ab9ae0830a3589f8fc4868034eff7f0e51f2a))
* make sure timeCat scale to sort by default. Closed [#151](https://github.com/antvis/f2/issues/151). ([a9e7fee](https://github.com/antvis/f2/commit/a9e7fee68e020d07b1eaafa8042c4a28f7408c32))
* module mix fixed ([d17c4d8](https://github.com/antvis/f2/commit/d17c4d82cb6e7abcfc3a27397a7885fa3e834589))
* negative data, drawing graphics(bar chart and area chart) beyond the canvas. Closed [#179](https://github.com/antvis/f2/issues/179) ([3767e38](https://github.com/antvis/f2/commit/3767e386854c8904d3c7100b68ab819e423c255d))
* npm 包添加es, lib目录 ([3bf8a8b](https://github.com/antvis/f2/commit/3bf8a8b7b91c03616004849c01c9346928ae2f03))
* Optimize shape's unique id generation strategy. ([09036ba](https://github.com/antvis/f2/commit/09036badea11bbab4d1213c3f45639b91f3e9a44))
* Optimized geometry shape's id generation strategy. Closed [#318](https://github.com/antvis/f2/issues/318). ([ea7adc9](https://github.com/antvis/f2/commit/ea7adc9df8a3943f235e970e66c98f6580186dc7))
* origin属性 ([5bcdca6](https://github.com/antvis/f2/commit/5bcdca6bef401e986e16e82a42dbfead0d3df4f3))
* pie label 显示优化 ([#1414](https://github.com/antvis/f2/issues/1414)) ([08f1f8d](https://github.com/antvis/f2/commit/08f1f8d3ad329975edae784b11fbc454b6f99e42))
* pieLabel getBBox() should compact node and mini program env. Closed [#448](https://github.com/antvis/f2/issues/448). ([29ebd49](https://github.com/antvis/f2/commit/29ebd491746910e692ff4d3d8b00e7ff41d5cb71))
* prevent same plugins repeat init. ([8987488](https://github.com/antvis/f2/commit/89874884689bf282217349be2060eb1b4ab2c33b))
* preventDefault添加空判断 ([ec99ed5](https://github.com/antvis/f2/commit/ec99ed5ab5dbb916afa887470f17cd1b979a7c41))
* radar tootip value=0 ([#1769](https://github.com/antvis/f2/issues/1769)) ([0f6ec64](https://github.com/antvis/f2/commit/0f6ec64dcf6dcae297e87bf180151fcc7ceebb0a))
* rect 设置radius时，图形画不出来 ([10666e8](https://github.com/antvis/f2/commit/10666e85754f0117e8f8dbc0f5aa776e97f7a12a))
* region-filter显示错误. Fixed [#1013](https://github.com/antvis/f2/issues/1013) ([1348281](https://github.com/antvis/f2/commit/1348281fb43ff633843391d824c2a16cf0e8c3c0))
* remove alilas ([c831581](https://github.com/antvis/f2/commit/c8315815e809e53a3698bb6e8e6aea247835f804))
* remove circular dependency ([3817e75](https://github.com/antvis/f2/commit/3817e75a9b1c0067316789dec3f09257c9bb5176))
* render 之后再次修改geom的size. Closed [#797](https://github.com/antvis/f2/issues/797) ([a90d960](https://github.com/antvis/f2/commit/a90d96083c7204483ea25d448f94d715de085ffc))
* revert legend setItems ([#1442](https://github.com/antvis/f2/issues/1442)) ([18809ec](https://github.com/antvis/f2/commit/18809ecf3eeb08719b8ded391ac41fb050697deb))
* scale formatter not work in tooltip. ([ea8c6d0](https://github.com/antvis/f2/commit/ea8c6d0e2cf4d835c31abdcee09824a3d71e09e3))
* **scale:** fixed bug of first record with null ([03dbfc8](https://github.com/antvis/f2/commit/03dbfc8679e202d718d129e12acf0b7bda901b39))
* scale锁定0.1.3 ([0fe2de5](https://github.com/antvis/f2/commit/0fe2de5cdf30fd5ebed9bacc1283714d48fb2d8a))
* selection change & legend click & style ([#1639](https://github.com/antvis/f2/issues/1639)) ([323ebd4](https://github.com/antvis/f2/commit/323ebd4db038dd7d5b7aba4e01f7a330f782da21))
* set min and max for interval is not work. Closed [#57](https://github.com/antvis/f2/issues/57) ([135bd56](https://github.com/antvis/f2/commit/135bd56b34515462a1bbf3433a165c85ef9ef39f))
* setState 后，callback 队列没有清空 ([#1451](https://github.com/antvis/f2/issues/1451)) ([50803e4](https://github.com/antvis/f2/commit/50803e4325a6e1136009cfb60d8c8c5ad8268f89))
* setTheme 单独使用报错,即非Global.setTheme调用 ([01080d0](https://github.com/antvis/f2/commit/01080d03e676a4b843ed1c19f76cad618283a894))
* should filter the points when calculate the polyline shape's bounding box. Closed [#468](https://github.com/antvis/f2/issues/468) ([0088305](https://github.com/antvis/f2/commit/00883059895ec7246676185ab670eaed167eff36))
* should use canvas dom's width. ([7717018](https://github.com/antvis/f2/commit/7717018f1785012f3b7ade6f4105125d072ef35c))
* site bug ([#1696](https://github.com/antvis/f2/issues/1696)) ([3ecc390](https://github.com/antvis/f2/commit/3ecc390e98dfc2ef866681f046fdd98dec89baa6))
* site build error ([5ceccda](https://github.com/antvis/f2/commit/5ceccda9fbca400914b025a27db913d9826c1339))
* site 官网的一些错误 ([d6a51e3](https://github.com/antvis/f2/commit/d6a51e31037e62e0f5c0eddb90c5a60f25cf2a38))
* skip掉失败的case，先能跑通 ([4752b37](https://github.com/antvis/f2/commit/4752b375cc5c3391a83ba38b69cfead9ed5dd29e))
* support area with null data ([cff0425](https://github.com/antvis/f2/commit/cff04250d9c2d94eeeaf654e1cfe7320842fda46))
* support pixelRatio setting for node-canvas. ([85cb71d](https://github.com/antvis/f2/commit/85cb71d0e067a82ce2a107964e6e389da1ac13ab))
* **syncYScales:** scale should re-calculate the ticks ([ef68c0c](https://github.com/antvis/f2/commit/ef68c0c84e46ebbd0b919d4db459a14ff5cc9ee7))
* tag guide ([ffc6bd9](https://github.com/antvis/f2/commit/ffc6bd9432d049364747c7643e3234e8bc149998))
* tagGuide 小三角形计算逻辑 ([#1524](https://github.com/antvis/f2/issues/1524)) ([de1889b](https://github.com/antvis/f2/commit/de1889b1629203508448f5f860b51ddad699bb59))
* tagGuide 箭头颜色 ([#1394](https://github.com/antvis/f2/issues/1394)) ([b0bb14e](https://github.com/antvis/f2/commit/b0bb14e8f6b0af93ae9752ccc7d966468b371081))
* the drawing problem when the data of rounded interval shape is zero. ([ee79a36](https://github.com/antvis/f2/commit/ee79a36cab337780538ee99376359a9a67aad2a5))
* The position of the canvas in the parent container needs to be considered when calculating the Guide.Html position. ([512e025](https://github.com/antvis/f2/commit/512e025d6d60a4e9837722b6585b7ac296a73a9e))
* **theme:** adjust axis-line's display position. ([423b05c](https://github.com/antvis/f2/commit/423b05ccd7b52fa03e89bad4b519e686b6a9e621))
* tickline 不生效 & theme 不生效 ([#1677](https://github.com/antvis/f2/issues/1677)) ([49e7f78](https://github.com/antvis/f2/commit/49e7f78633466adc720e1682caf03536bdbb2ef9))
* tickStyle传入基础类型报错 ([#1292](https://github.com/antvis/f2/issues/1292)) ([fddc32b](https://github.com/antvis/f2/commit/fddc32b4e8e0421beeb83171c36f27e79683ff1f))
* timeCat type scale setting values caused an error in chart drawing. ([d1391bd](https://github.com/antvis/f2/commit/d1391bd33440e5d817e984a333da268bba8e6a27))
* tooltip alias 配置 Closed: [#1412](https://github.com/antvis/f2/issues/1412) ([#1413](https://github.com/antvis/f2/issues/1413)) ([75eccf0](https://github.com/antvis/f2/commit/75eccf0bd93f1338d4ad5c4fffbf1747eb8ba0db))
* tooltip arrow position ([#1736](https://github.com/antvis/f2/issues/1736)) ([16e9cf6](https://github.com/antvis/f2/commit/16e9cf6fe0e28bd4538bbd88a1b4ae93f659f3ac))
* tooltip 在 geometry 之前显示时，位置不对 ([#1429](https://github.com/antvis/f2/issues/1429)) ([d6f6f61](https://github.com/antvis/f2/commit/d6f6f6147fd6a8d670f94527bd311816e5d78deb))
* tooltip 支持滑出画布外面 ([#1435](https://github.com/antvis/f2/issues/1435)) ([ae0d4c9](https://github.com/antvis/f2/commit/ae0d4c9c8421d7ae688a4008370ffefd76005193))
* tooltip 顶部被截断了 ([#1346](https://github.com/antvis/f2/issues/1346)) ([9d35df7](https://github.com/antvis/f2/commit/9d35df7f63748bf2c552b0f50f0a0d14b4d42988))
* **tooltip:** 修复update时位置不更新及事件未解绑 ([#1474](https://github.com/antvis/f2/issues/1474)) ([74c66c1](https://github.com/antvis/f2/commit/74c66c1a84f2b731d8df4d8c42e99098595ebfc3))
* **tooltip:** 修复更新数据时, tooltip 默认展示不更新 ([#1403](https://github.com/antvis/f2/issues/1403)) ([12d1d54](https://github.com/antvis/f2/commit/12d1d5496c96a9e13b6a1cf2fdd3151d0fb3299f))
* tootip 右边界 ([#1753](https://github.com/antvis/f2/issues/1753)) ([f0930bd](https://github.com/antvis/f2/commit/f0930bd61a79ad15e0885e7aa907a2bf1eb5c791))
* touchend时，timeount没有清除导致报错 ([1059bdd](https://github.com/antvis/f2/commit/1059bdd0e526971aa89693d6738a90f436c1b063))
* transform arrow functions ([8d73bba](https://github.com/antvis/f2/commit/8d73bba141b2741fb4c8a04a4379820317c6631a))
* transposed Interval ([#1366](https://github.com/antvis/f2/issues/1366)) ([7fa5363](https://github.com/antvis/f2/commit/7fa5363b70314ac5e8b1a84473a53e095ad3b914))
* ts error ([0bfd5dd](https://github.com/antvis/f2/commit/0bfd5ddb3c5982c108cfb2fbad642918531f6e46))
* ts error ([bf4665b](https://github.com/antvis/f2/commit/bf4665b7856df2761802c575d26b9377fc9b90e5))
* **types:** fix the types of the entries and plugins ([2fb8054](https://github.com/antvis/f2/commit/2fb8054706369773717e7a4fabce322dcafe96c1))
* **types:** mix support any number of sources ([d8ab580](https://github.com/antvis/f2/commit/d8ab580364f7dd07c02f970d6c9ffb8823e20f1f))
* update comments ([ddf54de](https://github.com/antvis/f2/commit/ddf54de46a697f1657a6273291008f7c76e55e35))
* update comments ([9e95555](https://github.com/antvis/f2/commit/9e95555af4cba680966684c48c64b96d2d675da6))
* util 引入报错 ([75fedad](https://github.com/antvis/f2/commit/75fedadbb85379fd0197b3959dbf9240ab415ec6))
* values个数边界判断 ([f2e64ba](https://github.com/antvis/f2/commit/f2e64bab828eae6aca1ffb0ddb5b1b83de5c51d7))
* view 嵌套逻辑也保持参数一致 ([5a9c016](https://github.com/antvis/f2/commit/5a9c0164568bcf3666edf6ff257ec9274ed7be7d))
* vue3 示例报错 ([#1476](https://github.com/antvis/f2/issues/1476)) ([1960750](https://github.com/antvis/f2/commit/196075034293761af9433168dc045a43e5733c82))
* when chart is clear, chart.getSnapRecords() should not be affected. ([1dbdd79](https://github.com/antvis/f2/commit/1dbdd79b4f56a8b60b0466f794fbeb91d89cdd3c))
* when chart size change, the height of tooltip crosshairs should update. Closed [#543](https://github.com/antvis/f2/issues/543) ([e7c7e91](https://github.com/antvis/f2/commit/e7c7e91622ce9b133cc8837631a6ae5d59bd5dec))
* when chart update, tooltip's _lastActive should be reset. Closed [#271](https://github.com/antvis/f2/issues/271). ([297ae47](https://github.com/antvis/f2/commit/297ae47518ecb73807aa51c1683a5a1bd02f8390))
* when chart.clear() be called, the padding should be recalculated. Closed [#228](https://github.com/antvis/f2/issues/228). ([dd1a013](https://github.com/antvis/f2/commit/dd1a01375620839b437911a9978e7b1364651e0f))
* when chart's data changed, clear the append shape. Closed [#227](https://github.com/antvis/f2/issues/227). ([9090379](https://github.com/antvis/f2/commit/90903794aca7a4c1b8a4cab28ecd06afdfe7d4d8))
* when data changed, the padding should be recalculated. ([fe7c221](https://github.com/antvis/f2/commit/fe7c2215f2bdacf8514b65f4c07f649e061cfdf7))
* when geom clear, the _width should be reset. Closed [#273](https://github.com/antvis/f2/issues/273). ([a36aa67](https://github.com/antvis/f2/commit/a36aa67f7c5a36be81fdbcc1d38dd305973c596a))
* when set chart.legend(false), chart.getLegendItems() return empty. Closed [#190](https://github.com/antvis/f2/issues/190). ([c75fdb8](https://github.com/antvis/f2/commit/c75fdb82097f9532d7c90d6fdafa89b32edcbaf9))
* when text shape's content is 0, ensure it will be rendered. Closed [#282](https://github.com/antvis/f2/issues/282). ([b35dedf](https://github.com/antvis/f2/commit/b35dedf2512b86f4332df3440b6a9151cb2693dd))
* when Text shape's text attribute is updated, the textArr attribute should be reset. Closed [#302](https://github.com/antvis/f2/issues/302). ([1625a22](https://github.com/antvis/f2/commit/1625a22e52e529d3c5bf2c45b620c95d139fd160))
* when the points is empty, return. Closed [#316](https://github.com/antvis/f2/issues/316). ([82d5c2c](https://github.com/antvis/f2/commit/82d5c2c768c80d7356fe72b7408713eb5992e453))
* when x scale is category, do not need to sort data. Closed [#202](https://github.com/antvis/f2/issues/202). ([184f393](https://github.com/antvis/f2/commit/184f3937822f7b05ac689ec44e634a10d1c2105e))
* 事件挂载gesture属性上 & 补充圆角单测 ([#1525](https://github.com/antvis/f2/issues/1525)) ([22ebb87](https://github.com/antvis/f2/commit/22ebb87e443323898af00942ff9333ae14541e5c))
* 事件范围 ([#1756](https://github.com/antvis/f2/issues/1756)) ([0304f0d](https://github.com/antvis/f2/commit/0304f0d5220f11cb1aecefda82e2a993532f0c57))
* 交互销毁时，注销事件 ([912a13c](https://github.com/antvis/f2/commit/912a13c1e4f3b9662f0c87ae3d1751a8c286c645))
* 优化 y 判断 ([2a59107](https://github.com/antvis/f2/commit/2a5910751719ca89dfeaaa2b3123b533e57369a2))
* 优化press事件的处理 ([5b0153d](https://github.com/antvis/f2/commit/5b0153dcb7ecf0d6234b6af928dcddf606e59d3c))
* 优化shape 映射到绘图属性 ([91e2ed3](https://github.com/antvis/f2/commit/91e2ed3e57938adc3776cecae4385b78dde50151))
* 修复 attr 和 scale 不一样的情况 ([#1316](https://github.com/antvis/f2/issues/1316)) ([62d9ef8](https://github.com/antvis/f2/commit/62d9ef868887143bc6bd54d4145b50c9e77327bf))
* 修复 axis rerender 不更新布局和 labelOffset 报错 ([#1293](https://github.com/antvis/f2/issues/1293)) ([f08bea2](https://github.com/antvis/f2/commit/f08bea2bf58a4a1cce11f3043d3507160e7c54d3))
* 修复 chart filter 的逻辑 ([#1349](https://github.com/antvis/f2/issues/1349)) ([c8c5cc5](https://github.com/antvis/f2/commit/c8c5cc532fb2e2d85d4bf935394e1a1123c28b30))
* 修复 chart 的 ts 类型报错 ([#1795](https://github.com/antvis/f2/issues/1795)) ([1460bc6](https://github.com/antvis/f2/commit/1460bc628a15f61ffe31dc5058a228d492e7db0c))
* 修复 children 为空的报错 ([#1543](https://github.com/antvis/f2/issues/1543)) ([26ccb51](https://github.com/antvis/f2/commit/26ccb51753a7ae76bff09fb1b5b2fcb2bc3b4a6b))
* 修复 ci ([#1741](https://github.com/antvis/f2/issues/1741)) ([5e395b4](https://github.com/antvis/f2/commit/5e395b4abfec734d9677d5a53b2d6b9da9b6e6de))
* 修复 coord & chart 部分逻辑，修复 guide & tooltip 布局 ([#1664](https://github.com/antvis/f2/issues/1664)) ([165503f](https://github.com/antvis/f2/commit/165503fcc7ac28d86f56473a0292bbf9b2b7007e))
* 修复 eslint any 的 warning ([#1347](https://github.com/antvis/f2/issues/1347)) ([5242f5a](https://github.com/antvis/f2/commit/5242f5ac16e8e8d8df2cd11adf185a37e6ac4995))
* 修复 f2 和 react 同时使用时，shape 标签类型提示报错 ([#1407](https://github.com/antvis/f2/issues/1407)) ([c7e5705](https://github.com/antvis/f2/commit/c7e5705392a0cc63b04515f3bd47b7190eef8b76))
* 修复 fecha 的依赖问题 ([#1648](https://github.com/antvis/f2/issues/1648)) ([fdf22dc](https://github.com/antvis/f2/commit/fdf22dcd786e39a055d9515f4595cff6e44407f8))
* 修复 fragment 的报错 ([#1657](https://github.com/antvis/f2/issues/1657)) ([6271699](https://github.com/antvis/f2/commit/6271699dcffc1d27c1c941fe3baa0fb5c3f0de17))
* 修复 g textBaseline 变化导致 ci 报错 ([#1759](https://github.com/antvis/f2/issues/1759)) ([6369623](https://github.com/antvis/f2/commit/636962331b7369806b99287c9c79f36c59e5dde7))
* 修复 geometry.getSnapRecords ([#1253](https://github.com/antvis/f2/issues/1253)) ([be9f18d](https://github.com/antvis/f2/commit/be9f18d0c865446ece9f56f109d91d140ff7275c))
* 修复 image 绘制的层级问题. Closed [#1489](https://github.com/antvis/f2/issues/1489) ([#1490](https://github.com/antvis/f2/issues/1490)) ([5549c5d](https://github.com/antvis/f2/commit/5549c5d96667d985aaecd5e0585762324c7f3a98))
* 修复 interval 平移后不显示的问题 Fixed [#954](https://github.com/antvis/f2/issues/954) ([e5c64bf](https://github.com/antvis/f2/commit/e5c64bfc833d1a5403bfcecbbd3ef83650c14381))
* 修复 jsx runtime 入口的引用路径 ([#1695](https://github.com/antvis/f2/issues/1695)) ([736aee0](https://github.com/antvis/f2/commit/736aee07084f1fe5753e81f4a2f1bbb15d42e700))
* 修复 legend maxWidth 计算错误问题 ([#1314](https://github.com/antvis/f2/issues/1314)) ([8921949](https://github.com/antvis/f2/commit/8921949210803d6b92dd72e1a72b8dfc338dc694))
* 修复 line rerender 报错 和 guide 不能点击的问题 ([#1294](https://github.com/antvis/f2/issues/1294)) ([54482af](https://github.com/antvis/f2/commit/54482afd2e4402cc24ad0ae9e501c048d1dac1ff))
* 修复 line y 轴字段数据为 array 绘制不正确 ([#1780](https://github.com/antvis/f2/issues/1780)) ([5c0e6ea](https://github.com/antvis/f2/commit/5c0e6ea36528995cf747dedd0d4347209594bebc))
* 修复 line 图形变化 ([#1506](https://github.com/antvis/f2/issues/1506)) ([60f2a88](https://github.com/antvis/f2/commit/60f2a887bb34a45d4b6489749408a83b22a8f057))
* 修复 line 空数组时报错 ([#1359](https://github.com/antvis/f2/issues/1359)) ([c0b7e8b](https://github.com/antvis/f2/commit/c0b7e8bcbde3abd43ef110eb01e4a9719c0a3c0e))
* 修复 linear scale tickCount 为 1 卡死浏览器的问题 ([55dbb3a](https://github.com/antvis/f2/commit/55dbb3aed8df1aa3363cf9c1df4052e8b38f37f6))
* 修复 linear 数据顺序问题导致 getSnapRecords 获取异常 ([#1571](https://github.com/antvis/f2/issues/1571)) ([2d299e0](https://github.com/antvis/f2/commit/2d299e0e0bf2de40dccb16e6d8305cede197b8b3))
* 修复 lint 的 warnings ([#1724](https://github.com/antvis/f2/issues/1724)) ([9f73318](https://github.com/antvis/f2/commit/9f7331883c8ecc56c83c13175133560c238667f1))
* 修复 pan pinch 事件交互的 case ([#1667](https://github.com/antvis/f2/issues/1667)) ([963595e](https://github.com/antvis/f2/commit/963595ea95f647bbc50af6e59493f3df3edc301b))
* 修复 pattern 纹理的单测与示例 ([#1594](https://github.com/antvis/f2/issues/1594)) ([f7303d5](https://github.com/antvis/f2/commit/f7303d5e114edb9c5d241fdb5c5a14e8657a9eac))
* 修复 point 的 shape 类型不生效 ([#1361](https://github.com/antvis/f2/issues/1361)) ([8ae41cd](https://github.com/antvis/f2/commit/8ae41cd3c683350526c57c0bb43b4bd86c6b5ed9))
* 修复 point 默认 size 不生效 ([#1358](https://github.com/antvis/f2/issues/1358)) ([75afc32](https://github.com/antvis/f2/commit/75afc320c7797b3cd320f5b40e2f7ffd56708fa5))
* 修复 react theme 取不到的问题 ([#1650](https://github.com/antvis/f2/issues/1650)) ([ef95569](https://github.com/antvis/f2/commit/ef95569fc6437c4531bae467a474e282590df64f))
* 修复 react 工程的报错 ([#1645](https://github.com/antvis/f2/issues/1645)) ([4418bf3](https://github.com/antvis/f2/commit/4418bf3984d5d65a84de65722effe5e44a0361d4))
* 修复 rect radius 存在 0 的情况 ([#1485](https://github.com/antvis/f2/issues/1485)) ([3068c55](https://github.com/antvis/f2/commit/3068c552c00fb581a655d136c94e17efdac91b02))
* 修复 tag && px2hd && gauge ([#1515](https://github.com/antvis/f2/issues/1515)) ([120ad9f](https://github.com/antvis/f2/commit/120ad9febdfea60c3cc2d95a35a104accca13108))
* 修复 tooltip 在坐标系边界情况时，获取 record 不准确的问题 ([#1448](https://github.com/antvis/f2/issues/1448)) ([4c67a88](https://github.com/antvis/f2/commit/4c67a88ee878121b5adf3849baa221499a1be79a))
* 修复 tooltip 数据更新时，defaultItem 为 空的报错. Closed [#1487](https://github.com/antvis/f2/issues/1487) ([#1488](https://github.com/antvis/f2/issues/1488)) ([050d5cf](https://github.com/antvis/f2/commit/050d5cf435ccb127df77ed6968bbd5abc59adc63))
* 修复 tooltip 的位置错误 ([#1751](https://github.com/antvis/f2/issues/1751)) ([af67a24](https://github.com/antvis/f2/commit/af67a245221d22aaf3ef3514ac55f056ed79b71f))
* 修复 tooltip 的显示位置和分类名称 ([#1350](https://github.com/antvis/f2/issues/1350)) ([996635d](https://github.com/antvis/f2/commit/996635d4d3725ecf6de1450a78032e82ad88f3c7))
* 修复 treemap 的类型定义和事件 ([#1697](https://github.com/antvis/f2/issues/1697)) ([709741a](https://github.com/antvis/f2/commit/709741a8f07ba255c8a1091f9e5ea8d3f0d02c9f))
* 修复 ts 报错 ([b7babf4](https://github.com/antvis/f2/commit/b7babf4d00ad87b2ddb10624ac8e671263600dfa))
* 修复 ts 类型 ([#1634](https://github.com/antvis/f2/issues/1634)) ([7e7097a](https://github.com/antvis/f2/commit/7e7097aef8af85e0b771810494a1e006c28d2ed2))
* 修复 ts 类型 ([#1655](https://github.com/antvis/f2/issues/1655)) ([6777821](https://github.com/antvis/f2/commit/67778211863830fa73489aa3d2c9bea4e7433c95))
* 修复 TS 类型报错 ([#1251](https://github.com/antvis/f2/issues/1251)) ([65fad70](https://github.com/antvis/f2/commit/65fad7040f98c1e58d414cab27a42a881ba40301)), closes [#1207](https://github.com/antvis/f2/issues/1207) [#1231](https://github.com/antvis/f2/issues/1231)
* 修复 umd 构建循环依赖的 warning ([#1703](https://github.com/antvis/f2/issues/1703)) ([d0c548b](https://github.com/antvis/f2/commit/d0c548b9c94b9397499a6e79ed7d7f55fd153da5))
* 修复 vue unmount 时销毁 canvas ([#1480](https://github.com/antvis/f2/issues/1480)) ([93b03a0](https://github.com/antvis/f2/commit/93b03a05b4517804512999303ee856b6a860643f))
* 修复alwaysshow为true时，滑动到plot外面，tooltip还会隐藏的问题 ([0f002fe](https://github.com/antvis/f2/commit/0f002fef6fe12077bb7fdebd6ea015462d92a4b0))
* 修复canvas.destroy报错 ([#1264](https://github.com/antvis/f2/issues/1264)) ([23eec82](https://github.com/antvis/f2/commit/23eec82de6389532e748314a44c3b7792f3bc3d5))
* 修复cat类型时guide record计算错误问题 ([#1381](https://github.com/antvis/f2/issues/1381)) ([c9d86a6](https://github.com/antvis/f2/commit/c9d86a650ee031460fd5a3b812e41695f7f20c8e))
* 修复ci的报错 ([ce40490](https://github.com/antvis/f2/commit/ce404908f44cd26668fdee9649998a5ba832e9ff))
* 修复click的x，y & 增加花瓣图demo ([#1530](https://github.com/antvis/f2/issues/1530)) ([628022f](https://github.com/antvis/f2/commit/628022fb1c9b7bd3edf1ba6c7f33e0a42a08c10f))
* 修复component的逻辑 ([bf07c31](https://github.com/antvis/f2/commit/bf07c31e1f6238da5a78333eccd74444d16ebb10))
* 修复group背景色绘制不正确 ([8f38df1](https://github.com/antvis/f2/commit/8f38df1153f8c6daa268aa0c66f081553eb7ee7f))
* 修复hollowCircle报错和多geom时，crosshairs不显示的问题。Fixed [#1140](https://github.com/antvis/f2/issues/1140) ([c1b5c85](https://github.com/antvis/f2/commit/c1b5c85b4ef68b85cda7a67340c5dda49c7501cc))
* 修复legend 显示问题和点击筛选 ([#1341](https://github.com/antvis/f2/issues/1341)) ([4c101d1](https://github.com/antvis/f2/commit/4c101d1da0919ae6797b1234f23a481cc8fda4ed))
* 修复legend飘逸（hotfix) ([102bac0](https://github.com/antvis/f2/commit/102bac083a885c15764d254ee5929737fe4a47ad))
* 修复panstart时图表的跳动问题 ([#1213](https://github.com/antvis/f2/issues/1213)) ([fd31f03](https://github.com/antvis/f2/commit/fd31f036af5625730f0d724af19d5b296cdcc5c0))
* 修复pieLabel插件判断矩形重叠的函数 ([c139a6a](https://github.com/antvis/f2/commit/c139a6ab23aed19488ac95f147e0595a0a1e2f07))
* 修复react key为null时diff错误 ([5c9c8ad](https://github.com/antvis/f2/commit/5c9c8ad75d4b9ade6adb1cd68cb14fcbf41a2a4a))
* 修复react下 not extensible 的报错 ([b78c792](https://github.com/antvis/f2/commit/b78c792bee43acb811552b205c0775c248895fa9))
* 修复react场景下，jsx element 存在react特定对象导致equal死循环的问题 ([428672e](https://github.com/antvis/f2/commit/428672eb6017a343093536dbae09a74b3f88110c))
* 修复react库的使用并补充单测 ([91a918d](https://github.com/antvis/f2/commit/91a918d92b126c1774ceb25e5d574bcf3e160956))
* 修复rect radius大于宽高时，图形绘制不正确 ([558fe91](https://github.com/antvis/f2/commit/558fe91c78b991fea56b7372caffe6d6b4c78118))
* 修复repaint shape属性不生效。Closed [#1102](https://github.com/antvis/f2/issues/1102) ([b1ba85e](https://github.com/antvis/f2/commit/b1ba85e590eeb5237aec3d07c771cb05e9371b63))
* 修复repaint时动画不生效 ([f0ba181](https://github.com/antvis/f2/commit/f0ba181463dd2d40693c75ac248d26ce87739761))
* 修复site build 报错 ([#1224](https://github.com/antvis/f2/issues/1224)) ([55912de](https://github.com/antvis/f2/commit/55912dee623e579e3fb4abba3fb36680db541758))
* 修复site编译报错的问题 ([b9496f7](https://github.com/antvis/f2/commit/b9496f75b3494cf8659d09af69d63dca3937e6ca))
* 修复tag位置为NaN时的绘制问题 ([3aee644](https://github.com/antvis/f2/commit/3aee644349caf2b30cecf2f90b547fa6ddbe2aee))
* 修复timeline 不能自动播放的问题 ([3e30137](https://github.com/antvis/f2/commit/3e30137091f7700f4dc9b0cae591ebbe47bc9afa))
* 修复tooltip posy小于0被截断不显示 ([bcda358](https://github.com/antvis/f2/commit/bcda35865c9e58b339bb53b07f6ccb5fda360f07))
* 修复tooltip showXTip 显示时，measureText需要新建canvas. Fixed [#1015](https://github.com/antvis/f2/issues/1015) ([010d516](https://github.com/antvis/f2/commit/010d5161937546f13d6f77bffde21b9dbd652f8e))
* 修复tooltip touchend不消失的问题 ([cb83477](https://github.com/antvis/f2/commit/cb834770bcc7c9683e7f6f76e91bfaab6cf33046))
* 修复Tooltip辅助标签配置不生效问题 ([#1812](https://github.com/antvis/f2/issues/1812)) ([0d8090f](https://github.com/antvis/f2/commit/0d8090f93ee3ab22c7a8f6e9195486f27335a0c0))
* 修复touchend 后，points为空 ([e769d64](https://github.com/antvis/f2/commit/e769d6424c4158cc4a764b16c7044f8324537070))
* 修复touchstart时，会触发pan事件 ([1be26b8](https://github.com/antvis/f2/commit/1be26b834ab28425ebcfa19d6d9157e18c6219d1))
* 修复touchstart触发press时，没有设置direction ([b6f45a6](https://github.com/antvis/f2/commit/b6f45a6a9ea35a8357eacb627eec3cbae0aa0297))
* 修复ts报错 ([22f5401](https://github.com/antvis/f2/commit/22f54012c786d7f74e21f4edf40672693ca6b408))
* 修复update时, coord 位置不对 ([#1257](https://github.com/antvis/f2/issues/1257)) ([b9753a2](https://github.com/antvis/f2/commit/b9753a2c96e258914f146b59a27bf33a5919e9f0))
* 修复update时，scale没有更新 ([1965ca4](https://github.com/antvis/f2/commit/1965ca4fa469feb0db379980e516f88975bf9562))
* 修复update逻辑下 mapping 的问题 && 手势交互的bug ([#1278](https://github.com/antvis/f2/issues/1278)) ([5ae3168](https://github.com/antvis/f2/commit/5ae3168aa1bb327bed0d7f7b118ca81a7ecd98b9))
* 修复x, y为0的情况 ([1dcb5f9](https://github.com/antvis/f2/commit/1dcb5f92ce1b9d282842b9b021f118f874c25b41))
* 修复xxxView执行多次的问题 ([37ab642](https://github.com/antvis/f2/commit/37ab642df62755d9d3e9147e944c7f121571c3f2))
* 修复一些 ts 报错 ([#1689](https://github.com/antvis/f2/issues/1689)) ([5e6b757](https://github.com/antvis/f2/commit/5e6b757bfb9aea33ac57b1cf09d9911c8f280d2d))
* 修复一些 ts 类型定义 ([#1660](https://github.com/antvis/f2/issues/1660)) ([4ca5417](https://github.com/antvis/f2/commit/4ca54179286e71d7d79930c98d062e0d19950231))
* 修复一些bug，并添加坐标轴的默认动画 ([3db6072](https://github.com/antvis/f2/commit/3db60725fc46e0d7a68d55ed66a7b66be4f5acfc))
* 修复一些问题 ([0bdf487](https://github.com/antvis/f2/commit/0bdf487e6addaf35096b27d69e77e5a20285da5d))
* 修复事件删除的bug，并补充单测 ([a7f3789](https://github.com/antvis/f2/commit/a7f3789942c65fa3c6a964990e4dfb92dae05539))
* 修复几个bug ([ea347dc](https://github.com/antvis/f2/commit/ea347dc9c6003a95cfe1c26f595843ff10c66482))
* 修复分组 tooltip 的显示问题 ([#1345](https://github.com/antvis/f2/issues/1345)) ([84686bb](https://github.com/antvis/f2/commit/84686bb34d6f0f29088a12412e65fc09b57fd076))
* 修复初始化padding问题 ([f22fb72](https://github.com/antvis/f2/commit/f22fb724ea8a94559bd04f5b5d5285cebe9bb2de))
* 修复单测 ([#1698](https://github.com/antvis/f2/issues/1698)) ([eb58f5a](https://github.com/antvis/f2/commit/eb58f5a16e592d15f81dcfaf6e7efd762deb02c7))
* 修复单测报错 ([18af273](https://github.com/antvis/f2/commit/18af273b9025060983f7644031ed148546f01e85))
* 修复单测文件 ts 类型报错 ([#1420](https://github.com/antvis/f2/issues/1420)) ([355f3ec](https://github.com/antvis/f2/commit/355f3ec512e42f9272c72c16e345b97712478c48))
* 修复变化的元素因为上次的缓存导致布局计算错误 ([a5d4e97](https://github.com/antvis/f2/commit/a5d4e9798e3acfbee70dc0d30bba508b8f69667c))
* 修复只有1个点时，tooltip不显示的问题 [#702](https://github.com/antvis/f2/issues/702) ([da62475](https://github.com/antvis/f2/commit/da624751e72fb74351f3278444ed5ec5977915cb))
* 修复图例过滤不考虑空数据的问题。 ([78ee9fc](https://github.com/antvis/f2/commit/78ee9fcaf6c2b657a05cbeaa6f696ff9a407f8c1))
* 修复图形的对齐方式 ([1882efa](https://github.com/antvis/f2/commit/1882efaa3f3258a5439437a4ce661c6acca67594))
* 修复存在NaN时，equal会陷入死循环 ([c4e277d](https://github.com/antvis/f2/commit/c4e277dd0f1412392787f72fb89b4d1d94036fcd))
* 修复官网条形图&进度条报错 ([11e703c](https://github.com/antvis/f2/commit/11e703c982d1b1aa99c4e6de60d3fcdad1d99d55))
* 修复官网条形图&进度条报错 ([#1556](https://github.com/antvis/f2/issues/1556)) ([7a8d478](https://github.com/antvis/f2/commit/7a8d478f306ed8e7dd255c2c095c1bf0938e8a4c))
* 修复官网的链接问题 ([1e8c0bf](https://github.com/antvis/f2/commit/1e8c0bfec92a979de940900285e4e91aa51d3cf0))
* 修复宽高改变的情况 ([#1507](https://github.com/antvis/f2/issues/1507)) ([51f312e](https://github.com/antvis/f2/commit/51f312ea4dbe23ae6f9bf7e04bf84318a54caf3d))
* 修复对类型换图点击选中的问题 [#682](https://github.com/antvis/f2/issues/682) ([10c4b04](https://github.com/antvis/f2/commit/10c4b0416ae9f2b18c8aa98e055f0948755adc2b))
* 修复小程序缩放后点图位置显示不正确。Closed [#1520](https://github.com/antvis/f2/issues/1520) ([#1521](https://github.com/antvis/f2/issues/1521)) ([3ca6caa](https://github.com/antvis/f2/commit/3ca6caab687066f23d7f81352c497ee548ea1031))
* 修复引用 @antv/f2 ts 类型报错 Closed: [#1406](https://github.com/antvis/f2/issues/1406) ([#1411](https://github.com/antvis/f2/issues/1411)) ([4ea5304](https://github.com/antvis/f2/commit/4ea5304056db3068cf7b089b06217247a885e78b))
* 修复当interval为小数时，小数位数会少1位 ([3a0bb6d](https://github.com/antvis/f2/commit/3a0bb6d6290d35b3edfe14ce3dae9aab9a62cf9a))
* 修复微笑定投的几个bug ([dc2e954](https://github.com/antvis/f2/commit/dc2e9546ae270032293703b8e693b9e1ee4c628e))
* 修复微笑定投的边界问题 ([029e343](https://github.com/antvis/f2/commit/029e343ba5662d8d61c470f8ca914e8b471e5dbd))
* 修复手势多次的重复渲染 ([#1793](https://github.com/antvis/f2/issues/1793)) ([b8c85c9](https://github.com/antvis/f2/commit/b8c85c946fd1af4b4e5152cda0c2a4d2d3fa484b))
* 修复折线的默认宽度和官网demo的报错 ([#1357](https://github.com/antvis/f2/issues/1357)) ([bc571bf](https://github.com/antvis/f2/commit/bc571bf37ad3cd17f11e178c821b4d0d97b24cc8))
* 修复报错 ([422c582](https://github.com/antvis/f2/commit/422c58230d73c1acee6ec5ae154954a1ef2dae3e))
* 修复支付宝小程序 d3 模块的编译报错 ([#1516](https://github.com/antvis/f2/issues/1516)) ([87c3773](https://github.com/antvis/f2/commit/87c3773d4b7220312e3419f69fc8caa389741e1b))
* 修复支付宝小程序typescript工程的报错 ([#1402](https://github.com/antvis/f2/issues/1402)) ([0ebd345](https://github.com/antvis/f2/commit/0ebd345eb350510be885507a5d6db6273c3e3701))
* 修复支小宝叙事中发现的一些问题 ([8dda137](https://github.com/antvis/f2/commit/8dda137db0a78f587e7c11583d11765845280e4e))
* 修复数据字段存在x,y时，再次mapping后，数据不对 ([db9def3](https://github.com/antvis/f2/commit/db9def3ed93392a443535df47923b8ed620989cc))
* 修复横屏展示 ([#1486](https://github.com/antvis/f2/issues/1486)) ([a55ffd1](https://github.com/antvis/f2/commit/a55ffd1411c57c669c0fb377df0374daad609832))
* 修复添加图片后，toDataURL 报SecurityError ([6c9f36f](https://github.com/antvis/f2/commit/6c9f36f0b6b136d485d8595a483b4420a7977735))
* 修复渲染树diff的问题，并补全单测 ([63a63d6](https://github.com/antvis/f2/commit/63a63d6bed8b56a1bf567da45fc9109e8fe72ba0))
* 修复漏斗图legend点击后，label位置不调整 Fixed [#979](https://github.com/antvis/f2/issues/979) ([9b43f4d](https://github.com/antvis/f2/commit/9b43f4d3847c13cdc6fd5fe9b0cd540d001fc8e8))
* 修复第1个子组件为空的报错 ([#1379](https://github.com/antvis/f2/issues/1379)) ([254262a](https://github.com/antvis/f2/commit/254262ad8576ae6e0c6050c14ed7aeb2016f29b8))
* 修复精度的单测 ([5c8e991](https://github.com/antvis/f2/commit/5c8e9910082f9531e367fc19b023b690f11eca03))
* 修复设置attr值域时被初始值覆盖的问题 ([bf9fa16](https://github.com/antvis/f2/commit/bf9fa16690c7d612eaadfbabdc8505d9d28b338f))
* 修复返回为null的case ([7079399](https://github.com/antvis/f2/commit/7079399813bb907ce5cf4dcf5083c3a9110cbac1))
* 修复部分404文档跳转链接 ([0c8fa82](https://github.com/antvis/f2/commit/0c8fa827464bcb5f7975bb76fc07e09631dfed10))
* 修复部分单测 ([70aa9ab](https://github.com/antvis/f2/commit/70aa9ab00bd3cfd309037b9f440f92941047862c))
* 修复雷达图在更新数据之后xscale不更新的问题 ([269defa](https://github.com/antvis/f2/commit/269defa9b6e3abc2d146a88a24c8c317e473c15d))
* 修复非浏览器环境时，currentStyle报错 ([f90affa](https://github.com/antvis/f2/commit/f90affa3440e6c18a118400305aa62ae60e66b5e))
* 修复默认字体设置不生效 ([#1307](https://github.com/antvis/f2/issues/1307)) ([901850a](https://github.com/antvis/f2/commit/901850abcccb372e8aff26bf7ba2bcd67177c24c))
* 修改 coord 的布局调整逻辑 ([#1344](https://github.com/antvis/f2/issues/1344)) ([f3c6b1d](https://github.com/antvis/f2/commit/f3c6b1d7804047f9780f5ddd15efe9099d3d4748))
* 修改 f-react 的版本依赖 ([#1680](https://github.com/antvis/f2/issues/1680)) ([c336deb](https://github.com/antvis/f2/commit/c336debf5331c16b47b022d09d391f665bba6531))
* 修改 FEngine layout 的命名 ([#1647](https://github.com/antvis/f2/issues/1647)) ([ec28248](https://github.com/antvis/f2/commit/ec28248666a1c7a972d6d19c49ec595ebff38da7))
* 修改 line geometry shape 获取 ([82771da](https://github.com/antvis/f2/commit/82771da92a132b332fc2ae883ef5c411c328ca75))
* 修改 style 优先级 ([8f0e182](https://github.com/antvis/f2/commit/8f0e1829c7dc17c7e90e5c05c06620e44315c749))
* 修改demo ([78b6d4f](https://github.com/antvis/f2/commit/78b6d4f1ac1a462a7594ede548377518bfa715cc))
* 修改demo实例图 ([b2de85a](https://github.com/antvis/f2/commit/b2de85a71ade567e77198b9ad09655e0f7929e7f))
* 修改npm 为内网地址 ([9359e0b](https://github.com/antvis/f2/commit/9359e0b2fedddaf5c5a710865d7241febd2b817d))
* 修改tickCount计算bug ([a1e5bbe](https://github.com/antvis/f2/commit/a1e5bbe0c90d8be5da62b419840d03a3086310cd))
* 修改tinker版本 ([dc1a09d](https://github.com/antvis/f2/commit/dc1a09dfdbd2609335814fb108bf537cb153bef4))
* 修改包依赖名 ([252283e](https://github.com/antvis/f2/commit/252283e4c46f8ffb6e72b3da8ad8d78d686b9c8e))
* 修改包名并构建成功 ([61ae828](https://github.com/antvis/f2/commit/61ae8289f8ff6e86e15169263accfabfc7305865))
* 修改变量名 ([70973f3](https://github.com/antvis/f2/commit/70973f3293c96515b840b1d006487671752fdc4b))
* 修改引用方式 ([9089dfc](https://github.com/antvis/f2/commit/9089dfccf9bec9bba901d3369ec731fb87b27fef))
* 修改构建方式 ([e470d2f](https://github.com/antvis/f2/commit/e470d2ff6aa1d8e9787f610ff92c0ee718b38260))
* 修改版本依赖 & pattern & vis包体积工具 ([#1609](https://github.com/antvis/f2/issues/1609)) ([950b65c](https://github.com/antvis/f2/commit/950b65c403851b08186366e47254014665578a0a))
* 修改错别字 ([#1377](https://github.com/antvis/f2/issues/1377)) ([7b54486](https://github.com/antvis/f2/commit/7b54486e4633259ef726a2c33a6e03ce9ca81172))
* 修改首页文案 ([7c6bc96](https://github.com/antvis/f2/commit/7c6bc9634c2af492697e6a6dec02e9feb5193e75))
* 修改首页演示图片 ([14147ad](https://github.com/antvis/f2/commit/14147ad8d37f7acecfcd74d4b4983bde37b443c0))
* 兼容 0.3.X scale timeCat type ([0107825](https://github.com/antvis/f2/commit/010782566268f7badc17e9fcbb277ed0a4ccd0ff))
* 再初始完成后，需要跟新ticks ([54a11e9](https://github.com/antvis/f2/commit/54a11e9dab685adf5802decae3a78260dc089ce3))
* 创意图结构修改 ([9c9c807](https://github.com/antvis/f2/commit/9c9c8077e155933ef97e51e910542767af4883ca))
* 初始化 this.context ([acd6932](https://github.com/antvis/f2/commit/acd6932543b0c729cc466d22cf8b8a6cf84660f8))
* 删掉遗留的多余字段 ([8e0fac2](https://github.com/antvis/f2/commit/8e0fac297b5f923567c35a62fce949535e8e634f))
* 删除元素不参与布局计算 ([d05753e](https://github.com/antvis/f2/commit/d05753e8ed7ab9462bf6d42364f6c76ac5693986))
* 刻度修改，修复单测 ([cff266f](https://github.com/antvis/f2/commit/cff266faeec49db52af7c6d2c6855f441773403d))
* 动画未播放完成时再次调用则清除计时器 ([c5b4a9d](https://github.com/antvis/f2/commit/c5b4a9d6f8e99e39ecb82a13ec358a15ff454a70))
* 动画空执行退出 ([d0ea34f](https://github.com/antvis/f2/commit/d0ea34f5c042593926502bad4094eec958a4709d))
* 升级 adjust。Closed: [#1494](https://github.com/antvis/f2/issues/1494) ([#1496](https://github.com/antvis/f2/issues/1496)) ([a2fba6e](https://github.com/antvis/f2/commit/a2fba6e7665f3200ea1143cfb54f54a05b037d5b))
* 单测修改 ([a46809e](https://github.com/antvis/f2/commit/a46809efbcc7176fe5d5ce13c87fb9dd4661af35))
* 去掉 react 单测里的 console.error 输出 ([#1503](https://github.com/antvis/f2/issues/1503)) ([8ba5a4c](https://github.com/antvis/f2/commit/8ba5a4ce2ffe9903a1cc9d74645a9d2094c3cea5))
* 去掉console.log ([73a3e22](https://github.com/antvis/f2/commit/73a3e229583019f99c2db6f000c61f73161eb83f))
* 去掉data-aspm, 会导致点击埋点不生效 ([0c685d1](https://github.com/antvis/f2/commit/0c685d1ce5a8f892f3030daefda88ac19e296825))
* 去掉lint jsx no unused vars warn ([#1260](https://github.com/antvis/f2/issues/1260)) ([a82e293](https://github.com/antvis/f2/commit/a82e29368f6b147fd07be93e41fd4e955c41ebc6))
* 去掉动画 ([1631651](https://github.com/antvis/f2/commit/16316514add051a16934e9d187788186397fe623))
* 去除多余jest配置 ([fa40727](https://github.com/antvis/f2/commit/fa40727c0d17b6f29454b736525ba3de3edf0fbe))
* 双y轴， getPosition取不到point. Fixed [#1004](https://github.com/antvis/f2/issues/1004) ([147a1c2](https://github.com/antvis/f2/commit/147a1c2c7f1ee689387f8804470158c59c33a197))
* 图例只支持分类数据 ([bfe5042](https://github.com/antvis/f2/commit/bfe5042207c916e17a1143329fd8cd123a077053))
* 图例更新 ([#1436](https://github.com/antvis/f2/issues/1436)) ([eaeacee](https://github.com/antvis/f2/commit/eaeacee2dd375736cf96139e803ac8ff4b80121d))
* 图表设置nice: false ([aa04dc1](https://github.com/antvis/f2/commit/aa04dc1a15ec205b277c1e0d966b568ffc42228e))
* 增加theme size默认值 ([a6a35c3](https://github.com/antvis/f2/commit/a6a35c3ddc94aeb793b2d3be458913bb7086ede4))
* 增加空值处理 ([30320f7](https://github.com/antvis/f2/commit/30320f7fb249c710b8caca09c1fde97fac36bdbb))
* 完善 Legend ([#1283](https://github.com/antvis/f2/issues/1283)) ([8c87ca0](https://github.com/antvis/f2/commit/8c87ca00881db0248fa897f729e56b2ad91302ed))
* 完善JSX.Element type的类型 ([#1259](https://github.com/antvis/f2/issues/1259)) ([0b1ce24](https://github.com/antvis/f2/commit/0b1ce24c5aa81b82ff352e38936ac70fb5a6057f))
* 官网 demo riddle 打开时报错 ([#1419](https://github.com/antvis/f2/issues/1419)) ([998eddc](https://github.com/antvis/f2/commit/998eddcad13ef4fb132a3337cbf0a69e147adcef))
* 官网默认版本号显示问题 ([#1291](https://github.com/antvis/f2/issues/1291)) ([f70c5ed](https://github.com/antvis/f2/commit/f70c5ed5a3dd71047901e5cc611f5f587d3a11ee))
* 导出 gauge hoc ([#1393](https://github.com/antvis/f2/issues/1393)) ([7ec0c8a](https://github.com/antvis/f2/commit/7ec0c8a4d3d6e114bd45ead52021262fe8ae6696))
* 导出类型 ([#1356](https://github.com/antvis/f2/issues/1356)) ([f2e668f](https://github.com/antvis/f2/commit/f2e668f941e0fba263296ed0da0038d142fb4829))
* 将 graphic/shape/arc 与 sector 中传给 context.arc 的 clockwise 参数名改为 anticlockwise 以正确表示其含义 ([b19693b](https://github.com/antvis/f2/commit/b19693b5f0c0c89341f6b8e15c54086c573ce533))
* 尝试发包 ([1c2eb11](https://github.com/antvis/f2/commit/1c2eb116f3eb862144cf1c29bfee39558e336d18))
* 左右滑动时禁止页面滑动 ([0026507](https://github.com/antvis/f2/commit/00265075b0913d585dcf289ee13094420ea9ab27))
* 异步问题调整 & 去掉 Graphic 依赖 ([#1573](https://github.com/antvis/f2/issues/1573)) ([91a14ed](https://github.com/antvis/f2/commit/91a14ed9afc04483de0c81318eb5bb99d652b33c))
* 引入 bug ([12f1993](https://github.com/antvis/f2/commit/12f1993fe4a75227ea60a9dd320219345bae850c))
* 引用hammerjs导致小程序报错 ([0c15a67](https://github.com/antvis/f2/commit/0c15a67c561cbd3896ff0ddd547a4825538081d7))
* 当adjust={{type: stack}} 堆叠柱状图最大值显示不对 ([c2ab9b9](https://github.com/antvis/f2/commit/c2ab9b90ebf5b7f93d1203d9279a2088ff48a88c))
* 微信小程序点击位置不正确。Closed [#1517](https://github.com/antvis/f2/issues/1517) ([#1518](https://github.com/antvis/f2/issues/1518)) ([156c008](https://github.com/antvis/f2/commit/156c0082449eb6f55bad1644677c2a5d98a5af06))
* 支付宝小程序示例点击不生效 ([#1519](https://github.com/antvis/f2/issues/1519)) ([c7efe6e](https://github.com/antvis/f2/commit/c7efe6e3417ce0db53b559ada6b4262406e92ef3))
* 支小宝叙事埋点 ([c0a53bf](https://github.com/antvis/f2/commit/c0a53bf00585b35eebcefed1b828e1573852e89e))
* 支小宝叙事调整部分视觉和动效 ([059f95b](https://github.com/antvis/f2/commit/059f95b759f46d28c873071fd5ec7c4c486d172d))
* 支持图形clip ([#1395](https://github.com/antvis/f2/issues/1395)) ([010c18f](https://github.com/antvis/f2/commit/010c18f9cafc550d116e62f4d6507a0f4cea173a))
* 收益率比例低于10%，不显示超越人数 ([9a89b6b](https://github.com/antvis/f2/commit/9a89b6b7e56a70aad296a03a254c2ad9d209ad33))
* 改为用 adjust 判断 ([e36e325](https://github.com/antvis/f2/commit/e36e325e77bf94f1ccb90c7fb1af52ded2029a23))
* 数据对象中存在 x,y 等关键字段 ([#1688](https://github.com/antvis/f2/issues/1688)) ([b6414ad](https://github.com/antvis/f2/commit/b6414adfdfa91de303211217e6125cc1791cd94f))
* 未设置geometry时，clear报错 ([065c7ea](https://github.com/antvis/f2/commit/065c7ea3b77a175ffdc3b582ce9d9490cb57efbb))
* 添加 runtimePublicPath ([#1797](https://github.com/antvis/f2/issues/1797)) ([f49b486](https://github.com/antvis/f2/commit/f49b486942fb8e4fc71a95c6072301e7353352a8))
* 添加browser字段。Closed [#789](https://github.com/antvis/f2/issues/789) ([e5a798f](https://github.com/antvis/f2/commit/e5a798f18d51910f62c61109ec0f1aa09a8d7373))
* 添加coord配置 ([a3cdc08](https://github.com/antvis/f2/commit/a3cdc08d98d5c341b669d3c95e6b804ffe66b958))
* 添加link判断和点击埋点 ([5ca323c](https://github.com/antvis/f2/commit/5ca323cec9ecf56d02864d8b8ec7ce5f4cb3146c))
* 添加swipe事件 ([eaa89f9](https://github.com/antvis/f2/commit/eaa89f9c703b59f2888b223275fdae92df464080))
* 添加主题设置 ([#1635](https://github.com/antvis/f2/issues/1635)) ([3020593](https://github.com/antvis/f2/commit/30205935bc24c07b1f52da7cee2c7f894b910912))
* 添加交互的几个钩子事件 ([16fbcae](https://github.com/antvis/f2/commit/16fbcaee333b7f0f5eb44e36b69a3da907253055))
* 添加动态排序图demo ([ee45806](https://github.com/antvis/f2/commit/ee458066688f0cc47e4a8639b0a5e559779c4601))
* 滑动x轴时，cat的ticks会被置成null ([49d4a86](https://github.com/antvis/f2/commit/49d4a86b1d7f916296b9cb809195fbea55d4b9c4))
* 特殊情况下interval不满足要求时，需要递归计算 ([5543d48](https://github.com/antvis/f2/commit/5543d488128d90adc63a685ff85747d63b242198))
* 视觉验收调整 ([28578d6](https://github.com/antvis/f2/commit/28578d6309eae26088c90b0ba8ec55dc1ee34e4c))
* 简化 adjust 判断 ([3d60a7f](https://github.com/antvis/f2/commit/3d60a7f5b09ed83bb8447fddb72196131478e7f8))
* 统一cat ticks 计算 ([2afe66f](https://github.com/antvis/f2/commit/2afe66f695612677f4d6cf2add22ae493a6a7459))
* 统一imageguide为style ([#1694](https://github.com/antvis/f2/issues/1694)) ([b2b34c1](https://github.com/antvis/f2/commit/b2b34c1b12e597aff5e20a4dc425de8591e4c990))
* 统一最层布局概念 ([51fedaa](https://github.com/antvis/f2/commit/51fedaa51fe2359432395ddff02d753f98079148))
* 统一处理小程序更新的逻辑 ([#1463](https://github.com/antvis/f2/issues/1463)) ([46b5a4a](https://github.com/antvis/f2/commit/46b5a4a88d3cb0224e68ca726c8f73ebeca1c6cc))
* 缩放后，legend点击会让缩放失效 ([b490bbe](https://github.com/antvis/f2/commit/b490bbe051316ce7803ea00acd12066bb4107e3b))
* 自定义px2hd。 Closed [#1462](https://github.com/antvis/f2/issues/1462) ([#1467](https://github.com/antvis/f2/issues/1467)) ([76f886a](https://github.com/antvis/f2/commit/76f886a558cd1788ef5f9982cb80ee9c3e2b352a))
* 补充types的定义 ([7e25cec](https://github.com/antvis/f2/commit/7e25cec82c99ee79c21969fa8f95e27bffded2b5))
* 补全和修复报错的用例 ([fa94240](https://github.com/antvis/f2/commit/fa9424094756ef2eb97d4eb3ee6a908a3a42bbf2))
* 调低react版本 ([ae75ad8](https://github.com/antvis/f2/commit/ae75ad8898e571c5aae088026a13cade2642ed4e))
* 调整demo的名称和g2尽量保持对齐 ([a1aa05a](https://github.com/antvis/f2/commit/a1aa05a86c28414cc37fbe217d552e76eed0b010))
* 调整Geometry里面scale的更新顺序 ([#1452](https://github.com/antvis/f2/issues/1452)) ([7ef9e86](https://github.com/antvis/f2/commit/7ef9e869c555884d23abe97bfb6e56b439aba035))
* 调整jsx的代码结构 ([0a9e43d](https://github.com/antvis/f2/commit/0a9e43dc9f56e79ec39a38faccb9f48c2bfb42ec))
* 调整timeline，去掉canvas 对 timeline 的依赖 ([#1301](https://github.com/antvis/f2/issues/1301)) ([e2a1266](https://github.com/antvis/f2/commit/e2a1266f29f7fa954e786d1043b41ee3e9677648))
* 调整一些细节 ([f79664a](https://github.com/antvis/f2/commit/f79664a9f5aa7631176fdbbb33326f6cc788d2ef))
* 调整一些细节和样式 ([03d4cab](https://github.com/antvis/f2/commit/03d4cab26e0612b8c40d4b2a2fcff69a5407ad5f))
* 调整决策树的demo地址 ([2acac92](https://github.com/antvis/f2/commit/2acac92890101d8b4b73f9df171bbb6298baa8f6))
* 调整支小宝样式和一些细节 ([50f21d4](https://github.com/antvis/f2/commit/50f21d4c5df9f8e68a318ecadc0a684f2c7a636c))
* 调整金牌经理样式 ([6aac09a](https://github.com/antvis/f2/commit/6aac09a020d809523fcce37a5f9f534dc84328a5))
* 跑通整体单测 ([92d4cd5](https://github.com/antvis/f2/commit/92d4cd51e01037d593718e2ea257cefbd42ddb7e))
* 连续平移后tick计算不对 ([4bb2870](https://github.com/antvis/f2/commit/4bb28700428574528dbf973263197f28c77f63c0))
* 透传组件animate状态 ([95ff644](https://github.com/antvis/f2/commit/95ff644d67132ffc6f8251b023c4e1c2911a7b27))
* 重新构建jsx ([20c3b06](https://github.com/antvis/f2/commit/20c3b06d55124ccd2fdc5f0e45f2256fabc539c1))
* 重新调整官网demo目录 ([#1269](https://github.com/antvis/f2/issues/1269)) ([0349d22](https://github.com/antvis/f2/commit/0349d228366d195e58286130039c8124a530e840))
* 闪蝶页面运行Ok ([40c6e22](https://github.com/antvis/f2/commit/40c6e22054308c645081800423da41ec8fdd3a98))
* 雷达面积图坐标不一致问题 ([#1273](https://github.com/antvis/f2/issues/1273)) ([831b48e](https://github.com/antvis/f2/commit/831b48e03f10e219899c794bde6c8d3c193110e7))
* 非线性映射 callback 回调支持 origin 入参 ([#1782](https://github.com/antvis/f2/issues/1782)) ([e9dbbcc](https://github.com/antvis/f2/commit/e9dbbcc4fccdc05d97fcc4d92e232601006ac8d2))
* 饼图scale适配调整 ([#1274](https://github.com/antvis/f2/issues/1274)) ([d4df362](https://github.com/antvis/f2/commit/d4df3621ecffe6f1c83f3060bd7d24f09b7b36c9))
* 饼图的动画配置不生效 ([#1385](https://github.com/antvis/f2/issues/1385)) ([094edd7](https://github.com/antvis/f2/commit/094edd7280593a1075c150a8cd57420e31ce71e8))
* 默认选中变化时不更新 ([#1408](https://github.com/antvis/f2/issues/1408)) ([a6e1276](https://github.com/antvis/f2/commit/a6e1276d7da0347657650381d0c19f0cb01a1da6))
* 默认透传context, 方便文本测算 ([b261dad](https://github.com/antvis/f2/commit/b261dad2b2b1fdc86f6c24c8786d9d78a0cfb61f))


### Features

*  add style func && fix lottie xy ([#1693](https://github.com/antvis/f2/issues/1693)) ([5e22591](https://github.com/antvis/f2/commit/5e2259167a1f7b901fbd8a9665a259783ac9b75d))
*  migrate-dumi-theme-antv ([#1651](https://github.com/antvis/f2/issues/1651)) ([7a758ed](https://github.com/antvis/f2/commit/7a758eda3c51c53cf87213f0f3ddfba2439535eb))
* 3.4.0 ([8a838e5](https://github.com/antvis/f2/commit/8a838e5b9710606858c5824172fd078a5be7128b))
* add 'shadow' graphic property for ant-mini-program. Closed [#486](https://github.com/antvis/f2/issues/486) ([b558ead](https://github.com/antvis/f2/commit/b558eada94993267e6c5c67190f1b93abfcf9152))
* add adjust & scale ([#1626](https://github.com/antvis/f2/issues/1626)) ([44cb0ef](https://github.com/antvis/f2/commit/44cb0ef97247b2070a39ae689cc767c3f8b0aa0c))
* add align and verticalAlign to support legend's layout. ([620d9fb](https://github.com/antvis/f2/commit/620d9fba51c89ae09aaa8186cd81110ac1d34d09))
* add alwaysShow(Boolean) for tooltip, to controller the display of tooltip. Closed [#177](https://github.com/antvis/f2/issues/177) ([4ad4b9f](https://github.com/antvis/f2/commit/4ad4b9fa0188881524fe4d7d22a7210dd44e542f))
* add area chart demo ([b9c5209](https://github.com/antvis/f2/commit/b9c52099f4c5ec30c5542a107d9eec138189f019))
* add axis symbol ([#1666](https://github.com/antvis/f2/issues/1666)) ([5546a0a](https://github.com/antvis/f2/commit/5546a0a52ff16e5e8032dc17b70329dd0fe50485))
* add bar chart && column chart select interaction. ([f224242](https://github.com/antvis/f2/commit/f22424249f81f2c9760a1780ddd2466dcc34d90e))
* add beforeAxisRender ([f3dedb5](https://github.com/antvis/f2/commit/f3dedb58a855362449148bfdd7937f4c56e10721))
* add chart.animate() method to support more shapes' animation. ([bac28f8](https://github.com/antvis/f2/commit/bac28f85920129723f41f3a71673959322ac05a3))
* add chart.changeSize(width, height) method. ([94ba563](https://github.com/antvis/f2/commit/94ba56327292b8ee450e168619c4d414e08b29d9))
* add chart.guide().regionFilter({}). ([334d3ca](https://github.com/antvis/f2/commit/334d3ca358140c135ca163f7fefe904afbaaad78))
* add chart.guide().tag(). ([7ff16e0](https://github.com/antvis/f2/commit/7ff16e06ff25650f41715c4ca78db665a3350c5d))
* add chart.registerPlugins() method. Closed [#116](https://github.com/antvis/f2/issues/116). ([e578106](https://github.com/antvis/f2/commit/e578106e184767c3acf7e9a2fb642bbbe806e986))
* add chart.scale() ([dee7019](https://github.com/antvis/f2/commit/dee70190cba96866a300a887fba401f221403497))
* add connectNulls for geometry to connect null points. Closed [#171](https://github.com/antvis/f2/issues/171). ([8729e8c](https://github.com/antvis/f2/commit/8729e8ce77bc2dc87a222c0f787ec15e4108ae1f))
* add English doc ([52e7680](https://github.com/antvis/f2/commit/52e76800f83cb647a4661d00359d642336a8de0e))
* add env detect variables, support node-canvas ([fcc792f](https://github.com/antvis/f2/commit/fcc792f2d59ca2b7092203aa98ad1d9c8e3d9b80))
* add f2 track. ([a301f3a](https://github.com/antvis/f2/commit/a301f3ab164ee002f5f486a3b1064a605caeb7a4))
* add F2.Global.legend.common and F2.Global.axis.common for generic theme configuration. ([becd26c](https://github.com/antvis/f2/commit/becd26c0917ae4307bf8551fe7a70b320dda8acc))
* add gesture doc ([65cc14d](https://github.com/antvis/f2/commit/65cc14d26f6caf6681b0052ec3a904d03c32f7b2))
* add guide-tag ([6ce3674](https://github.com/antvis/f2/commit/6ce3674e43b80791ba4c09daf6d51d90332fe468))
* add guide.repaint() method. ([e626def](https://github.com/antvis/f2/commit/e626def63607f86b2ef2cfb6ebd12defa1f7a570))
* add joinString property for legend. ([7bc7676](https://github.com/antvis/f2/commit/7bc76763a95f47363062e56650286af7ef56f3de))
* add label1offsetY, label2OffsetY to adjust label position for pie-label. ([7cac3ce](https://github.com/antvis/f2/commit/7cac3ce4f25171de03063012367bfaccad837043))
* add limitInPlot property for chart, to limit the drawing area of geometrys. ([74e5321](https://github.com/antvis/f2/commit/74e53218e9bc970feeab5e79ffb62310c31444cf))
* add lottie guide ([#1642](https://github.com/antvis/f2/issues/1642)) ([db273a0](https://github.com/antvis/f2/commit/db273a0b76172cefb6b1b80b76755ac1335bd813))
* add new gesture test-unit ([f269b39](https://github.com/antvis/f2/commit/f269b39c1ff59f638d646dfb2c94f7c2f8d661cb))
* add PieLabel plugin for rendering the labels of pie chart. ([6ba1c70](https://github.com/antvis/f2/commit/6ba1c70e3768fbdb1d28b05e41875104b97e24ef))
* add pinch and pan interaction. ([9ac5a54](https://github.com/antvis/f2/commit/9ac5a54ecc6a5824035f038c8d0c56e4a9c192ca))
* add radius property for Coord.Polar. ([f327ae2](https://github.com/antvis/f2/commit/f327ae2e3c758879fdd37053bbcf08f56e003603))
* add scripts canary ([#1735](https://github.com/antvis/f2/issues/1735)) ([eff31ef](https://github.com/antvis/f2/commit/eff31ef89c615b1d6b47c84b1f99d151c4aa3a17))
* add scrollBar plugin for pan and pinch interaction. ([08b18c3](https://github.com/antvis/f2/commit/08b18c388242bb19fa38831942c1c8a8aa86834a))
* add show() and hide() methods for Geometry instance. ([652ce74](https://github.com/antvis/f2/commit/652ce741d44087bec8a00de79608ec2913ed34b8))
* add startOnZero property for geom. ([cd6fc7e](https://github.com/antvis/f2/commit/cd6fc7ea7fa3d44638b97540a070fefe823e097f))
* add sync site action ([#1734](https://github.com/antvis/f2/issues/1734)) ([f6ec02c](https://github.com/antvis/f2/commit/f6ec02ce87a77fffda515cc40010b74f39678b70))
* add TagGuide ([#1363](https://github.com/antvis/f2/issues/1363)) ([a558e0f](https://github.com/antvis/f2/commit/a558e0f38159587a41a89c8e659ebee27e0278bb))
* add unCheckStyle for legend. ([bab731b](https://github.com/antvis/f2/commit/bab731bd85c826fb475ba69c70670eb625a3c6ae))
* add xRange yRange for pan and pinch ([a771ed3](https://github.com/antvis/f2/commit/a771ed3d7ab7062fd13ea3005071fe51dc5a5786))
* adjust interval ([f4ea6de](https://github.com/antvis/f2/commit/f4ea6de8d54c9e2cc376e9195f5add4432dca3ba))
* **animate:** easing support function ([8fb20b8](https://github.com/antvis/f2/commit/8fb20b8cffd8ce1d10cdac35be8c6f053ff0c74b))
* **animate:** support customize animation for each frame. ([5685e24](https://github.com/antvis/f2/commit/5685e242f91dcf1088e61c094f32361ba06e9d05))
* animation添加end方法，让动画到终态 ([de9efb7](https://github.com/antvis/f2/commit/de9efb7b43ff01e8c05b9b1a961cbdffecec2ff7))
* appendPadding support Array, just like padding. Closed [#195](https://github.com/antvis/f2/issues/195)。 ([606c996](https://github.com/antvis/f2/commit/606c996cff6847cf621fa7ab2fbb866b6bc55bd4))
* area chart support smooth shape ([#1275](https://github.com/antvis/f2/issues/1275)) ([593b323](https://github.com/antvis/f2/commit/593b32327cfd28b8fef4d839aace81762d2da702))
* area geometry ([6d0044d](https://github.com/antvis/f2/commit/6d0044d54b0f8c21105ba2b947e5e7d8072234e8))
* attr映射支持自定义map处理 ([460fefb](https://github.com/antvis/f2/commit/460fefb51e97c8ee34d8df9936576e4e7b496d4e))
* auto adjust tooltip's tips position. ([5b13ecd](https://github.com/antvis/f2/commit/5b13ecde2a86f23ca820ee65042a8106613a8801))
* auto padding. ([d05060a](https://github.com/antvis/f2/commit/d05060a558cf2095326593431a9e0976a6e77e0d))
* **axis:** axis label 回调 align 不生效 ([#1332](https://github.com/antvis/f2/issues/1332)) ([b78bdfd](https://github.com/antvis/f2/commit/b78bdfdcea6a2a2d62f5f55b58b3efd2a4e3b217))
* **axis:** label 回调函数第3个参数修改为ticks ([#1336](https://github.com/antvis/f2/issues/1336)) ([8fea790](https://github.com/antvis/f2/commit/8fea7902dec14105773a7f0dd6c5b110bc4dd529))
* axis的label和grid支持Function配置 ([#1252](https://github.com/antvis/f2/issues/1252)) ([29b066c](https://github.com/antvis/f2/commit/29b066c2ac7b0df7e302bde9572eb3e1c38b9047))
* basic tooltip ([969f5c6](https://github.com/antvis/f2/commit/969f5c69dc7c00225e9bc84f432e4b95b7a9532e))
* better script ([6742642](https://github.com/antvis/f2/commit/6742642c39feef1b3623bce4f959fba74f73def0))
* canvas render. ([d349a03](https://github.com/antvis/f2/commit/d349a0323eb09b24a1ca9d5712d30a22fb0965f8))
* canvas support wx miniprogram. ([f6c327a](https://github.com/antvis/f2/commit/f6c327a404621145b81afe9bfbcfecf252fbe190))
* canvas 支持传入 createImage。 Closed [#1462](https://github.com/antvis/f2/issues/1462) ([#1468](https://github.com/antvis/f2/issues/1468)) ([68ed467](https://github.com/antvis/f2/commit/68ed467b5cb07b67e9c259476da60245970faabd))
* canvas 支持添加classname ([6a2f98f](https://github.com/antvis/f2/commit/6a2f98f57fbdc4001c0a70ecacd58cae40187bac))
* canvas, chart 添加style 属性处理 ([ada44d2](https://github.com/antvis/f2/commit/ada44d2cabf8e268aeb6b2b8ac87f87c798213f1))
* chart legend support single select mode. ([ebf6db3](https://github.com/antvis/f2/commit/ebf6db35349b22b8b735a6f4f28afd1580ba9074))
* chart update ([#1739](https://github.com/antvis/f2/issues/1739)) ([ca29507](https://github.com/antvis/f2/commit/ca29507f0c4be588457ab2c6937589b206aa2cc1))
* chart update ([#1739](https://github.com/antvis/f2/issues/1739)) ([#1745](https://github.com/antvis/f2/issues/1745)) ([2ec22dd](https://github.com/antvis/f2/commit/2ec22ddf7013be41ccc2b37adf327f14c8208c24))
* chart添加事件处理 ([bc9afcd](https://github.com/antvis/f2/commit/bc9afcda4c2a453bf0614d6ccef1bd55f16d2ed6))
* clip 支持函数方式创建 ([#1500](https://github.com/antvis/f2/issues/1500)) ([abcd513](https://github.com/antvis/f2/commit/abcd5136d5665fdf258175f01fbda8433f78e5a2))
* component 支持外部定义的 props 类型传入 ([#1685](https://github.com/antvis/f2/issues/1685)) ([7a90906](https://github.com/antvis/f2/commit/7a90906c50da33b1b78922bab99700ccefbda3cf))
* coord 添加默认的padding逻辑 ([af88ed3](https://github.com/antvis/f2/commit/af88ed3c0b0e16fe43d0e22c32d16e65b1095cb5))
* custom clip ([#1569](https://github.com/antvis/f2/issues/1569)) ([bc070ff](https://github.com/antvis/f2/commit/bc070ffac8b85af6325839ee9b0806353181cbb8))
* export tooltip component ([4067ecd](https://github.com/antvis/f2/commit/4067ecd7a275478c309647ff2fe4e59ee6ce4394))
* f2 新增 umd 构建包 ([#1295](https://github.com/antvis/f2/issues/1295)) ([e0d4bab](https://github.com/antvis/f2/commit/e0d4bab729dc90c04a26273e6c6d1d5dd173e24b))
* **f2-my:** 优化 AppX2 下 canvas 组件宽高设置 ([#1327](https://github.com/antvis/f2/issues/1327)) ([2305c99](https://github.com/antvis/f2/commit/2305c99a250dbf7f4b90c460a64584b0d5866b93))
* **f2-my:** 兼容新版 Canvas 接口（基础库 2.7.0 起） ([#1319](https://github.com/antvis/f2/issues/1319)) ([d482154](https://github.com/antvis/f2/commit/d4821543db9eff8f869b89014381abcdcd19cc36))
* files cjs => esm ([380c53d](https://github.com/antvis/f2/commit/380c53db0be4f6a6772638f2506621c813b09cb0))
* gauge 支持 view 的 props ts 类型扩展 ([#1728](https://github.com/antvis/f2/issues/1728)) ([328aa7e](https://github.com/antvis/f2/commit/328aa7e23c9ddbcd6d1144227164c7d2ee6d093e))
* **GeomBase:** add ignoreEmptyGroup config to geom base ([bb1b010](https://github.com/antvis/f2/commit/bb1b010720694220255d322e522b05329ffbe265)), closes [#716](https://github.com/antvis/f2/issues/716)
* geometry 透出 getAttr 方法 ([#1364](https://github.com/antvis/f2/issues/1364)) ([6bb9ce9](https://github.com/antvis/f2/commit/6bb9ce9fd047d64fad3fa779f3b2fc5f07ec1691))
* geom添加getRecords方法 ([7ab4372](https://github.com/antvis/f2/commit/7ab43728e8b74ee51cf594bdb7dc12ee7f98a2d4))
* gesture-plugin ([4de892c](https://github.com/antvis/f2/commit/4de892c9b85491877b9bbf0d1ff8d388cdef0f02))
* getSnapshot支持饼图 ([#1380](https://github.com/antvis/f2/issues/1380)) ([c3a0a04](https://github.com/antvis/f2/commit/c3a0a045f199afd0e49c21a994a4dd7c8751bba8))
* Group support matrix animation ([0789075](https://github.com/antvis/f2/commit/0789075fdf7994e95f8a4b555ec60945b231b737))
* group 支持添加背景 ([94403b6](https://github.com/antvis/f2/commit/94403b69b4827910e07c455077b81f836830a0c8))
* Guide component add limitInPlot property to limit guide draw in chart plot area. Closed [#203](https://github.com/antvis/f2/issues/203) ([05bf832](https://github.com/antvis/f2/commit/05bf832c195338973bc76104dfe7480708f42ed5))
* Guide component support change visible. ([1ba0db1](https://github.com/antvis/f2/commit/1ba0db13eaea3d24c82cb16646136636e032cfdb))
* guide offset 支持 px 单位 ([#1434](https://github.com/antvis/f2/issues/1434)) ([e389ec2](https://github.com/antvis/f2/commit/e389ec2febc5ead3c7b2679a6e61d7428bb09b5d))
* Guide 支持动画callback配置 ([#1370](https://github.com/antvis/f2/issues/1370)) ([8939785](https://github.com/antvis/f2/commit/8939785bbca09d9f2fa41c0bbe4066f13219028a))
* **guide:** LineGuide ([c6b3015](https://github.com/antvis/f2/commit/c6b3015a1cc214362d15dd0c31baf0f790342556))
* **guide:** support offset setting for Guide.Text. ([2f2d908](https://github.com/antvis/f2/commit/2f2d9084ac77e82c136a8564ccfc0c1e4c221165))
* **guide:** withGuide 和 TextGuide ([f98625f](https://github.com/antvis/f2/commit/f98625f53fb1f97dc1e5dda2a1d259a56e5d22ad))
* ignore test file ([#1239](https://github.com/antvis/f2/issues/1239)) ([b0f1b23](https://github.com/antvis/f2/commit/b0f1b2348abc818c445add39e1c1265d2273ca45))
* image shape 支持fillOpacity设置 ([5e70013](https://github.com/antvis/f2/commit/5e7001301fb56c4a3dcfef1086f93643f3a51eda))
* image 添加 radius 属性 ([31ddbc5](https://github.com/antvis/f2/commit/31ddbc50fe69db04145718f816d81af5e07133ce))
* Interval Label ([#1277](https://github.com/antvis/f2/issues/1277)) ([704e1a0](https://github.com/antvis/f2/commit/704e1a05b6716e67cedd983f09bb2412dae8a3e8))
* interval 支持传入函数 ([#1582](https://github.com/antvis/f2/issues/1582)) ([2c15d8a](https://github.com/antvis/f2/commit/2c15d8a5bf09016f3a76e3c35cc0ff536fbe8bfb))
* interval 柱状图绘制 ([85101ae](https://github.com/antvis/f2/commit/85101aeb030f8f94d46ac3ee3dcabbf97995d806))
* interval-select interaction support highlight axis label. ([f92986f](https://github.com/antvis/f2/commit/f92986f832e91aa3c64a5105653575689d64850f))
* legend 增加 clickable 配置 ([#1433](https://github.com/antvis/f2/issues/1433)) ([5abaa87](https://github.com/antvis/f2/commit/5abaa8710e99aec1cebb294857752092a14b6379))
* legend 支持 nameStyle 和 valueStyle ([#1387](https://github.com/antvis/f2/issues/1387)) ([eb24656](https://github.com/antvis/f2/commit/eb246560c99d6a9b6bad200f02f7062b79503e06))
* Legend 支持 onClick 回调. Closed [#1511](https://github.com/antvis/f2/issues/1511) ([#1512](https://github.com/antvis/f2/issues/1512)) ([20589b4](https://github.com/antvis/f2/commit/20589b49775d8f069def3e6dedf41b7660cbfc9a))
* mapping 传入全部映射数据 ([#1559](https://github.com/antvis/f2/issues/1559)) ([d4a3a5b](https://github.com/antvis/f2/commit/d4a3a5b7e8eb849cf02fa8227d599307259d899c))
* merge master  ([#1681](https://github.com/antvis/f2/issues/1681)) ([1a20463](https://github.com/antvis/f2/commit/1a20463dc288d3ad36b09f7f03a43303d99c6618))
* optimize category scale's normalization of non-drawing data. For pan and swipe interaction. ([14556a2](https://github.com/antvis/f2/commit/14556a294b3922c5219b0017a5437898bbd3fa4b))
* pie-select and interval-select support cancelable property. ([fd27072](https://github.com/antvis/f2/commit/fd270725c7febf2f438fb11f0894dc9d21af439f))
* PieLabel plugin support active selected shape. ([fc06bca](https://github.com/antvis/f2/commit/fc06bca3bd07f8ffe32935ab7ec9ad0b64ed9dd8))
* pielabel sidePadding ([#1455](https://github.com/antvis/f2/issues/1455)) ([bec4860](https://github.com/antvis/f2/commit/bec48609dc5e2cd464d12c70e26b264f58944902))
* pinch 添加range配置 ([9560f70](https://github.com/antvis/f2/commit/9560f70de8b9c32f99f4274c4dc21d9e09811659))
* plugin ([251806e](https://github.com/antvis/f2/commit/251806e49c033f86a7ef76cf9846c80c9db07a87))
* position support for mixing of keyword, percent and value. ([e24e3a2](https://github.com/antvis/f2/commit/e24e3a2cc2ca56cf9881ebf67bf6fea2432bc8bb))
* React 组件增加 onError 事件透出 ([#1499](https://github.com/antvis/f2/issues/1499)) ([9343523](https://github.com/antvis/f2/commit/9343523c06bcfcd7dd688d8f526604bdc279815b))
* refactor axis component and add top property. ([78180ed](https://github.com/antvis/f2/commit/78180ed10689da04fd8257049d8d88026f37c85e))
* remove scalue._toTimeStamp ([b3c0771](https://github.com/antvis/f2/commit/b3c0771383aa21ce62ae9bccb0e95259837b26ab))
* rollup ([4904a04](https://github.com/antvis/f2/commit/4904a04958a4ecdfb605c4988d5f4587bdbfe2a8))
* scale 版本0.3.3 ([70ef710](https://github.com/antvis/f2/commit/70ef7108cd946992d6fa221ddc52787302c1931e))
* support 'x', 'y', 'xy' three types for tooltip crosshairs, and support xTip and yTip display for tooltip. Closed [#369](https://github.com/antvis/f2/issues/369). ([7fad5c7](https://github.com/antvis/f2/commit/7fad5c78eeeb782a498668cae56af82bfa24de30))
* support ant miniprogram ([58cc837](https://github.com/antvis/f2/commit/58cc8375ce7f8f97e23517f6d1085c3fe4ff0c99))
* support CanvasRenderingContext2D instance. ([8dade8c](https://github.com/antvis/f2/commit/8dade8c89a8b789d58301dc4d1105616155aed0b))
* support dodge margin ([db9ead5](https://github.com/antvis/f2/commit/db9ead50aa771795f11ef882518d24baaac77643))
* support F2.Util. ([2386490](https://github.com/antvis/f2/commit/2386490c0ecc2f7f49171966987b45278ff2c1fd))
* Support for rotation of text shapes. ([8d01b4d](https://github.com/antvis/f2/commit/8d01b4d6a18f330fb5a4df8a219f37c970cf4658))
* support guide animation. ([51fd1dd](https://github.com/antvis/f2/commit/51fd1dd8ea303a44745bca29151828869dcf838c))
* support multiple y axis for guide. Closed [#64](https://github.com/antvis/f2/issues/64) ([fe9b1bd](https://github.com/antvis/f2/commit/fe9b1bd785bc227fb75275728f53a4bb01517bff))
* Support polar coordinate grid lines can be drawn as arcs. ([e8178a9](https://github.com/antvis/f2/commit/e8178a99926e20103ed74cd8f2eb2c063869f5ae))
* support progress bar for pan and pinch. ([a275112](https://github.com/antvis/f2/commit/a275112916bc24b2c8db551f641bf80f9c35836f))
* support select mode for interval-select interaction. ([e14d584](https://github.com/antvis/f2/commit/e14d584dbc2c63bec80af08961ebe2dc89ef2430))
* support set default selected shape for pie-select and interval-select interaction. Related to [#248](https://github.com/antvis/f2/issues/248). ([55364d5](https://github.com/antvis/f2/commit/55364d598065fbc414e6c4c39bb9d6e56bda1214))
* support set gradient color in default. Closed [#243](https://github.com/antvis/f2/issues/243). ([20b18a9](https://github.com/antvis/f2/commit/20b18a90c42b75eb98b60c1fa31d72db20152ffc))
* support setting axis's position. ([6a6a911](https://github.com/antvis/f2/commit/6a6a911cc4c3b14eb81093ebb89c6a59a928bb15))
* support snap property for crosshairs. ([267e59e](https://github.com/antvis/f2/commit/267e59ebe249ebc38bad2abed0f3e6ca29933d4c))
* support speed and step setting for category scale pan interaction.Closed [#357](https://github.com/antvis/f2/issues/357),[#343](https://github.com/antvis/f2/issues/343). ([fbcf0c8](https://github.com/antvis/f2/commit/fbcf0c89f0224e4bc118aed8e6de82664457c7ff))
* support swipe interaction. ([5fb037f](https://github.com/antvis/f2/commit/5fb037f9d7b8f0c059af10b885184a3363b933c2))
* support syncY property to unify multiple Y-axis data ranges. Related to [#258](https://github.com/antvis/f2/issues/258). ([854685e](https://github.com/antvis/f2/commit/854685e829b160583cf62ede0a9faf621a572e75))
* test case cjs => esm ([66022b7](https://github.com/antvis/f2/commit/66022b75c7fa05953c959c4700abe29301367bf4))
* test 支持 snapshot 对比 ([#1310](https://github.com/antvis/f2/issues/1310)) ([e161d7a](https://github.com/antvis/f2/commit/e161d7a47f919bd140e8faea43d1abf8dc70fcc6))
* the drawing order of geoms can be decided by scale values. ([1f2993e](https://github.com/antvis/f2/commit/1f2993e6ba818d795108522b56f9d5949a8b7d2c))
* the drawing order of geoms can be decided by scale values. ([4059801](https://github.com/antvis/f2/commit/40598014b760116c8d396fbf85d7463b99ec8cf1))
* tooltip onChange event ([#1313](https://github.com/antvis/f2/issues/1313)) ([735e1e7](https://github.com/antvis/f2/commit/735e1e7e7270a2182e185fa14401a317cdc648a3))
* tooltip polar crosshair ([#1447](https://github.com/antvis/f2/issues/1447)) ([0786f94](https://github.com/antvis/f2/commit/0786f94a293a45d277dcced8740f7a104889d4d0))
* tooltip tip content support callback. ([506b1fb](https://github.com/antvis/f2/commit/506b1fb259a8acaf496995549bf894278e56b60b))
* tooltip 功能完善 ([#1302](https://github.com/antvis/f2/issues/1302)) ([1719c53](https://github.com/antvis/f2/commit/1719c530ea9dc421f772ffeb175c9422991e793f))
* tooltip 增加轴辅助信息 ([#1306](https://github.com/antvis/f2/issues/1306)) ([8cc1c1d](https://github.com/antvis/f2/commit/8cc1c1d310004c70edf923093c70ee86e0b25317))
* tooltip 支持自定义文本内容 ([#1557](https://github.com/antvis/f2/issues/1557)) ([7406ce7](https://github.com/antvis/f2/commit/7406ce7814855fa4841b8a4c7d4f54b1246c9361))
* **tooltip:** miniprogram support xTip. Closed [#460](https://github.com/antvis/f2/issues/460). ([d037e73](https://github.com/antvis/f2/commit/d037e7325e50434d97e0a48a2a4d7214aeefe76e))
* **tooltip:** 调整snap和辅助线渲染顺序,并使得snap可自动设置填充色 ([#1459](https://github.com/antvis/f2/issues/1459)) ([46fb275](https://github.com/antvis/f2/commit/46fb275b21dc28f417fce665396e2e2bc0abd2c8))
* **tooltip:** 默认展示 tooltip ([#1328](https://github.com/antvis/f2/issues/1328)) ([e9bed58](https://github.com/antvis/f2/commit/e9bed58e02b5f9b320d39f1012e752e1bfb26b10))
* travis config ([3464227](https://github.com/antvis/f2/commit/34642271c0c6fd6f6d98f2d4b00ba8f8d14bc74e))
* treemap selection ([#1791](https://github.com/antvis/f2/issues/1791)) ([c1fc8c1](https://github.com/antvis/f2/commit/c1fc8c1144769ca8689de8aade37a6fc255c57fe))
* treemap 支持 props 的扩展和定义 ([#1727](https://github.com/antvis/f2/issues/1727)) ([4b6c88c](https://github.com/antvis/f2/commit/4b6c88c82bc0f95570e4843671a12e02dedf8079))
* **types:** add Animate ([1deee96](https://github.com/antvis/f2/commit/1deee96a3ab48cd37a4478ba3b0bccc36accf124))
* **types:** add Axis ([eb03d02](https://github.com/antvis/f2/commit/eb03d02ed3e0375797b08921a90470e7ba3726c2))
* **types:** add CanvasProps ([3d90248](https://github.com/antvis/f2/commit/3d902484f52e8d21fd68cf1a1c2c49942e6c407c))
* **types:** add Chart ([b91d08a](https://github.com/antvis/f2/commit/b91d08ac221528fc71cd6b337d3336b858f75d89))
* **types:** add Coordinate ([bd33cae](https://github.com/antvis/f2/commit/bd33cae6ae53fa5496a8c9ce8f307228c64e8a60))
* **types:** add Data ([bc5cd7e](https://github.com/antvis/f2/commit/bc5cd7e4000e97dda1303a4a0ad1391ed438dec8))
* **types:** add G ([e292269](https://github.com/antvis/f2/commit/e2922695a51879c74ec344e9fd2be4010d73e50c))
* **types:** add Geometry ([be17d68](https://github.com/antvis/f2/commit/be17d68d0b5ec9d433a7ce588f28b0e8c409227e))
* **types:** add Gesture ([253ba56](https://github.com/antvis/f2/commit/253ba56079559d25b735de3d673994af3276b1cc))
* **types:** add Global ([51eb6a7](https://github.com/antvis/f2/commit/51eb6a7caa915faee158140a12ac87a9eadb316e))
* **types:** add Guide ([cde0cc7](https://github.com/antvis/f2/commit/cde0cc789da79175fe54c4c328d16dd48f364a39))
* **types:** add Interaction ([7dcd22b](https://github.com/antvis/f2/commit/7dcd22b02336b15970cf271b01979b2b5621ccad))
* **types:** add Legend ([43f32ec](https://github.com/antvis/f2/commit/43f32ecd26bbd9553349549ba8ce5e4ff4f2e14f))
* **types:** add PieLabel ([dd83157](https://github.com/antvis/f2/commit/dd83157f94fddb50c0e76c7b3a164bd66c670b47))
* **types:** add Plugin ([30081c1](https://github.com/antvis/f2/commit/30081c1a77c502399e204f096615f46fcc5387c6))
* **types:** add Point ([afe90fd](https://github.com/antvis/f2/commit/afe90fdc6d4fa1855e687354a20589ebdfeb3236))
* **types:** add Scale ([bb96ee4](https://github.com/antvis/f2/commit/bb96ee418c35cc3f8ead685277a2843cffbbe8d2))
* **types:** add ScrollBar ([9f0e2a3](https://github.com/antvis/f2/commit/9f0e2a3d79a79f9d1d0e808399de28f743bbdcd7))
* **types:** add Shape ([6c29f58](https://github.com/antvis/f2/commit/6c29f580a86ceb86a097ea3fc4576220c07e2862))
* **types:** add tests ([6fd6880](https://github.com/antvis/f2/commit/6fd688063f88c86145acff94d56a946df28ce2ea))
* **types:** add Tooltip ([ad05274](https://github.com/antvis/f2/commit/ad0527496a30aefb68d2128c8f1d4b79bc7ec38e))
* **types:** add Util ([9762a40](https://github.com/antvis/f2/commit/9762a40bf46821605cd39db3132b087c434e2f64))
* **types:** improve ([8d25c48](https://github.com/antvis/f2/commit/8d25c48e75b78906362ef5df694b8f25662cc048))
* **types:** improve ([85d75d8](https://github.com/antvis/f2/commit/85d75d81ce77940a375bce3a1f4042778b0271d6))
* **types:** improve ([ccabc2c](https://github.com/antvis/f2/commit/ccabc2c330cc5d6ab0bfda4756bdb8767ad68a2c))
* **types:** improve ([0f6100a](https://github.com/antvis/f2/commit/0f6100acddfaafd1dd7e5629d278011fbcb8083c))
* **types:** improve CanvasProps ([2ab3195](https://github.com/antvis/f2/commit/2ab3195ef93589473cd37bfd613797d7c2dfcd5b))
* **types:** improve ChartInnerProps ([e305985](https://github.com/antvis/f2/commit/e305985b16aa90c6615885f2e7ba780cc6a93a3e))
* **types:** improve Geometry ([ec6ccfb](https://github.com/antvis/f2/commit/ec6ccfb942c651455b103dc33d83a501a490251e))
* **types:** improve Geometry ([9075b46](https://github.com/antvis/f2/commit/9075b46ae2309affa963cfda43e37cd0916078bd))
* **types:** improve Scale ([5813655](https://github.com/antvis/f2/commit/58136550a08cd8bf2e0090bb0edae40b824644f5))
* **types:** improve ScaleProps ([64211ea](https://github.com/antvis/f2/commit/64211ea45132401080c0d57f645a0846e774131d))
* **types:** improve Tooltip ([408cd22](https://github.com/antvis/f2/commit/408cd222e5d0881575c8f70b7d186d22d7217917))
* umd 构建透出 global.FEngine ([#1671](https://github.com/antvis/f2/issues/1671)) ([fe64989](https://github.com/antvis/f2/commit/fe649897e7190409a82fcb95b907ad5d3369d8a3))
* update 新增销毁和新建逻辑 ([bff0164](https://github.com/antvis/f2/commit/bff01644d28fa8f4bf497edf6292196dc888bcca))
* weaver图 ([75a1183](https://github.com/antvis/f2/commit/75a1183cad54c3d67285e50b573b23d82c25f40c))
* 临时保存 ([75eabce](https://github.com/antvis/f2/commit/75eabcef350445fb85610061bfc0f012e1cb8da8))
* 为 tooltip 的 xtip/ytip 增加 text 样式配置 ([bbbdf91](https://github.com/antvis/f2/commit/bbbdf91a9c0c4930fbaa11f5ab6b927636750aa3))
* 事件监听在chart上 ([#1731](https://github.com/antvis/f2/issues/1731)) ([9032819](https://github.com/antvis/f2/commit/903281917526be326e51643acc7abd9afb97bc0b))
* 优化官网文档 ([#1704](https://github.com/antvis/f2/issues/1704)) ([4ba351c](https://github.com/antvis/f2/commit/4ba351c8f3f5e86609a3c27d4f14c08c36d3ec03))
* 优化更新逻辑 ([c08d0e7](https://github.com/antvis/f2/commit/c08d0e756ee62d32b3c60935fcfd51b2abe8933c))
* 优化更新逻辑 ([9e68a77](https://github.com/antvis/f2/commit/9e68a771024ce66cdfa281c0978f50bb2a1b967b))
* 优化更新逻辑和性能 ([1ead15f](https://github.com/antvis/f2/commit/1ead15f6987557504b0c1a1be26f60db5c25dd1a))
* 优化组件更新策略 ([b5795eb](https://github.com/antvis/f2/commit/b5795eb55768f24798267194f9cad8790923e2fb))
* 使用jest 内置expect断言 ([77c440f](https://github.com/antvis/f2/commit/77c440f7fcb0c11266f8f774345f126f677726a2))
* 使用教程的文档迁移 ([81b6f1f](https://github.com/antvis/f2/commit/81b6f1f9e9c8706bcef7fe58385b2106459f42bc))
* 依赖scale 0.3.2 ([d55d316](https://github.com/antvis/f2/commit/d55d316120d5ab99b9332e7b4bf0db965759c8a1))
* 修复treemap坐标 & 增加theme space接口 ([#1723](https://github.com/antvis/f2/issues/1723)) ([d695095](https://github.com/antvis/f2/commit/d6950952b37914c5b5dafbe7d38411d47d2963a9))
* 修改scale度量修改的单测 ([52dc331](https://github.com/antvis/f2/commit/52dc33132853ad24be0dfe5cc68e57cb1fe4a11e))
* 修改tooltip & zoom事件监听 ([#1720](https://github.com/antvis/f2/issues/1720)) ([00c082b](https://github.com/antvis/f2/commit/00c082b4a6e712e62ae62a0bab81e76fac7ee735))
* 修改仪表盘并添加demo ([#1392](https://github.com/antvis/f2/issues/1392)) ([24d4b69](https://github.com/antvis/f2/commit/24d4b69ab7c658e42280d3c9fe45f8efeb5b0ef7))
* 修改类型定义 ([#1272](https://github.com/antvis/f2/issues/1272)) ([243667f](https://github.com/antvis/f2/commit/243667fd88e44a47854a87e80ae8da87bb6105a5))
* 修改线样式 ([9db06b4](https://github.com/antvis/f2/commit/9db06b403765e6ece49971a3e900fb7b5786c8aa))
* 元素状态统一成常量 ([73adbfa](https://github.com/antvis/f2/commit/73adbfac1ec69db46e4493e3ce29bddae1faa143))
* 刻度值优选原则 ([b0594f6](https://github.com/antvis/f2/commit/b0594f64bd51856518b39f8774f315840079525b))
* 动画的基础逻辑 ([6d9be2c](https://github.com/antvis/f2/commit/6d9be2c1288a6ae00b11b925af2b1b88d63e0a34))
* 升级@antv/gatsby-theme-antv主题 ([34f521a](https://github.com/antvis/f2/commit/34f521ab4d9b265b893cf287add5e2e7169de086))
* 升级@antv/util ([30babec](https://github.com/antvis/f2/commit/30babec11ba4169f5c420360dbcb9337ba884414))
* 单测补齐 浮点数判断 ([52cbf6d](https://github.com/antvis/f2/commit/52cbf6dbbf375b0cf04dd0c5bb3da444bc6149b1))
* 去除icon ([cf8c12e](https://github.com/antvis/f2/commit/cf8c12ebe47f18943aea41b838cf973293a5cc8c))
* 只有在有style时，才计算布局 ([4d56d26](https://github.com/antvis/f2/commit/4d56d269ee43c9890440b2d4d2a977a3a50827e6))
* 可手动关闭动画执行 ([a6e23f5](https://github.com/antvis/f2/commit/a6e23f5a939eef3dd7343d375984091beb6b7888))
* 图形选中支持自定义事件 ([#1397](https://github.com/antvis/f2/issues/1397)) ([6381fa8](https://github.com/antvis/f2/commit/6381fa8537bd9ac20f978af873a45bb86320f656))
* 图片添加缓存配置，防止重复加载的抖动 ([bc95e20](https://github.com/antvis/f2/commit/bc95e2006b449a3373328a5fab53faa9db8fb568))
* 图表示例名称修改 ([7e81330](https://github.com/antvis/f2/commit/7e813303a05b69dab5d19c9f4bcf34de35b12ea1))
* 增加 tslint 并 fix ([#1233](https://github.com/antvis/f2/issues/1233)) ([8517780](https://github.com/antvis/f2/commit/85177803c7344b8bdb33a60d0d6d8de76b9223cd))
* 增加f2 自定义time-cat scale算法 ([83a556b](https://github.com/antvis/f2/commit/83a556b1d62cc745f4d41344225d2cdb664aa111))
* 增加ticks算法单测 ([12f6d69](https://github.com/antvis/f2/commit/12f6d69d2852aa8d176f618c2a01a659db83243e))
* 增加官网demo ([#1699](https://github.com/antvis/f2/issues/1699)) ([82291ec](https://github.com/antvis/f2/commit/82291eca0259b019cbf0b1c98ba50de0a6383877))
* 增加空值处理 ([98cf9ee](https://github.com/antvis/f2/commit/98cf9ee5ddccc7a8b9b310b7635deba333adbf66))
* 增加面积图 demo，增加 stack 支持 ([dc34d91](https://github.com/antvis/f2/commit/dc34d9192164280f361fa14c6bc69371ac27eef9))
* 复杂交互支持小程序 ([707f619](https://github.com/antvis/f2/commit/707f61980dce403967d9fd800a898d7d946d53a6))
* 多端多环境的适配与支持 ([458c3fb](https://github.com/antvis/f2/commit/458c3fbf576b3123a1527adc5f7fbb99a0762c7d))
* 大部分绘制能力对接完成 ([#1502](https://github.com/antvis/f2/issues/1502)) ([3486d70](https://github.com/antvis/f2/commit/3486d703c40f82c03798657a59df98875f93b5ae))
* 完善 axis 类型定义 ([#1242](https://github.com/antvis/f2/issues/1242)) ([e51071a](https://github.com/antvis/f2/commit/e51071aa80e069719ff7e828d1a756489da13d7a))
* 完善 ts 定义 ([#1238](https://github.com/antvis/f2/issues/1238)) ([6c49bb9](https://github.com/antvis/f2/commit/6c49bb922941803fb9bf7a58705b3763f1288266))
* 完备 ts 定义 ([#1276](https://github.com/antvis/f2/issues/1276)) ([15e6168](https://github.com/antvis/f2/commit/15e6168c893f0e5d0f75b5c569c0496e4c063312))
* 完成一张图 ([b9419ec](https://github.com/antvis/f2/commit/b9419ec122947b63c9f9f4920e5e8fd6c3ac504b))
* 完成基础折线图示例 ([98bde42](https://github.com/antvis/f2/commit/98bde42a4612f19101143f5d20138cd8a7459c23))
* 完成基础渲染 ([17566b7](https://github.com/antvis/f2/commit/17566b74c3db08deb78fff677ee7b79088bff19f))
* 完成微笑定投 ([8d83c78](https://github.com/antvis/f2/commit/8d83c784add5b823f220b3a76cbc58938027532e))
* 完成金牌经理图 ([faa4951](https://github.com/antvis/f2/commit/faa49510d6b6b13d029479da4b70e14572ee6ce9))
* 导出renderShape ([#1362](https://github.com/antvis/f2/issues/1362)) ([bcb9407](https://github.com/antvis/f2/commit/bcb94079027de6b87312247fd86f4e585113980f))
* 小程序支持 click 事件 ([#1399](https://github.com/antvis/f2/issues/1399)) ([43142e0](https://github.com/antvis/f2/commit/43142e0274af70cf95380146857d01fec3df4397))
* 异常值处理 ([9d5455e](https://github.com/antvis/f2/commit/9d5455e8d19a51767e5aa784bb0982023814e105))
* 性能优化，没有更新时不render ([d0a7732](https://github.com/antvis/f2/commit/d0a77326d738d65a9a83e4ca8db53695169586a9))
* 把helper和component透出来 ([3bc0220](https://github.com/antvis/f2/commit/3bc0220da7d8445cbdaf43c639126e79deba4334))
* 接入g-lite && 去掉jsx ([#1614](https://github.com/antvis/f2/issues/1614)) ([9232d8e](https://github.com/antvis/f2/commit/9232d8e972be5e7453134bea8566c9d3b703cdac))
* 支小宝叙事添加点击跳转 ([74d8dc9](https://github.com/antvis/f2/commit/74d8dc9d412d65ad71eb2303f613ddb1573fb63b))
* 支持 Interval 和 TextGuide 的 animation 透传 ([#1255](https://github.com/antvis/f2/issues/1255)) ([05abb88](https://github.com/antvis/f2/commit/05abb8876832434624fb883d3bfd188f4cdc2536))
* 支持 tooltip snap 定位点 ([#1267](https://github.com/antvis/f2/issues/1267)) ([0be233c](https://github.com/antvis/f2/commit/0be233c9fa0e9b3c17cc22be1ea5c5cce21e625f)), closes [#1207](https://github.com/antvis/f2/issues/1207) [#1231](https://github.com/antvis/f2/issues/1231)
* 支持在 vue 中使用 F2 ([#1469](https://github.com/antvis/f2/issues/1469)) ([c710f34](https://github.com/antvis/f2/commit/c710f3425593d853d10eb1d78dedd60195412960))
* 支持外部注册和扩展渲染引擎 ([a29f627](https://github.com/antvis/f2/commit/a29f627f4a6200a2732fba1a6c51b686d21d9fc3))
* 支持微信小程序 ([#1321](https://github.com/antvis/f2/issues/1321)) ([70edcf7](https://github.com/antvis/f2/commit/70edcf7fc4788d14d515bb54235988d2e48d566d))
* 支持支付宝小程序 ([#1300](https://github.com/antvis/f2/issues/1300)) ([534359d](https://github.com/antvis/f2/commit/534359d008e8944c3eb5affc86dfa12b89d5f0a4))
* 数据元素 marker 背景色支持自定义 ([#1560](https://github.com/antvis/f2/issues/1560)) ([c7c4f7d](https://github.com/antvis/f2/commit/c7c4f7d6e4481a65765142e6532ce3eddd8cc3cf))
* 新增 Gauge 的 ts 类型定义 ([#1659](https://github.com/antvis/f2/issues/1659)) ([ee433b4](https://github.com/antvis/f2/commit/ee433b4a73098fef72e7ee07cb95a0baea159b4f))
* 新增 sizeZoom 支持按数据维度设置显示比例 ([#1781](https://github.com/antvis/f2/issues/1781)) ([560c5eb](https://github.com/antvis/f2/commit/560c5ebcb394773ed1189be2b4c343e1ef645ab4))
* 新增gallery ([38c273d](https://github.com/antvis/f2/commit/38c273dfa1a89a9013a710882d33a86f088c1269))
* 新增imageShape组件 ([51a39e2](https://github.com/antvis/f2/commit/51a39e243134a6e318e9ae398c57d1be280dee42))
* 新增图片型图形文档和demo ([9c04763](https://github.com/antvis/f2/commit/9c04763d5172bfb64b0e898fbbe9d51daa652122))
* 新增横屏的支持 ([9eb85ca](https://github.com/antvis/f2/commit/9eb85ca1c734722c96998c2bbb4c20b0d4ec4b32))
* 新官网基础配置 ([938b563](https://github.com/antvis/f2/commit/938b5633cc8b3f5da987e87b5257550c7588c518))
* 极坐标绘制 ([3cf5ae9](https://github.com/antvis/f2/commit/3cf5ae9ec313af296ebeed885f775547bd7ea321))
* 构建成功 ([9db6e27](https://github.com/antvis/f2/commit/9db6e27b8fdb4d28b430429a6deb45c034669387))
* 柱图/条形图/饼图/散点图示例迁移 ([#1235](https://github.com/antvis/f2/issues/1235)) ([e65f5fc](https://github.com/antvis/f2/commit/e65f5fc92fd45a7b03b646a5836a9c5801c86e34))
* 添加 4.x 5.x benchmark ([#1796](https://github.com/antvis/f2/issues/1796)) ([3b829b0](https://github.com/antvis/f2/commit/3b829b0959a89c0966ccb195a413593ce595dc0f))
* 添加 F2 jsx 版本的 apple-watch ([#1423](https://github.com/antvis/f2/issues/1423)) ([38b3202](https://github.com/antvis/f2/commit/38b3202398493795bd419eb26a6703edc5c27564))
* 添加 F2 React ([#1676](https://github.com/antvis/f2/issues/1676)) ([fc5d635](https://github.com/antvis/f2/commit/fc5d6357700bd78b71acc95269792a489e6281ca))
* 添加 geometry 的点击选中 ([#1383](https://github.com/antvis/f2/issues/1383)) ([2247ebe](https://github.com/antvis/f2/commit/2247ebe3787cada923fce278e6b9f2d3f3c1a6c8))
* 添加 K 线图 ([#1810](https://github.com/antvis/f2/issues/1810)) ([97618f4](https://github.com/antvis/f2/commit/97618f4ac981079e30cf84213178058bdca32f36))
* 添加adjust的处理逻辑 ([986de9f](https://github.com/antvis/f2/commit/986de9f42c5568fb08fb2ab87bf85e2278612a86))
* 添加animate的逻辑处理 ([9d1652b](https://github.com/antvis/f2/commit/9d1652b6d840091d03ca77c417729d72d8e99340))
* 添加area的绘制 ([01c3006](https://github.com/antvis/f2/commit/01c30069ecd56eebd7c89a2a1c95da2d0606a40c))
* 添加axis ([1f8ccc0](https://github.com/antvis/f2/commit/1f8ccc0aa47d600dd9a355d1ecc4a99d2c1fbee8))
* 添加axis top ([a418476](https://github.com/antvis/f2/commit/a41847698e574177d2c17d11bc8fe7c538c51c84))
* 添加classic模式的jsx转换 ([2edbc00](https://github.com/antvis/f2/commit/2edbc0067cda26b929675f137228837fa4c72b78))
* 添加clear相关事件 ([390a0b8](https://github.com/antvis/f2/commit/390a0b882c7e6cab783a0e0b3db3b30adcc25ff6))
* 添加clip动画 ([dda0107](https://github.com/antvis/f2/commit/dda01073f8fc3f9f7f26746852385417429fc91f))
* 添加destroy处理 ([093df26](https://github.com/antvis/f2/commit/093df269117184048dda58be2b9aaee97f6ebe67))
* 添加esm的模块输出 ([4d7e0be](https://github.com/antvis/f2/commit/4d7e0bec77ddac2689fc0bf10c480d5318af84b7))
* 添加fund-charts ([6634a0e](https://github.com/antvis/f2/commit/6634a0e9e1621a6465990a5c8519d1ac4dbb1c2c))
* 添加geom draw 事件 ([b52f708](https://github.com/antvis/f2/commit/b52f70888bf1a2e8400c236463bb2f14087cde94))
* 添加image类型 ([1d824d8](https://github.com/antvis/f2/commit/1d824d89a35805a0c99279797471cf9f2d6fdcb0))
* 添加interval的绘制 ([2090055](https://github.com/antvis/f2/commit/2090055de6bf9ccf04d2042440955938aed303ac))
* 添加legend ([3016251](https://github.com/antvis/f2/commit/3016251d39d89d006955e7df776c562a6fc5fb71))
* 添加legend默认的取数逻辑 ([4bff197](https://github.com/antvis/f2/commit/4bff19777ade256ce29bd5a5d796362780b8bea3))
* 添加point geometry ([570c4fb](https://github.com/antvis/f2/commit/570c4fbbc8b6bbcf9265469f93d468ae67464d5b))
* 添加px的转换逻辑 ([95140a1](https://github.com/antvis/f2/commit/95140a156948cd0b5ed1c9c80cc60a789ea348ee))
* 添加react组件使用方式 ([7e317ef](https://github.com/antvis/f2/commit/7e317ef73c6204cbdb00dcb71172a67998cc4d07))
* 添加repaint事件 ([29a3b1d](https://github.com/antvis/f2/commit/29a3b1d328663cb4d35fb65929af0eb0df5d914b))
* 添加setState逻辑和tooltip ([0b61e1e](https://github.com/antvis/f2/commit/0b61e1e2e510ba046bf9a541857e92b477b5231b))
* 添加shape的无障碍处理 ([a740a94](https://github.com/antvis/f2/commit/a740a941d08c2706b9696a4a6497574042fa76e3))
* 添加tinker组件库包 ([c981cbb](https://github.com/antvis/f2/commit/c981cbb074d6de5acc894d57819661fb418dfb10))
* 添加tooltip ([544412c](https://github.com/antvis/f2/commit/544412c2d36045e8e0792be2073473f0255e735f))
* 添加tooltip ([5161579](https://github.com/antvis/f2/commit/51615794e0273a3edc70ac5884eca74deafc1c6f))
* 添加treemap 组件 ([d65d22c](https://github.com/antvis/f2/commit/d65d22cd1cf8ec94d4be3a24b9795d940dfd4167))
* 添加weaver图 ([a32ac9f](https://github.com/antvis/f2/commit/a32ac9fde3d41060d7a28e55ace2175a575947cb))
* 添加上层业务组件库 ([adc570d](https://github.com/antvis/f2/commit/adc570dc78efde1c91d778b108bc078ae3c6e4be))
* 添加主干的文件构建 action ([#1730](https://github.com/antvis/f2/issues/1730)) ([75ab2d7](https://github.com/antvis/f2/commit/75ab2d7413c41d17831e9791076333fffb1dbb45))
* 添加内部的事情处理 ([9209b63](https://github.com/antvis/f2/commit/9209b635011fcc920a5ded7f1f38844c6724c2ba))
* 添加动态气泡图 ([beabd26](https://github.com/antvis/f2/commit/beabd260719e106efafe94465f0a50984d2648ce))
* 添加各国家收入排序图 ([f5c701b](https://github.com/antvis/f2/commit/f5c701bbf91cd766c3d7f993cab85f0259ef459a))
* 添加地图demo ([e5b764a](https://github.com/antvis/f2/commit/e5b764a796994d0016d240fd7428159d2c6f2eb2))
* 添加坐标轴 ([72f829a](https://github.com/antvis/f2/commit/72f829af47c385fa82d7daf6cdd724563ba3c9df))
* 添加多种不同view ([9223e67](https://github.com/antvis/f2/commit/9223e67ceb690b623c99f7a15fc4d6b978d3b57f))
* 添加官网首页 ([9b5eaf6](https://github.com/antvis/f2/commit/9b5eaf6412b1489a147f29380dde64d16d6e16b0))
* 添加折线图 ([6f1685c](https://github.com/antvis/f2/commit/6f1685c405b23efc64477600c0b80f8259a3da29))
* 添加支小宝可视化叙事 ([f56c4a7](https://github.com/antvis/f2/commit/f56c4a70ed42d21813ebe4b995baa4c84c09c138))
* 添加文件大小检测 ([#1729](https://github.com/antvis/f2/issues/1729)) ([fcd7a48](https://github.com/antvis/f2/commit/fcd7a48d6a8a8c70c662c9906e6e75729926ad5d))
* 添加漏斗图 ([47c8a23](https://github.com/antvis/f2/commit/47c8a233d802a7546ffa5af826101a456d470f80))
* 添加漏斗图演示demo ([7b03e59](https://github.com/antvis/f2/commit/7b03e59f6108d5df6d48ff545aef824c6ea86608))
* 添加竞速排序线图demo ([afffb35](https://github.com/antvis/f2/commit/afffb35d6330aa90df8a3a2671a09f9f078e3312))
* 添加统一的layout处理逻辑 ([c657b6d](https://github.com/antvis/f2/commit/c657b6da69eedb8c8d526856ec3476896f51b352))
* 添加词云组件 ([#1733](https://github.com/antvis/f2/issues/1733)) ([3aeaf09](https://github.com/antvis/f2/commit/3aeaf0981bc9bcf34603b8e13bd51b46cc6cdcab))
* 添加默认宽高 ([cbc1e29](https://github.com/antvis/f2/commit/cbc1e294d165b5ed485590805ca2b819377ca8fa))
* 独立attr属性映射，并添加旭日图 ([2a71655](https://github.com/antvis/f2/commit/2a71655a8229be99c03f0be7348befc3af1f5370))
* 独立出scale controller 统一处理scale ([5e2b1cd](https://github.com/antvis/f2/commit/5e2b1cd5c0f4e9b141ab74867fbfa6d1edf870e3))
* 直接 export 出 FEngine ([#1672](https://github.com/antvis/f2/issues/1672)) ([32b8a9e](https://github.com/antvis/f2/commit/32b8a9e07b81fcb3efd095b66c960b34a0e959e8))
* 移动tick方法到scale下 ([5f64ee9](https://github.com/antvis/f2/commit/5f64ee9cc4cee8a508b540f74a143e9c23b3479e))
* 算法优化 ([cd412e3](https://github.com/antvis/f2/commit/cd412e3cc8877c0fe6cb5fcc3116f7b9d900b51f))
* 线、轴组件 ([eed0416](https://github.com/antvis/f2/commit/eed04165762bc64603eeffa8caa7cb662862bd94))
* 组件切换与过渡 ([dac4d94](https://github.com/antvis/f2/commit/dac4d9462c3819f6c49b57e1c035dec8b7a63d5a))
* 组件嵌套和fragment处理 ([613959b](https://github.com/antvis/f2/commit/613959b37b423ac4c666a1cdb3941563b457a7f6))
* 结构优化 ([09cfdca](https://github.com/antvis/f2/commit/09cfdcaefff64d8681bfe4331cc407b2a8137f4d))
* 统一layout, coord 继承自layout ([8f1d532](https://github.com/antvis/f2/commit/8f1d532a980c912466ff1990de4dabcf0e2c6f81))
* 统一组件格式 ([2ef868a](https://github.com/antvis/f2/commit/2ef868ab09bd69256f8e1a1c0d7ee2bf96743cba))
* 补充 engine 的类型定义 ([#1258](https://github.com/antvis/f2/issues/1258)) ([8e6b8ef](https://github.com/antvis/f2/commit/8e6b8ef5e9e65f640303242e3e1a386ef14ae8f2))
* 补充 line 类型定义 ([#1249](https://github.com/antvis/f2/issues/1249)) ([d8aa3ae](https://github.com/antvis/f2/commit/d8aa3ae66033eb4474f6fd8586aaa9ac82ca1d3c))
* 补充legend获取逻辑 ([3606ef7](https://github.com/antvis/f2/commit/3606ef7e7ef68e874aa4959e2857e273db658d6f))
* 补充update的处理逻辑 ([8a31049](https://github.com/antvis/f2/commit/8a3104995ffd33344d2e145f2e3775d758bb6f68))
* 补全element props ts 类型 ([#1282](https://github.com/antvis/f2/issues/1282)) ([12cc7f8](https://github.com/antvis/f2/commit/12cc7f8512ff27db288e5d6185e6de9d826c77e9))
* 覆盖0.3.X的time-cat算法 ([f17d467](https://github.com/antvis/f2/commit/f17d467a8d787ef2f7cf87b61c3e3c0bdce2cf0b))
* 调整jsx库 ([d3dfacb](https://github.com/antvis/f2/commit/d3dfacb75bf0f58880e1a95c901090cd41e51114))
* 调整legend ([09d1705](https://github.com/antvis/f2/commit/09d1705cfbba51f2d62da251f37e830bd2500b3b))
* 调整sunburst & guide & pie事件 ([#1726](https://github.com/antvis/f2/issues/1726)) ([fe76372](https://github.com/antvis/f2/commit/fe763727000f047eafa745e169cf803da4a9af5f))
* 调整tooltip样式和细节 ([546b43a](https://github.com/antvis/f2/commit/546b43a98f4889c3b41d495a1512af153cfdbe6e))
* 调整代码结构 ([0d200ef](https://github.com/antvis/f2/commit/0d200ef15356ab4f73d2e106be8f69a80baa9c54))
* 调整目录结构 ([3d922c5](https://github.com/antvis/f2/commit/3d922c5b02c9cc4328e8eb2cd01fa5f741992c59))
* 调整部分代码 ([5dc4296](https://github.com/antvis/f2/commit/5dc42964269ef3fe1181a1142d4538bca54a555f))
* 调整部分代码 ([b575094](https://github.com/antvis/f2/commit/b575094fe2f5c211b24db158b675468cc2c4a549))
* 调整部分代码 ([727a64a](https://github.com/antvis/f2/commit/727a64a677c93a750d63898d28e17cce3edd0282))
* 迁移api文档 ([2975511](https://github.com/antvis/f2/commit/2975511b0aca1d3e2d089d6cd0ddd1cf452effa4))
* 迁移demo ([7ba3b46](https://github.com/antvis/f2/commit/7ba3b4639ca4584968e74bb9951f46db4640b3e5))
* 迁移数据映射逻辑 ([7162ace](https://github.com/antvis/f2/commit/7162aced1ebc578019ad62163b4a6787576cd20c))
* 连续数值刻度算法 ([83b1d34](https://github.com/antvis/f2/commit/83b1d3486ce13cba6cd8963ba3948fcf57faf925))
* 透出px2hd ([a208a7f](https://github.com/antvis/f2/commit/a208a7f2c59ef5d0ba2aab02b71f389463e2a4ef))
* 金牌经理图 ([5a9fc0d](https://github.com/antvis/f2/commit/5a9fc0d756f9691e569c243bab5a5bf2e7a4968a))
* 雷达图、漏斗图 demo 补充 ([#1237](https://github.com/antvis/f2/issues/1237)) ([9264e65](https://github.com/antvis/f2/commit/9264e650ffc6de026844c4a50e26a86089fdd495))
* 雷达图添加 grid 类型配置 ([#1432](https://github.com/antvis/f2/issues/1432)) ([08dbbb7](https://github.com/antvis/f2/commit/08dbbb737e33254510c4787367f5f05943900331))
* 饼图入场动画 ([#1400](https://github.com/antvis/f2/issues/1400)) ([9450d4d](https://github.com/antvis/f2/commit/9450d4d471f913e0d4f017c044f275f7f7a8186d))
* 默认增加guide point插件 ([28d9e0c](https://github.com/antvis/f2/commit/28d9e0c4778280fc04b037420b51f4231ce5855a))


### Performance Improvements

* stop canvas draw when animation stop. ([a873f4b](https://github.com/antvis/f2/commit/a873f4ba41698c4af015239025af6fdd6c9c3ddf))





#### 2022-04-02

##### Chores

*  添加 changelog script ([#1425](https://github.com/antvis/f2/pull/1425)) ([8b5df594](https://github.com/antvis/f2/commit/8b5df59496ccfc479a40260d69d3a333eb7b58ba))
*  修改 issue 创建模板 ([#1426](https://github.com/antvis/f2/pull/1426)) ([b6854826](https://github.com/antvis/f2/commit/b685482659cad01f5d2fdf17900f5a1ac86ba0a4))
*  去掉 npm next tag ([#1418](https://github.com/antvis/f2/pull/1418)) ([4c05e756](https://github.com/antvis/f2/commit/4c05e756d77f85ce6b47cfd463caf8fea26056c1))

##### Documentation Changes

*  调整 demo 的 shape 示例 ([#1428](https://github.com/antvis/f2/pull/1428)) ([1c7f7126](https://github.com/antvis/f2/commit/1c7f7126a712e10a60d674dca7708861a2706abf))
*  文档里添加 playground 代码演示 ([#1427](https://github.com/antvis/f2/pull/1427)) ([34c79416](https://github.com/antvis/f2/commit/34c794167cf11f1c7aff7603ecb7d38818cd63bb))
*  补全图形标签文档 ([#1424](https://github.com/antvis/f2/pull/1424)) ([e94601d0](https://github.com/antvis/f2/commit/e94601d015c919c60846a814041d37458154b1df))

##### New Features

*  添加 F2 jsx 版本的 apple-watch ([#1423](https://github.com/antvis/f2/pull/1423)) ([38b32023](https://github.com/antvis/f2/commit/38b3202398493795bd419eb26a6703edc5c27564))

##### Bug Fixes

*  tooltip 在 geometry 之前显示时，位置不对 ([#1429](https://github.com/antvis/f2/pull/1429)) ([d6f6f614](https://github.com/antvis/f2/commit/d6f6f6147fd6a8d670f94527bd311816e5d78deb))
*  fragment 类型标签 ([#1422](https://github.com/antvis/f2/pull/1422)) ([28bcc8d4](https://github.com/antvis/f2/commit/28bcc8d4351b1a9634e2f5fed6f2d2324f0aa60d))
*  修复单测文件 ts 类型报错 ([#1420](https://github.com/antvis/f2/pull/1420)) ([355f3ec5](https://github.com/antvis/f2/commit/355f3ec512e42f9272c72c16e345b97712478c48))
*  官网 demo riddle 打开时报错 ([#1419](https://github.com/antvis/f2/pull/1419)) ([998eddca](https://github.com/antvis/f2/commit/998eddcad13ef4fb132a3337cbf0a69e147adcef))

#### 3.8.9 (2021-06-03)

##### New Features

*  图片添加缓存配置，防止重复加载的抖动 ([bc95e200](https://github.com/antvis/f2/commit/bc95e2006b449a3373328a5fab53faa9db8fb568))

#### 3.8.8 (2021-05-12)

##### New Features

*  image shape 支持fillOpacity设置 ([5e700130](https://github.com/antvis/f2/commit/5e7001301fb56c4a3dcfef1086f93643f3a51eda))

##### Bug Fixes

*  修复添加图片后，toDataURL 报SecurityError ([6c9f36f0](https://github.com/antvis/f2/commit/6c9f36f0b6b136d485d8595a483b4420a7977735))

#### 3.8.7 (2021-05-07)

##### Bug Fixes

*  修复group背景色绘制不正确 ([8f38df11](https://github.com/antvis/f2/commit/8f38df1153f8c6daa268aa0c66f081553eb7ee7f))
*  连续平移后tick计算不对 ([4bb28700](https://github.com/antvis/f2/commit/4bb28700428574528dbf973263197f28c77f63c0))

#### 3.8.4 (2021-04-01)

##### Bug Fixes

*  cat类型平移后ticks不更新 ([03752e7a](https://github.com/antvis/f2/commit/03752e7a3c4eb65ea12048fe575661573df0381f))

#### 3.8.3 (2021-03-05)

##### Bug Fixes

*  rect 设置radius时，图形画不出来 ([10666e85](https://github.com/antvis/f2/commit/10666e85754f0117e8f8dbc0f5aa776e97f7a12a))

#### 3.8.2 (2021-03-04)

##### Chores

*  升级travis node 版本 ([3e990f15](https://github.com/antvis/f2/commit/3e990f1586b01e71b252a437a2b7d9e97b040305))

##### New Features

*  image 添加 radius 属性 ([31ddbc50](https://github.com/antvis/f2/commit/31ddbc50fe69db04145718f816d81af5e07133ce))
*  group 支持添加背景 ([94403b69](https://github.com/antvis/f2/commit/94403b69b4827910e07c455077b81f836830a0c8))

##### Bug Fixes

*  修复touchend 后，points为空 ([e769d642](https://github.com/antvis/f2/commit/e769d6424c4158cc4a764b16c7044f8324537070))
*  修复hollowCircle报错和多geom时，crosshairs不显示的问题。Fixed [#1140](https://github.com/antvis/f2/pull/1140) ([c1b5c85b](https://github.com/antvis/f2/commit/c1b5c85b4ef68b85cda7a67340c5dda49c7501cc))
*  修复tooltip posy小于0被截断不显示 ([bcda3586](https://github.com/antvis/f2/commit/bcda35865c9e58b339bb53b07f6ccb5fda360f07))

#### 3.8.1 (2020-12-04)

##### Bug Fixes

*  修复repaint时动画不生效 ([f0ba1814](https://github.com/antvis/f2/commit/f0ba181463dd2d40693c75ac248d26ce87739761))
*  修复repaint shape属性不生效。Closed [#1102](https://github.com/antvis/f2/pull/1102) ([b1ba85e5](https://github.com/antvis/f2/commit/b1ba85e590eeb5237aec3d07c771cb05e9371b63))

#### 3.8.0 (2020-11-23)

##### Chores

*  release 3.8.0 ([77eabfc6](https://github.com/antvis/f2/commit/77eabfc6254db2ad57e8c1deb653e3c14695d3f4))
*  release 3.8.0-alpha.2 ([c006d977](https://github.com/antvis/f2/commit/c006d9771accb84cef93fea1381ae7528c1b49c2))
*  chart types 添加renderer参数 ([3df2460c](https://github.com/antvis/f2/commit/3df2460c88ff569b212daaaa1f57de79e3eecc13))
*  release 3.8.0-alpha.1 ([ac6c75ff](https://github.com/antvis/f2/commit/ac6c75ff24f6256c8e650a6fed5ebd76d14177f8))
*  release 3.7.8 ([fbd4073f](https://github.com/antvis/f2/commit/fbd4073f1adcc045f163306e98bb4c8b27dc3660))

##### Documentation Changes

*  修改官网首页example链接 ([b7a4e220](https://github.com/antvis/f2/commit/b7a4e2208888277e051a6e9bf26b32ea37925661))
*  修改demo ([9834ec86](https://github.com/antvis/f2/commit/9834ec86131beb40d89a00abc69bf61c62016003))
*  添加tooltip show hide 的文档说明 ([034cf4dc](https://github.com/antvis/f2/commit/034cf4dc90f1029f85e764d87b70bd345e6b0cac))
*  添加无障碍aria的配置和使用文档 ([771a8157](https://github.com/antvis/f2/commit/771a8157f2b4824c9be00e87911279cafd352e90))
*  修改文档结构和内容 ([539575b2](https://github.com/antvis/f2/commit/539575b21ac5f3e7c2afaf0bf0f0adc48601a6a6))

##### New Features

*  新增横屏的支持 ([9eb85ca1](https://github.com/antvis/f2/commit/9eb85ca1c734722c96998c2bbb4c20b0d4ec4b32))
*  支持外部注册和扩展渲染引擎 ([a29f627f](https://github.com/antvis/f2/commit/a29f627f4a6200a2732fba1a6c51b686d21d9fc3))
*  添加地图demo ([e5b764a7](https://github.com/antvis/f2/commit/e5b764a796994d0016d240fd7428159d2c6f2eb2))
*  添加shape的无障碍处理 ([a740a941](https://github.com/antvis/f2/commit/a740a941d08c2706b9696a4a6497574042fa76e3))
*  图表示例名称修改 ([7e813303](https://github.com/antvis/f2/commit/7e813303a05b69dab5d19c9f4bcf34de35b12ea1))
*  去除icon ([cf8c12eb](https://github.com/antvis/f2/commit/cf8c12ebe47f18943aea41b838cf973293a5cc8c))
*  新增gallery ([38c273df](https://github.com/antvis/f2/commit/38c273dfa1a89a9013a710882d33a86f088c1269))
*  升级@antv/gatsby-theme-antv主题 ([34f521ab](https://github.com/antvis/f2/commit/34f521ab4d9b265b893cf287add5e2e7169de086))
*  export tooltip component ([4067ecd7](https://github.com/antvis/f2/commit/4067ecd7a275478c309647ff2fe4e59ee6ce4394))

##### Bug Fixes

*  修复部分404文档跳转链接 ([0c8fa827](https://github.com/antvis/f2/commit/0c8fa827464bcb5f7975bb76fc07e09631dfed10))
*  gitee sync fail ([2bdfbf00](https://github.com/antvis/f2/commit/2bdfbf0047a3bc3ffede05e70864f45e16861b28))
*  remove circular dependency ([3817e75a](https://github.com/antvis/f2/commit/3817e75a9b1c0067316789dec3f09257c9bb5176))
*  引用hammerjs导致小程序报错 ([0c15a67c](https://github.com/antvis/f2/commit/0c15a67c561cbd3896ff0ddd547a4825538081d7))
*  setTheme 单独使用报错,即非Global.setTheme调用 ([01080d03](https://github.com/antvis/f2/commit/01080d03e676a4b843ed1c19f76cad618283a894))
*  创意图结构修改 ([9c9c8077](https://github.com/antvis/f2/commit/9c9c8077e155933ef97e51e910542767af4883ca))

##### Tests

*  添加svg注册的测试用例 ([7ca79112](https://github.com/antvis/f2/commit/7ca7911281632325a7ce640da67648a502dacc5a))

#### 3.7.7 (2020-09-04)

##### Chores

*  group和canvas的drawInner统一到container里 ([c94804f8](https://github.com/antvis/f2/commit/c94804f8fb71b3e10367aecacc9c0a2566a24a40))

##### Bug Fixes

*  region-filter显示错误. Fixed [#1013](https://github.com/antvis/f2/pull/1013) ([1348281f](https://github.com/antvis/f2/commit/1348281fb43ff633843391d824c2a16cf0e8c3c0))
*  双y轴， getPosition取不到point. Fixed [#1004](https://github.com/antvis/f2/pull/1004) ([147a1c2c](https://github.com/antvis/f2/commit/147a1c2c7f1ee689387f8804470158c59c33a197))
*  修复alwaysshow为true时，滑动到plot外面，tooltip还会隐藏的问题 ([0f002fef](https://github.com/antvis/f2/commit/0f002fef6fe12077bb7fdebd6ea015462d92a4b0))
*  动画空执行退出 ([d0ea34f5](https://github.com/antvis/f2/commit/d0ea34f5c042593926502bad4094eec958a4709d))
*  修复tooltip showXTip 显示时，measureText需要新建canvas. Fixed [#1015](https://github.com/antvis/f2/pull/1015) ([010d5161](https://github.com/antvis/f2/commit/010d5161937546f13d6f77bffde21b9dbd652f8e))

#### 3.7.6 (2020-08-19)

##### Bug Fixes

*  linear NaN error ([482c49d0](https://github.com/antvis/f2/commit/482c49d07ea177526df7832f7af457799c82735b))

#### 3.7.5 (2020-08-19)

##### Bug Fixes

*  修复当interval为小数时，小数位数会少1位 ([3a0bb6d6](https://github.com/antvis/f2/commit/3a0bb6d6290d35b3edfe14ce3dae9aab9a62cf9a))

#### 3.7.4 (2020-08-18)

##### Documentation Changes

*  remove scale/time-cat import ([16b20a30](https://github.com/antvis/f2/commit/16b20a309619526c9e5b64622952350331d48f0a))

##### Bug Fixes

*  add time-cat export ([a66b1eb3](https://github.com/antvis/f2/commit/a66b1eb32740a695d750fd5533383d0f8d8585fc))

#### 3.7.3 (2020-08-14)

##### Chores

*  调整代码结构 ([3681ff50](https://github.com/antvis/f2/commit/3681ff503b9d8389b929a4f74e072af6000f5e16))

##### Documentation Changes

*  modify f2 cdn url ([a75384fc](https://github.com/antvis/f2/commit/a75384fc17d8c39b8784a1062b96fe8d7903358d))
*  uniform AntV navbar's order and naming ([e492a364](https://github.com/antvis/f2/commit/e492a3645fda8b30a034d5d997aa0f4eb11fa638))
*  修复文档上一些失效的链接 ([478f56d8](https://github.com/antvis/f2/commit/478f56d86526a5b649f6ff0e2a72b72faf98e736))

##### New Features

*  异常值处理 ([9d5455e8](https://github.com/antvis/f2/commit/9d5455e8d19a51767e5aa784bb0982023814e105))
*  算法优化 ([cd412e3c](https://github.com/antvis/f2/commit/cd412e3cc8877c0fe6cb5fcc3116f7b9d900b51f))
*  移动tick方法到scale下 ([5f64ee9c](https://github.com/antvis/f2/commit/5f64ee9cc4cee8a508b540f74a143e9c23b3479e))
*  单测补齐 浮点数判断 ([52cbf6db](https://github.com/antvis/f2/commit/52cbf6dbbf375b0cf04dd0c5bb3da444bc6149b1))
*  刻度值优选原则 ([b0594f64](https://github.com/antvis/f2/commit/b0594f64bd51856518b39f8774f315840079525b))
*  连续数值刻度算法 ([83b1d348](https://github.com/antvis/f2/commit/83b1d3486ce13cba6cd8963ba3948fcf57faf925))
*  添加repaint事件 ([29a3b1d3](https://github.com/antvis/f2/commit/29a3b1d328663cb4d35fb65929af0eb0df5d914b))
*  scale 版本0.3.3 ([70ef7108](https://github.com/antvis/f2/commit/70ef7108cd946992d6fa221ddc52787302c1931e))
*  增加ticks算法单测 ([12f6d69d](https://github.com/antvis/f2/commit/12f6d69d2852aa8d176f618c2a01a659db83243e))
*  覆盖0.3.X的time-cat算法 ([f17d467a](https://github.com/antvis/f2/commit/f17d467a8d787ef2f7cf87b61c3e3c0bdce2cf0b))
*  增加f2 自定义time-cat scale算法 ([83a556b1](https://github.com/antvis/f2/commit/83a556b1d62cc745f4d41344225d2cdb664aa111))
*  依赖scale 0.3.2 ([d55d3161](https://github.com/antvis/f2/commit/d55d316120d5ab99b9332e7b4bf0db965759c8a1))
*  使用jest 内置expect断言 ([77c440f7](https://github.com/antvis/f2/commit/77c440f7fcb0c11266f8f774345f126f677726a2))
*  修改scale度量修改的单测 ([52dc3313](https://github.com/antvis/f2/commit/52dc33132853ad24be0dfe5cc68e57cb1fe4a11e))
*  remove scalue._toTimeStamp ([b3c07713](https://github.com/antvis/f2/commit/b3c0771383aa21ce62ae9bccb0e95259837b26ab))

##### Bug Fixes

*  特殊情况下interval不满足要求时，需要递归计算 ([5543d488](https://github.com/antvis/f2/commit/5543d488128d90adc63a685ff85747d63b242198))
*  修复数据字段存在x,y时，再次mapping后，数据不对 ([db9def3e](https://github.com/antvis/f2/commit/db9def3ed93392a443535df47923b8ed620989cc))
*  刻度修改，修复单测 ([cff266fa](https://github.com/antvis/f2/commit/cff266faeec49db52af7c6d2c6855f441773403d))
*  单测修改 ([a46809ef](https://github.com/antvis/f2/commit/a46809efbcc7176fe5d5ce13c87fb9dd4661af35))
*  修复 interval 平移后不显示的问题 Fixed [#954](https://github.com/antvis/f2/pull/954) ([e5c64bfc](https://github.com/antvis/f2/commit/e5c64bfc833d1a5403bfcecbbd3ef83650c14381))
*  修复漏斗图legend点击后，label位置不调整 Fixed [#979](https://github.com/antvis/f2/pull/979) ([9b43f4d3](https://github.com/antvis/f2/commit/9b43f4d3847c13cdc6fd5fe9b0cd540d001fc8e8))
*  fix animation register error in codesandbox ([0d64825f](https://github.com/antvis/f2/commit/0d64825f6bba485114e35da70b8833aec9367f94))
*  fix demo bugs in sandbox ([294e655b](https://github.com/antvis/f2/commit/294e655bae57085ea9290c69eb11fb8cde829c03))
*  transform arrow functions ([8d73bba1](https://github.com/antvis/f2/commit/8d73bba141b2741fb4c8a04a4379820317c6631a))
*  values个数边界判断 ([f2e64bab](https://github.com/antvis/f2/commit/f2e64bab828eae6aca1ffb0ddb5b1b83de5c51d7))
*  修复精度的单测 ([5c8e9910](https://github.com/antvis/f2/commit/5c8e9910082f9531e367fc19b023b690f11eca03))
*  兼容 0.3.X scale timeCat type ([01078256](https://github.com/antvis/f2/commit/010782566268f7badc17e9fcbb277ed0a4ccd0ff))
*  修复pieLabel插件判断矩形重叠的函数 ([c139a6ab](https://github.com/antvis/f2/commit/c139a6ab23aed19488ac95f147e0595a0a1e2f07))

##### Other Changes

*  升级@antv/scale ([41074d58](https://github.com/antvis/f2/commit/41074d5801ec7256d4835f434eb03ba70e1a155a))

##### Tests

*  修改pieLabel单测，测试前一个渲染过的标签比后一个长，后一个必渲染的bug。 ([690bb0fc](https://github.com/antvis/f2/commit/690bb0fc8a40f058015733a244414b29b994fe52))

#### 3.7.0 (2020-07-09)

##### Chores

* **tsconfig:**  disable @types/* check ([60d17bb1](https://github.com/antvis/f2/commit/60d17bb1c677802d734428c389b58c251f8c689f))
* **gitignore:**  ignore yarn.lock ([78ca6140](https://github.com/antvis/f2/commit/78ca61402558bc66cdc3503cd9b9c369de7332b0))

##### Documentation Changes

*  add TypeScript ([7645a44e](https://github.com/antvis/f2/commit/7645a44e49452b07963465b8993482456edb5a4a))

##### New Features

*  新增图片型图形文档和demo ([9c04763d](https://github.com/antvis/f2/commit/9c04763d5172bfb64b0e898fbbe9d51daa652122))
*  新增imageShape组件 ([51a39e24](https://github.com/antvis/f2/commit/51a39e243134a6e318e9ae398c57d1be280dee42))
*  添加esm的模块输出 ([4d7e0bec](https://github.com/antvis/f2/commit/4d7e0bec77ddac2689fc0bf10c480d5318af84b7))
*  结构优化 ([09cfdcae](https://github.com/antvis/f2/commit/09cfdcaefff64d8681bfe4331cc407b2a8137f4d))
*  test case cjs => esm ([66022b75](https://github.com/antvis/f2/commit/66022b75c7fa05953c959c4700abe29301367bf4))
*  files cjs => esm ([380c53db](https://github.com/antvis/f2/commit/380c53db0be4f6a6772638f2506621c813b09cb0))
*  rollup ([4904a049](https://github.com/antvis/f2/commit/4904a04958a4ecdfb605c4988d5f4587bdbfe2a8))
* **types:**
  *  add tests ([6fd68806](https://github.com/antvis/f2/commit/6fd688063f88c86145acff94d56a946df28ce2ea))
  *  improve ([8d25c48e](https://github.com/antvis/f2/commit/8d25c48e75b78906362ef5df694b8f25662cc048))
  *  improve ([85d75d81](https://github.com/antvis/f2/commit/85d75d81ce77940a375bce3a1f4042778b0271d6))
  *  improve ([ccabc2c3](https://github.com/antvis/f2/commit/ccabc2c330cc5d6ab0bfda4756bdb8767ad68a2c))
  *  improve ([0f6100ac](https://github.com/antvis/f2/commit/0f6100acddfaafd1dd7e5629d278011fbcb8083c))
  *  improve Tooltip ([408cd222](https://github.com/antvis/f2/commit/408cd222e5d0881575c8f70b7d186d22d7217917))
  *  improve Scale ([58136550](https://github.com/antvis/f2/commit/58136550a08cd8bf2e0090bb0edae40b824644f5))
  *  improve Geometry ([ec6ccfb9](https://github.com/antvis/f2/commit/ec6ccfb942c651455b103dc33d83a501a490251e))
  *  improve CanvasProps ([2ab3195e](https://github.com/antvis/f2/commit/2ab3195ef93589473cd37bfd613797d7c2dfcd5b))
  *  improve Geometry ([9075b46a](https://github.com/antvis/f2/commit/9075b46ae2309affa963cfda43e37cd0916078bd))
  *  improve ScaleProps ([64211ea4](https://github.com/antvis/f2/commit/64211ea45132401080c0d57f645a0846e774131d))
  *  add Global ([51eb6a7c](https://github.com/antvis/f2/commit/51eb6a7caa915faee158140a12ac87a9eadb316e))
  *  add Shape ([6c29f580](https://github.com/antvis/f2/commit/6c29f580a86ceb86a097ea3fc4576220c07e2862))
  *  improve ChartInnerProps ([e305985b](https://github.com/antvis/f2/commit/e305985b16aa90c6615885f2e7ba780cc6a93a3e))
  *  add Chart ([b91d08ac](https://github.com/antvis/f2/commit/b91d08ac221528fc71cd6b337d3336b858f75d89))
  *  add Guide ([cde0cc78](https://github.com/antvis/f2/commit/cde0cc789da79175fe54c4c328d16dd48f364a39))
  *  add PieLabel ([dd83157f](https://github.com/antvis/f2/commit/dd83157f94fddb50c0e76c7b3a164bd66c670b47))
  *  add ScrollBar ([9f0e2a3d](https://github.com/antvis/f2/commit/9f0e2a3d79a79f9d1d0e808399de28f743bbdcd7))
  *  add Gesture ([253ba560](https://github.com/antvis/f2/commit/253ba56079559d25b735de3d673994af3276b1cc))
  *  add Interaction ([7dcd22b0](https://github.com/antvis/f2/commit/7dcd22b02336b15970cf271b01979b2b5621ccad))
  *  add Tooltip ([ad052749](https://github.com/antvis/f2/commit/ad0527496a30aefb68d2128c8f1d4b79bc7ec38e))
  *  add Plugin ([30081c1a](https://github.com/antvis/f2/commit/30081c1a77c502399e204f096615f46fcc5387c6))
  *  add G ([e2922695](https://github.com/antvis/f2/commit/e2922695a51879c74ec344e9fd2be4010d73e50c))
  *  add Legend ([43f32ecd](https://github.com/antvis/f2/commit/43f32ecd26bbd9553349549ba8ce5e4ff4f2e14f))
  *  add Axis ([eb03d02e](https://github.com/antvis/f2/commit/eb03d02ed3e0375797b08921a90470e7ba3726c2))
  *  add Coordinate ([bd33cae6](https://github.com/antvis/f2/commit/bd33cae6ae53fa5496a8c9ce8f307228c64e8a60))
  *  add Geometry ([be17d68d](https://github.com/antvis/f2/commit/be17d68d0b5ec9d433a7ce588f28b0e8c409227e))
  *  add Animate ([1deee96a](https://github.com/antvis/f2/commit/1deee96a3ab48cd37a4478ba3b0bccc36accf124))
  *  add Scale ([bb96ee41](https://github.com/antvis/f2/commit/bb96ee418c35cc3f8ead685277a2843cffbbe8d2))
  *  add Data ([bc5cd7e4](https://github.com/antvis/f2/commit/bc5cd7e4000e97dda1303a4a0ad1391ed438dec8))
  *  add Point ([afe90fdc](https://github.com/antvis/f2/commit/afe90fdc6d4fa1855e687354a20589ebdfeb3236))
  *  add CanvasProps ([3d902484](https://github.com/antvis/f2/commit/3d902484f52e8d21fd68cf1a1c2c49942e6c407c))
  *  add Util ([9762a40b](https://github.com/antvis/f2/commit/9762a40bf46821605cd39db3132b087c434e2f64))

##### Bug Fixes

* **types:**
  *  fix the types of the entries and plugins ([2fb80547](https://github.com/antvis/f2/commit/2fb8054706369773717e7a4fabce322dcafe96c1))
  *  mix support any number of sources ([d8ab5803](https://github.com/antvis/f2/commit/d8ab580364f7dd07c02f970d6c9ffb8823e20f1f))
*  补充types的定义 ([7e25cec8](https://github.com/antvis/f2/commit/7e25cec82c99ee79c21969fa8f95e27bffded2b5))
*  merge master conflicts ([85197b90](https://github.com/antvis/f2/commit/85197b9025dc184811e85bfea873e4a31232ee9b))
*  merge master conflicts ([21efd54b](https://github.com/antvis/f2/commit/21efd54b6a4b3bc79f1808ec2486ec252f90f8b3))
*  site build error ([5ceccda9](https://github.com/antvis/f2/commit/5ceccda9fbca400914b025a27db913d9826c1339))
*  site 官网的一些错误 ([d6a51e31](https://github.com/antvis/f2/commit/d6a51e31037e62e0f5c0eddb90c5a60f25cf2a38))
*  module mix fixed ([d17c4d82](https://github.com/antvis/f2/commit/d17c4d82cb6e7abcfc3a27397a7885fa3e834589))
*  修复site编译报错的问题 ([b9496f75](https://github.com/antvis/f2/commit/b9496f75b3494cf8659d09af69d63dca3937e6ca))
*  去除多余jest配置 ([fa40727c](https://github.com/antvis/f2/commit/fa40727c0d17b6f29454b736525ba3de3edf0fbe))
*  修改引用方式 ([9089dfcc](https://github.com/antvis/f2/commit/9089dfccf9bec9bba901d3369ec731fb87b27fef))
*  remove alilas ([c8315815](https://github.com/antvis/f2/commit/c8315815e809e53a3698bb6e8e6aea247835f804))
* **emit:**   arr len will reduce after splice ([45430d50](https://github.com/antvis/f2/commit/45430d502f14652806169258f8a79ba31a109fcb))


#### 3.6.4 (2020-07-06)

##### Chores

*  add leaks action ([734f5b12](https://github.com/antvis/f2/commit/734f5b127b8d829c26d68fc75d641391a91856d3))
*  🔀 add GitHub Action to sync Gitee ([09b7e27c](https://github.com/antvis/f2/commit/09b7e27ca42527274e10e216742906eb83365309))
* **deps-dev:**
  *  bump nunjucks from 3.0.1 to 3.2.1 ([462073e7](https://github.com/antvis/f2/commit/462073e768877dc91f72d970a01052dde6e1ec51))
  *  bump chai from 4.0.2 to 4.2.0 ([500dcc04](https://github.com/antvis/f2/commit/500dcc04ee7943a2cfb3cad98634927bdc7e6f78))
  *  bump connect from 3.6.6 to 3.7.0 ([1ed6c46c](https://github.com/antvis/f2/commit/1ed6c46ce49db8220135c41560fc66ea3be75044))
  *  bump babel-preset-gatsby from 0.2.36 to 0.4.0 ([1993a0ef](https://github.com/antvis/f2/commit/1993a0ef6bd61eca9f2a4ed3e31aa38b5bea7bf0))
  *  bump babel-eslint from 7.2.3 to 10.1.0 ([bc550803](https://github.com/antvis/f2/commit/bc5508033279945c12ef8538a21723d72f32d989))
  *  bump debug from 3.1.0 to 4.1.1 ([3e361484](https://github.com/antvis/f2/commit/3e361484800a142dd14160337f877f91b7762386))

##### New Features

*  adjust interval ([f4ea6de8](https://github.com/antvis/f2/commit/f4ea6de8d54c9e2cc376e9195f5add4432dca3ba))
*  为 tooltip 的 xtip/ytip 增加 text 样式配置 ([bbbdf91a](https://github.com/antvis/f2/commit/bbbdf91a9c0c4930fbaa11f5ab6b927636750aa3))
*  添加geom draw 事件 ([b52f7088](https://github.com/antvis/f2/commit/b52f70888bf1a2e8400c236463bb2f14087cde94))
*  添加clear相关事件 ([390a0b88](https://github.com/antvis/f2/commit/390a0b882c7e6cab783a0e0b3db3b30adcc25ff6))
*  geom添加getRecords方法 ([7ab43728](https://github.com/antvis/f2/commit/7ab43728e8b74ee51cf594bdb7dc12ee7f98a2d4))

##### Bug Fixes

*  geom rerender ([#915](https://github.com/antvis/f2/pull/915)) ([033a3668](https://github.com/antvis/f2/commit/033a36684b2335547547fa430aaa2b58b6258032))
*  修复touchstart触发press时，没有设置direction ([b6f45a6a](https://github.com/antvis/f2/commit/b6f45a6a9ea35a8357eacb627eec3cbae0aa0297))
*  交互销毁时，注销事件 ([912a13c1](https://github.com/antvis/f2/commit/912a13c1e4f3b9662f0c87ae3d1751a8c286c645))
*  修复rect radius大于宽高时，图形绘制不正确 ([558fe91c](https://github.com/antvis/f2/commit/558fe91c78b991fea56b7372caffe6d6b4c78118))
*  添加交互的几个钩子事件 ([16fbcaee](https://github.com/antvis/f2/commit/16fbcaee333b7f0f5eb44e36b69a3da907253055))

##### Other Changes

*  更新 tooltip 文档 ([b7c60996](https://github.com/antvis/f2/commit/b7c609960ada1f2a3405cc4956667ea3674d3e9a))
*  补充 mapping 缓存单测 ([67483760](https://github.com/antvis/f2/commit/674837600309faaaf56789ad9cdaa80af099d2c1))

##### Tests

*  补充新 pan 方法的单测 ([b5f47fa5](https://github.com/antvis/f2/commit/b5f47fa535050bdca2456ed3df58cf15aa81a331))
*  补充event controller的单测 ([955b5405](https://github.com/antvis/f2/commit/955b5405d89e50616a161507b4548865be02a531))
*  add onstart hooks test case ([c2f0f678](https://github.com/antvis/f2/commit/c2f0f67885447ed7db1db585c52c9219ff8f0766))

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
