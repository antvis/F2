import { map, px2hd } from '@ali/f2x-util';
import { each, isString, upperFirst } from '@antv/util';
import Container from '../component/container';
import ScaleController from './scale';
import Plot from './plot';
import * as Coord from './coord';
import theme from './theme';
import Layout from '../canvas/layout';

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
  theme?: any;
}

// 统计图表
class Chart extends Container {
  scales: any;
  props: Props;
  plot: Plot;
  coord: any;
  theme: any;

  scaleController: ScaleController;

  constructor(props: Props) {
    super(props);
    this.theme = {
      ...theme,
      ...props.theme,
    };
    // 设置子元素对chart的引用
    const { components } = this;
    map(components, (component) => {
      component.chart = this;
    });
  }

  init(config) {
    const { layout: defaultLayout } = config;
    const { props, theme } = this;
    const {
      // 默认用父元素的大小
      start = { x: defaultLayout.left, y: defaultLayout.top },
      end = { x: defaultLayout.right, y: defaultLayout.bottom },
      coord: coordCfg,
      scale
    } = props;


    const layout = new Layout({
      left: start.x,
      top: start.y,
      width: end.x - start.x,
      height: end.y - start.y,
    });
    // 处理默认padding
    const padding = px2hd(theme.padding);
    layout.update({
      top: padding[0],
      right: -padding[1],
      bottom: -padding[2],
      left: padding[3],
    });
    this.layout = layout;

    const plot = new Plot({
      start: { x: layout.left, y: layout.top },
      end: { x: layout.right, y: layout.bottom },
    });
    const coord = this._createCoord(plot, coordCfg);
    const scaleController = new ScaleController(scale);

    this.plot = plot;
    this.coord = coord;
    this.scaleController = scaleController;

    // 初始化完自身后，再初始化子元素
    super.init({
      ...config,
      layout,
    });
  }

  willMount() {
    const { props, scaleController } = this;
    const { data } = props;

    // 初始化scale
    const { defs } = scaleController;
    each(defs, (cfg, field) => {
      scaleController.createScale(field, data);
    });

    this.scales = scaleController.scales;

    super.willMount();
  }

  update(props) {
    super.update(props);
    const { scale, data } = props;
    const { components } = this;
    map(components, (component) => {
      component.chart = this;
    });

    // TODO: scale和数据更新的变化
    if (scale) {
      const { scaleController } = this;
      each(scale, (cfg, field) => {
        scaleController.setDef(field, cfg)
        scaleController.createScale(field, data);
      });
    }
    this.resetLayout();
  }

  _createCoord(plot, coordCfg) {
    if (isString(coordCfg)) {
      coordCfg = {
        type: coordCfg,
      };
    }
    coordCfg = {
      // 默认直角坐标系
      type: 'rect',
      ...coordCfg,
      plot,
    }

    const { type } = coordCfg;
    const C = Coord[upperFirst(type)];
    const coord = new C(coordCfg);
    return coord;
  }

  scale(field, cfg) {
    const { scaleController } = this;
    scaleController.setDef(field, cfg);

    return this;
  }

  convertPoint(point: Point) {
    // const { x } = point;
    const { coord } = this;
    return coord.convertPoint(point);
  }

  getXScale() {
    const geometrys = [];
    const { components } = this;
    map(components, (component) => {
      if (component.geometry) {
        geometrys.push(component);
      }
    });
    if (!geometrys) return null;
    return geometrys[0].getXScale();
  }

  getYScales() {
    const geometrys = [];
    const { components } = this;
    map(components, (component) => {
      if (component.geometry) {
        geometrys.push(component);
      }
    });
    if (!geometrys.length) return null;
    return geometrys.map(geometry => {
      return geometry.getYScale();
    });
  }

  updateLayout(updateLayout) {
    const { plot, coord } = this;
    const { tl, width, height } = plot;
    const newLayout = new Layout({
      left: tl.x,
      top: tl.y,
      width,
      height,
    });
    newLayout.update(updateLayout);
    plot.reset({
      x: newLayout.left,
      y: newLayout.top,
    }, {
      x: newLayout.right,
      y: newLayout.bottom,
    });
    coord.reset(plot);
  }

  resetLayout() {
    const { plot, coord, layout } = this;
    plot.reset({
      x: layout.left,
      y: layout.top,
    }, {
      x: layout.right,
      y: layout.bottom,
    });
    coord.reset(plot);
  }
}

export default Chart;
