import { jsx } from '../../jsx';
import { Component } from '../../index';
import { deepMix, toInteger, isArray } from '@antv/util';
import { isInBBox } from '../../util';

const DEFAULT_CONFIG = {
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
    fillOpacity: 0.5,
  },
  label1OffsetY: -1,
  label2OffsetY: 1,
};

function getEndPoint(center, angle, r) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle),
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
// function isOverlap(label1, label2) {
//   const label1BBox = label1.getBBox();
//   const label2BBox = label2.getBBox();
//   return (
//     Math.max(label1BBox.minX, label2BBox.minX) <=
//       Math.min(label1BBox.maxX, label2BBox.maxX) &&
//     Math.max(label1BBox.minY, label2BBox.minY) <=
//       Math.min(label1BBox.maxY, label2BBox.maxY)
//   );
// }

function findShapesByClass(shape, targetClassName) {
  const { _attrs = {} } = shape || {};
  const { children, className } = _attrs;
  const result = [];
  if (className === targetClassName) {
    result.push(shape);
  }

  if (children && children.length) {
    for (let i = 0, len = children.length; i < len; i++) {
      result.push(...findShapesByClass(children[i], targetClassName));
    }
  }
  return result;
}

function findShapeByClassName(shape, point, className) {
  const targetShapes = findShapesByClass(shape, className);
  for (let i = 0, len = targetShapes.length; i < len; i++) {
    const shape = targetShapes[i];
    if (isInBBox(shape.getBBox(), point)) {
      return shape;
    }
  }
}

export default (View) => {
  return class PieLabel extends Component {
    triggerRef: any;
    labels: [];
    constructor(props) {
      super(props);
      this.props = deepMix({}, DEFAULT_CONFIG, this.props);
      this.triggerRef = {};
    }

    willMount() {}

    /**
     * 绑定事件
     */
    didMount() {
      this._initEvent();
    }

    getLabels() {
      const { context } = this;
      const {
        chart,
        anchorOffset,
        inflectionOffset,
        label1,
        label2,
        lineHeight,
        // skipOverlapLabels,
      } = this.props;
      const { coord } = chart;
      const { center, radius } = coord;

      const halves = [
        [], // left
        [], // right
      ]; // 存储左右 labels
      let labels = [];

      const geometry = chart.getGeometrys()[0];
      const { records } = geometry;

      records.forEach((record) => {
        const { children } = record;
        const child = children[0];
        const { xMin, xMax, color, origin } = child;

        // 算出锚点的基准位置
        const anchorAngle = getMiddleAngle(xMin, xMax);
        const anchorPoint = getEndPoint(center, anchorAngle, radius + anchorOffset);
        const inflectionPoint = getEndPoint(center, anchorAngle, radius + inflectionOffset);

        const label: any = {
          origin,
          _anchor: anchorPoint,
          _inflection: inflectionPoint,
          x: inflectionPoint.x,
          y: inflectionPoint.y,
          r: radius + inflectionOffset,
          fill: color,
        };

        // 映射label1\label2
        if (typeof label1 === 'function') {
          label.label1 = label1(origin, color);
        }
        if (typeof label2 === 'function') {
          label.label2 = label2(origin, color);
        }

        // 判断文本的方向
        if (anchorPoint.x < center.x) {
          label._side = 'left';
          halves[0].push(label);
        } else {
          label._side = 'right';
          halves[1].push(label);
        }
      });

      const height = context.height;
      // @ts-ignore
      const maxCountForOneSide = toInteger(height / lineHeight, 10);

      halves.forEach((half) => {
        if (half.length > maxCountForOneSide) {
          half.splice(maxCountForOneSide, half.length - maxCountForOneSide);
        }

        half.sort((a, b) => {
          return a.y - b.y;
        });

        labels = labels.concat(half);
      });

      return labels;
    }

    _handleEvent = (ev) => {
      const { chart, onClick } = this.props;
      const ele = this.triggerRef.current;
      const point = ev.points[0];

      const shape = findShapeByClassName(ele, point, 'click');
      const pieData = chart.getSnapRecords(point);

      if (typeof onClick === 'function') {
        // 点击label
        if (shape) {
          onClick(shape.get('data'));
        }
        // 点击饼图
        else if (isArray(pieData) && pieData.length > 0) {
          onClick(pieData);
        }
      }
    };

    _initEvent() {
      const { context, props } = this;
      const { canvas } = context;
      const { triggerOn } = props;

      canvas.on(triggerOn, this._handleEvent);
    }

    render() {
      const labels = this.getLabels();
      return <View labels={labels} {...this.props} triggerRef={this.triggerRef} />;
    }
  };
};
