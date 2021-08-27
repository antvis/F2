import Coord from '../coord';
import { mix, each } from '@antv/util';
import { Scale } from '@antv/scale';
import Container from '../base/container';
import { applyMixins } from '../mixins';
import ThemeMixin from '../mixins/theme';
import CoordMixin from '../mixins/coord';
import ScaleMixin from '../mixins/scale';
import defaultTheme from './theme';

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

  scale: any;
  createScale: () => any;
  setScale: any;
  getScale: (field) => any;
  updateScales: () => any;

  theme: any;
  setTheme: (theme) => any;

  constructor(props) {
    super(props)

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
    const childComponent = super.createComponent({
      ...child,
      props: {
        ...childProps,
        // 把chart数据透传进去
        data: props.data,
        chart: this,
      }
    });

    // @ts-ignore
    childComponent.chart = this;

    return childComponent;
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
    const { theme, coord, layout } = props;
    // 初始化默认主题
    this.theme = mix({}, defaultTheme, theme);
    // 创建坐标系
    this.coord = this.createCoord(coord, layout);
    // 创建scale
    this.updateScales();
    super.mount();
  }

  // update() {

  // }

  adjustScale() {
    // TODO
    // _adjustRange
    // 1. _syncYScales
  }

  getXScales() {
    // const xField = xxxx
    // return this.getScale(xField);
  }

  getYScales() {

  }
}

// 多继承
applyMixins(Chart, [ ThemeMixin, CoordMixin, ScaleMixin ]);

export default Chart;
