const Util = require('../util/common');

// Get the interpolation between colors
function getValue(start, end, percent, index) {
  const value = start[index] + (end[index] - start[index]) * percent;
  return value;
}

// convert to hex
function arr2hex(arr) {
  return '#' + toRGBValue(arr[0]) + toRGBValue(arr[1]) + toRGBValue(arr[2]);
}

function toRGBValue(value) {
  value = Math.round(value);
  value = value.toString(16);
  if (value.length === 1) {
    value = '0' + value;
  }
  return value;
}

function calColor(colors, percent) {
  const steps = colors.length - 1;
  const step = Math.floor(steps * percent);
  const left = steps * percent - step;
  const start = colors[step];
  const end = step === steps ? start : colors[step + 1];
  const rgb = arr2hex([
    getValue(start, end, left, 0),
    getValue(start, end, left, 1),
    getValue(start, end, left, 2)
  ]);
  return rgb;
}

function hex2arr(str) {
  const arr = [];
  arr.push(parseInt(str.substr(1, 2), 16));
  arr.push(parseInt(str.substr(3, 2), 16));
  arr.push(parseInt(str.substr(5, 2), 16));
  return arr;
}

const colorCache = {
  black: '#000000',
  blue: '#0000ff',
  grey: '#808080',
  green: '#008000',
  orange: '#ffa500',
  pink: '#ffc0cb',
  purple: '#800080',
  red: '#ff0000',
  white: '#ffffff',
  yellow: '#ffff00'
};

const ColorUtil = {
  /**
   * Returns a hexadecimal string representing this color in RGB space, such as #f7eaba.
   * @param  {String} color color value
   * @return {String} Returns a hexadecimal string
   */
  toHex(color) {
    if (colorCache[color]) {
      return colorCache[color];
    }

    if (color[0] === '#') {
      if (color.length === 7) {
        return color;
      }

      const hex = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
        return '#' + r + r + g + g + b + b;
      }); // hex3 to hex6
      colorCache[color] = hex;
      return hex;
    }

    // rgb/rgba to hex
    let rst = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    rst.shift();
    rst = arr2hex(rst);
    colorCache[color] = rst;
    return rst;
  },

  hex2arr,

  /**
   * handle the gradient color
   * @param  {Array} colors the colors
   * @return {String} return the color value
   */
  gradient(colors) {
    const points = [];
    if (Util.isString(colors)) {
      colors = colors.split('-');
    }
    Util.each(colors, function(color) {
      if (color.indexOf('#') === -1) {
        color = ColorUtil.toHex(color);
      }
      points.push(hex2arr(color));
    });
    return function(percent) {
      return calColor(points, percent);
    };
  }
};

module.exports = ColorUtil;
