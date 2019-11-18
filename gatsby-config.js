const { repository } = require('./package.json');

const mobilePlayGround = `
  <style>
    .mobile-container {
      width: 395px !important;
      height: 590px;
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JAxcjwaQvIsAWvXUrjbY.png);
      background-size: 100%;
      background-repeat: no-repeat;
      overflow: hidden;
    }
    .mobile-header {
      height: 64px;
      overflow: hidden;
    }
    .mobile-content {
      margin: 15px 10px;
      background-color: #fff;
    }
    .mobile-content canvas {
      display: block;
      width: 375px;
      height: 260px;
    }
  </style>
  <div class="mobile-container">
    <div class="mobile-header"></div>
    <div class="mobile-content">
      <canvas id="container"/>
    </div>
  </div>
`;

const playgroundDidMount = `
/**
 * 模拟移动端 touch 事件
 */
var eventTarget

// polyfills
if (!document.createTouch) {
  document.createTouch = function(view, target, identifier, pageX, pageY, screenX, screenY) {
    // auto set
    return new Touch(
      target,
      identifier,
      {
        pageX: pageX,
        pageY: pageY,
        screenX: screenX,
        screenY: screenY,
        clientX: pageX - window.pageXOffset,
        clientY: pageY - window.pageYOffset
      },
      0,
      0
    )
  }
}

if (!document.createTouchList) {
  document.createTouchList = function() {
    var touchList = TouchList()
    for (var i = 0; i < arguments.length; i++) {
      touchList[i] = arguments[i]
    }
    touchList.length = arguments.length
    return touchList
  }
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

var Touch = function Touch(target, identifier, pos, deltaX, deltaY) {
  deltaX = deltaX || 0
  deltaY = deltaY || 0

  this.identifier = identifier
  this.target = target
  this.clientX = pos.clientX + deltaX
  this.clientY = pos.clientY + deltaY
  this.screenX = pos.screenX + deltaX
  this.screenY = pos.screenY + deltaY
  this.pageX = pos.pageX + deltaX
  this.pageY = pos.pageY + deltaY
}

/**
 * create empty touchlist with the methods
 * @constructor
 * @returns touchList
 */
function TouchList() {
  var touchList = []

  touchList['item'] = function(index) {
    return this[index] || null
  }

  // specified by Mozilla
  touchList['identifiedTouch'] = function(id) {
    return this[id + 1] || null
  }

  return touchList
}

/**
 * Simple trick to fake touch event support
 * this is enough for most libraries like Modernizr and Hammer
 */
function fakeTouchSupport() {
  var objs = [window, document.documentElement]
  var props = ['ontouchstart', 'ontouchmove', 'ontouchcancel', 'ontouchend']

  for (var o = 0; o < objs.length; o++) {
    for (var p = 0; p < props.length; p++) {
      if (objs[o] && objs[o][props[p]] === undefined) {
        objs[o][props[p]] = null
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
  return function(ev) {
    // prevent mouse events

    if (ev.which !== 1) {
      return
    }

    // The EventTarget on which the touch point started when it was first placed on the surface,
    // even if the touch point has since moved outside the interactive area of that element.
    // also, when the target doesnt exist anymore, we update it
    if (ev.type === 'mousedown' || !eventTarget || (eventTarget && !eventTarget.dispatchEvent)) {
      eventTarget = ev.target
    }

    triggerTouch(touchType, ev)

    // reset
    if (ev.type === 'mouseup') {
      eventTarget = null
    }
  }
}

/**
 * trigger a touch event
 * @param eventName
 * @param mouseEv
 */
function triggerTouch(eventName, mouseEv) {
  var touchEvent = document.createEvent('Event')
  touchEvent.initEvent(eventName, true, true)

  touchEvent.altKey = mouseEv.altKey
  touchEvent.ctrlKey = mouseEv.ctrlKey
  touchEvent.metaKey = mouseEv.metaKey
  touchEvent.shiftKey = mouseEv.shiftKey

  touchEvent.touches = getActiveTouches(mouseEv)
  touchEvent.targetTouches = getActiveTouches(mouseEv)
  touchEvent.changedTouches = createTouchList(mouseEv)

  eventTarget.dispatchEvent(touchEvent)
}

/**
 * create a touchList based on the mouse event
 * @param mouseEv
 * @returns {TouchList}
 */
function createTouchList(mouseEv) {
  var touchList = TouchList()
  touchList.push(new Touch(eventTarget, 1, mouseEv, 0, 0))
  return touchList
}

/**
 * receive all active touches
 * @param mouseEv
 * @returns {TouchList}
 */
function getActiveTouches(mouseEv) {
  // empty list
  if (mouseEv.type === 'mouseup') {
    return TouchList()
  }
  return createTouchList(mouseEv)
}

/**
 * TouchEmulator initializer
 */
function TouchEmulator() {
  fakeTouchSupport()

  window.addEventListener('mousedown', onMouse('touchstart'), true)
  window.addEventListener('mousemove', onMouse('touchmove'), true)
  window.addEventListener('mouseup', onMouse('touchend'), true)
}

// start distance when entering the multitouch mode
TouchEmulator['multiTouchOffset'] = 75

new TouchEmulator();
`;

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        // eslint-disable-next-line quotes
        GATrackingId: `UA-148148901-6`,
        pathPrefix: '/f2'
      }
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: 'F2',
    description: 'The Grammar of Graphics in JavaScript',
    githubUrl: repository.url,
    navs: [
      {
        slug: 'docs/tutorial/getting-started',
        title: {
          zh: '使用教程',
          en: 'Tutorial'
        }
      },
      {
        slug: 'docs/api',
        title: {
          zh: 'API 文档',
          en: 'API'
        }
      },
      {
        slug: 'examples',
        title: {
          zh: '图表演示',
          en: 'Examples'
        }
      }
    ],
    docs: [
      {
        slug: 'tutorial/manual',
        title: {
          zh: '教程',
          en: 'Tutorial'
        },
        order: 1
      },
      {
        slug: 'api/chart-api',
        title: {
          zh: '图表实例',
          en: 'Chart'
        },
        order: 1
      },
      {
        slug: 'api/graphic',
        title: {
          zh: '绘图',
          en: 'Chart'
        },
        order: 5
      }
    ],
    examples: [
      {
        slug: 'gallery',
        icon: 'gallery', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: 'Gallery',
          en: 'Gallery'
        }
      },
      {
        slug: 'line',
        icon: 'line', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '折线图',
          en: 'Line Charts'
        }
      },
      {
        slug: 'area',
        icon: 'area', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '面积图',
          en: 'Area Charts'
        }
      },
      {
        slug: 'column',
        icon: 'column', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '柱状图',
          en: 'Column Charts'
        }
      },
      {
        slug: 'bar',
        icon: 'bar', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '条形图',
          en: 'Bar Charts'
        }
      },
      {
        slug: 'pie',
        icon: 'pie', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '饼图',
          en: 'Pie Charts'
        }
      },
      {
        slug: 'radar',
        icon: 'radar', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '雷达图',
          en: 'Radar Charts'
        }
      },
      {
        slug: 'point',
        icon: 'point', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '点图',
          en: 'Point Charts'
        }
      },
      {
        slug: 'candlestick',
        icon: 'candlestick', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '蜡烛图',
          en: 'Candlestick Charts'
        }
      },
      {
        slug: 'relation',
        icon: 'relation', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '关系图',
          en: 'Relation Charts'
        }
      },
      {
        slug: 'heatmap',
        icon: 'heatmap', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '关系图',
          en: 'Heatmap Charts'
        }
      },
      {
        slug: 'other',
        icon: 'other',
        title: {
          zh: '其他图表',
          en: 'Other Chart'
        }
      }
    ],
    playground: {
      playgroundDidMount,
      container: mobilePlayGround
    }
  }
};
