const DEFAULT_PRECISION = 2;
const RE_COMMFY = /\B(?=(?:\d{3})+$)/g;
const RE_NUMBER = /^[+-]?\d+(?:\.\d+)?$/;

function isNumber(value: any) {
  return RE_NUMBER.test(value);
}

/**
 * 返回数字的正负符号位，正数返回 '+'，负数返回 '-'，0 返回 ''，NaN 返回 ''。
 * @param {Number | String} value 需要显示的数字
 * @param {String} emptySign 空白占位符，只有在NaN的时候才起效
 * @return {String} '+', '-', ''
 */
function getSign(value: number | string, emptySign: string = ''): string {
  // Note: NaN return ''
  if (!isNumber(value)) {
    return emptySign;
  }

  let sign = '';
  if (value > 0) {
    sign = '+';
  } else if (value < 0) {
    sign = '-';
  }

  return sign;
}

/**
 * 千分位格式化数值。
 * @param { Number | String } value 可以是字符串类型的数字。
 * @param {Number} precision 小数位精度。
 * @param {String} emptySign 空白占位符。
 * @return {String} 千分位格式化后的数值。
 */
function amountFormat(
  value: number | string,
  precision: number = DEFAULT_PRECISION,
  emptySign: string = '--'
): string {
  if (!isNumber(value)) {
    return emptySign;
  }
  const num = Number(value);
  const nums = num.toFixed(precision).split('.');
  nums[0] = nums[0].replace(RE_COMMFY, ',');
  return nums.join('.');
}

/**
 * 把金额转换成带单位的字符串
 * @param {Number | String} value 金额
 * @param {Number} precision 小数位精度。
 * @param {String} emptySign 空白占位符。
 * @return {String}  带单位的字符串
 */
function amountFormatUnit(
  value: number | string,
  precision: number = DEFAULT_PRECISION,
  emptySign: string = '--'
): string {
  if (!isNumber(value)) {
    return emptySign;
  }
  let i = -1;
  let num = Number(value);
  while (num >= 10000) {
    num /= 10000;
    i += 1;
  }
  return num.toFixed(precision) + (['万', '亿', '万亿'][i] || '');
}

interface BlearOptions {
  underflow?: string;
  overflow?: string;
}

const BLEAR_NUMBER_RULES = [
  '万',
  '0万',
  '00万',
  '000万',
  '亿',
  '0亿',
  '00亿',
  '000亿',
  '万亿',
  '0万亿',
  '00万亿',
  '000万亿',
];
/**
 * 数字模糊处理。
 * @param {Number} num 待模糊处理的数字。必须在 [0, Number.MAX_SAFE_INTEGER] 范围内。
 * @param {BlearOptions} options 其他可选的配置。
 *    @property {String} underflow 最小值越界处理，默认处理为空字符串 ""。
 *    @property {String} overflow 最大值越界处理，默认处理为 "--"。
 */
function blearNumber(num: number | string, options?: BlearOptions) {
  const { underflow = '', overflow = '--' } = options || {};

  if (!isNumber(num)) return overflow;
  if (num < 100) return underflow;
  if (num < 1000) return '100';
  if (num < 10000) return '1000';

  if (num > Number.MAX_SAFE_INTEGER) {
    // eslint-disable-next-line no-console
    console.warn('[Tango.formatter.blearNumber][overflow] 超出数值处理范围');
    return overflow;
  }

  const str = Math.floor(Number(num)).toString();
  const strLen = str.length;
  return str.charAt(0).concat(BLEAR_NUMBER_RULES[strLen - 5]);
}

/**
 * 七日年化和万分收益保留小数后4位
 * @param {Number | String} value 金额
 * @param {String} emptySign 空白占位符。
 * @return { String } 格式化的字符串
 */
function formatProfit(value: number | string, emptySign: string = '--'): string {
  if (!isNumber(value)) {
    return emptySign;
  }
  const num = Number(value);
  return num.toFixed(4);
}

/**
 * 把数字转换成百分比
 * @param {Number | String} value 待转化的小数
 * @param {Number} precision 精确小数点位数
 * @param {String} emptySign 空白占位符
 * @return {String} 带百分号%的字符串
 */
function formatPercent(
  value: number | string,
  precision: number = DEFAULT_PRECISION,
  emptySign: string = '--'
): string {
  if (!isNumber(value)) {
    return emptySign;
  }
  const decimals = value.toString().split('.');
  const oriPrecision = (decimals[1] && decimals[1].length) || 0;
  const newPrecision = oriPrecision - 2 > 0 ? oriPrecision - 2 : 0;
  const prec = precision === undefined ? newPrecision : precision;
  const num = Number(value);
  return `${(num * 100).toFixed(prec)}%`;
}

/**
 * 将数值格式化为带符号显示。
 * @param {Number | String} number 指定的数值 兼容{String} 。
 * @param {Number} precision 保留小数位精度，默认保留 2 位小数。
 * @param {String} emptySign 空白占位符
 * @return {String} 格式化后的带符号字符串。
 */
function toSignedFormatNumber(
  value: number | string,
  precision: number = DEFAULT_PRECISION,
  emptySign: string = '--'
): string {
  const num = Number(value);
  const sign = getSign(num);
  const isNum = isNumber(value);
  const sNum = isNum ? amountFormat(Math.abs(num), precision) : emptySign;

  return `${sign}${sNum}`;
}

export default {
  getSign,
  amountFormat,
  amountFormatUnit,
  blearNumber,
  formatProfit,
  formatPercent,
  isNumber, // export for test.
  toSignedFormatNumber,
};
