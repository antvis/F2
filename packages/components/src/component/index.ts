class Component {
  chart: any;
  container: any;
  props: any;

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
  init(chart, container) {
    this.chart = chart;
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
