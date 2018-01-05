/**
 * TODO: 图例插件
 */
const Util = require('../util/common');
const { Legend } = require('../component/index');
const Global = require('../global');
// const FIELD_ORIGIN = '_origin';
const MARGIN = 24;
const MARGIN_LEGEND = 24;
const MARKER_SIZE = 4.5;

const GROUP_ATTRS = ['size', 'shape', 'color'];

function getLegendAttr(geom) {
    var attrs = geom.get('attrs');
    var rst = [];

    Util.each(attrs, function(attr) {
      if (Util.indexOf(GROUP_ATTRS, attr.type) !== -1) {
        rst.push(attr);
      }
    });

    return rst;
}

function findGeom(geoms, value) {
  let rst;
  Util.each(geoms, geom => {
    // if (geom.get('visible')) {
      const yScale = geom.getYScale();
      if (yScale.field === value) {
        rst = geom;
        return;
      }
    // }
  });

  return rst;
}

function _isScaleExist(scales, compareScale) {
  var flag = false;
  Util.each(scales, function(scale) {
    var scaleValues = [].concat(scale.values);
    var compareScaleValues = [].concat(compareScale.values);
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
    const chart = this.chart;
    this.container = chart.get('frontPlot');
    this.plotRange = chart.get('plot');
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

  _isFiltered(scale, values, value) {
    if (!scale.isCategory) {
      return true;
    }
    let rst = false;
    value = scale.invert(value);
    Util.each(values, val => {
      rst = rst || scale.getText(val) === scale.getText(value);
      if (rst) {
        return false;
      }
    });
    return rst;
  }

  _addCategroyLegend(scale, attr, geom, position) {
    const self = this;
    const field = scale.field;
    const legendCfg = self.legendCfg;
    const legends = self.legends;
    legends[position] = legends[position] || [];
    const container = self.container;
    const items = [];
    const ticks = scale.getTicks();
    const chart = self.chart;
    const canvas = chart.get('canvas');
    const plotRange = self.plotRange;
    const maxLength = (position === 'right' || position === 'left') ? plotRange.bl.y - plotRange.tr.y : canvas.get('width');

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
        color = colorAttr.mapping(value).join('') || Global.defaultColor;
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

    const test = Util.deepMix({
      title: {
        text: scale.alias || scale.field
      }
    }, Global.legend[position], legendCfg[field] || legendCfg, {
      maxLength,
      items
    });

    const lastCfg = Util.deepMix({}, Global.legend[position], legendCfg[field] || legendCfg, {
      maxLength,
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

  addLegend(scale, attr, geom) {
    const self = this;
    const legendCfg = self.legendCfg;
    const field = scale.field;
    const fieldOption = legendCfg[field];

    if (fieldOption === false) { // 如果不显示此图例
      return null;
    }

    if (fieldOption && fieldOption.custom) {
      self.addCustomLegend(field);
    } else {
      let position = legendCfg.position || self.position;
      if (fieldOption && fieldOption.position) { // 如果对某个图例单独设置 position，则对 position 重新赋值
        position = fieldOption.position;
      }

      self._addCategroyLegend(scale, attr, geom, position);
    }
  }

  /**
   * 自定义图例
   * @param {string} field 自定义图例的数据字段名，可以为空
   */
  addCustomLegend(field) {
    const self = this;
    const chart = self.chart;
    const container = self.container;
    let legendCfg = self.legendCfg;

    if (field) {
      legendCfg = legendCfg[field];
    }

    const position = legendCfg.position || self.position;
    const legends = self.legends;
    legends[position] = legends[position] || [];
    const items = legendCfg.items;
    if (!items) {
      return;
    }

    const geoms = chart.get('geoms');
    Util.each(items, item => {
      const geom = findGeom(geoms, item.value);
      if (!Util.isObject(item.marker)) {
        item.marker = {
          symbol: item.marker ? item.marker : 'circle',
          fill: item.fill,
          radius: MARKER_SIZE
        };
      } else {
        item.marker.radius = item.marker.radius || MARKER_SIZE;
      }
      item.checked = Util.isNil(item.checked) ? true : item.checked;
      item.geom = geom;
    });

    const canvas = chart.get('canvas');
    const plotRange = self.plotRange;
    const maxLength = (position === 'right' || position === 'left') ? plotRange.bl.y - plotRange.tr.y : canvas.get('width');

    const test = Util.deepMix({}, Global.legend[position], legendCfg, {
      maxLength,
      items
    });

    // const legend = container.addGroup(Legend.Category, legendCfg);
    const legend = new Legend.Category(test);
    container.add(legend.container);
    legends[position].push(legend);

    // legend.on('itemclick', ev => {
    //   if (legendCfg.onClick) { // 用户自定义了图例点击事件
    //     legendCfg.onClick(ev);
    //   }
    // });

    // self._bindHoverEvent(legend);
  }

   _alignLegend(legend, pre, region, position) {
    debugger
    const self = this;
    const container = self.container;
    const canvas = container.get('canvas');
    const width = canvas.get('width');
    let height = canvas.get('height');
    const plotRange = self.plotRange;
    // const offsetX = legend.get('offsetX') || 0;
    // const offsetY = legend.get('offsetY') || 0;
    const offset = MARGIN;
    const legendHeight = legend.getHeight();

    let x = 0;
    let y = 0;

    if (position === 'left' || position === 'right') { // 垂直
      height = plotRange.br.y;
      x = position === 'left' ? offset : plotRange.br.x + offset;
      y = height - legendHeight;

      if (pre) {
        y = pre.get('y') - legendHeight - MARGIN_LEGEND;
      }
    } else {
      x = (width - region.totalWidth) / 2;
      y = (position === 'top') ? offset : (plotRange.bl.y + offset);

      if (pre) {
        const preWidth = pre.getWidth();
        x = pre.get('x') + preWidth + MARGIN_LEGEND;
      }
    }

    legend.container.moveTo(x, y);
  }

  _getRegion(legends) {
    let maxWidth = 0;
    let totalWidth = 0;
    Util.each(legends, function(legend) {
      const width = legend.getWidth();
      if (maxWidth < width) {
        maxWidth = width;
      }
      totalWidth += width;
    });
    return {
      maxWidth,
      totalWidth
    };
  }

  alignLegends() {
    const self = this;
    const legends = self.legends;
    Util.each(legends, (legendItems, position) => {
      const region = self._getRegion(legendItems);
      Util.each(legendItems, (legend, index) => {
        const pre = legendItems[index - 1];
        // if (!(legend.get('useHtml') && !legend.get('autoPosition'))) {
        self._alignLegend(legend, pre, region, position);
        // }
      });
    });

    return this;
  }
}
module.exports = {

  init(chart) {
    const legendController = new LegendController({
      chart
    });
    chart.set('legendController', legendController);
    // chart.__proto__.guide = function() {
    //   return guideController;
    // };
  },
  afterGeomDraw(chart) {
    const legendController = chart.get('legendController');
    const geoms = chart.get('geoms');
    const yScales = chart._getYScales();
    const scales = [];

    Util.each(geoms, function(geom) {
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

    legendController.alignLegends();
  }

};
