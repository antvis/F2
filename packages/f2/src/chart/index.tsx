import {
  isEqual,
  GroupStyleProps,
  IContext,
  LayoutProps,
  Component,
  Children,
  jsx,
  Ref,
  createRef,
} from '@antv/f-engine';
import { ScaleConfig } from '../deps/f2-scale/src';
import { each, findIndex, isArray, deepMix } from '@antv/util';
import CoordController, { Coord } from '../controller/coord';
import ScaleController from '../controller/scale';
import Theme from '../theme';
import { Data, DataRecord, DataRecordScale } from './Data';
import { CoordType, CoordProps } from './Coord';

export { Point } from './types';

export interface ChartProps<TRecord extends DataRecord = DataRecord> {
  data: Data<TRecord>;
  scale?: DataRecordScale<TRecord>;
  coord?: CoordType | CoordProps;
  style?: GroupStyleProps;
  theme?: Record<string, any>;
  children?: any;
}

export interface ChartState {
  filters: any;
}

export interface ChartChildProps<TRecord extends DataRecord = DataRecord> {
  data?: Data<TRecord>;
  chart?: Chart<TRecord>;
  coord?: Coord;
  layout?: LayoutProps;
}

export interface PositionLayout {
  position: 'top' | 'right' | 'bottom' | 'left';
  width: number;
  height: number;
}

export interface ComponentPosition {
  component: Component;
  layout: PositionLayout | PositionLayout[];
}

// 统计图表
class Chart<
  TRecord extends DataRecord = DataRecord,
  IProps extends ChartProps<TRecord> = ChartProps<TRecord>
