import { JSX } from '../jsx/jsx-namespace';
import { ScaleConfig } from '@antv/scale';
import { each, findIndex, isArray } from '@antv/util';
import Component from '../base/component';
import equal from '../base/equal';
import Layout from '../base/layout';
import Coord from '../coord';
import Children from '../children';
// types
import LayoutController from '../controller/layout';
import CoordController from '../controller/coord';
import ScaleController from '../controller/scale';

interface Point {
  x: number;
  y: number;
}

export interface Props {
  data: any;
  scale?: any;
  coord?: any;
  start?: Point;
  end?: Point;
  children: any;
}

export interface ChartChildProps {
  data?: any;
  chart?: Chart;
  coord?: Coord;
  layout?: Layout;
  [k: string]: any;
}

// type Scales = {
//   [field: string]: Scale;
// };

interface IChart {
  props: Props;
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
class Chart extends Component implements IChart {
  data: any;

  private layout: Layout;
  // 坐标系
  private coord: Coord;
  private componentsPosition: ComponentPosition[] = [];

  // controller
  private layoutController: LayoutController;
  private coordController: CoordController;
  private scaleController: ScaleController;
  scale: ScaleController;

  constructor(props, context?, updater?) {
    super(props, context, updater);

    const { data, coord: coordOption, scale = [] } = props;

    this.layoutController = new LayoutController();
    this.coordController = new CoordController();
    this.scaleController = new ScaleController(data);
    this.scale = this.scaleController;

    const { layoutController, coordController, scaleController } = this;

    // 布局
    const style = this.getStyle(props, context);
    this.layout = layoutController.create(style);

    // 坐标系
    this.coord = coordController.create(coordOption, this.layout);

    // scale
    scaleController.create(scale);

    this.data = data;

    // state
    this.state = {
      filters: {},
    };
  }

  // props 更新
  willReceiveProps(nextProps) {
    const { layoutController, coordController, scaleController, props: lastProps } = this;
    const { style: nextStyle, data: nextData, scale: nextScale } = nextProps;
    const { style: lastStyle, data: lastData, scale: lastScale } = lastProps;

    // 布局
    if (!equal(nextStyle, lastStyle)) {
      const style = this.getStyle(nextProps, this.context);
      this.layout = layoutController.create(style);
      coordController.updateLayout(this.layout);
    }

    if (nextData !== lastData) {
      scaleController.changeData(nextData);
    }

    // scale
    if (!equal(nextScale, lastScale)) {
      scaleController.update(nextScale);
    }
  }

  willUpdate() {
    const { coordController, props } = this;
    // render 时要重置 coord 范围，重置后需要让所有子组件都重新render
    // 所以这里不比较是否有差异，每次都新建，让所有子组件重新render
    this.coord = coordController.create(props.coord, this.layout);
  }

  private getStyle(props, context) {
    const { theme, px2hd, left, top, width, height } = context;
    const { style } = props;
    return px2hd({
      left,
      top,
      width,
      height,
      ...theme.chart,
      ...style,
    });
  }

  // 给需要显示的组件留空
  layoutCoord(layout: PositionLayout) {
    const { coord } = this;
    const { position, width: boxWidth, height: boxHeight } = layout;
    let { left, top, width, height } = coord;
    switch (position) {
      case 'left':
        left += boxWidth;
        width = Math.max(0, width - boxWidth);
        break;
      case 'right':
        width = Math.max(0, width - boxWidth);
        break;
      case 'top':
        top += boxHeight;
        height = Math.max(0, height - boxHeight);
        break;
      case 'bottom':
        height = Math.max(0, height - boxHeight);
        break;
    }
    coord.update({ left, top, width, height });
  }

  resetCoordLayout() {
    const { coord, layout } = this;
    coord.update(layout);
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
    this.scaleController.setScale(field, option);
  }

  getScale(field: string) {
    return this.scaleController.getScale(field);
  }

  getScales() {
    return this.scaleController.getScales();
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

  getCoord() {
    return this.coord;
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

  render(): JSX.Element {
    const { props, layout, coord } = this;
    const { children, data: originData } = props;
    if (!originData) return null;
    const data = this._getRenderData();

    return Children.map(children, (child) => {
      return Children.cloneElement(child, {
        chart: this,
        coord,
        data,
        layout,
      });
    });
  }
}

export default Chart;
