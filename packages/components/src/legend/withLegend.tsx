import { jsx } from '@ali/f2-jsx';
import Component from '../base/index';

export default View => {
  return class Legend extends Component {
    geom: any;
    
    mount() {
      const { chart, props } = this;
      const geoms = chart.get('geoms');
      if (!geoms || !geoms.length) {
        return;
      }
      const { geomIndex } = props;
      // 默认处理第一个图形
      const geom = geoms[geomIndex || 0];
      this.geom = geom;

      // TODO
      // const canvas = chart.get('canvas');
      // canvas.on('press', ev => {
      //   const { points } = ev || {};
      //   const point = points[0];
      //   if (!point) {
      //     return;
      //   }
      //   const records = geom.getSnapRecords(point);
      //   const plot = chart.get('plot');
      //   this.setState({
      //     point,
      //     records,
      //     plot,
      //   });
      // });
      // canvas.on('pressend', ev => {
      //   this.setState({
      //     point: null,
      //   });
      // });
    }
    _getRecords() {
      const { geom } = this;
      const xScale = geom.getXScale();
      const { values } = xScale;
      if (!values || !values.length) {
        return null;
      }
      // 取最后一条数据
      const lastValue = values[values.length - 1];
      const records = geom.getRecords(lastValue);
      return records;
    }

    getItems(records) {
      const { geom, chart, props } = this;
      // 默认处理第一个图形
      const colorAttr = geom.getAttr('color');
      // 只依赖颜色属性
      if (!colorAttr) {
        return;
      }
      records = records || this._getRecords();
      if (!records || !records.length) {
        return;
      }
      const { scales } = colorAttr;
      const { values, ticks } = scales[0];
      const items = ticks.map((tick, index) => {
        const value = values[index];
        const color = colorAttr.mapping(value).join('')
        return {
          name: tick,
          color,
        }
      });
      return items;
    }

    render() {
      const { props } = this;
      const records = this._getRecords();
      const items = props.items ? props.items : this.getItems(records);
      return <View records={records} items={ items } />
    }
  }
}
