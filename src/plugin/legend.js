const Util = require('../util/common');
const List = require('../component/list');
const Global = require('../global');
const LEGEND_GAP = 12;
const MARKER_SIZE = 3;

const DEFAULT_CFG = {
  itemMarginBottom: 12,
  itemGap: 10,
  showTitle: false,
  titleStyle: {
    fontSize: 12,
    fill: '#808080',
    textAlign: 'start',
    textBaseline: 'top'
  },
  nameStyle: {
    fill: '#808080',
    fontSize: 12,
    textAlign: 'start',
    textBaseline: 'middle'
  },
  valueStyle: {
    fill: '#000000',
    fontSize: 12,
    textAlign: 'start',
    textBaseline: 'middle'
  },
  unCheckStyle: {
    fill: '#bfbfbf'
  },
  itemWidth: 'auto',
  wordSpace: 6,
  selectedMode: 'multiple' // 'multiple' or 'single'
};

// Register the default configuration for Legend
Global.legend = Util.deepMix({
  right: Util.mix({
    position: 'right',
    layout: 'vertical'
  }, DEFAULT_CFG),
  left: Util.mix({
    position: 'left',
    layout: 'vertical'
  }, DEFAULT_CFG),
  top: Util.mix({
    position: 'top',
    layout: 'horizontal'
  }, DEFAULT_CFG),
  bottom: Util.mix({
    position: 'bottom',
    layout: 'horizontal'
  }, DEFAULT_CFG)
}, Global.legend || {});

function getPaddingByPos(pos, appendPadding) {
  let padding = 0;
  appendPadding = Util.parsePadding(appendPadding);
  switch (pos) {
    case 'top':
      padding = appendPadding[0];
      break;
    case 'right':
      padding = appendPadding[1];
      break;
    case 'bottom':
      padding = appendPadding[2];
      break;
    case 'left':
      padding = appendPadding[3];
      break;
    default:
      break;
  }

  return padding;
}

class LegendController {
  constructor(cfg) {
    this.legendCfg = {};
    this.enable = true;
    this.position = 'top';
    Util.mix(this, cfg);
    const chart = this.chart;
    this.canvasDom = chart.get('canvas').get('el');
    this.clear();
  }

  addLegend(scale, items, filterVals) {
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
        self._addCategoryLegend(scale, items, position, filterVals);
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
    Util.each(items, item => {
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
      item.name = item.name || item.value; // 兼容 value 的写法
    });
    const legend = new List(Util.deepMix({}, Global.legend[position], legendCfg, {
      maxLength: self._getMaxLength(position),
      items,
      parent: container
    }));
    legends[position].push(legend);
  }

  clear() {
    const legends = this.legends;
    Util.each(legends, legendItems => {
      Util.each(legendItems, legend => {
        legend.clear();
      });
    });

    this.legends = {};
    this.unBindEvents();
  }

  _isFiltered(scale, values, value) {
    let rst = false;
    Util.each(values, val => {
      rst = rst || scale.getText(val) === scale.getText(value);
      if (rst) {
        return false;
      }
    });
    return rst;
  }

  _getMaxLength(position) {
    const chart = this.chart;
    const appendPadding = Util.parsePadding(chart.get('appendPadding'));

    return (position === 'right' || position === 'left') ?
      chart.get('height') - (appendPadding[0] + appendPadding[2]) :
      chart.get('width') - (appendPadding[1] + appendPadding[3]);
  }

