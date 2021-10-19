import { isArray } from '@antv/util';
import { map } from './util';

function cloneElement(element, props) {
  if (!element) return element;
  return {
    ...element,
    props: {
      ...element.props,
      ...props,
    },
  };
}

function compareArray(
  nextElements: JSX.Element[],
  lastElements: JSX.Element[],
  callback: Function
) {
  const keyed = {};
  const nextLength = nextElements.length;
  const lastLength = lastElements.length;
  for (let i = 0, len = lastLength; i < len; i++) {
    const element = lastElements[i];
    if (element && element.key !== undefined) {
      const { key } = element;
      keyed[key] = element;
    }
  }

  // 比较元素
  for (let i = 0, len = Math.max(nextLength, lastLength); i < len; i++) {
    const element = nextElements[i];
    if (!element) {
      callback(element, lastElements[i]);
      break;
    }
    const { key } = element;
    // 有key值定义
    if (key !== undefined) {
      const lastElement = keyed[key];
      if (lastElement) delete keyed[key];
      callback(element, lastElement);
      break;
    }
    callback(element, lastElements[i]);
  }
  // 说明是删除的元素
  Object.keys(keyed).forEach(key => {
    callback(null, keyed[key]);
  });
}

// 比较2棵树
function compare(
  nextElement: JSX.Element,
  lastElement: JSX.Element,
  callback: Function
) {
  // 有一个为空
  if (!nextElement || !lastElement) {
    callback(nextElement, lastElement);
    return;
  }

  if (isArray(nextElement) || isArray(lastElement)) {
    const nextElementArray = isArray(nextElement) ? nextElement : [nextElement];
    const lastElementArray = isArray(lastElement) ? lastElement : [lastElement];
    compareArray(nextElementArray, lastElementArray, callback);
    return;
  }

  callback(nextElement, lastElement);
}

function toArray(element: JSX.Element) {
  if (!element) {
    return element;
  }
  if (!isArray(element)) {
    return [element];
  }
  let newArray = [];
  for (let i = 0, len = element.length; i < len; i++) {
    const item = element[i];
    if (isArray(item)) {
      // @ts-ignore
      newArray = newArray.concat(toArray(item));
    } else {
      newArray.push(item);
    }
  }
  return newArray;
}

const Children = {
  cloneElement,
  map,
  toArray,
  compare,
};

export default Children;
