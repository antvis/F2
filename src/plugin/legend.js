/**
 * TODO: 图例插件
 * 1. 清理
 * 2. 排版策略
 * 3. 事件
 * 4. 过滤
 * 5. Theme 迁移至此
 */
const Util = require('../util/common');
const { Legend } = require('../component/index');
const Global = require('../global');
// const FIELD_ORIGIN = '_origin';
const LEGEND_OFFSET = 24;
const LEGEND_GAP = 24;
const MARKER_SIZE = 4.5;
const GROUP_ATTRS = [ 'size', 'shape', 'color' ];

function getLegendAttr(geom) {
  const attrs = geom.get('attrs');
  const rst = [];

  Util.each(attrs, attr => {
    if (Util.indexOf(GROUP_ATTRS, attr.type) !== -1) {
      rst.push(attr);
    }
  });

  return rst;
}

function _isScaleExist(scales, compareScale) {
  let flag = false;
  Util.each(scales, scale => {
    const scaleValues = [].concat(scale.values);
    const compareScaleValues = [].concat(compareScale.values);
    if (scale.type === compareScale.type && scale.field === compareScale.field && scaleValues.sort().toString() === compareScaleValues.sort().toString()) {
      flag = true;
      return;
    }
  });

  return flag;
}

class LegendController {
  constructor(cfg) {
    this.legendCfg = {};
    this.enable = true;
    this.position = 'top';
    Util.mix(this, cfg);
    this.clear();
  }

  addLegend(scale, attr, geom) {
    const self = this;
    const legendCfg = self.legendCfg;
    const field = scale.field;
    const fieldCfg = legendCfg[field];

    if (fieldCfg === false) { // 如果不显示此图例
      return null;
    }

    if (fieldCfg && fieldCfg.custom) { // 自定义图例逻辑
      self.addCustomLegend(field);
    } else {
      let position = legendCfg.position || self.position;
      if (fieldCfg && fieldCfg.position) { // 如果对某个图例单独设置 position，则以该 position 为准
        position = fieldCfg.position;
      }
      if (scale.isCategory) { // 目前只支持分类
        self._addCategroyLegend(scale, attr, geom, position);
      }
    }
  }

  addCustomLegend(field) {
    const self = this;

    let legendCfg = self.legendCfg;
    if (field && legendCfg[field]) {
      legendCfg = legendCfg[field];
    }

    const position = legendCfg.position || self.position;
    const legends = self.legends;
    legends[position] = legends[position] || [];
    const items = legendCfg.items;
    if (!items) {
      return null;
    }

    const container = self.container;
    // const geoms = chart.get('geoms');
    Util.each(items, item => {
      // const geom = findGeom(geoms, item.value);
      if (!Util.isObject(item.marker)) {
        item.marker = {
          symbol: item.marker || 'circle',
          fill: item.fill,
          radius: MARKER_SIZE
        };
      } else {
        item.marker.radius = item.marker.radius || MARKER_SIZE;
      }
      item.checked = Util.isNil(item.checked) ? true : item.checked;
      // item.geom = geom;
    });

    const legend = new Legend.Category(Util.deepMix({}, Global.legend[position], legendCfg, {
      maxLength: self._getMaxLength(position),
      items
    }));
    container.add(legend.container);
    legends[position].push(legend);
    // TODO: here to bind events
  }

  clear() {
    const legends = this.legends;
    Util.each(legends, legendItems => {
      Util.each(legendItems, legend => {
        legend.clear();
      });
    });
    this.legends = {};
  }

  _getMaxLength(position) {
    const plotRange = this.plotRange;
    return (position === 'right' || position === 'left') ? plotRange.bl.y - plotRange.tr.y : plotRange.br.x - plotRange.bl.x;
  }

