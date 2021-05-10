// 比较2颗shape树，并返回新的渲染树
import JSX from './interface';
import { map } from '@ali/f2x-util';
import { ELEMENT_DELETE, ELEMENT_UPDATE } from './elementStatus';

const isArray = Array.isArray;


// 处理删除的元素
function deleteElement(element) {
  if (!element) return element;
  if (isArray(element)) {
    return element.map(e => {
      deleteElement(e);
    });
  }

  // 删除children
  const { props } = element;
  props.children = map(props.children, (child) => {
    return deleteElement(child);
  });

  // 标记删除
  element.status = ELEMENT_DELETE;

  return element;
}

// 对比2个数组
function compareArray(nextElement: any[], lastElement: any[]) {
  const cache = {};
  for (let i = 0, len = lastElement.length; i < len; i++) {
    const element = lastElement[i];
    if (element && element.key !== undefined) {
      const { key } = element;
      cache[key] = element;
    }
  }
  // 新生成一个，不修改nextElement和lastElement
  const newElement = nextElement.map((element, i) => {
    if (!element) {
      return element;
    }
    const { key } = element;
    // 如果有 key 认为是 map 生成的，否则认为是 jsx 的子元素结构
    const lastChild = key !== undefined ? cache[key] : lastElement[i];

    // 标记为更新
    if (lastChild) {
      lastChild.status = ELEMENT_UPDATE;
    }

    // 递归比较元素
    return compareElement(element, lastChild);
  });

  // 再从lastElement里面找到被删除的元素
  for (let i = 0, len = lastElement.length; i < len; i++) {
    const element = lastElement[i];
    // 如果之前存在，且这次不是更新的，说明是被删除的元素
    if (element && element.status !== ELEMENT_UPDATE) {
      // 标记为已删除，且添加到新列表
      newElement.push(deleteElement(element));
    }
  }

  return newElement;
}

// 比较2个元素，会被递归执行
function compareElement(nextElement, lastElement) {
  // 都为空
  if (!nextElement && !lastElement) {
    return null;
  }
  // 新增的话直接返回
  if (!lastElement) {
    return nextElement;
  }
  // 元素被移除了, 标记后返回被删除的元素
  if (!nextElement) {
    return deleteElement(lastElement);
  }
  // nextElement & lastElement 都不为空了

  // 如果都是数组，有2种情况，一种是children数组，一种是map生成的数组
  if (isArray(nextElement) && isArray(lastElement)) {
    return compareArray(nextElement, lastElement);
  }

  // 普通的jsx元素， 且是更新
  if (!isArray(nextElement) && !isArray(lastElement)) {
    const { _cache: _nextCache, props: nextProps } = nextElement;
    const { _cache: _lastCache, props: lastProps } = lastElement;

    // 保留缓存值
    nextElement._cache = {
      ..._lastCache,
      ..._nextCache,
    }

    // 继续比较子元素
    nextProps.children = compareElement(nextProps.children, lastProps.children);

    return nextElement;
  }

  // 有一个类型变了，可能是三元运算，处理成 删除 + 新建，要返回数组
  if (!isArray(nextElement) || !isArray(lastElement)) {
    return [
      nextElement,
      deleteElement(lastElement),
    ];
  }

  return nextElement;
}


// 因为要实现删除元素的动画，所以需要保留删除的元素，diff 后需要创建一颗新树， 实际渲染也需要拿这颗树来进行
export default compareElement;

// export default (nextElement: JSX.Element, lastElement: JSX.Element) => {
//   const newElement = compareElement(nextElement, lastElement);
//   return newElement;
// }
