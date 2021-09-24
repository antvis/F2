import Coord from '../coord';
import { mix, each, isNil } from '@antv/util';
import { Scale } from '@antv/scale';
import Container from '../base/container';
import { applyMixins } from '../mixins';
import ThemeMixin from '../mixins/theme';
import CoordMixin from '../mixins/coord';
import ScaleMixin from '../mixins/scale';
import defaultTheme from './theme';
import Layout from '../base/layout';
import equal from '../base/equal';
import { map } from '../util';

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

interface IChart {
  props: Props;
}

// 统计图表
class Chart extends Container implements IChart, ThemeMixin, CoordMixin, ScaleMixin {
  data: any;
  coord: Coord;
  createCoord: (coord, layout) => Coord;
  updateCoord: (coord, layout) => Coord;

  scale: any;
  createScale: () => any;
  setScale: any;
  getScale: (field) => any;
  updateScales: () => any;

  theme: any;
  setTheme: (theme) => any;

  constructor(props, context?, updater?) {
    super(props, context, updater);

    const { data } = props;
    // 记录data, 全局唯一
    this.data = data;
    // 初始化scales
    this.scale = this.createScale();
  }


  // 会调用子组件的 constructor 创建组件实例
  createComponent(child) {
    const { props } = this;
    const { props: childProps } = child;
    const childComponent = super.createComponent(child);

    // @ts-ignore
    childComponent.chart = this;

    return childComponent;
  }

  layoutCoord() {
    const { components } = this;
    if (!components || !components.length) {
      return;
    }
    const { layout } = this;
    const coordLayout = layout.clone();

    components.forEach(component => {
      // @ts-ignore
      if (!component || !component.getLayout) {
        return;
      }
      let { left, top, width, height } = coordLayout;
      // @ts-ignore
      const childLayout = component.getLayout();
      const { position, width: childWidth, height: childHeight } = childLayout;
      // @ts-ignore
      component.setLayout({ left, top, width: childWidth - left, height: childHeight - top });

      // 计算剩余的占位
      // 占用宽度
      switch (position) {
        case 'left':
          left += childWidth;
          width -= childWidth;
          break;
        case 'right':
          width -= childWidth;
          break;
        case 'top':
          top += childHeight;
          height -= childHeight;
          break;
        case 'bottom':
          height -= childHeight;
          break;
      }
      coordLayout.update({ left, top, width, height });
    });

    // 更新coord
    this.coord.update({
      left: coordLayout.left,
      top: coordLayout.top,
      width: coordLayout.width,
      height: coordLayout.height,
    });
  }

  willMount() {
    const { props } = this;
    const { scale } = props;
    // 定义scale
    each(scale, (def, field) => {
      this.setScale(field, def);
    });

    super.willMount();
  }

  mount() {
    const { props } = this;
    const { theme, layout, style, coord, canvas } = props;
    // 初始化默认主题
    this.theme = canvas.px2hd(mix({}, defaultTheme, theme));
    const { paddingLeft, paddingTop, paddingRight, paddingBottom } = this.theme;

    this.layout = layout.clone().padding({
      left: paddingLeft,
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
    }).padding(style);

    // 创建坐标系
    this.coord = this.createCoord(coord, this.layout);
    // 创建scale
    this.updateScales();
    super.mount();
  }

  // 自己管理所有子组件的状态
  componentWillReceiveProps(nextProps) {
    const { props, components } = this;
    // 数据变化后，所有的子组件状态可能都有变化，需要重新更新
    if (props.data !== nextProps.data) {
      this.data = nextProps.data;
      this.updateScales();
      map(components, component => {
        component.forceUpdate();
      });
      return;
    }

    // theme 变化，所有字组件只需要重新render
    if (!isNil(nextProps.theme) && equal(props.theme, nextProps.theme)) {
      map(components, component => {
        component.__shouldRender = true;
      });
    }

    // theme 变化，所有字组件只需要重新render
    if (!isNil(nextProps.coord) && equal(props.coord, nextProps.coord)) {
      map(components, component => {
        component.__shouldRender = true;
      });
    }
  }

  update() {
    const { props } = this;
    const { theme, layout, style, coord, canvas, data } = props;
    this.data = data;
    // 初始化默认主题
    this.theme = canvas.px2hd(mix({}, defaultTheme, theme));
    const { paddingLeft, paddingTop, paddingRight, paddingBottom } = this.theme;

    this.layout = layout.clone().padding({
      left: paddingLeft,
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
    }).padding(style);

    // 创建坐标系
    this.coord = this.updateCoord(coord, this.layout);
    // 创建scale

    super.update(props);
  }

  changeGetGeometryData(data) {
    const geometrys = this.getGeometrys();
    if (!geometrys.length) return;
    geometrys.forEach(geometry => {
      // @ts-ignore
      geometry.changeData(data);
    })
  }

  getGeometrys() {
    const { components } = this;
    return components.filter(component => {
      // @ts-ignore
      return component.isGeometry;
    });
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
    return geometrys.map(component => {
      // @ts-ignore
      return component.getXScale();
    });
  }

  getYScales() {
    const geometrys = this.getGeometrys();
    return geometrys.map(component => {
      // @ts-ignore
      return component.getYScale();
    });
  }

  render() {
    this.layoutCoord();
    super.render();
  }
}

// 多继承
applyMixins(Chart, [ ThemeMixin, CoordMixin, ScaleMixin ]);

class ExportChart extends Chart {}

export default ExportChart;
