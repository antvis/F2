// @ts-nocheck

import { Component } from '../../component/src/index';

export default View => {
  return class LegendModel extends Component {
    init() {
      const { chart } = this;
      const data = chart.get('data');
      if (!data || !data.length) return;
      const record = data[data.length - 1];

      this.state = {
        record,
      };
    }
    render() {
      const { style } = this.props;
      const { record } = this.state;
      return <View style={ style } record={ record } />
    }
  }
}
