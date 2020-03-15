import { getRelativePosition } from '../../util/dom';
import { isNumber } from '../../util/common';

// 计算滑动的方向
const calcDirection = (start, end) => {
  const xDistance = end.x - start.x;
  const yDistance = end.y - start.y;
  // x 的距离大于y 说明是横向，否则就是纵向
  if (Math.abs(xDistance) > Math.abs(yDistance)) {
    return xDistance > 0 ? 'right' : 'left';
  }
  return yDistance > 0 ? 'down' : 'up';
};

// 计算2点之间的距离
const calcDistance = (point1, point2) => {
  const xDistance = Math.abs(point2.x - point1.x);
  const yDistance = Math.abs(point2.y - point1.y);
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
};

const getCenter = (point1, point2) => {
  const x = point1.x + ((point2.x - point1.x) / 2);
  const y = point1.y + ((point2.y - point1.y) / 2);
  return { x, y };
};

const convertPoints = (touches, canvas) => {
  if (!touches) return;
  const points = [];
  const len = touches.length;
  for (let i = 0; i < len; i++) {
    const touch = touches[i];
    // x, y: 相对canvas原点的位置，clientX, clientY 相对于可视窗口的位置
    const { x, y, clientX, clientY } = touch;
    let point;
    // 小程序环境会有x,y
    if (isNumber(x) || isNumber(y)) {
      point = { x, y };
    } else {
      // 浏览器环境再计算下canvas的相对位置
      point = getRelativePosition({ x: clientX, y: clientY }, canvas);
    }
    points.push(point);
  }
  return points;
};

const PRESS_DELAY = 250;

