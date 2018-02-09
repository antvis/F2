/**
 * @fileOverview 数据分组
 * @author dxq613@gmail.com
 */


const Util = require('../../util/common');
const Adjust = require('./base');
const Global = require('../../global');

class Dodge extends Adjust {

  _initDefaultCfg() {
    /**
     * 调整过程中,2个数据的间距
     * @type {Number}
     */
    this.marginRatio = Global.widthRatio.dodgeMargin;
    /**
     * 调整占单位宽度的比例,例如：占2个分类间距的 1/2
     * @type {Number}
     */
    this.dodgeRatio = Global.widthRatio.column;
  }

  getDodgeOffset(range, index, count) {
    const self = this;
    const pre = range.pre;
    const next = range.next;
    const tickLength = next - pre;
    const width = (tickLength * self.dodgeRatio) / count;
    const margin = self.marginRatio * width;
    const offset = 1 / 2 * (tickLength - (count) * width - (count - 1) * margin) +
      ((index + 1) * width + index * margin) -
      1 / 2 * width - 1 / 2 * tickLength;
    return (pre + next) / 2 + offset;
  }

  processAdjust(dataArray) {
    const self = this;
    const count = dataArray.length;
    const xField = self.xField;
    Util.each(dataArray, function(data, index) {
      for (let i = 0, len = data.length; i < len; i++) {
        const obj = data[i];
        const value = obj[xField];
        const range = {
          pre: value - 0.5,
          next: value + 0.5
        };
        const dodgeValue = self.getDodgeOffset(range, index, count);
        obj[xField] = dodgeValue;
      }
    });
  }
}

Adjust.Dodge = Dodge;
module.exports = Dodge;
