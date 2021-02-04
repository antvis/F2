import Layout from '../chart/layout';

class Component {
  chart: any;
  container: any;
  props: any;
  layout: Layout;

  /**
   * @private
   */
  __shape: any;
  __props: any;
  // actions: any;

  // TODO for TypeScript
  state: any;
  context: any;
  refs: {
    [key: string]: any;
  }

  constructor(props: any) {
    this.__props = props;
    this.props = props;
  }
  init({ chart, container, layout }) {
    this.chart = chart;
    this.layout = layout;
    this.container = container;
    this.mount();
  }
  mount() {
  }
  // TODO
  setState() {
  }
  update(props: any) {
    this.__props = props;
    this.props = props;
  }
  // TODO
  forceUpdate() {
  }
  render(): JSX.Element {
    return null;
  }
  destroy() {
  }
}

// 标识是否是组件
// @ts-ignore
Component.prototype.isF2Component = true;

export default Component;
