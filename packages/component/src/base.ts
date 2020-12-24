class Base {
  chart: any;
  container: any;
  props: any;
  actions: any;

  constructor(chart, componentSchema) {
    const { props, actions } = componentSchema;

    this.chart = chart;
    this.props = props;
    this.actions = actions;

    this.init();
  }
  init() {
  }
  render() {
  }
  destroy() {
  }
}

export default Base;
