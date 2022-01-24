// 比较2颗shape树，并返回新的渲染树
import Children from '../children';
import { isArray, isNil, mix } from '@antv/util';
import { ELEMENT_APPEAR, ELEMENT_DELETE, ELEMENT_UPDATE } from './elementStatus';

// 处理删除的元素
function deleteElement(element) {
  // 是否有非空的子元素
  let hasElement = false;
  const receiveElement = Children.map(element, (item) => {
    if (!item) return item;
    const { ref, key, type, props, _cache } = item;
    const { children, animation, ...receiveProps } = props;
    const status = ELEMENT_DELETE;
    const receiveAnimation = animation && animation.leave;
    const receiveChildren = deleteElement(children);
    // 没有子元素，且自身也不需要动画，则直接删除
    if (!receiveChildren && !receiveAnimation) {
      return null;
    }
    hasElement = true;
    return {
      ref,
      key,
      type,
      props: {
        ...receiveProps,
        children: receiveChildren,
      },
      _cache,
      animation: receiveAnimation,
      status,
    };
  });

  // 如果没有非空的子元素，都删除
  if (!hasElement) {
    return null;
  }
  return receiveElement;
}

function appearElement(element) {
  return Children.map(element, (item) => {
    if (!item) return item;
    const { ref, key, type, props, _cache } = item;
    const { children, animation, ...receiveProps } = props;
    const status = ELEMENT_APPEAR;
    const receiveAnimation = animation && animation.appear;
    const receiveChildren = appearElement(children);
    return {
      ref,
      key,
      type,
      props: {
        ...receiveProps,
        children: receiveChildren,
      },
      _cache,
      animation: receiveAnimation,
      status,
    };
  });
}

function updateElement(nextElement, lastElement) {
  const { ref, key, type, _cache: _nextCache, props: nextProps } = nextElement;
  const { _cache: _lastCache, props: lastProps } = lastElement;

  const { children: nextChildren, animation: nextAnimation, ...nextReceiveProps } = nextProps;

  const { children: lastChildren } = lastProps;
  // 继续比较子元素
  const children = compareElement(nextChildren, lastChildren);
  // 保留缓存值
  const _cache = mix(_nextCache, _lastCache);
  // 动画
  const animation = nextAnimation && nextAnimation.update;

  // 生成新对象
  return {
    ref,
    key,
    type,
    props: {
      ...nextReceiveProps,
      children,
    },
    _cache,
    animation,
    status: ELEMENT_UPDATE,
  };
}

// 形变动画， TODO
function morphElement(nextElement, lastElement) {
  return [deleteElement(lastElement), appearElement(nextElement)];
}

function changeTypeToGroup(nextGroupElement, lastShapeElement) {
  const { key, type, ref, props: groupProps, _cache: _groupCache } = nextGroupElement;
  const { type: lastType, _cache: _lastCache } = lastShapeElement;

  const { children: groupChildren } = groupProps;

  // let existTransform = false;
  const children = Children.map(groupChildren, (nextElement) => {
    if (!nextElement) return nextElement;
    const { key, ref, type: nextType, props: nextProps, _cache: _nextCache } = nextElement;
    // if (nextType === 'group') {
    //   return changeTypeToGroup(nextElement, lastShapeElement);
    // }
    if (nextType !== lastType) {
      return morphElement(nextElement, lastShapeElement);
    }
    // existTransform = true;
    const { animation: nextAnimation, ...nextReceiveProps } = nextProps;
    const animation = nextAnimation && nextAnimation.update;
    return {
      ref,
      key,
      type: nextType,
      props: nextReceiveProps,
      _cache: mix(_nextCache, _lastCache),
      animation,
      status: ELEMENT_UPDATE,
    };
  });

  return {
    key,
    type,
    ref,
    props: {
      ...groupProps,
      children,
    },
    _cache: _groupCache,
    status: ELEMENT_UPDATE,
  };
}

