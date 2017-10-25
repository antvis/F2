/**
 * @fileOverview Stack data
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const Adjust = require('./base');

class Stack extends Adjust {

  getDefaultCfg() {
    return {
      xField: null,
      yField: null
    };
  }

  processAdjust(dataArray) {
    const self = this;
    const xField = self.xField;
    const yField = self.yField;
    const count = dataArray.length;
    const stackCache = {};

    for (let i = 0; i < count; i++) {
      const data = dataArray[i];
      for (let j = 0; j < data.length; j++) {
        const item = data[j];
        const x = item[xField];
        let y = item[yField];
        const xkey = x.toString();
        y = Util.isArray(y) ? y[1] : y;
        if (!stackCache[xkey]) {
          stackCache[xkey] = 0;
        }
        item[yField] = [ stackCache[xkey], y + stackCache[xkey] ];
        stackCache[xkey] += y;
      }
    }
  }
}

Adjust.Stack = Stack;
module.exports = Stack;