> extends Component<IProps, ChartState> {
  // 坐标系
  private componentsPosition: ComponentPosition[] = [];

  // controller
  public coord: CoordController;
  public scale: ScaleController;

  public adjust: any;
  public coordRef: Ref;
  constructor(props: IProps, context?: IContext) {
    super(props);

    const { theme, px2hd } = context;

    // hack 处理，设置默认的主题样式
    // 目前没想到其他更合适的方式，只能先这样处理
    context.theme = deepMix(px2hd(Theme), theme);

    const { data } = props;

    this.scale = new ScaleController(data);
    this.coord = new CoordController();
    this.coordRef = createRef();
    // state
    this.state = {
      filters: {},
    };
  }

  private getStyle(props: IProps) {
    const { context, layout } = this;
    const { theme, px2hd } = context;
    const { left, top, width, height } = layout;
    const { style: customStyle } = props;
    return px2hd({
      left,
      top,
      width,
      height,
      ...theme.chart,
      ...customStyle,
    });
  }

  willMount() {
    const { props, coord, scale } = this;

    const { scale: scaleOptions, coord: coordOption } = props;

    this.resetCoordLayout();

    // 初始化 scale
    scale.create(scaleOptions);
    // 初始化 coord
    coord.create(coordOption);
  }

  // props 更新
  willReceiveProps(nextProps: IProps, context) {
    const { scale, coord, props: lastProps } = this;
    const { style: nextStyle, data: nextData, scale: nextScale } = nextProps;
    const { style: lastStyle, data: lastData, scale: lastScale } = lastProps;

    // style 更新
    if (!isEqual(nextStyle, lastStyle) || context !== this.context) {
      const style = this.getStyle(nextProps);
      coord.updateLayout(style);
    }

    if (nextData !== lastData) {
      scale.changeData(nextData);
    }

    // scale
    if (!isEqual(nextScale, lastScale)) {
      scale.update(nextScale);
    }
  }

  willUpdate(): void {
    this.coord.create(this.props.coord);
  }

  on(eventName: string, listener: (...args: any[]) => void) {
    const roolEl = this.coordRef.current;
    if (!roolEl || !roolEl.gesture) return;
    const gesture = roolEl.gesture;
    gesture.on(eventName, listener);
  }

  off(eventName: string, listener: (...args: any[]) => void) {
    const roolEl = this.coordRef.current;
    if (!roolEl || !roolEl.gesture) return;
    const gesture = roolEl.gesture;
    gesture.off(eventName, listener);
  }

  // 给需要显示的组件留空
  layoutCoord(layout: PositionLayout) {
    this.coord.useLayout(layout);
  }

  resetCoordLayout() {
    const { coord, props } = this;
    const style = this.getStyle(props);
    coord.updateLayout(style);
  }

  updateAdjust(adjust: any) {
    this.adjust = adjust;
  }

  updateCoordLayout(layout: PositionLayout | PositionLayout[]) {
    if (isArray(layout)) {
      layout.forEach((item) => {
        this.layoutCoord(item);
      });
      return;
    }
    this.layoutCoord(layout);
  }

  updateCoordFor(component: Component, layout: PositionLayout | PositionLayout[]) {
    if (!layout) return;
    const { componentsPosition } = this;
    const componentPosition = { component, layout };

    const existIndex = findIndex(componentsPosition, (item) => {
      return item.component === component;
    });

    // 说明是已经存在的组件
    if (existIndex > -1) {
      componentsPosition.splice(existIndex, 1, componentPosition);

      // 先重置，然后整体重新算一次
      this.resetCoordLayout();
      // 再整体计算前，需要去掉已经销毁的组件
      this.removeComponentsPositionCache();
      componentsPosition.forEach((componentPosition) => {
        const { layout } = componentPosition;
        this.updateCoordLayout(layout);
      });
      return;
    }

    // 是新组件，直接添加
    componentsPosition.push(componentPosition);
    this.updateCoordLayout(layout);
  }

  removeComponentsPositionCache() {
    if (!this.componentsPosition?.length) return;

    for (let i = this.componentsPosition.length; i > -1; i--) {
      const item = this.componentsPosition[i];
      if (item && item.component && item.component.destroyed) {
        this.componentsPosition.splice(i, 1);
      }
    }
  }

  getGeometrys() {
    // @ts-ignore
    const { children } = this.children;
    const geometrys: Component[] = [];
    Children.toArray(children).forEach((element) => {
      if (!element) return false;
      const { component } = element;
      // @ts-ignore
      if (component && component.isGeometry) {
        geometrys.push(component);
      }
    });
    return geometrys;
  }

  /**
   * calculate dataset's position on canvas
   * @param  {Object} record the dataset
   * @return {Object} return the position
   */
  getPosition(record) {
    const coord = this.getCoord();
    const xScale = this.getXScales()[0];
    const xField = xScale.field;
    const yScales = this.getYScales();
    // default first
    let yScale = yScales[0];
    let yField = yScale.field;
    for (let i = 0, len = yScales.length; i < len; i++) {
      const scale = yScales[i];
      const field = scale.field;
      if (record[field]) {
        yScale = scale;
        yField = field;
        break;
      }
    }
    const x = xScale.scale(record[xField]);
    const y = yScale.scale(record[yField]);
    return coord.convertPoint({ x, y });
  }

  getSnapRecords(point, inCoordRange?) {
    const geometrys = this.getGeometrys();
    if (!geometrys.length) return;
    // @ts-ignore
    return geometrys[0].getSnapRecords(point, inCoordRange);
  }

  getRecords(data, field) {
    const geometrys = this.getGeometrys();
    if (!geometrys.length) return;
    // @ts-ignore
    return geometrys[0].getRecords(data, field);
  }

  getLegendItems(point?) {
    const geometrys = this.getGeometrys();
    if (!geometrys.length) return;
    // @ts-ignore
    return geometrys[0].getLegendItems(point);
  }

  setScale(field: string, option: ScaleConfig) {
    this.scale.setScale(field, option);
  }

  getScale(field: string) {
    return this.scale.getScale(field);
  }

  getScales() {
    return this.scale.getScales();
  }

  getXScales() {
    const geometrys = this.getGeometrys();
    return geometrys.map((component) => {
      // @ts-ignore
      return component.getXScale();
    });
  }

  getYScales() {
    const geometrys = this.getGeometrys();
    return geometrys.map((component) => {
      // @ts-ignore
      return component.getYScale();
    });
  }

  getColorScales() {
    const geometrys = this.getGeometrys();
    return geometrys.map((component) => {
      // @ts-ignore
      return component.getColorScale();
    });
  }

  getLayout() {
    return this.coord.layout;
  }

  getCoord() {
    return this.coord.coord;
  }

  filter(field: string, condition) {
    const { filters } = this.state;
    this.setState({
      filters: {
        ...filters,
        [field]: condition,
      },
    });
  }

  _getRenderData() {
    const { props, state } = this;
    const { data } = props;
    const { filters } = state;
    if (!filters || !Object.keys(filters).length) {
      return data;
    }
    let filteredData = data;
    each(filters, (condition, field) => {
      if (!condition) return;
      filteredData = filteredData.filter((record) => {
        return condition(record[field], record);
      });
    });
    return filteredData;
  }

  render() {
    const { props, scale, layout: chartLayout } = this;
    const { children, data: originData } = props;
    if (!originData) return null;
    const data = this._getRenderData();
    const layout = this.getLayout();
    const coord = this.getCoord();
    const scaleOptions = scale.getOptions();
    const { width, height } = chartLayout;

    return (
      <group
        ref={this.coordRef}
        style={{
          width: width,
          height: height,
          fill: 'transparent',
        }}
      >
        {Children.map(children, (child) => {
          return Children.cloneElement(child, {
            data,
            chart: this,
            layout,
            coord,
            // 传 scaleOptions 是为了让 child 感知到 props 的的变化，合理的做法的应该是传递 scale，但是现在无法感知到 scale 的变化, 所以暂时只能先这么处理，scaleOptions 子组件目前是使用不到的。
            scaleOptions,
          });
        })}
      </group>
    );
  }
}

export default Chart;
