import { jsx, Component } from '@antv/f-engine';
import { deepMix, isFunction } from '@antv/util';
import { ChartChildProps, Point } from '../../chart';

const DEFAULT_CONFIG = {
  anchorOffset: '10px', // 锚点的偏移量
  inflectionOffset: '30px', // 拐点的偏移量
  sidePadding: '15px', // 文本距离画布四边的距离
  height: '64px', // 文本的行高
  adjustOffset: '30', // 发生调整时的偏移量
  triggerOn: 'click', // 点击行为触发的时间类型
  // activeShape: false, // 当有图形被选中的时候，是否激活图形
  // activeStyle: {
  //   offset: '1px',
  //   appendRadius: '8px',
  //   fillOpacity: 0.5,
  // },
  label1OffsetY: '-4px',
  label2OffsetY: '4px',
  adjustRatio: 0.5, // 调整高度的阈值比例
};

function getEndPoint(center: Point, angle: number, r: number) {
  return {
    x: center.x + r * Math.cos(angle),
    y: center.y + r * Math.sin(angle),
  };
}

// 计算中间角度
function getMiddleAngle(startAngle: number, endAngle: number) {
  if (endAngle < startAngle) {
    endAngle += Math.PI * 2;
  }
  return (endAngle + startAngle) / 2;
}

function move(from, to, count, center) {
  const { x } = center;
  const sort = from.sort((a, b) => {
    const aDistance = Math.abs(a.x - x);
    const bDistance = Math.abs(b.x - x);
    return bDistance - aDistance;
  });
  return [sort.slice(0, sort.length - count), sort.slice(sort.length - count).concat(to)];
}

// 第一象限
function isFirstQuadrant(angle: number) {
  return angle >= -Math.PI / 2 && angle < 0;
}

function isFourthQuadrant(angle: number) {
  return angle >= Math.PI && angle < (Math.PI * 3) / 2;
}

export interface PieLabelProps {
  anchorOffset?: string | number;
  inflectionOffset?: string | number;
  label1?: any;
  label2?: any;
  sidePadding?: string | number;
  /**
   * 触发的事件类型
   */
  triggerOn?: 'click' | 'press';
  onClick?: (ev) => void;
  /**
   * 调整高度的阈值比例，用于判断是否使用两段式连线
   * @default 0.5
   */
  adjustRatio?: number;
}

