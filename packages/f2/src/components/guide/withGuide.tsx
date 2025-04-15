import { jsx, Component, ComponentType, IContext, isEqual } from '@antv/f-engine';
import { isString, isNil, isFunction } from '@antv/util';
import Chart, { ChartChildProps, Point } from '../../chart';
import type { VNode } from '@antv/f-engine/es/canvas/vnode';
import { computeLayout, AnimationProps } from '@antv/f-engine';
import { DataRecord } from '../../chart/Data';

export interface GuideProps {
  records: any;
  onClick?: (ev) => void;
  animation?: ((points: Point[], chart: Chart) => AnimationProps) | AnimationProps;
  [key: string]: any;
}

export default function<IProps extends GuideProps = GuideProps>(
  View: ComponentType<IProps & ChartChildProps>
): ComponentType<IProps & ChartChildProps> & { displayName: string } {
  return class Guide extends Component<IProps & ChartChildProps> {
    static displayName = 'Guide';

    chart: Chart;

    rect: { width: number, height: number };

    constructor(props: IProps & ChartChildProps, context: IContext) {
      super(props);
      
      const { content, style } = props;
      const { measureText } = context;
      this.rect = measureText(content, style);
    }

    willReceiveProps(props: IProps & ChartChildProps<DataRecord>, context?: IContext): void {
      const { content, style } = props;
      if (content !== this.props.content || !isEqual(style, this.props.style)) {
        this.rect = context.measureText(content, style);
      }
    }

    getGuideBBox() {
      const node = computeLayout(this, this.render());
      const { layout } = node;
      if (!layout) return;
      return layout;
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
      const { placement } = this.props;
      const options = ['tc', 'tl', 'tr', 'bc', 'bl', 'br'];
      // placement 为空, 沿用历史逻辑保持兼容
      if (!placement || !options.includes(placement)) {
        return records.map((record) => this.parsePoint(record));
      }

      const { groupKey, records: intervalRecords, x: xAxis, y: yAxis } = this.getDodgeInterval() || {};
      if (!xAxis || !yAxis) {
        return records.map((record) => this.parsePoint(record));
      }

      // Chart 组件已对子组件进行排序, TextGuide 组件渲染次序排在最后
      // 因此 Interval 组件在 TextGuide 组件之前已完成挂载和位置信息的计算
      return records.map((record) => {
        // 对于未分组的数据，groupKey 为 undefined, intervalRecords 是长度唯一的数组, 默认会取到第一个
        const { children } = intervalRecords?.find((item) => item.key === record[groupKey]) || {};
        const child = children?.find((item) => item.origin?.[xAxis] === record[xAxis] && item.origin?.[yAxis] === record[yAxis]) || {};
        const { x, y } = child;
        const { width = 0, height = 0 } = this.rect || {};
        const [yPos, xPos] = placement.split('');
        const yOffset = yPos === 't' ? -height / 2 : height / 2;
        const xOffset = xPos === 'l' ? -width : xPos === 'r' ? 0 : -width / 2;
        return { x: x + xOffset, y: y + yOffset };
      });
    }

    getGuideTheme() {
      const { context } = this;
      const { theme } = context;
      return theme.guide;
    }

    getDodgeInterval() {
      const chartChildren = (this.props.chart?.children as VNode)?.children;
      const childList = Array.isArray(chartChildren) ? chartChildren : [chartChildren];
      const interval = childList.find((child) => typeof child.type === 'function' && child.type.name === 'Interval');
      const coordType = this.props.coord?.type;
      if (!interval || coordType !== 'rect') {
        return undefined;
      }

      const { color, x, y } = interval.props || {};
      const groupKey = typeof color === 'string' ? color : color?.field;
      // if (!groupKey) {
      //   return undefined;
      // }

      /** { key?: string, children: Record<string, any>[] }[] */
      const records = (interval?.children as VNode)?.props?.records || [];
      return { groupKey, records, x, y };
    }

    render() {
      const { props, context } = this;
      const { coord, records = [], animation, chart, style, onClick, visible = true } = props;
      if(!visible) return;
      const { width, height } = context;
      const points = this.convertPoints(records);
      const theme = this.getGuideTheme();

      return (
        <group
          onClick={(ev) => {
            onClick && onClick(ev);
          }}
        >
          <View
            points={points}
            theme={theme}
            coord={coord}
            {...props}
            canvasWidth={width}
            canvasHeight={height}
            style={isFunction(style) ? style(points, chart) : style}
            animation={isFunction(animation) ? animation(points, chart) : animation}
          />
        </group>
      );
    }
  };
}
