const Util = require('../util/common');
const { Group } = require('../graphic/');
const DEFAULT_CFG = {
  anchorOffset: 5, // 锚点的偏移量
  inflectionOffset: 15, // 拐点的偏移量
  sidePadding: 20, // 文本距离画布四边的距离
  lineHeight: 32, // 文本的行高
  adjustOffset: 15, // 发生调整时的偏移量
  skipOverlapLabels: false, // 是否不展示重叠的文本
  triggerOn: 'touchstart', // 点击行为触发的时间类型
  activeShape: false, // 当有图形被选中的时候，是否激活图形
  activeStyle: {
    offset: 1,
    appendRadius: 8,
    fillOpacity: 0.5
  }
};

function getEndPoint(center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle)
  };
}

// 计算中间角度
function getMiddleAngle(startAngle, endAngle) {
  if (endAngle < startAngle) {
    endAngle += Math.PI * 2;
  }
  return (endAngle + startAngle) / 2;
}

// 判断两个矩形是否相交
function isOverlap(label1, label2) {
  const label1BBox = label1.getBBox();
  const label2BBox = label2.getBBox();
  return (
    (Math.max(label1BBox.minX, label2BBox.minX) <= Math.min(label1BBox.maxX, label2BBox.minX))
    &&
    (Math.max(label1BBox.minY, label2BBox.minY) <= Math.min(label1BBox.maxY, label2BBox.maxY))
  );
}

class controller {
  constructor(cfg) {
    Util.mix(this, cfg);
    const chart = this.chart;
    this.canvasDom = chart.get('canvas').get('el');
  }

  renderLabels() {
    const self = this;
    const { chart, pieLabelCfg, labelGroup } = self;

    const halves = [
      [], // left
      []  // right
    ]; // 存储左右 labels
    const geom = chart.get('geoms')[0];
    const shapes = geom.get('container').get('children');
    const { anchorOffset, inflectionOffset, label1, label2, lineHeight, skipOverlapLabels } = pieLabelCfg;
    const coord = chart.get('coord');
    const { center, circleRadius: radius } = coord;
    shapes.forEach(shape => {
      const { startAngle, endAngle } = shape._attrs.attrs;
      const middleAngle = getMiddleAngle(startAngle, endAngle);
      const anchorPoint = getEndPoint(center, middleAngle, radius + anchorOffset);
      const inflectionPoint = getEndPoint(center, middleAngle, radius + inflectionOffset);
      const origin = shape.get('origin');
      const { _origin, color } = origin;
      const label = {
        _anchor: anchorPoint,
        _inflection: inflectionPoint,
        _data: _origin,
        x: inflectionPoint.x,
        y: inflectionPoint.y,
        r: radius + inflectionOffset,
        fill: color
      };

      const textGroup = new Group({
        data: _origin // 存储原始数据
      });
      const textAttrs = {
        x: 0,
        y: 0,
        fontSize: 12,
        lineHeight: 12,
        fill: '#808080'
      };
      if (Util.isFunction(label1)) {
        textGroup.addShape('Text', {
          attrs: Util.mix({
            textBaseline: 'bottom'
          }, textAttrs, label1(_origin, color)),
          data: _origin // 存储原始数据
        });
      }

      if (Util.isFunction(label2)) {
        textGroup.addShape('Text', {
          attrs: Util.mix({
            textBaseline: 'top'
          }, textAttrs, label2(_origin, color)),
          data: _origin // 存储原始数据
        });
      }
      label.textGroup = textGroup;
      // 判断文本的方向
      if (anchorPoint.x < center.x) {
        label._side = 'left';
        halves[0].push(label);
      } else {
        label._side = 'right';
        halves[1].push(label);
      }
    });

    let drawnLabels = [];

    if (skipOverlapLabels) {
      let lastLabel; // 存储上一个 label 对象，用于检测文本是否重叠
      const labels = halves[1].concat(halves[0]); // 顺时针
      for (let i = 0, len = labels.length; i < len; i++) {
        const label = labels[i];
        const textGroup = self._drawLabel(label);
        if (lastLabel) {
          if (isOverlap(textGroup, lastLabel)) { // 重叠了就不绘制
            continue;
          }
        }

        labelGroup.add(textGroup);
        self._drawLabelLine(label);
        lastLabel = textGroup;
        drawnLabels.push(textGroup);
      }
    } else {
      const height = chart.get('height');
      const maxCountForOneSide = parseInt(height / lineHeight, 10);

      halves.forEach(half => {
        if (half.length > maxCountForOneSide) {
          half.splice(maxCountForOneSide, half.length - maxCountForOneSide);
        }

        half.sort((a, b) => {
          return a.y - b.y;
        });

        const labels = self._antiCollision(half);
        drawnLabels = drawnLabels.concat(labels);
      });
    }

    this.drawnLabels = drawnLabels;
  }

