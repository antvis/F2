class Component {
  chart: any;
  container: any;
  props: any;
  state: any;
  // actions: any;

  constructor(props: any, chart: any) {
    this.chart = chart;
    this.props = props;

    this.mount();
  }
  mount() {
  }
  update(props: any) {
    this.props = props;
  }
  render() {
  }
  destroy() {
  }
}

// 标识是否是组件
// @ts-ignore
Component.prototype.isF2Component = true;

export default Component;
