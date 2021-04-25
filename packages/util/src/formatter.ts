import { formatter } from '@alipay/tango';
import { format as fechaFormat } from 'fecha'; // fecha 的版本和f2保持一致

const toDate = (value: number | string) => {
  if (typeof value === 'number') {
    return new Date(value);
  }
  return new Date(value.replace(/-/ig, '/'));
}


const { getSign, isNumber, amountFormat, formatPercent } = formatter;

// 红涨绿跌色
const colorMap = {
  normal: '#1677FF',
  rise: '#E62C3B',
  fall: '#0E9976',
  equal: '#999999',
}

function sign(value, precision: number = 2) {
  const num = Number(value);
  const symbol = num > 0 ? '+' : ''
  const text = `${symbol}${num.toFixed(precision)}`;
  return { text };
}

function signFormater(value, percent, precision) {
  const isNum = isNumber(value);
  if (!isNum) {
    return {
      text: '--',
      fill: colorMap.equal,
    }
  }
  const num = Number(value);
  const sign = getSign(num);
  const sNum = percent ? formatPercent(Math.abs(num), precision) : amountFormat(Math.abs(num), precision);
  const text = `${sign}${sNum}`;
  const fill = num > 0 ? colorMap.rise : (num < 0 ? colorMap.fall : colorMap.equal);

  // 返回的是绘图属性
  return {
    text,
    fill,
  };
}

function percent(value, precision: number) {
  return {
    text: formatPercent(value, precision)
  }
}

function dateFormatter(value: number | string, option?: any) {
  const date = toDate(value);
  const mask = option || 'MM-DD';
  return {
    text: fechaFormat(date, mask),
  };
}

function fixed(value: number | string, option = 2) {
  return {
    text: Number(value).toFixed(option)
  }
}


const formatterMap = {
  sign,
  fixed,
  signNum: (value, precision: number) => signFormater(value, false, precision),
  signPercent: (value, precision: number) => signFormater(value, true, precision),
  percent,
  date: dateFormatter
}

/**
 * text 文案
 * fill 颜色
 */
export default (type: string, value: any, option?: any) => {
  const formatterFn = formatterMap[type];
  if (!formatterFn) {
    return { text: value };
  }
  return formatterFn(value, option);
}