  bindEvents() {
    const pieLabelCfg = this.pieLabelCfg;
    const triggerOn = pieLabelCfg.triggerOn || 'touchstart';
    const method = Util.wrapBehavior(this, '_handleEvent');
    Util.addEventListener(this.canvasDom, triggerOn, method);
  }

  unBindEvents() {
    const pieLabelCfg = this.pieLabelCfg;
    const triggerOn = pieLabelCfg.triggerOn || 'touchstart';
    const method = Util.getWrapBehavior(this, '_handleEvent');
    Util.removeEventListener(this.canvasDom, triggerOn, method);
  }

  clear() {
    this.labelGroup && this.labelGroup.clear();
    this.halo && this.halo.remove(true);
    this.lastSelectedData = null;
    this.drawnLabels = [];
    this.unBindEvents();
  }

  _drawLabel(label) {
    const { pieLabelCfg, chart } = this;
    const canvasWidth = chart.get('width');
    const { sidePadding } = pieLabelCfg;
    const { y, textGroup } = label;

    const children = textGroup.get('children');
    const textAttrs = {
      textAlign: label._side === 'left' ? 'left' : 'right',
      x: label._side === 'left' ? sidePadding : canvasWidth - sidePadding,
      y
    };

    children.forEach(child => {
      child.attr(textAttrs);
    });

    return textGroup;
  }

  _drawLabelLine(label, maxLabelWidth) {
    const { chart, pieLabelCfg, labelGroup } = this;
    const canvasWidth = chart.get('width');
    const { sidePadding, adjustOffset, lineStyle, anchorStyle, skipOverlapLabels } = pieLabelCfg;
    const { _anchor, _inflection, fill, y } = label;
    const lastPoint = {
      x: label._side === 'left' ? sidePadding : canvasWidth - sidePadding,
      y
    };

    let points = [
      _anchor,
      _inflection,
      lastPoint
    ];
    if (!skipOverlapLabels && _inflection.y !== y) { // 展示全部文本文本位置做过调整
      if (_inflection.y < y) { // 文本被调整下去了，则添加拐点连接线
        const point1 = _inflection;
        const point2 = {
          x: label._side === 'left' ? lastPoint.x + maxLabelWidth + adjustOffset : lastPoint.x - maxLabelWidth - adjustOffset,
          y: _inflection.y
        };
        const point3 = {
          x: label._side === 'left' ? lastPoint.x + maxLabelWidth : lastPoint.x - maxLabelWidth,
          y: lastPoint.y
        };

        points = [
          _anchor,
          point1,
          point2,
          point3,
          lastPoint
        ];

        if ((label._side === 'right' && point2.x < point1.x) || (label._side === 'left' && point2.x > point1.x)) {
          points = [
            _anchor,
            point3,
            lastPoint
          ];
        }
      } else {
        points = [
          _anchor,
          {
            x: _inflection.x,
            y
          },
          lastPoint
        ];
      }
    }

    labelGroup.addShape('Polyline', {
      attrs: Util.mix({
        points,
        lineWidth: 1,
        stroke: fill
      }, lineStyle)
    });

    // 绘制锚点
    labelGroup.addShape('Circle', {
      attrs: Util.mix({
        x: _anchor.x,
        y: _anchor.y,
        r: 2,
        fill
      }, anchorStyle)
    });
  }

  _antiCollision(half) {
    const self = this;
    const { chart, pieLabelCfg } = self;
    const coord = chart.get('coord');
    const canvasHeight = chart.get('height');
    const { center, circleRadius: r } = coord;
    const { inflectionOffset, lineHeight } = pieLabelCfg;
    const startY = center.y - r - inflectionOffset - lineHeight;
    let overlapping = true;
    let totalH = canvasHeight;
    let i;

    let maxY = 0;
    let minY = Number.MIN_VALUE;
    let maxLabelWidth = 0;
    const boxes = half.map(function(label) {
      const labelY = label.y;
      if (labelY > maxY) {
        maxY = labelY;
      }
      if (labelY < minY) {
        minY = labelY;
      }

      const textGroup = label.textGroup;
      const labelWidth = textGroup.getBBox().width;
      if (labelWidth >= maxLabelWidth) {
        maxLabelWidth = labelWidth;
      }

      return {
        size: lineHeight,
        targets: [ labelY - startY ]
      };
    });
    if ((maxY - startY) > totalH) {
      totalH = maxY - startY;
    }

    const iteratorBoxed = function(boxes) {
      boxes.forEach(box => {
        const target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
        box.pos = Math.min(Math.max(minY, target - box.size / 2), totalH - box.size);
      });
    };

    while (overlapping) {
      iteratorBoxed(boxes);
      // detect overlapping and join boxes
      overlapping = false;
      i = boxes.length;
      while (i--) {
        if (i > 0) {
          const previousBox = boxes[i - 1];
          const box = boxes[i];
          if (previousBox.pos + previousBox.size > box.pos) { // overlapping
            previousBox.size += box.size;
            previousBox.targets = previousBox.targets.concat(box.targets);

            // overflow, shift up
            if (previousBox.pos + previousBox.size > totalH) {
              previousBox.pos = totalH - previousBox.size;
            }
            boxes.splice(i, 1); // removing box
            overlapping = true;
          }
        }
      }
    }

    i = 0;
    boxes.forEach(function(b) {
      let posInCompositeBox = startY; // middle of the label
      b.targets.forEach(function() {
        half[i].y = b.pos + posInCompositeBox + lineHeight / 2;
        posInCompositeBox += lineHeight;
        i++;
      });
    });

    const drawnLabels = [];
    half.forEach(function(label) {
      const textGroup = self._drawLabel(label);
      const labelGroup = self.labelGroup;
      labelGroup.add(textGroup);
      self._drawLabelLine(label, maxLabelWidth);
      drawnLabels.push(textGroup);
    });

    return drawnLabels;
  }

