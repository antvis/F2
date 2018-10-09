const Util = require('../../util/common');
const GuideBase = require('./base');
const { Rect } = require('../../graphic/shape');

class RegionFilter extends GuideBase {
  _initDefaultCfg() {
    this.type = 'regionFilter';
    this.start = [];
    this.end = [];
    this.color = null;
    this.style = null;
  }

  render(coord) {
    const start = this.parsePoint(coord, this.start);
    const end = this.parsePoint(coord, this.end);
    if (!start || !end) {
      return;
    }
    const clip = new Rect({
      attrs: {
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        width: Math.abs(end.x - start.x),
        height: Math.abs(end.y - start.y)
      }
    }); // 新建剪切区域
    this.clip = clip;

    const chart = this.chart;
    const color = this.color;
    const style = this.style || {};
    const regionElements = [];

    const geoms = chart.get('geoms');
    geoms.map(geom => {
      const geomContainer = geom.get('container');
      const children = geomContainer.get('children');

      const group = geomContainer.addGroup({
        zIndex: 10,
        className: 'guide-region-filter'
      });

      children.map(c => {
        if (c.get('isShape')) {
          const type = c.get('type');
          const attrs = Util.mix({}, c.get('attrs'), style);
          if (color && (attrs.fill || attrs.fillStyle)) {
            attrs.fill = attrs.fillStyle = color;
          }
          if (color && (attrs.stroke || attrs.strokeStyle)) {
            attrs.stroke = attrs.strokeStyle = color;
          }
          const cfg = {
            attrs
          };
          if (type === 'custom' || type === 'Custom') { // custom 类型的 shape 会自定义绘制 path 的逻辑
            cfg.createPath = c.get('createPath');
            cfg.calculateBox = c.get('calculateBox');
          }
          group.addShape(type, cfg);
        }
        return c;
      });

      group.attr('clip', clip);
      geomContainer.sort();
      regionElements.push(group);
      return geom;
    });

    this.element = regionElements;
  }

  remove() {
    const element = this.element;

    Util.each(element, group => {
      group && group.remove(true);
    });

    this.clip && this.clip.remove(true);
  }
}

GuideBase.RegionFilter = RegionFilter;
module.exports = RegionFilter;
