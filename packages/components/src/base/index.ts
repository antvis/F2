class Component {
  chart: any;
  container: any;
  props: any;
  state: any;
  ref: any;
  actions: any;

  constructor(props: any, chart: any) {
    const { ref } = props;
    this.chart = chart;
    this.props = props;
    this.ref = ref;

    this.mount();
  }
  mount() {
  }
  update(props: any) {
    this.props = props;
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
Component.prototype.isF2Component = true;

export default Component;