function changeTypeFromGroup(nextShapeElement, lastGroupElement) {
  const {
    ref: nextRef,
    key: nextKey,
    type: nextType,
    props: nextShapeProps,
    _cache: _nextCache,
  } = nextShapeElement;
  const { type: lastType, props: lastProps } = lastGroupElement;
  const { animation: nextAnimation, ...nextReceiveProps } = nextShapeProps;
  const { children: groupChildren } = lastProps;
  const animation = nextAnimation && nextAnimation.update;
  if (!animation) {
    return [deleteElement(lastGroupElement), appearElement[nextShapeElement]];
  }

  let transformChild = null;
  const children = Children.map(groupChildren, (child) => {
    if (!child) return child;
    const { type: childType, _cache: _childCache } = child;
    if (childType !== nextType) {
      // TODO: child 形变
      return deleteElement(child);
    }
    if (!transformChild) {
      transformChild = child;
    }
    return {
      type: nextType,
      props: nextShapeProps,
      _cache: _childCache,
      animation,
      status: ELEMENT_UPDATE,
    };
  });

  if (!transformChild) {
    return [deleteElement(lastGroupElement), appearElement(nextShapeElement)];
  }

  const nextElement = {
    ref: nextRef,
    key: nextKey,
    type: nextType,
    props: nextReceiveProps,
    _cache: mix(_nextCache, transformChild._cache),
    animation,
    status: ELEMENT_UPDATE,
  };

  // 保留group 结构
  return [
    {
      type: lastType,
      props: {
        ...lastProps,
        children,
      },
      status: ELEMENT_DELETE,
    },
    nextElement,
  ];
}

function changeElementType(nextElement, lastElement) {
  const { type: nextType } = nextElement;
  const { type: lastType } = lastElement;

  if (nextType === 'group') {
    return changeTypeToGroup(nextElement, lastElement);
  }

  if (lastType === 'group') {
    return changeTypeFromGroup(nextElement, lastElement);
  }

  // 都不是group, 形变动画 TODO
  return morphElement(nextElement, lastElement);
}

// 对比2个数组
function compareArray(nextElements, lastElements) {
  const keyed = {};
  const nextLength = nextElements.length;
  const lastLength = lastElements.length;

  for (let i = 0; i < lastLength; i++) {
    const element = lastElements[i];
    if (element && !isNil(element.key)) {
      const { key } = element;
      keyed[key] = element;
    }
  }

  // 比较元素
  const maxLength = Math.max(nextLength, lastLength);
  const returnElements = [];
  for (let i = 0; i < maxLength; i++) {
    const nextElement = nextElements[i];
    if (!nextElement) {
      returnElements.push(compareElement(nextElement, lastElements[i]));
      continue;
    }
    const { key } = nextElement;
    // 有key值定义
    if (!isNil(key)) {
      const lastElement = keyed[key];
      if (lastElement) delete keyed[key];
      returnElements.push(compareElement(nextElement, lastElement));
      continue;
    }
    returnElements.push(compareElement(nextElement, lastElements[i]));
  }
  // 说明是删除的元素
  Object.keys(keyed).forEach((key) => {
    returnElements.push(compareElement(null, keyed[key]));
  });

  return returnElements;
}

// 比较2个元素，会被递归执行
function compareElement(nextElement, lastElement) {
  // 都为空
  if (!nextElement && !lastElement) {
    return null;
  }
  // 新增
  if (!lastElement) {
    return appearElement(nextElement);
  }
  // 删除
  if (!nextElement) {
    return deleteElement(lastElement);
  }
  // nextElement & lastElement 都不为空了

  // 如果有数组，比较数组
  if (isArray(nextElement) || isArray(lastElement)) {
    const nextElementArray = isArray(nextElement) ? nextElement : [nextElement];
    const lastElementArray = isArray(lastElement) ? lastElement : [lastElement];
    return compareArray(nextElementArray, lastElementArray);
  }

  // 普通的jsx元素, 且都非空
  const { key: nextKey, type: nextType } = nextElement;
  const { key: lastKey, type: lastType } = lastElement;

  // key 值不相等
  if (!isNil(nextKey) && nextKey !== lastKey) {
    return [deleteElement(lastElement), appearElement(nextElement)];
  }
  // shape 类型的变化
  if (nextType !== lastType) {
    // return [deleteElement(lastElement), nextElement];
    return changeElementType(nextElement, lastElement);
  }

  return updateElement(nextElement, lastElement);
}

// 因为要实现删除元素的动画，所以需要保留删除的元素，diff 后需要创建一颗新树， 实际渲染也需要拿这颗树来进行
export default compareElement;
