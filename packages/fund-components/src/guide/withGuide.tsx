// @ts-nocheck
import { Component } from '@ali/f2-components';

function isInBBox(bbox, point) {
  const { minX, maxX, minY, maxY } = bbox;
  const { x, y } = point;
  return minX <= x && maxX >= x && minY <= y && maxY >= y;
}

export default View => {
  return class Guide extends Component {
    mount() {
      const { chart, props } = this;
      const { onClick } = props;
      const canvas = chart.get('canvas');
      canvas.on('click', ev => {
        const { points } = ev;
        const shape = this.triggerRef.current;
        const bbox = shape.getBBox();
        if (isInBBox(bbox, points[0])) {
          ev.shape = shape;
          onClick && onClick(ev);
        }
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

      const triggerRef = {};
      this.triggerRef = triggerRef;
      return <View points={ points } coord={ coord } width={ width } height={ height } triggerRef={ triggerRef }/>
    }
  }
}
