

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
    const exData = {
      targetTouches: [ options ],
      touches: [ options ],
      changedTouches: [ options ]
    };
    dispatchEvent(dom, eventType, exData);
    return;
  }

  if (eventType === 'press') {
    const exData = {
      targetTouches: [ options ],
      touches: [ options ],
      changedTouches: [ options ]
    };
    dispatchEvent(dom, 'touchstart', exData);
    await delay(270);
    dispatchEvent(dom, 'touchend', exData);
    return;
  }

  if (eventType === 'tap') {
    const exData = {
      targetTouches: [ options ],
      touches: [ options ],
      changedTouches: [ options ]
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

export {
  dispatchEvent,
  gestureSimulator
};