export default (View) => {
  return class PieLabel<IProps extends PieLabelProps = PieLabelProps> extends Component<
    IProps & ChartChildProps
  > {
    labels: [];
    constructor(props) {
      super(props);
    }

    willMount() {}

    /**
     * 绑定事件
     */
    didMount() {}

    getLabels(props) {
      const {
        chart,
        coord,
        anchorOffset,
        inflectionOffset,
        label1,
        label2,
        height: itemHeight,
        sidePadding,
      } = props;
      const { measureText } = this.context;
      const { center, radius, height: coordHeight, width: coordWidth } = coord;

      const maxCountForOneSide = Math.floor(coordHeight / itemHeight);
      const maxCount = maxCountForOneSide * 2;

      const geometry = chart.getGeometrys()[0];
      const records = geometry
        .flatRecords()
        // 按角度大到小排序
        .sort((a, b) => {
          const angle1 = a.xMax - a.xMin;
          const angle2 = b.xMax - b.xMin;
          return angle2 - angle1;
        })
        // 只取前 maxCount 个显示
        .slice(0, maxCount);

      // 存储左右 labels
      let halves = [
        [], // left
        [], // right
      ];
      // label 的最大宽度
      const labelWidth =
        coordWidth / 2 - radius - anchorOffset - inflectionOffset - 2 * sidePadding;
      records.forEach((record) => {
        const { xMin, xMax, color, origin } = record;

        // 锚点角度
        const anchorAngle = getMiddleAngle(xMin, xMax);
        // 锚点坐标
        const anchorPoint = getEndPoint(center, anchorAngle, radius + anchorOffset);
        // 拐点坐标
        const inflectionPoint = getEndPoint(center, anchorAngle, radius + inflectionOffset);
        // 锚点方向
        const side = anchorPoint.x < center.x ? 'left' : 'right';

        const label = {
          origin,
          angle: anchorAngle,
          anchor: anchorPoint,
          inflection: inflectionPoint,
          side,
          x: inflectionPoint.x,
          y: inflectionPoint.y,
          r: radius + inflectionOffset,
          color,
          label1: isFunction(label1) ? label1(origin, record) : label1,
          label2: isFunction(label2) ? label2(origin, record) : label2,
          height: 0,
        };

        const height =
          measureText(label.label1.text, label.label1).height +
          measureText(label.label2.text, label.label2).height;
        label.height = height;

        // 判断文本的方向
        if (side === 'left') {
          halves[0].push(label);
        } else {
          halves[1].push(label);
        }
      });

      // 判断是有一边超过了显示的最大
      if (halves[0].length > maxCountForOneSide) {
        halves = move(halves[0], halves[1], halves[0].length - maxCountForOneSide, center);
      } else if (halves[1].length > maxCountForOneSide) {
        const [right, left] = move(
          halves[1],
          halves[0],
          halves[1].length - maxCountForOneSide,
          center
        );
        halves = [left, right];
      }

      let labels = [];
      halves.forEach((half, index) => {
        const showSide = index === 0 ? 'left' : 'right';

        // 顺时针方向排序
        half.sort((a, b) => {
          let aAngle = a.angle;
          let bAngle = b.angle;
          if (showSide === 'left') {
            // 是否在第一象限
            aAngle = isFirstQuadrant(aAngle) ? aAngle + Math.PI * 2 : aAngle;
            bAngle = isFirstQuadrant(bAngle) ? bAngle + Math.PI * 2 : bAngle;
            return bAngle - aAngle;
          } else {
            // 是否在第四象限
            aAngle = isFourthQuadrant(aAngle) ? aAngle - Math.PI * 2 : aAngle;
            bAngle = isFourthQuadrant(bAngle) ? bAngle - Math.PI * 2 : bAngle;
            return aAngle - bAngle;
          }
        });

        labels = labels.concat(this.adjustPosition(half, showSide, props, labelWidth));
      });

      return labels;
    }

    adjustPosition(half, showSide, props, labelWidth) {
      const { coord, sidePadding, adjustOffset } = props;
      const { left: coordLeft, right: coordRight } = coord;
      const labels = [];
      let lastY = 0;
      let delta;

      half.forEach((label) => {
        const { anchor, inflection, y, height } = label;

        const points = [anchor, inflection];
        const endX = showSide === 'left' ? coordLeft + sidePadding : coordRight - sidePadding;
        let endY = y;
        delta = y - lastY - height;

        if (delta < 0) {
          // 文本调整下去了 需要添加折线
          endY = y - delta;
          const point2 = {
            x:
              showSide === 'left'
                ? endX + labelWidth + adjustOffset
                : endX - labelWidth - adjustOffset,
            y: inflection.y,
          };
          const point3 = {
            x: showSide === 'left' ? endX + labelWidth : endX - labelWidth,
            y: endY,
          };

          if (
            Math.abs(delta) < height * props.adjustRatio ||
            (showSide === 'right' && point2.x < inflection.x) ||
            (showSide === 'left' && point2.x > inflection.x)
          ) {
            // 根据锚点位置计算拐点
            const bendPoint = {
              x: anchor.x + (point3.x - anchor.x) * 0.5,
              y: endY,
            };
            points[1] = bendPoint;
          } else {
            points.push(point2);
            points.push(point3);
          }
        }
        // 文本结束点
        const labelEnd = { x: endX, y: endY };
        lastY = y;

        points.push(labelEnd);

        label.points = points;
        label.side = showSide;

        labels.push(label);
      });
      return labels;
    }

    render() {
      const { context } = this;
      const props = context.px2hd(deepMix({}, DEFAULT_CONFIG, this.props));
      const labels = this.getLabels(props);
      return <View labels={labels} {...props} />;
    }
  };
};
