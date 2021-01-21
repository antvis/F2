import { jsx } from '@ali/f2-jsx';
import Component from '../component/index';

function isInBBox(bbox, point) {
  const { minX, maxX, minY, maxY } = bbox;
  const { x, y } = point;
  return minX <= x && maxX >= x && minY <= y && maxY >= y;
}

export default View => {
  return class Guide extends Component {
    triggerRef: any;

    mount() {
      const { chart, props } = this;
      const { onClick } = props;
      const canvas = chart.get('canvas');
      // 创建ref
      this.triggerRef = {};

      canvas.on('click', ev => {
        const { points } = ev;
        const shape = this.triggerRef.current;
        if (!shape) return;
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
      const { props } = this;
      const { records, ...otherProps } = props;
      const points = records.map(record => this.parsePoint(record));

      return <View
        points={ points }
        triggerRef={ this.triggerRef }
        { ...otherProps }
      />
    }
  }
}
