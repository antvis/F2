---
title: 升级说明
order: 3
---

## 从 G2-mobile 到 F2

F2 是由 G2-mobile 升级而来，两者基本兼容，本章列出从 G2-mobile 升级到 F2 的注意事项。

### F2 跟 G2-mobile 的差异

跟 G2-mobile 相比 F2 的变化：

- 命名空间 GM 改成 F2 `不兼容`

- animate 接口简化 `不兼容`

```javascript
// G2-mobile 2.0
 chart.animate().wavec({
  duration: 2000,
  easing: 'elastic',
  success() {
    alert('ok');
  } 
 });
 
 // F2 3.0
 chart.animate({
  type: 'wavec',
  duration: 2000,
  easing: 'elastic',
  success() {
    alert('ok');
  } 
 });
```

- new Chart() 时的配置项


  - margin 改成 padding


为了升级方便，margin 还保留支持

```javascript
// G2-mobile 2.0
const chart = new Chart({
  margin: 20
});
// F2 3.0
const chart = new Chart({
  padding: 20
});
```

  - 增加 width, height 属性，可以不在 canvas 上指定宽高

  - 增加 pixelRatio 属性

- intevalStack,intervalDodge,areaStack 不再在 chart 上支持 `不兼容`

F2 3.0 所有的 geomety 都支持数据调整
```javascript
// G2-mobile 2.0
chart.intervalStack().position('a*b');
// F2 3.0
chart.interval().position().adjust('stack')
```

- 自定义 Shape 的接口，更改了函数名称，但是保留原先函数名的支持


  - registShape 改成 registerShape

  - getShapePoints 改成 getPoints

  - drawShape 改成 draw


```javascript
// G2-mobile 2.0
GM.Shape.registShape('interval', 'custom', {
  getShapePoints(cfg) {},
  drawShape(cfg, canvas) {}
});
// F2 3.0
F2.Shape.registerShape('interval', 'custom', {
  getPoints(cfg) {},
  draw(cfg, canvas) {}
});
```

- 时间分类（timeCat) 类型数据的 mask 改成标准格式 `不兼容`<br />新的 mask 参考 [fecha](https://github.com/taylorhakes/fecha)。


### 升级建议

1. 更改所有的 GM 命名空间到 F2

2. 将 intervalStack, intervalDodge, areaStack 的写法改成 .adjust() 的写法

3. 检查是否有 timeCat 类型，自己修改了 mask

4. animate 接口的变化

5. 自定义 shape 虽然依然保持兼容，但是建议改成新的写法


## 从 F2 3.0 到 F2 3.1

F2 3.1 版本同之前的 3.0 版本主要有以下区别：

1. chart.guide() api 参数类型发生变化，详见 [Guide API](https://www.yuque.com/antv/f2/api-guide)；

2. 底层绘图引擎改造，原先 F2.G 中的所有方法全部废弃，新版 G 的使用参见 [Graphic API](https://www.yuque.com/antv/f2/api-g)；

3. 动画接口变更，详见 [Animation API](https://www.yuque.com/antv/f2/api-animate)