  _addCategoryLegend(scale, items, position, filterVals) {
    const self = this;
    const { legendCfg, legends, container, chart } = self;
    const field = scale.field;
    legends[position] = legends[position] || [];

    let symbol = 'circle';
    if (legendCfg[field] && legendCfg[field].marker) { // 用户为 field 对应的图例定义了 marker
      symbol = legendCfg[field].marker;
    } else if (legendCfg.marker) {
      symbol = legendCfg.marker;
    }

    Util.each(items, item => {
      if (Util.isPlainObject(symbol)) {
        Util.mix(item.marker, symbol);
      } else {
        item.marker.symbol = symbol;
      }

      if (filterVals) {
        item.checked = self._isFiltered(scale, filterVals, item.dataValue);
      }
    });
    // 需要更新图例信息
    const legendItems = chart.get('legendItems');
    legendItems[field] = items;

    const lastCfg = Util.deepMix({}, Global.legend[position], legendCfg[field] || legendCfg, {
      maxLength: self._getMaxLength(position),
      items,
      field,
      filterVals,
      parent: container
    });
    if (lastCfg.showTitle) {
      Util.deepMix(lastCfg, {
        title: scale.alias || scale.field
      });
    }

    const legend = new List(lastCfg);
    legends[position].push(legend);
    return legend;
  }

