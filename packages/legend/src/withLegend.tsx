// @ts-nocheck

import { Component } from '../../component/src/index';

export default View => {
  return class Legend extends Component {
    mount() {
      const { chart } = this;
      const data = chart.get('data');
      if (!data || !data.length) return;
      const record = data[data.length - 1];

      this.state = {
        record,
      };
    }
    render() {
      const { props } = this;
      return <View { ...props } />
    }
  }
}
