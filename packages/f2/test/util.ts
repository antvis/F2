const isTouch = (eventType) => {
  if (eventType.indexOf('touch') !== -1) return true;
  return false;
};

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const createContext = (title = '', { width = '300px', height = '225px' } = {}) => {
  const canvasEl = document.createElement('canvas');
  if (title) {
    const titleEl = document.createElement('p');
    titleEl.innerText = title + ':';
    titleEl.style.fontSize = '12px';
    document.body.appendChild(titleEl);
  }
  canvasEl.style.display = 'block';
  canvasEl.style.width = width;
  canvasEl.style.height = height;
  document.body.appendChild(canvasEl);
  const context = canvasEl.getContext('2d');
  return context;
};

const dispatchEvent = (dom: HTMLElement, eventType: string, exData) => {
  const event = isTouch(eventType)
    ? new TouchEvent(eventType, { bubbles: true, cancelable: true, ...exData })
    : new MouseEvent(eventType, { bubbles: true, cancelable: true, ...exData });

  dom.dispatchEvent(event);
};

interface Option {
  x: number;
  y: number;
}

const gestureSimulator = async (dom, eventType: string, option: Option | Option[]) => {
  const { top, left } = dom.getBoundingClientRect();
  const options = Array.isArray(option) ? option : [option];
  const events = options.map((option) => {
    const { x, y } = option;
    const clientX = left + x;
    const clientY = top + y;
    // @ts-ignore
    const event = isTouch(eventType)
      ? new Touch({
          clientX,
          clientY,
          target: dom,
          identifier: 0,
        })
      : {
          clientX,
          clientY,
          target: dom,
          identifier: 0,
        };
    return event;
  });

  const touchEvent = {
    ...events[0],
    targetTouches: events,
    touches: events,
    changedTouches: events,
  };

  if (['touchstart', 'touchmove', 'touchend'].indexOf(eventType) !== -1) {
    dispatchEvent(dom, eventType, touchEvent);
    return;
  }

  if (eventType === 'press') {
    dispatchEvent(dom, 'touchstart', touchEvent);
    await delay(270);
    dispatchEvent(dom, 'touchend', touchEvent);
    return;
  }

  if (eventType === 'tap') {
    dispatchEvent(dom, 'touchstart', touchEvent);
    await delay(50);
    dispatchEvent(dom, 'touchend', touchEvent);
    return;
  }

  if (eventType === 'click') {
    dispatchEvent(dom, 'mousedown', events[0]);
    await delay(50);
    dispatchEvent(dom, 'mouseup', events[0]);
    return;
  }
};

export { createContext, delay, dispatchEvent, gestureSimulator };
