// import F2 from '@antv/f2';
// import _ from 'lodash';

// 绘制饼图
// var Util = F2.Util;
// var Chart = F2.Chart;

// var data = [{
//   name: 'A',
//   proportion: 0.8,
//   a: '1'
// }, {
//   name: 'B',
//   proportion: 0.5,
//   a: '1'
// }, {
//   name: 'C',
//   proportion: 0.45,
//   a: '1'
// }, {
//   name: 'D',
//   proportion: 0.15,
//   a: '1'
// }, {
//   name: 'E',
//   proportion: 0.12,
//   a: '1'
// }, {
//   name: 'F',
//   proportion: 0.1,
//   a: '1'
// }, {
//   name: 'G',
//   proportion: 0.03,
//   a: '1'
// }];
// var chart = new Chart({
//   id: 'mountNode',
//   pixelRatio: window.devicePixelRatio
// });

// chart.source(data);
// chart.legend(false);
// chart.coord('polar', {
//   transposed: true,
//   radius: 0.8
// });
// chart.axis(false);
// chart.tooltip(false);

// var geom = chart.interval().position('a*proportion').color('name', ['#1890FF', '#41D9C7', '#2FC25B', '#FACC14', '#E6965C', '#223273', '#7564CC', '#8543E0', '#5C8EE6', '#13C2C2', '#5CA3E6']).adjust('stack').style({
//   lineWidth: 1,
//   stroke: '#fff'
// });
// chart.render();

// // 开始交互逻辑
// // 一些辅助工具类函数

// var center = chart.get('coord').center; // 极坐标的圆点
// var container = geom.get('container');
// var canvas = chart.get('canvas');
// var el = canvas.get('el');
// var animating = false; // 动画状态标识位

// function interpolateNumber(a, b) {
//   a = +a;
//   b -= a;
//   return function(t) {
//     return a + b * t;
//   };
// }

// function findShapeByName(name) {
//   var result;
//   var shapes = geom.get('container').get('children');
//   Util.each(shapes, function(shape) {
//     var origin = shape.get('origin')._origin;
//     if (origin.name === name) {
//       result = shape;
//       return false;
//     }
//   });

//   return result;
// }

// function repaintChart(angle) {
//   var chartCoord = chart.get('coord');
//   var coordStart = chartCoord.startAngle + angle;
//   var coordEnd = chartCoord.endAngle + angle;

//   chart.coord('polar', {
//     transposed: true,
//     radius: 0.8,
//     startAngle: coordStart,
//     endAngle: coordEnd
//   });
//   chart.animate(false);
//   chart.repaint();
// }

// function animation(angle, data, animateCfg) {
//   var rotateAngle = Math.PI / 2 - angle;
//   var diff = interpolateNumber(0, rotateAngle);
//   if (rotateAngle !== 0) {
//     container.animate().to(animateCfg).onFrame(function(t) {
//       animating = true;
//       var frameAngle = diff(t);

//       container.setTransform([['t', center.x, center.y], ['r', frameAngle], ['t', -center.x, -center.y]]);

//       if (t === 1) {
//         animating = false;
//         repaintChart(rotateAngle);
//       }
//     });
//   }
// }

// var hammer = new Hammer(el);
// // 点击操作
// hammer.on('tap', function(e) {
//   if (animating) return;
//   var currentPoint = e.center;
//   var record = chart.getSnapRecords(currentPoint)[0];

//   if (!record) return;

//   var shape = findShapeByName(record._origin.name);
//   if (shape) {
//     var startAngle = shape.attr('startAngle');
//     var endAngle = shape.attr('endAngle');
//     var middleAngle = (startAngle + endAngle) / 2;

//     if (startAngle > endAngle && endAngle <= 0) {
//       middleAngle = (Math.PI * 2 - Math.abs(startAngle - endAngle)) / 2 + startAngle;

//       if (middleAngle > 1.5 * Math.PI) {
//         middleAngle = middleAngle - 2 * Math.PI;
//       }
//     }
//     animation(middleAngle, record, {
//       duration: 650,
//       easing: 'backOut'
//     });
//   }
// });

// var lastMouseAngle;
// var totalAngle;
// hammer.on('panstart panmove panend', function(e) {
//   if (animating) return;
//   var currentPoint = e.center;
//   var newMouseAngle = Math.atan2(currentPoint.y - center.y, currentPoint.x - center.x) + Math.PI;

//   if (e.type === 'panstart') {
//     lastMouseAngle = newMouseAngle;
//     totalAngle = 0;
//   } else if (e.type === 'panmove') {
//     var diffAngle = newMouseAngle - lastMouseAngle;
//     totalAngle += diffAngle;
//     container.transform([['t', center.x, center.y], ['r', diffAngle], ['t', -center.x, -center.y]]);
//     canvas.draw();
//   } else if (e.type === 'panend') {
//     repaintChart(totalAngle);

//     var shapes = container.get('children');
//     var middleAngle = Math.PI * 0.5;
//     var rotateShape;
//     Util.each(shapes, function(s) {
//       var startAngle = s.attr('startAngle');
//       var endAngle = s.attr('endAngle');

//       if (startAngle <= Math.PI * 0.5 && endAngle >= Math.PI * 0.5) {
//         rotateShape = s;
//         middleAngle = (startAngle + endAngle) / 2;
//         return false;
//       }
//     });

//     animation(middleAngle, rotateShape.get('origin'), {
//       duration: 250,
//       easing: 'backOut'
//     });
//   }

//   lastMouseAngle = newMouseAngle;
// });
