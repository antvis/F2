import { map, px2hd } from '@ali/f2x-util';
import { each, isString, upperFirst } from '@antv/util';
import Container from '../component/container';
import equal from '../component/equal';
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
    const { scale, data } = props;
    const { scaleController, components, props: originProps } = this;

    // 数据是否有变化
    const dataChanged = data && data !== originProps.data;

    // 记录变化的scale
    const updateScale = {};
    // scale是否有变化
    if (!equal(originProps.scale, scale)) {
      each(scale, (cfg, field) => {
        scaleController.setDef(field, cfg);
        updateScale[field] = true;
      });
    }

    // 如果数据有变化，所有已实例化的scale都需要重新更新
    if (dataChanged) {
      each(this.scales, (cfg, field) => {
        updateScale[field] = true;
      });
    }

    // 更新所有需要变化的scale
    each(updateScale, (v, field) => {
      scaleController.createScale(field, data);
    });

    if(dataChanged) {
      super.update(props, true);
    } else {
      super.update(props);
    }
    
    map(components, (component) => {
      component.chart = this;
    });

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
    // console.log(' chart point: ', point);
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

  _getAppendProps() {
    return {
      ...super._getAppendProps(),
      plot: this.plot,
    }
  }

  updateLayout(updateLayout) {
    const { plot, coord, layout } = this;
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

    // newLayout 是已包含各个元素的宽高计算累加之后的值
    layout.reset(newLayout);
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
