// @ts-nocheck
import { Component } from '@ali/f2-components';

export default View => {
  return class Guide extends Component {
    mount() {
      const { chart } = this;
      const canvas = chart.get('canvas');
      canvas.on('click', ev => {
      });
    }
    parsePoint(record) {
      const { chart } = this;
      const coord = chart.get('coord');
      const xScale = chart.getXScale();

      // 只取第一个yScale
      const yScale = chart.getYScales()[0];
      const x = xScale.scale(record[xScale.field]);
      const y = yScale.scale(record[yScale.field]);
      return coord.convertPoint({ x, y });
    }
    render() {
      const { chart, props } = this;
      const { records } = props;
      const coord = chart.get('coord');
      const canvas = chart.get('canvas');
      const width = canvas.get('width');
      const height = canvas.get('height');
      const points = records.map(record => this.parsePoint(record));
      return <View points={ points } coord={ coord } width={ width } height={ height } />
    }
  }
}