  _handleEvent(ev) {
    const self = this;
    const { chart, drawnLabels, pieLabelCfg } = self;
    const { onClick, activeShape } = pieLabelCfg;
    const canvasEvent = Util.createEvent(ev, chart);
    const { x, y } = canvasEvent;

    // 查找被点击的 label
    let clickedShape;
    for (let i = 0, len = drawnLabels.length; i < len; i++) {
      const shape = drawnLabels[i];
      const bbox = shape.getBBox();
      // 通过最小包围盒来判断击中情况
      if (x >= bbox.minX && x <= bbox.maxX && y >= bbox.minY && y <= bbox.maxY) {
        clickedShape = shape;
        break;
      }
    }

    const pieData = chart.getSnapRecords({ x, y });
    if (clickedShape) {
      canvasEvent.data = clickedShape.get('data');
    } else if (pieData.length) { // 击中饼图扇形区域
      canvasEvent.data = pieData[0]._origin;
    }

    onClick && onClick(canvasEvent);
    canvasEvent.data && activeShape && this._activeShape(canvasEvent.data);
  }

  _getSelectedShapeByData(data) {
    let selectedShape = null;
    const chart = this.chart;
    const geom = chart.get('geoms')[0];
    const container = geom.get('container');
    const children = container.get('children');
    Util.each(children, child => {
      if (child.get('isShape') && (child.get('className') === geom.get('type'))) { // get geometry's shape
        const shapeData = child.get('origin')._origin;
        if (Util.isObjectValueEqual(shapeData, data)) {
          selectedShape = child;
          return false;
        }
      }
    });
    return selectedShape;
  }

  _activeShape(data) {
    const { chart, lastSelectedData, pieLabelCfg } = this;
    if (data === lastSelectedData) {
      return;
    }
    this.lastSelectedData = data;
    const activeStyle = pieLabelCfg.activeStyle;
    const selectedShape = this._getSelectedShapeByData(data);
    const { x, y, startAngle, endAngle, r, fill } = selectedShape._attrs.attrs;
    const frontPlot = chart.get('frontPlot');
    this.halo && this.halo.remove(true);
    const halo = frontPlot.addShape('sector', {
      attrs: Util.mix({
        x,
        y,
        r: r + activeStyle.offset + activeStyle.appendRadius,
        r0: r + activeStyle.offset,
        fill,
        startAngle,
        endAngle
      }, activeStyle)
    });
    this.halo = halo;
    chart.get('canvas').draw();
  }
}


module.exports = {
  init(chart) {
    const frontPlot = chart.get('frontPlot');
    const labelGroup = frontPlot.addGroup({
      className: 'pie-label',
      zIndex: 0
    });
    const pieLabelController = new controller({
      chart,
      labelGroup
    });
    chart.set('pieLabelController', pieLabelController);
    chart.pieLabel = function(cfg) {
      cfg = Util.deepMix({}, DEFAULT_CFG, cfg);
      pieLabelController.pieLabelCfg = cfg;

      return this;
    };

  },
  afterGeomDraw(chart) {
    const controller = chart.get('pieLabelController');
    if (controller.pieLabelCfg) { // 用户配置了饼图文本
      controller.renderLabels();
      controller.bindEvents(); // 绑定事件
    }
  },
  clearInner(chart) {
    const controller = chart.get('pieLabelController');
    if (controller.pieLabelCfg) { // 用户配置了饼图文本
      controller.clear();
    }
  }
};
