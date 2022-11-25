import { jsx } from '../../index';
import { Component, Ref, ComponentType } from '@antv/f-engine';
import { isString, isNil, isFunction } from '@antv/util';
import Chart, { ChartChildProps, Point } from '../../chart';
import { computeLayout, AnimationProps } from '@antv/f-engine';

function isInBBox(bbox, point) {
  const { minX, maxX, minY, maxY } = bbox;
  const { x, y } = point;
  return minX <= x && maxX >= x && minY <= y && maxY >= y;
}

export interface GuideProps {
  records: any;
  onClick?: (ev) => void;
  animation?: ((points: Point[], chart: Chart) => AnimationProps) | AnimationProps;
  [key: string]: any;
}

export default (View: ComponentType) => {
  return class Guide extends Component<GuideProps & ChartChildProps> {
    chart: Chart;
    triggerRef: Ref;
    guideBBox: any;

    constructor(props: GuideProps & ChartChildProps) {
      super(props);
      // 创建ref
      this.triggerRef = {};
      this.state = {};
    }

    willMount() {
      this.guideBBox = this.getGuideBBox();
    }

    didMount() {
      const { context, props } = this;
      const { onClick } = props;

      context.gesture.on('click', (ev) => {
        const { x, y } = ev;
        const shape = this.triggerRef.current;
        if (!shape || shape.isDestroyed()) return;
        const bbox = shape.getBBox();
        if (isInBBox(bbox, { x, y })) {
          ev.shape = shape;
          onClick && onClick(ev);
        }
      });
    }

    didUpdate() {
      this.guideBBox = this.getGuideBBox();
    }

    getGuideBBox() {
      const node = computeLayout(this, this.render());
      const { layout } = node;
      if (!layout) return;

      const { width, height } = layout;
      // getBBox 没有包含 padding 所以这里手动计算 bbox
      const box = {
        width,
        height,
      };

      return box;
    }

    // 解析record里的模板字符串，如min、max、50%...
    parseReplaceStr(value, scale) {
      const replaceMap = {
        min: 0,
        max: 1,
        median: 0.5,
      };

      // 传入的是 min、max、median 的
      if (!isNil(replaceMap[value])) {
        return replaceMap[value];
      }

      // 传入的是 xx%
      if (isString(value) && value.indexOf('%') != -1 && !isNaN(Number(value.slice(0, -1)))) {
        const rateValue = Number(value.slice(0, -1));
        const percent = rateValue / 100;
        return percent;
      }

      return scale.scale(value);
    }

    parsePoint(record) {
      const { props } = this;
      const { chart, coord } = props;
      const xScale = chart.getXScales()[0];
      // 只取第一个yScale
      const yScale = chart.getYScales()[0];

      // 解析 record 为归一化后的坐标
      const x = this.parseReplaceStr(record[xScale.field], xScale);
      const y = this.parseReplaceStr(record[yScale.field], yScale);

      return coord.convertPoint({ x, y });
    }

    convertPoints(records) {
      return records.map((record) => this.parsePoint(record));
    }

    getGuideTheme() {
      const { context } = this;
      const { theme } = context;
      return theme.guide;
    }

    render() {
      const { props, context, guideBBox } = this;
      const { coord, records = [], animation, chart } = props;
      const { width, height } = context;
      const points = this.convertPoints(records);
      const theme = this.getGuideTheme();

      return (
        <View
          triggerRef={this.triggerRef}
          points={points}
          theme={theme}
          coord={coord}
          {...props}
          canvasWidth={width}
          canvasHeight={height}
          guideBBox={guideBBox}
          animation={isFunction(animation) ? animation(points, chart) : animation}
        />
      );
    }
  };
};
