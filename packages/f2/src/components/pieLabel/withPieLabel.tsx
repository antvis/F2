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
// 第二象限
function isSecondQuadrant(angle: number) {
  return angle >= 0 && angle < Math.PI / 2;
}

function isThirdQuadrant(angle: number) {
  return angle >= Math.PI / 2 && angle < Math.PI;
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

      const {
        center,
        radius,
        width: coordWidth,
        height: coordHeight,
        left: coordLeft,
        right: coordRight,
        top: coordTop,
      } = coord;

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
        };

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

      // label 的最大宽度
      const labelWidth =
        coordWidth / 2 - radius - anchorOffset - inflectionOffset - 2 * sidePadding;
      const labels = [];
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

        const pointsY = half.map((label) => label.y);
        const maxY = Math.max.apply(null, pointsY);
        const minY = Math.min.apply(null, pointsY);

        // 每个 label 占用的高度
        const labelCount = half.length;
        const labelHeight = coordHeight / labelCount;
        const halfLabelHeight = labelHeight / 2;
        // 线之间的间隔
        const lineInterval = 2;

        if (showSide === 'left') {
          half.forEach((label, index) => {
            const { anchor, inflection, angle, x, y } = label;

            const points = [anchor, inflection];
            const endX = coordLeft + sidePadding;
            const endY = coordTop + halfLabelHeight + labelHeight * index;

            // 文本开始点
            const labelStart = {
              x: endX + labelWidth + lineInterval * index,
              y: endY,
            };
            // 文本结束点
            const labelEnd = { x: endX, y: endY };

            // 第四象限
            if (isFirstQuadrant(angle)) {
              const pointY = minY - lineInterval * (labelCount - index);
              points.push({ x, y: pointY });
              points.push({ x: labelStart.x, y: pointY });
            } else if (isThirdQuadrant(angle) || isFourthQuadrant(angle)) {
              points.push({ x: labelStart.x, y });
            } else if (isSecondQuadrant(angle)) {
              const pointY = maxY + lineInterval * index;
              points.push({ x, y: pointY });
              points.push({ x: labelStart.x, y: pointY });
            }

            points.push(labelStart);
            points.push(labelEnd);

            label.points = points;
            label.side = showSide;

            labels.push(label);
          });
        } else {
          half.forEach((label, index) => {
            const { anchor, inflection, angle, x, y } = label;

            // 折线的点
            const points = [anchor, inflection];
            const endX = coordRight - sidePadding;
            const endY = coordTop + halfLabelHeight + labelHeight * index;

            // 文本开始点
            const labelStart = {
              x: endX - labelWidth - lineInterval * index,
              y: endY,
            };
            // 文本结束点
            const labelEnd = { x: endX, y: endY };

            // 第四象限
            if (isFourthQuadrant(angle)) {
              const pointY = minY - lineInterval * (labelCount - index);
              points.push({ x, y: pointY });
              points.push({ x: labelStart.x, y: pointY });
            } else if (isFirstQuadrant(angle) || isSecondQuadrant(angle)) {
              points.push({ x: labelStart.x, y });
            } else if (isThirdQuadrant(angle)) {
              const pointY = maxY + lineInterval * index;
              points.push({ x, y: pointY });
              points.push({ x: labelStart.x, y: pointY });
            }

            points.push(labelStart);
            points.push(labelEnd);

            label.points = points;
            label.side = showSide;
            labels.push(label);
          });
        }
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
