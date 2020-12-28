// @ts-nocheck

import { Component } from '../../component/src/index';

export default View => {
  return class Interval extends Component {
    mount() {
      const { chart, props } = this;
      const { position } = props;
      chart.interval().position(position);
    }
    render() {
      return <View />
    }
  }
}