  _addCategroyLegend(scale, attr, geom, position) {
    const self = this;
    const { legendCfg, legends, container } = self;
    const items = [];
    const field = scale.field;
    const ticks = scale.getTicks();
    legends[position] = legends[position] || [];

    let symbol = 'circle';
    if (legendCfg[field] && legendCfg[field].marker) { // 用户为 field 对应的图例定义了 marker
      symbol = legendCfg[field].marker;
    } else if (legendCfg.marker) {
      symbol = legendCfg.marker;
    }

    Util.each(ticks, tick => {
      const text = tick.text;
      const name = text;
      const scaleValue = tick.value;
      const value = scale.invert(scaleValue);

      let color = Global.defaultColor;
      const colorAttr = geom.getAttr('color');
      if (colorAttr) { // 存在颜色映射
        color = colorAttr.mapping(value).join('');
      }

      const marker = {
        symbol,
        fill: color,
        radius: 5
      };

      items.push({
        value: name, // 图例项显示文本的内容
        dataValue: value, // 图例项对应原始数据中的数值
        checked: true,
        marker
      });
    });

    const lastCfg = Util.deepMix({}, Global.legend[position], legendCfg[field] || legendCfg, {
      maxLength: self._getMaxLength(position),
      items
    });
    if (lastCfg.title) {
      Util.deepMix(lastCfg, {
        title: {
          text: scale.alias || scale.field
        }
      });
    }

    const legend = new Legend.Category(lastCfg);
    container.add(legend.container);

    // TODO: 如果需要支持图例交互，就在这里
    legends[position].push(legend);
    return legend;
  }

  _alignLegend(legend, pre, position) {
    const self = this;
    const plotRange = self.plotRange;
    const offsetX = legend.offsetX || 0;
    const offsetY = legend.offsetY || 0;

    let x = 0;
    let y = 0;
    if (position === 'left' || position === 'right') { // position 为 left、right，图例整体居中对齐
      const legendHeight = legend.getHeight();
      const height = Math.abs(plotRange.tl.y - plotRange.bl.y);
      x = (position === 'left') ? LEGEND_OFFSET : (plotRange.br.x + LEGEND_OFFSET);
      y = (height - legendHeight) / 2 + plotRange.tl.y;
      if (pre) {
        y = pre.get('y') - legendHeight - LEGEND_GAP;
      }
    } else { // position 为 top、bottom，图例整体居左对齐
      x = plotRange.tl.x;
      y = (position === 'top') ? LEGEND_OFFSET : (plotRange.bl.y + LEGEND_OFFSET);

      if (pre) {
        const preWidth = pre.getWidth();
        x = pre.x + preWidth + LEGEND_GAP;
      }
    }

    legend.container.moveTo(x + offsetX, y + offsetY);
  }

  alignLegends() {
    const self = this;
    const legends = self.legends;
    Util.each(legends, (legendItems, position) => {
      Util.each(legendItems, (legend, index) => {
        const pre = legendItems[index - 1];
        self._alignLegend(legend, pre, position);
      });
    });

    return self;
  }
}
module.exports = {

  init(chart) {
    const legendController = new LegendController({
      container: chart.get('backPlot'),
      plotRange: chart.get('plot')
    });
    chart.set('legendController', legendController);
  },
  afterGeomDraw(chart) {
    const legendController = chart.get('legendController');
    if (!legendController.enable) return null; // legend is not displayed

    const geoms = chart.get('geoms');
    const legendCfg = legendController.legendCfg;
    const scales = [];

    if (legendCfg && legendCfg.custom) { // 用户自定义图例
      legendController.addCustomLegend();
    } else {
      Util.each(geoms, geom => {
        const attrs = getLegendAttr(geom);
        Util.each(attrs, function(attr) {
          const type = attr.type;
          const scale = attr.getScale(type);
          if (scale.type !== 'identity' && !_isScaleExist(scales, scale)) {
            scales.push(scale);
            legendController.addLegend(scale, attr, geom);
          }
        });
      });
    }

    legendController.alignLegends(); // adjust position
  }

};
