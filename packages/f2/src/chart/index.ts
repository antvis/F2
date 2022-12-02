import { isEqual, GroupStyleProps, IContext, LayoutProps } from '@antv/f-engine';
import { ScaleConfig } from '../deps/f2-scale/src';
import { each, findIndex, isArray, deepMix } from '@antv/util';
import { Component } from '../index';
import { Children } from '../index';
import CoordController, { Coord } from '../controller/coord';
import ScaleController from '../controller/scale';
import Theme from '../theme';
import { Data, DataRecord, DataRecordScale } from './Data';
import { CoordType, CoordProps } from './Coord';

export interface Point {
  x: number;
  y: number;
}

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
class Chart<TRecord extends DataRecord = DataRecord> extends Component<
  ChartProps<TRecord>,
  ChartState
> {
  // 坐标系
  private componentsPosition: ComponentPosition[] = [];

  // controller
  public coord: CoordController;
  public scale: ScaleController;

  constructor(props: ChartProps<TRecord>, context: IContext) {
    super(props);

    const { theme, px2hd } = context;
    // hack 处理，设置默认的主题样式
    // 目前没想到其他更合适的方式，只能先这样处理
    deepMix(theme, px2hd(Theme));

    const { data } = props;

    this.scale = new ScaleController(data);
    this.coord = new CoordController();

    // state
    this.state = {
      filters: {},
    };
  }

  private getStyle(props: ChartProps<TRecord>) {
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

    const style = this.getStyle(props);
    coord.updateLayout(style);

    // 初始化 scale
    scale.create(scaleOptions);
    // 初始化 coord
    coord.create(coordOption);
  }

  // props 更新
  willReceiveProps(nextProps: ChartProps<TRecord>) {
    const { scale, coord, props: lastProps } = this;
    const { style: nextStyle, data: nextData, scale: nextScale } = nextProps;
    const { style: lastStyle, data: lastData, scale: lastScale } = lastProps;

    // style 更新
    if (!isEqual(nextStyle, lastStyle)) {
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

  // 给需要显示的组件留空
  layoutCoord(layout: PositionLayout) {
    this.coord.useLayout(layout);
  }

  resetCoordLayout() {
    const { coord, props } = this;
    const style = this.getStyle(props);
    coord.updateLayout(style);
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

  getGeometrys() {
    const { children } = this;
    const geometrys: Component[] = [];
    // @ts-ignore
    Children.toArray(children).forEach((element) => {
      if (!element) return false;
      const { component } = element;
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
    const { props, scale } = this;
    const { children, data: originData } = props;
    if (!originData) return null;
    const data = this._getRenderData();
    const layout = this.getLayout();
    const coord = this.getCoord();
    const scaleOptions = scale.getOptions();

    return Children.map(children, (child) => {
      return Children.cloneElement(child, {
        data,
        chart: this,
        layout,
        coord,
        // 传 scaleOptions 是为了让 child 感知到 props 的的变化，合理的做法的应该是传递 scale，但是现在无法感知到 scale 的变化, 所以暂时只能先这么处理，scaleOptions 子组件目前是使用不到的。
        scaleOptions,
      });
    });
  }
}

export default Chart;
