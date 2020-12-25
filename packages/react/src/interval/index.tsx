// @ts-nocheck

function model(View) {
  return class I {
    init() {
      const { chart, position } = this.props;
      const geom = chart.interval();
      geom.position(position);
    }
    render() {
      return <View />
    };
  }
}

export default model((props) => {
  // const { chart, position } = props;
  // const geom = chart.interval();
  // geom.position(position);
  // console.log('interval props:', props);
  return null;
});

