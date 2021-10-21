import { mix, each, isNil } from '@antv/util';
import Component from '../base/component';
import { applyMixins } from '../mixins';
import CoordMixin from '../mixins/coord';
import ScaleMixin from '../mixins/scale';
import InteractionMixin from '../mixins/interaction';
import Layout from '../base/layout';
import Coord from '../coord';
import Children from '../children';

interface Point {
  x: number;
  y: number;
}

interface Props {
  data: any;
  scale?: any;
  coord?: any;
  start?: Point;
  end?: Point;
  children: any;
}

interface IChart {
  props: Props;
}

// 统计图表
class Chart
  extends Component
  implements IChart, CoordMixin, ScaleMixin, InteractionMixin
{
  data: any;
  layout: Layout;

  // 坐标系
  coord: Coord;
  createCoord: (coord, layout) => Coord;
  updateCoord: (coord, layout) => Coord;

  // 度量
  scale: any;
  createScaleController: (data) => any;
  setScale: any;
  getScale: (field) => any;
  updateScales: (data) => any;

  // 交互
  interaction: any;
  createInteractionController: ({ chart: any }) => any;
  setInteraction: (type, cfg) => any;

  constructor(props, context?, updater?) {
    super(props, context, updater);
    const { data, coord: coordOption, scale, interactions = [] } = props;

    const style = this.getStyle(props, context);
    // 显示范围
    const layout = Layout.fromStyle(style);
    // 创建坐标系
    const coord = this.createCoord(coordOption, layout);
    // 初始化scales
    const scaleController = this.createScaleController(data);
    // 创建交互事件控制器
    const interactionController = this.createInteractionController({
      chart: this,
    });

    // 定义scale
    each(scale, (def, field) => {
      scaleController.scale(field, def);
    });

    // 定义事件
    interactions.forEach((interaction) => {
      const { type, ...cfg } = interaction;
      interactionController.createInteraction(type, cfg);
    });

    // 记录data, 全局唯一
    this.data = data;
    this.layout = layout;
    this.coord = coord;
    this.scale = scaleController;
    this.interaction = interactionController;

    // state
    this.state = {
      zoomRange: [0, 1],
    };
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

  // 重置绘制大小
  resetCoord() {
    const { coord, layout } = this;
    coord.update(layout);
  }

  layoutCoord(position, box) {
    const { coord } = this;
    const { width: boxWidth, height: boxHeight } = box;
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

  // mount() {
  //   const { props } = this;
  //   const { theme, layout, style, coord, canvas } = props;
  //   // 初始化默认主题
  //   this.theme = canvas.px2hd(mix({}, defaultTheme, theme));
  //   const { paddingLeft, paddingTop, paddingRight, paddingBottom } = this.theme;

  //   this.layout = layout
  //     .clone()
  //     .padding({
  //       left: paddingLeft,
  //       top: paddingTop,
  //       right: paddingRight,
  //       bottom: paddingBottom
  //     })
  //     .padding(style);

  //   // 创建scale
  //   this.updateScales();
  //   // 初始化交互事件，需要放到scale创建之后
  //   this.initInteractions();
  //   super.mount();
  // }

  // 自己管理所有子组件的状态
  willReceiveProps(nextProps) {
    const { props } = this;
    // 数据变化后，所有的子组件状态可能都有变化，需要重新更新
    if (props.data !== nextProps.data) {
      this.updateScales(nextProps.data);
      return;
    }
  }

  // _getAppendProps() {
  //   // chart内的子组件默认注入的props
  //   const { coord } = this;
  //   const _appendProps = super._getAppendProps();
  //   return {
  //     ..._appendProps,
  //     coord
  //   };
  // }
  // update() {
  //   const { props } = this;
  //   const { theme, layout, style, coord, canvas, data } = props;
  //   this.data = data;
  //   // 初始化默认主题
  //   this.theme = canvas.px2hd(mix({}, defaultTheme, theme));
  //   const { paddingLeft, paddingTop, paddingRight, paddingBottom } = this.theme;

  //   this.layout = layout
  //     .clone()
  //     .padding({
  //       left: paddingLeft,
  //       top: paddingTop,
  //       right: paddingRight,
  //       bottom: paddingBottom
  //     })
  //     .padding(style);

  //   // 创建坐标系
  //   this.coord = this.updateCoord(coord, this.layout);
  //   // 创建scale

  //   super.update(props);
  // }

  // forceUpdate() {
  //   const { components } = this;
  //   map(components, component => {
  //     if (!component) {
  //       return;
  //     }
  //     component.forceUpdate();
  //   });
  //   super.forceUpdate();
  // }

  // changeGetGeometryData(data) {
  //   const geometrys = this.getGeometrys();
  //   if (!geometrys.length) return;
  //   geometrys.forEach(geometry => {
  //     // @ts-ignore
  //     geometry.changeData(data);
  //   });
  // }

  getGeometrys() {
    const { children } = this;
    const geometrys: Component[] = [];
    Children.toArray(children).forEach((element) => {
      if (!element) return false;
      const { component } = element;
      if (component && component.isGeometry) {
        geometrys.push(component);
      }
    });
    return geometrys;
  }

  getSnapRecords(point) {
    const geometrys = this.getGeometrys();
    if (!geometrys.length) return;
    // @ts-ignore
    return geometrys[0].getSnapRecords(point);
  }

  getLegendItems(point) {
    const geometrys = this.getGeometrys();
    if (!geometrys.length) return;
    // @ts-ignore
    return geometrys[0].getLegendItems(point);
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

  render(): JSX.Element {
    // this.resetCoord();
    const { props, layout, coord } = this;
    const { children, data } = props;
    return Children.map(children, (child) => {
      return Children.cloneElement(child, {
        data,
        chart: this,
        coord,
        layout,
        zoomRange: this.state.zoomRange,
      });
    });
  }
}

// 多继承
applyMixins(Chart, [CoordMixin, ScaleMixin, InteractionMixin]);

class ExportChart extends Chart {}

export default ExportChart;
