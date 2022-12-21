// 实现简单的事件机制
import { isObject } from '@antv/util';

// 多个事件分隔符
const TYPE_SEP = ' ';

class EventEmit {
  // eslint-disable-next-line
  __events: any;
  constructor() {
    this.__events = {};
  }

  on(type, listener) {
    if (!type || !listener) {
      return;
    }
    type.split(TYPE_SEP).forEach(item => {
      const events = this.__events[item] || [];
      events.push(listener);
      this.__events[item] = events;
    });
  }
  emit(type, e) {
    if (isObject(type)) {
      e = type;
      type = e && e.type;
    }
    if (!type) {
      return;
    }
    const events = this.__events[type];
    if (!events || !events.length) {
      return;
    }
    events.forEach((listener) => {
      listener.call(this, e);
    });
  }
  off(type, listener) {
    const __events = this.__events;
    type.split(TYPE_SEP).forEach(item => {
      const events = __events[item];
      if (!events || !events.length) {
        return;
      }
      // 如果没有指定方法，则删除所有项
      if (!listener) {
        delete __events[item];
        return;
      }
      // 删除指定的 listener
      for (let i = 0, len = events.length; i < len; i++) {
        if (events[i] === listener) {
          events.splice(i, 1);
          i--;
        }
      }
    });
  }
}

export default EventEmit;
