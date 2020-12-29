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
      const geom = this.geom;
      const colorAttr = geom.getAttr('color');
      if (!colorAttr) return;
      const scale = colorAttr.getScale('color');
      const ticks = scale.getTicks();
      const items = [];
      for (let i = 0, len = ticks.length; i < len; i++) {
        const tick = ticks[i];
        const name = tick.text;
        const scaleValue = tick.value;
        const value = scale.invert(scaleValue);
        const color = colorAttr.mapping(value).join('');
        items.push({
          name,
          value,
          color,
        })
      }
      return items;
    }

    render() {
      const { props } = this;
      const items = this._getRecords();
      return <View items={ items } { ...props } />
    }
  }
}
