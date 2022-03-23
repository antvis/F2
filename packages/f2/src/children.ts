import { JSX } from './jsx/jsx-namespace';
import { isArray, isNil } from '@antv/util';

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

function map(children: any, fn: any) {
  if (!children) {
    return fn(children);
  }
  if (isArray(children)) {
    return children.map((child) => {
      return map(child, fn);
    });
  }
  return fn(children);
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
    if (element && !isNil(element.key)) {
      const { key } = element;
      keyed[key] = element;
    }
  }

  // 比较元素
  for (let i = 0, len = Math.max(nextLength, lastLength); i < len; i++) {
    const element = nextElements[i];
    if (!element) {
      compare(element, lastElements[i], callback);
      continue;
    }
    const { key } = element;
    // 有key值定义
    if (!isNil(element.key)) {
      const lastElement = keyed[key];
      if (lastElement) delete keyed[key];
      compare(element, lastElement, callback);
      continue;
    }
    compare(element, lastElements[i], callback);
  }
  // 说明是删除的元素
  Object.keys(keyed).forEach((key) => {
    compare(null, keyed[key], callback);
  });
}

// 比较2棵树
function compare(nextElement: JSX.Element, lastElement: JSX.Element, callback: Function) {
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

function toArray(element: JSX.Element): JSX.Element[] | null {
  if (!element) {
    return element as null;
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
