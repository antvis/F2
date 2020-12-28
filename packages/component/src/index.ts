class Component {
  chart: any;
  container: any;
  props: any;
  state: any;
  actions: any;

  constructor(props, chart) {
    this.chart = chart;
    this.props = props;
    // this.actions = actions;

    this.mount();
  }
  mount() {
  }
  render() {
  }
  destroy() {
  }
}

export { Component };
