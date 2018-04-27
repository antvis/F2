

function dispatchEvent(dom, eventType, exData) {
  let event = document.createEvent('event');
  event = Object.assign(event, exData);
  event.initEvent(eventType, true, true);
  dom.dispatchEvent(event);
}

function delay(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

async function gestureSimulator(dom, eventType, options) {
  if ([ 'touchstart', 'touchmove', 'touchend' ].indexOf(eventType) !== -1) {
    const { clientX, clientY } = options;
    const exData = {
      targetTouches: [{ clientX, clientY }],
      touches: [{ clientX, clientY }],
      changedTouches: [{ clientX, clientY }]
    };
    dispatchEvent(dom, eventType, exData);
    return;
  }

  if (eventType === 'press') {
    const { clientX, clientY } = options;
    const exData = {
      targetTouches: [{ clientX, clientY }],
      touches: [{ clientX, clientY }],
      changedTouches: [{ clientX, clientY }]
    };
    dispatchEvent(dom, 'touchstart', exData);
    await delay(270);
    dispatchEvent(dom, 'touchend', exData);
    return;
  }

  if (eventType === 'tap') {
    const { clientX, clientY } = options;
    const exData = {
      targetTouches: [{ clientX, clientY }],
      touches: [{ clientX, clientY }],
      changedTouches: [{ clientX, clientY }]
    };
    dispatchEvent(dom, 'touchstart', exData);
    await delay(50);
    dispatchEvent(dom, 'touchend', exData);
    return;
  }

  if (eventType === 'click') {
    dispatchEvent(dom, 'click', options);
    return;
  }
}

module.exports = {
  gestureSimulator,
  delay
};
