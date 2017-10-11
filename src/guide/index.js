/**
 * @fileOverview guide assist to g2
 * @ignore
 */


const Util = require('../util');
const Guide = require('./guide');
Guide.Text = require('./text');
Guide.Line = require('./line');
Guide.Arc = require('./arc');
Guide.Html = require('./html');
Guide.Rect = require('./rect');

const GuideAssist = require('../chart/assist/guide');

Util.mix(GuideAssist.prototype, {
  _getDefault() {
    return {
      xScale: this.xScale,
      yScale: this.yScale
    };
  },
  /**
   * 添加辅助线
   * @chainable
   * @param  {Array} start 起始点
   * @param  {Array} end   结束点
   * @param  {Object} cfg  配置项
   * @return {Object} guideAssist 对象
   */
  line(start, end, cfg) {
    const config = {
      start,
      end,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getDefault());
    const guide = new Guide.Line(config);
    this.addGuide(guide);
    return this;
  },
  /**
   * 添加辅助文本
   * @chainable
   * @param  {Array} position 文本位置
   * @param  {String} text   文本
   * @param  {Object} cfg  配置项
   * @return {Object} guideAssist 对象
   */
  text(position, text, cfg) {
    const config = {
      position,
      text,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getDefault());
    const guide = new Guide.Text(config);
    this.addGuide(guide);
    return this;
  },

  /**
   * 添加辅助弧线
   * @chainable
   * @param  {Array} start 弧线开始点
   * @param  {Array} end 弧线结束点
   * @param  {Object} cfg  配置项
   * @return {Object} guideAssist 对象
   */
  arc(start, end, cfg) {
    const config = {
      type: 'arc',
      start,
      end,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getDefault());
    const guide = new Guide.Arc(config);
    this.addGuide(guide);
    return this;
  },
  /**
   * 添加辅助html
   * @chainable
   * @param  {Array} position 位置
   * @param  {String} html html文本
   * @param  {Object} cfg  配置项
   * @return {Object} guideAssist 对象
   */
  html(position, html, cfg) {
    const config = {
      type: 'html',
      position,
      html,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getDefault());
    const guide = new Guide.Html(config);
    this.addGuide(guide);
    return this;
  },

  rect(start, end, cfg) {
    const config = {
      type: 'rect',
      start,
      end,
      cfg: Util.mix({}, cfg)
    };

    Util.mix(config, this._getDefault());
    const guide = new Guide.Rect(config);
    this.addGuide(guide);
    return this;
  }
});

module.exports = Guide;
