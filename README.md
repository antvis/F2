# F2: a canvas library which providing 2d draw for mobile

[![](https://img.shields.io/travis/antvis/f2.svg)](https://travis-ci.org/antvis/f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![npm package](https://img.shields.io/npm/v/@antv/f2.svg)](https://www.npmjs.com/package/@antv/f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.org/package/@antv/f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/f2.svg)](http://isitmaintained.com/project/antvis/f2 "Percentage of issues still open")

## Installing

```
npm install @antv/f2

```

## 简介

F2 是面向移动端的一套基于可视化图形语法的图表库，具有精简、高性能、易扩展的特性。适用于对性能、大小、扩展性要求很高的场景。[站点](https://antv.alipay.com/zh-cn/f2/3.x/index.html)

## API

### Chart

* id: 指定对应 canvas 的id
* el: 如果未指定 id 时可以直接传入 canvas 对象
* width：图表的宽度，如果 canvas 上设置了宽度，可以不传入
* height：图表的高度，如果 canvas 上设置了高度，可以不传入
* pixelRatio：画布的像素比，默认读取 Global 上的pixelRatio
* padding: 绘图区域（坐标轴包围的区域）跟画布边缘的边距，可以是数字或者数组[top, right, bottom, left]

```js
var chart = new F2.Chart({
  id: 'c1',
  width: 500,
  height: 500,
  padding: [20,10, 50, 40]
});

```

#### method

* source(data, defs) 设置
  + data 图表显示的数据
  + defs 图表数据的列定义

  ```js
    chart.source(data, {
      a: {
        min: 0,
        max: 100
      }
    });
  ```
* render() 渲染图表

  ```js
    chart.render();
  ```
* clear() 清除图表内容

  ```js
   chart.clear(); // 清除
   chart.line().position('a*b');
   chart.render();
  ```
* destroy () 销毁图表，canvas 元素不会销毁

```js
chart.destroy();
```

* axis(field, cfg|enable) 
  + field ：坐标轴对应的字段
  + cfg 坐标轴的配置信息, 也可以设置成 false

  ```js
  chart.axis('field', false); // 不显示该字段对应的坐标轴
  chart.axis('field', {
  // 设置坐标轴线的样式，如果值为 null，则不显示坐标轴线 图形属性
  line: {
    lineWidth: 1, 
    stroke: '#ccc' 
  }, 
  // 标轴文本距离轴线的距离
  labelOffset: 20, 
    // 坐标点对应的线，null 不显示 图形属性
    tickLine: {
    lineWidth: 1,
    stroke: '#ccc',
    value: 5,// 刻度线长度
  },
  // 0％处的栅格线着重显示
  grid: function(text,index){
    if(text === '0%'){
    return {
      stroke: '#efefef'
    };
    }else{
    return {
      stroke: '#f7f7f7'
    };
    }
  },
  // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
  label: function(text, index, total) {
    var cfg = {
    fill: '#979797',
    font: '14px san-serif',
    offset: 6
    };
    if (index === 0) {
      cfg.textAlign = 'left';
    }
    if (index > 0 && index === total - 1) {
      cfg.textAlign = 'right';
    }
    cfg.text = text + '%';   cfg.text 支持文本格式化处理
    return cfg;
  },
  });
  ```
  
* guide() 创建辅助元素，详情查看 [辅助元素](#guide)
* coord(type, cfg)
  + type 坐标系类型，目前支持 rect,polar 两种
  + cfg 坐标系的配置项，rect（直角坐标系） 和 polar(极坐标）的配置项不完全一样
    - transposed 坐标系翻转
    - startAngle polar （极坐标）的起始角度
    - endAngle polar （极坐标）的结束角度
    - innerRadius polar (极坐标）的内环半径

  ```js
    chart.coord('rect') // 直角坐标系
    chart.coord('rect', {
      transposed: true // 坐标系翻转，柱状图会变成条形图
    });
    
    chart.coord('polar'); // 极坐标
    chart.coord('polar', {
      startAngle: -Math.PI,
    endAngle: 0
    });
    chart.coord('polar', {
      transposed: true // 饼图一般使用这个坐标系
    });
   
  ```
* geometry()
  F2 支持的 geometry 有以下类型：
  + point 点图
  + path 线图
  + line 线图
  + interval 区间图
  + area 面积图
  + polygon 多边形
  + schema 蜡烛图等特殊的图表
  
* animate(cfg|false) 执行动画
  * cfg|false 指定动画的配置项或者禁用动画
    + type: 动画的类型：
    + duration: 动画时间（毫秒），默认1000。
    + easing: Function/String 缓动函数或缓动函数名称，默认easeInOut。支持linear、easeIn、easeOut、easeInOut、backIn、backOut、elastic、bounce
    + success: Function 动画结束后执行的回调函数。

  ```js
    chart.animate(false);// 禁用动画
  chart.animate({
    duration: 2000,
    easing: 'elastic',
    success: function() {
    alert('ok');
    }
  });
  ```
  
* getPosition(record) 获取数据对应在画布上的坐标。

  ```js
     var point = chart.getPosition({time: '2010-02-02', value: 20});
  ```
  
* getRecord(point) 根据画布上的坐标获取对应的数据
  ```js
     var obj = chart.getRecord({x: 100, y: 100});
  ```
* getSnapRecords(point, [field]) 根据画布上的坐标获取附近的数据
  * point 画布上的点
  * field 用于逼近数据的字段，默认都是x 轴对应的字段，但是饼图情况下需要自己指定对应 y 轴的字段
  ```js
    var records = chart.getSnapRecords({x: 100, y: 100});
  ```
  

### Geometry

* position(feilds) 设置位置对应的字段
  + fields 可以是字符串 'field1*field2' 也可以是 array ['field1', field2]
  ```js
    chart.point().position(['cut', 'price']);
      chart.interval().position('cut*price');
  ```
* color(field, [colors]) 设置颜色对应的字段
  + field 可以一个字段也可以多个,也可以是常量
  + colors 可以是数组、回调函数
  
  ```js
    chart.point().position('x*y').color('x'); // 按照字段x 进行映射，使用内置的颜色
    chart.point().position('x*y').color('red') // 设置常量颜色
  chart.point().position('x*y').color('x', function(x) {
    if (x > 100) {
      return 'red';
    }
    return blue;
  });
  ```
* size(field, [sizes]) 设置大小对应的字段
  + field 可以是一个字段也可以是多个,也可以是常量
  + sizes 可以是数组、回调函数

  ```js
    point.size(10); // 常量
    point.size('value'); // 使用字段映射到大小，使用内置的大小
    point.size('value', [10, 30]); // 指定大小范围
    point.size('value', function(value) { // 回调函数
    if(type > 50) {
      return 10;
    } else {
      return 5;
    }
    });
  ```
* shape(field, shapes)
   + field 可以是一个字段也可以是多个,也可以是常量
   + shapes 可以是数组、回调函数
   
  ```js
    point.shape('circle'); // 常量
    point.shape('type'); // 使用字段映射到形状，使用内置的形状
    point.shape('type', ['circle', 'diamond', 'square']); // 指定形状
    point.shape('type', function(type) { // 回调函数
    if(type === 'a') {
      return 'circle';
    } else {
      return 'square';
    }
    });
  ```
* style([field], cfg) 指定图形的样式
  + field 映射到样式的字段，可以不设置直接设置配置项 cfg
  + cfg 配置项支持的属性，查看：[canvas 属性](http://www.w3school.com.cn/tags/html_ref_canvas.asp) 除此外提供了几个别名
    - stroke： 边框， 是 strokeStyle 的简写
    - fill： 填充色，是 fillStyle 的简写
    - opacity：透明度，是 globalAlpha 的简写
  
* adjust(type) 进行数据调整
  + F2 目前仅支持 stack（层叠） 和 dodge(分组）的数据调整

### guide

### F2.Shape 自定义shape

* registerShape(geomType, shapeName, cfg)
  + geomType 是 geometry 的类型，point,line,path,area,interval,polygon,schema
  + shapeName 创建的shape 的名字
  + cfg 指定自定义Shape 需要的函数
    - getPoints(cfg) 自定义图形需要的点，是映射到0-1区间的值，path 和 line 不需要
    - draw(cfg, canvas) 绘制对应的图形

为了方面用户将0-1 范围的值转换到画布上，提供了2个方法：
  * parsePoint(point) 将数据点转换到画布坐标
  * parsePoints(points) 将多个数据点转换到画布坐标

```js
var drawShape = function(points, canvas, cfg) {
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(points[0].x,points[0].y);
  if(points.length>1){
  for (var i = 1; i <= points.length - 1; i++) {
    ctx.lineTo(points[i].x,points[i].y);
  }
  }
  ctx.fillStyle = cfg.fill;
  ctx.fill();
};
//自定义绘制数据的的形状
var Shape = F2.Shape;
Shape.registerShape('interval', 'polygon', {
  getPoints: function(cfg){
  var x = cfg.x;
  var y = cfg.y;
  var y0 = cfg.y0;
  var width = cfg.size;
  return [
    {x: x-width/2, y: y0},
    {x: x, y: y},
    {x: x+width/2, y: y0}
  ];
  },
  draw: function(cfg, canvas){
  var points = this.parsePoints(cfg.points);
  var style = cfg.style || {};
  style.fill = cfg.color;
  drawShape(points, canvas, style);
  }
});
```

### F2.Graphic

* drawLine(start, end, canvas, cfg)
* drawText(text, pos, canvas, cfg)
* drawCircle(center, radius, canvas, cfg)
* drawArc(center, radius, startAngle, endAngle, canvas, cfg)
* drawRect(points, canvas, cfg)
* drawShape(canvas, cfg, shapeFn)
* drawLines(points, canvas, cfg)
* drawFan(points, center, canvas, cfg)
* drawSmooth(points, canvas, cfg)

更详细的 API，参考 [API详情](https://antv.alipay.com/zh-cn/f2/3.x/api/index.html)
