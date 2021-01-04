// @ts-nocheck

import { Component } from '../../component/src/index';

export default View => {
  return class Legend extends Component {
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
      const { field, values } = scales[0];
      const { field: yField } = geom.getYScale();
      const { items } = props;
      return items.filter(item => {
          return values.indexOf(item.fieldValue) > -1;
        })
        .map(item => {
          const { name, fieldValue } = item;
          const record = records.find(record => {
            return record && record[field] === fieldValue;
          });
          // 因为record 有可能是空, 所以通过attr来映射
          const color = colorAttr.mapping(fieldValue);
          return {
            record,
            name,
            color: Array.isArray(color) ? color[0] : color,
            value: record && record[yField],
          }
      });
    }

    render() {
      const items = this.getItems();
      return <View items={ items } />
    }
  }
}
