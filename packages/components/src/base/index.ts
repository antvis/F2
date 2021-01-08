class Component {
  chart: any;
  container: any;
  props: any;
  state: any;
  actions: any;

  constructor(props: any, chart: any) {
    this.chart = chart;
    this.props = props;

    this.mount();
  }
  mount() {
  }
  render() {
  }
  mounted() {
  }
  destroy() {
  }
}

// 标识是否是组件
// @ts-ignore
Component.prototype.isComponent = true;

export default Component;
