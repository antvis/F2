require('../site/global.less');

if (typeof window != 'undefined' && window) {
  window.f2 = require('../src/f2').default;
  window.f2React = require('../src/f2-react').default;
  window.React = require('react');
  window.ReactDOM = require('react-dom');
  window.gPluginRoughCanvasRenderer = require('@antv/g-plugin-rough-canvas-renderer');
  (window as any).lilGui = window.lil;
  (window as any).stats = require('stats.js');
  (window as any).InsertCss = require('insert-css');
  console.log((window as any).InsertCss);
  // window.f2 = require('./src/index-all.js');
  // window.DataSet = require('@antv/data-set');
  window.lodash = require('lodash');
  // window.$ = require('jquery');

  /* eslint-disable */
  window.initPlayground = () => {
    /**
     * 模拟移动端 touch 事件
     */
    var eventTarget;

    // polyfills
    if (!document.createTouch) {
      document.createTouch = function (view, target, identifier, pageX, pageY, screenX, screenY) {
        // auto set
        return CreatTouch(
          target,
          identifier,
          {
            pageX: pageX,
            pageY: pageY,
            screenX: screenX,
            screenY: screenY,
            clientX: pageX - window.pageXOffset,
            clientY: pageY - window.pageYOffset,
          },
          0,
          0
        );
      };
    }

    if (!document.createTouchList) {
      document.createTouchList = function () {
        var touchList = TouchList();
        for (var i = 0; i < arguments.length; i++) {
          touchList[i] = arguments[i];
        }
        touchList.length = arguments.length;
        return touchList;
      };
    }

    /**
     * create an touch point
     * @constructor
     * @param target
     * @param identifier
     * @param pos
     * @param deltaX
     * @param deltaY
     * @returns {Object} touchPoint
     */

    var CreatTouch = function creatTouch(target, identifier, pos, deltaX, deltaY) {
      deltaX = deltaX || 0;
      deltaY = deltaY || 0;

      return new Touch({
        clientX: pos.clientX + deltaX,
        clientY: pos.clientY + deltaY,
        target,
        identifier,
      });
    };

    /**
     * create empty touchlist with the methods
     * @constructor
     * @returns touchList
     */
    function TouchList() {
      var touchList = [];

      touchList['item'] = function (index) {
        return this[index] || null;
      };

      // specified by Mozilla
      touchList['identifiedTouch'] = function (id) {
        return this[id + 1] || null;
      };

      return touchList;
    }

    /**
     * Simple trick to fake touch event support
     * this is enough for most libraries like Modernizr and Hammer
     */
    function fakeTouchSupport() {
      var objs = [window, document.documentElement];
      var props = ['ontouchstart', 'ontouchmove', 'ontouchcancel', 'ontouchend'];

      for (var o = 0; o < objs.length; o++) {
        for (var p = 0; p < props.length; p++) {
          if (objs[o] && objs[o][props[p]] === undefined) {
            objs[o][props[p]] = null;
          }
        }
      }
    }

    /**
     * only trigger touches when the left mousebutton has been pressed
     * @param touchType
     * @returns {Function}
     */
    function onMouse(touchType) {
      return function (ev) {
        // prevent mouse events

        if (ev.which !== 1) {
          return;
        }

        // The EventTarget on which the touch point started when it was first placed on the surface,
        // even if the touch point has since moved outside the interactive area of that element.
        // also, when the target doesnt exist anymore, we update it
        if (
          ev.type === 'mousedown' ||
          !eventTarget ||
          (eventTarget && !eventTarget.dispatchEvent)
        ) {
          eventTarget = ev.target;
        }

        triggerTouch(touchType, ev);

        // reset
        if (ev.type === 'mouseup') {
          eventTarget = null;
        }
      };
    }

    /**
     * trigger a touch event
     * @param eventName
     * @param mouseEv
     */
    function triggerTouch(eventName, mouseEv) {
      var touchEvent = document.createEvent('Event');
      touchEvent.initEvent(eventName, true, true);

      touchEvent.altKey = mouseEv.altKey;
      touchEvent.ctrlKey = mouseEv.ctrlKey;
      touchEvent.metaKey = mouseEv.metaKey;
      touchEvent.shiftKey = mouseEv.shiftKey;

      touchEvent.targetTouches = getActiveTouches(mouseEv);
      touchEvent.touches = getActiveTouches(mouseEv);
      touchEvent.changedTouches = createTouchList(mouseEv);
      eventTarget.dispatchEvent(new TouchEvent(eventName, touchEvent));
    }

    /**
     * create a touchList based on the mouse event
     * @param mouseEv
     * @returns {TouchList}
     */
    function createTouchList(mouseEv) {
      var touchList = TouchList();
      touchList.push(CreatTouch(eventTarget, 1, mouseEv, 0, 0));
      return touchList;
    }

    /**
     * receive all active touches
     * @param mouseEv
     * @returns {TouchList}
     */
    function getActiveTouches(mouseEv) {
      // empty list
      if (mouseEv.type === 'mouseup') {
        return TouchList();
      }
      return createTouchList(mouseEv);
    }

    /**
     * TouchEmulator initializer
     */
    function TouchEmulator() {
      fakeTouchSupport();

      window.addEventListener('mousedown', onMouse('touchstart'), true);
      window.addEventListener('mousemove', onMouse('touchmove'), true);
      window.addEventListener('mouseup', onMouse('touchend'), true);
    }

    // start distance when entering the multitouch mode
    TouchEmulator['multiTouchOffset'] = 75;

    new TouchEmulator();
  };
}
