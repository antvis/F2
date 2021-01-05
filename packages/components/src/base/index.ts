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

export default Component;
