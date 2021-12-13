function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const createContext = (title = '', { width = '300px', height = '225px' }: any = {}) => {
  const canvasEl = document.createElement('canvas');
  const titleEl = document.createElement('p');
  titleEl.innerText = title + ':';
  titleEl.style.fontSize = '12px';
  canvasEl.style.width = width;
  canvasEl.style.height = height;
  document.body.appendChild(titleEl);
  document.body.appendChild(canvasEl);
  const context = canvasEl.getContext('2d');
  return context;
};

const dispatchEvent = (dom: HTMLElement, eventType: string, exData: Record<string, any>) => {
  let event: Event = document.createEvent('event');
  event = Object.assign(event, exData);
  event.initEvent(eventType, true, true);
  dom.dispatchEvent(event);
}

const gestureSimulator = async (dom, eventType: string, option: { clientX: number; clientY: number }) => {
  const exData = {
    targetTouches: [option],
    touches: [option],
    changedTouches: [option],
  };

  if (['touchstart', 'touchmove', 'touchend'].indexOf(eventType) !== -1) {
    dispatchEvent(dom, eventType, exData);
    return;
  }

  if (eventType === 'press') {
    dispatchEvent(dom, 'touchstart', exData);
    await delay(270);
    dispatchEvent(dom, 'touchend', exData);
    return;
  }

  if (eventType === 'tap') {
    dispatchEvent(dom, 'touchstart', exData);
    await delay(50);
    dispatchEvent(dom, 'touchend', exData);
    return;
  }

  if (eventType === 'click') {
    dispatchEvent(dom, 'click', option);
    return;
  }
};

export { createContext, delay, dispatchEvent, gestureSimulator };
