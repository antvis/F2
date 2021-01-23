class Component {
  chart: any;
  container: any;
  props: any;
  // state: any;

  /**
   * @private
   */
  __shape: any;
  // actions: any;

  constructor(props: any) {
    this.props = props;
  }
  init(chart, container) {
    this.chart = chart;
    this.container = container;
    this.mount();
  }
  mount() {
  }
  update(props: any) {
    this.props = props;
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
