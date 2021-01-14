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