class EventController {
  constructor({ canvas, el }) {
    // canvasEl
    this.canvas = canvas;
    this.delegateEvent(el);

    // 用来记录当前触发的事件
    this.processEvent = {};
  }
  delegateEvent(canvasEl) {
    // 代理这几个事件
    canvasEl.addEventListener('click', this._click);
    canvasEl.addEventListener('touchstart', this._start);
    canvasEl.addEventListener('touchmove', this._move);
    canvasEl.addEventListener('touchend', this._end);
    canvasEl.addEventListener('touchcancel', this._cancel);
  }
  emitEvent(type, ev) {
    const canvas = this.canvas;
    canvas.emit(type, ev);
  }
  _click = ev => {
    this.emitEvent('click', ev);
  }
  _start = ev => {
    const points = convertPoints(ev.touches, this.canvas);
    if (!points) {
      return;
    }
    ev.points = points;
    this.emitEvent('touchstart', ev);
    // 防止上次的内容没有清理掉，重新reset下
    this.reset();
    // 记录touch start 的时间
    this.startTime = Date.now();
    // 记录touch start 的点
    this.startPoints = points;
    if (points.length > 1) {
      this.startDistance = calcDistance(points[0], points[1]);
      this.center = getCenter(points[0], points[1]);
    } else {
      // 如果touchstart后停顿250ms, 则也触发press事件
      this.pressTimeout = setTimeout(() => {
        // 这里固定触发press事件
        const eventType = 'press';
        ev.direction = 'none';
        this.emitStart(eventType, ev);
        this.emitEvent(eventType, ev);
        this.eventType = eventType;
      }, PRESS_DELAY);
    }
  }
  _move = ev => {
    const points = convertPoints(ev.touches, this.canvas);
    if (!points) return;
    this.clearPressTimeout();
    ev.points = points;
    this.emitEvent('touchmove', ev);
    const startPoints = this.startPoints;
    if (!startPoints) return;
    // 多指触控
    if (points.length > 1) {
      // touchstart的距离
      const startDistance = this.startDistance;
      const currentDistance = calcDistance(points[0], points[1]);
      ev.zoom = currentDistance / startDistance;
      ev.center = this.center;
      // 触发缩放事件
      this.emitStart('pinch', ev);
      this.emitEvent('pinch', ev);
    } else {
      const deltaX = points[0].x - startPoints[0].x;
      const deltaY = points[0].y - startPoints[0].y;
      const direction = this.direction || calcDirection(startPoints[0], points[0]);
      this.direction = direction;

      // 获取press或者pan的事件类型
      // press 按住滑动, pan表示平移
      // 如果start后立刻move，则触发pan, 如果有停顿，则触发press
      const eventType = this.getEventType(points);

      ev.direction = direction;
      ev.deltaX = deltaX;
      ev.deltaY = deltaY;
      this.emitStart(eventType, ev);
      this.emitEvent(eventType, ev);

      // 记录最后2次move的时间和坐标，为了给swipe事件用
      const prevMoveTime = this.lastMoveTime;
      const now = Date.now();
      // 最后2次的时间间隔一定要大于0，否则swipe没发计算
      if (now - prevMoveTime > 0) {
        this.prevMoveTime = prevMoveTime;
        this.prevMovePoints = this.lastMovePoints;
        this.lastMoveTime = now;
        this.lastMovePoints = points;
      }
    }
  }
  _end = ev => {
    this.emitEnd(ev);
    this.emitEvent('touchend', ev);

    // swipe事件处理, 在touchend之后触发
    const lastMoveTime = this.lastMoveTime;
    const now = Date.now();
    // 做这个判断是为了最后一次touchmove后到end前，还有一个停顿的过程
    // 100 是拍的一个值，理论这个值会很短，一般不卡顿的话在10ms以内
    if (now - lastMoveTime < 100) {
      const prevMoveTime = this.prevMoveTime || this.startTime;
      const intervalTime = lastMoveTime - prevMoveTime;
      // 时间间隔一定要大于0, 否则计算没意义
      if (intervalTime > 0) {
        const prevMovePoints = this.prevMovePoints || this.startPoints;
        const lastMovePoints = this.lastMovePoints;
        // move速率
        const velocity = calcDistance(prevMovePoints[0], lastMovePoints[0]) / intervalTime;
        // 0.3 是参考hammerjs的设置
        if (velocity > 0.3) {
          ev.velocity = velocity;
          ev.direction = calcDirection(prevMovePoints[0], lastMovePoints[0]);
          this.emitEvent('swipe', ev);
        }
      }
    }

    this.reset();

    const touches = ev.touches;
    // 当多指只释放了1指时也会触发end, 这时重新触发一次start
    if (touches && touches.length > 0) {
      this._start(ev);
    }
  }
  _cancel = ev => {
    this.emitEvent('touchcancel', ev);
    this.reset();
  }
  getEventType(points) {
    const { eventType, canvas, startTime, startPoints } = this;
    if (eventType) {
      return eventType;
    }
    let type;
    const panEventListeners = canvas.__events.pan;
    // 如果没有pan事件的监听，默认都是press
    if (!panEventListeners || !panEventListeners.length) {
      type = 'press';
    } else {
      // 如果有pan事件的处理，press则需要停顿250ms, 且移动距离小于10
      const now = Date.now();
      if (now - startTime > PRESS_DELAY && calcDistance(startPoints[0], points[0]) < 10) {
        type = 'press';
      } else {
        type = 'pan';
      }
    }
    this.eventType = type;
    return type;
  }
  enable(eventType) {
    this.processEvent[eventType] = true;
  }
  // 是否进行中的事件
  isProcess(eventType) {
    return this.processEvent[eventType];
  }
  // 触发start事件
  emitStart(type, ev) {
    if (this.isProcess(type)) {
      return;
    }
    this.enable(type);
    this.emitEvent(`${type}start`, ev);
  }
  // 触发end事件
  emitEnd(ev) {
    const processEvent = this.processEvent;
    Object.keys(processEvent).forEach(type => {
      this.emitEvent(`${type}end`, ev);
      delete processEvent[type];
    });
  }
  clearPressTimeout() {
    if (this.pressTimeout) {
      clearTimeout(this.pressTimeout);
      this.pressTimeout = 0;
    }
  }
  reset() {
    this.clearPressTimeout();
    this.startTime = 0;
    this.startPoints = null;
    this.startDistance = 0;
    this.direction = null;
    this.eventType = null;
    this.pinch = false;
    this.prevMoveTime = 0;
    this.prevMovePoints = null;
    this.lastMoveTime = 0;
    this.lastMovePoints = null;
  }
}

export default EventController;
