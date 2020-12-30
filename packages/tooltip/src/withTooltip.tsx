// @ts-nocheck

import { Component } from '../../component/src/index';

export default View => {
  return class Legend extends Component {
    state = {}
    mount() {
      const { chart, props } = this;
      const canvas = chart.get('canvas');
      const geoms = chart.get('geoms');
      if (!geoms || !geoms.length) {
        return;
      }
      const { geomIndex } = props;
      // 默认处理第一个图形
      const geom = geoms[geomIndex || 0];

      canvas.on('press', ev => {
        const { direction, points } = ev || {};
        const point = points[0];
        if (!point) {
          return;
        }
        const records = geom.getSnapRecords(point);
        const plot = chart.get('plot');
        this.setState({
          point,
          records,
          plot,
        });
      });
      canvas.on('pressend', ev => {
        this.setState({
          point: null,
        });
      });
    }

    render() {
      const { state } = this;
      // const { records } = state;
      return (
        <View { ...state } />
      );
    }
  }
}
