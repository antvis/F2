import {
  isArray,
  isNil,
  each
} from '@antv/util';

function merge(dataArray) {
  let rst = [];
  for (let i = 0, len = dataArray.length; i < len; i++) {
    rst = rst.concat(dataArray[i]);
  }
  return rst;
}

function values(data, name) {
  const rst = [];
  const tmpMap = {};
  for (let i = 0, len = data.length; i < len; i++) {
    const obj = data[i];
    const value = obj[name];
    if (!isNil(value)) {
      if (!isArray(value)) {
        if (!tmpMap[value]) {
          rst.push(value);
          tmpMap[value] = true;
        }
      } else {
        each(value, val => {
          if (!tmpMap[val]) {
            rst.push(val);
            tmpMap[val] = true;
          }
        });
      }
    }
  }
  return rst;
}

function firstValue(data, name) {
  let rst = null;
  for (let i = 0, len = data.length; i < len; i++) {
    const obj = data[i];
    const value = obj[name];
    if (!isNil(value)) {
      if (isArray(value)) {
        rst = value[0];
      } else {
        rst = value;
      }
      break;
    }
  }
  return rst;
}

function groupToMap(data, fields) {
  if (!fields) {
    return {
      0: data
    };
  }

  const callback = function(row) {
    let unique = '_';
    for (let i = 0, l = fields.length; i < l; i++) {
      unique += row[fields[i]] && row[fields[i]].toString();
    }
    return unique;
  };

  const groups = {};
  for (let i = 0, len = data.length; i < len; i++) {
    const row = data[i];
    const key = callback(row);
    if (groups[key]) {
      groups[key].push(row);
    } else {
      groups[key] = [ row ];
    }
  }

  return groups;
}

function group(data, fields, appendConditions = {}) {
  if (!fields) {
    return [ data ];
  }
  const groups = groupToMap(data, fields);
  const array = [];
  if (fields.length === 1 && appendConditions[fields[0]]) {
    const values = appendConditions[fields[0]];
    each(values, value => {
      value = '_' + value;
      array.push(groups[value]);
    });
  } else {
    for (const i in groups) {
      array.push(groups[i]);
    }
  }

  return array;
}

function remove(arr, obj) {
  if (!arr) {
    return;
  }
  const index = arr.indexOf(obj);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}

function getRange(values) {
  if (!values.length) {
    return {
      min: 0,
      max: 0
    };
  }
  const max = Math.max.apply(null, values);
  const min = Math.min.apply(null, values);
  return {
    min,
    max
  };
}

export {
  merge,
  values,
  firstValue,
  group,
  groupToMap,
  remove,
  getRange
};
