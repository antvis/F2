// @ts-nocheck
function Touch(target, identifier, pos, deltaX, deltaY) {
  deltaX = deltaX || 0;
  deltaY = deltaY || 0;

  this.identifier = identifier;
  this.target = target;
  this.clientX = pos.clientX + deltaX;
  this.clientY = pos.clientY + deltaY;
  this.screenX = pos.screenX + deltaX;
  this.screenY = pos.screenY + deltaY;
  this.pageX = pos.pageX + deltaX;
  this.pageY = pos.pageY + deltaY;
}

/**
 * create empty touchlist with the methods
 * @constructor
 * @returns touchList
 */
function TouchList() {
  var touchList = [];

  touchList.item = function (index) {
    return this[index] || null;
  };

  // specified by Mozilla
  touchList.identifiedTouch = function (id) {
    return this[id + 1] || null;
  };

  return touchList;
}

var createTouch = function (
  view,
  target,
  identifier,
  pageX,
  pageY,
  screenX,
  screenY,
  clientX,
  clientY
) {
  return new Touch(target, identifier, {
    pageX: pageX,
    pageY: pageY,
    screenX: screenX,
    screenY: screenY,
    clientX: clientX,
    clientY: clientY,
  });
};

var createTouchList = function () {
  var touchList = new TouchList();
  for (var i = 0; i < arguments.length; i++) {
    touchList[i] = arguments[i];
  }
  touchList.length = arguments.length;
  return touchList;
};

const dispatchEvent = (target: HTMLElement, eventType: string, exData) => {
  var touchEvent = document.createEvent('Event');
  touchEvent.initEvent(eventType, true, true);

  touchEvent.touches = exData.touches;
  touchEvent.targetTouches = exData.targetTouches;
  touchEvent.changedTouches = exData.changedTouches;

  target.dispatchEvent(touchEvent);
};

interface Option {
  x: number;
  y: number;
}

export const gestureSimulator = async (dom, eventType: string, option: Option | Option[]) => {
  const { top, left } = dom.getBoundingClientRect();
  const options = Array.isArray(option) ? option : [option];
  const events = options.map((option, i) => {
    const { x, y } = option;
    const clientX = left + x;
    const clientY = top + y;
    // @ts-ignore
    const event = createTouch(dom, dom, i, 0, 0, 0, 0, clientX, clientY);
    return event;
  });

  const touchEvent = {
    ...events[0],
    targetTouches: createTouchList(...events),
    touches: createTouchList(...events),
    changedTouches: createTouchList(...events),
  };

  if (['touchstart', 'touchmove', 'touchend'].indexOf(eventType) !== -1) {
    dispatchEvent(dom, eventType, touchEvent);
    return;
  }

  if (eventType === 'press') {
    dispatchEvent(dom, 'touchstart', touchEvent);
    await delay(300);
    return;
  }

  if (eventType === 'tap') {
    dispatchEvent(dom, 'touchstart', touchEvent);
    await delay(50);
    dispatchEvent(dom, 'touchend', touchEvent);
    return;
  }

  if (eventType === 'click') {
    dispatchEvent(dom, 'click', events[0]);
    return;
  }
};

export const isTouchEvent = (e) => {
  if (e instanceof MouseEvent) {
    return false;
  }
  return true;
};

export function delay(time) {
  var half = Math.round(time / 2);
  return new Promise(function (resolve) {
    // 用 2 个 setTimeout 是为了提升 ci 的成功率
    setTimeout(function () {
      setTimeout(resolve, half);
    }, half);
  });
}

export const isBrowser = typeof window !== 'undefined' && window
export const safeWindow = <T>(fn: (win: Window) => T): T | undefined => {
  if (isBrowser) return fn(window)
  return undefined
}
export const safeDocument = <T>(fn: (doc: Document) => T): T | undefined => {
  if (typeof document !== 'undefined' && document) return fn(document)
  return undefined
}