  _alignLegend(legend, pre, position) {
    const self = this;
    const { tl, bl } = self.plotRange;
    const chart = self.chart;
    let offsetX = legend.offsetX || 0;
    let offsetY = legend.offsetY || 0;
    const chartWidth = chart.get('width');
    const chartHeight = chart.get('height');
    const appendPadding = Util.parsePadding(chart.get('appendPadding'));
    const legendHeight = legend.getHeight();
    const legendWidth = legend.getWidth();

    let x = 0;
    let y = 0;
    if (position === 'left' || position === 'right') { // position 为 left、right，默认图例整体居中对齐
      const verticalAlign = legend.verticalAlign || 'middle'; // 图例垂直方向上的对齐方式
      const height = Math.abs(tl.y - bl.y);
      x = (position === 'left') ? appendPadding[3] : (chartWidth - legendWidth - appendPadding[1]);
      y = (height - legendHeight) / 2 + tl.y;
      if (verticalAlign === 'top') {
        y = tl.y;
      } else if (verticalAlign === 'bottom') {
        y = bl.y - legendHeight;
      }

      if (pre) {
        y = pre.get('y') - legendHeight - LEGEND_GAP;
      }
    } else { // position 为 top、bottom，图例整体居左对齐
      const align = legend.align || 'left'; // 图例水平方向上的对齐方式
      x = appendPadding[3];

      if (align === 'center') {
        x = chartWidth / 2 - legendWidth / 2;
      } else if (align === 'right') {
        x = chartWidth - (legendWidth + appendPadding[1]);
      }
      y = (position === 'top') ? appendPadding[0] + Math.abs(legend.container.getBBox().minY) : (chartHeight - legendHeight);
      if (pre) {
        const preWidth = pre.getWidth();
        x = pre.x + preWidth + LEGEND_GAP;
      }
    }
    if (position === 'bottom' && offsetY > 0) {
      offsetY = 0;
    }
    if (position === 'right' && offsetX > 0) {
      offsetX = 0;
    }
    legend.moveTo(x + offsetX, y + offsetY);
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

  handleEvent(ev) {
    const self = this;

    function findItem(x, y) {
      let result = null;
      const legends = self.legends;
      Util.each(legends, legendItems => {
        Util.each(legendItems, legend => {
          const { itemsGroup, legendHitBoxes } = legend;
          const children = itemsGroup.get('children');
          if (children.length) {
            const legendPosX = legend.x;
            const legendPosY = legend.y;
            Util.each(legendHitBoxes, (box, index) => {
              if (x >= (box.x + legendPosX) && x <= (box.x + box.width + legendPosX) && y >= (box.y + legendPosY) && y <= (box.height + box.y + legendPosY)) { // inbox
                result = {
                  clickedItem: children[index],
                  clickedLegend: legend
                };
                return false;
              }
            });
          }
        });
      });
      return result;
    }

    const chart = self.chart;
    const { x, y } = Util.createEvent(ev, chart);
    const clicked = findItem(x, y);
    if (clicked && clicked.clickedLegend.clickable !== false) {
      const { clickedItem, clickedLegend } = clicked;
      if (clickedLegend.onClick) { // 用户自定义点击行为
        ev.clickedItem = clickedItem;
        clickedLegend.onClick(ev);
      } else if (!clickedLegend.custom) { // 进入组件默认事件处理逻辑
        const checked = clickedItem.get('checked');
        const value = clickedItem.get('dataValue');
        const { filterVals, field, selectedMode } = clickedLegend;
        const isSingeSelected = selectedMode === 'single';

        if (isSingeSelected) {
          chart.filter(field, val => {
            return val === value;
          });
        } else {
          if (!checked) {
            filterVals.push(value);
          } else {
            Util.Array.remove(filterVals, value);
          }

          chart.filter(field, val => {
            return filterVals.indexOf(val) !== -1;
          });
        }

        chart.repaint();
      }
    }
  }

  bindEvents() {
    const legendCfg = this.legendCfg;
    const triggerOn = legendCfg.triggerOn || 'touchstart';
    const method = Util.wrapBehavior(this, 'handleEvent');
    Util.addEventListener(this.canvasDom, triggerOn, method);
  }

  unBindEvents() {
    const legendCfg = this.legendCfg;
    const triggerOn = legendCfg.triggerOn || 'touchstart';
    const method = Util.getWrapBehavior(this, 'handleEvent');
    Util.removeEventListener(this.canvasDom, triggerOn, method);
  }
}
module.exports = {
  init(chart) {
    const legendController = new LegendController({
      container: chart.get('backPlot'),
      plotRange: chart.get('plotRange'),
      chart
    });
    chart.set('legendController', legendController);

    /**
     * 设置图例
     * @chainable
     * @param  {Boolean|String|Object} field Boolean 表示关闭开启图例，String 表示指定具体的图例，Object 表示为所有的图例设置
     * @param  {Object|Boolean} cfg   图例的配置，Object 表示为对应的图例进行配置，Boolean 表示关闭对应的图例
     * @return {Chart}       返回当前 chart 的引用
     */
    chart.legend = function(field, cfg) {
      let legendCfg = legendController.legendCfg;
      legendController.enable = true;

      if (Util.isBoolean(field)) {
        legendController.enable = field;
        legendCfg = cfg || {};
      } else if (Util.isObject(field)) {
        legendCfg = field;
      } else {
        legendCfg[field] = cfg;
      }

      legendController.legendCfg = legendCfg;

      return this;
    };
  },
  beforeGeomDraw(chart) {
    const legendController = chart.get('legendController');
    if (!legendController.enable) return null; // legend is not displayed

    const legendCfg = legendController.legendCfg;

    if (legendCfg && legendCfg.custom) { // 用户自定义图例
      legendController.addCustomLegend();
    } else {
      const legendItems = chart.getLegendItems();
      const scales = chart.get('scales');
      const filters = chart.get('filters');
      Util.each(legendItems, (items, field) => {
        const scale = scales[field];
        const values = scale.values;
        let filterVals;
        if (filters && filters[field]) {
          filterVals = values.filter(filters[field]);
        } else {
          filterVals = values.slice(0);
        }
        legendController.addLegend(scale, items, filterVals);
      });
    }

    if (legendCfg && legendCfg.clickable !== false) {
      legendController.bindEvents();
    }

    const legends = legendController.legends;
    const legendRange = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    Util.each(legends, (legendItems, position) => {
      let padding = 0;
      Util.each(legendItems, legend => {
        const width = legend.getWidth();
        const height = legend.getHeight();
        if (position === 'top' || position === 'bottom') {
          padding = Math.max(padding, height);
          if (legend.offsetY > 0) {
            padding += legend.offsetY;
          }
        } else {
          padding = Math.max(padding, width);
          if (legend.offsetX > 0) {
            padding += legend.offsetX;
          }
        }
      });
      legendRange[position] = padding + getPaddingByPos(position, chart.get('appendPadding'));
    });
    chart.set('legendRange', legendRange);
  },
  afterGeomDraw(chart) {
    const legendController = chart.get('legendController');
    legendController.alignLegends();
  },
  clearInner(chart) {
    const legendController = chart.get('legendController');
    legendController.clear();
    chart.set('legendRange', null);
  }
};
