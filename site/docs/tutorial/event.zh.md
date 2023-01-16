---
title: 事件属性 - Event
order: 9
---

5.x 版本中，F2 的事件系统也得以升级，基于 PointerEvent 标准监听封装了移动端事件。得益于底层引擎的事件系统以及拾取系统，F2 支持在图形标签上直接监听常见的移动端事件。

### 事件属性

| 事件名              | 类型    | 描述                       |
| ------------------- | ------- | -------------------------- |
| `onClick`           | funtion | 点击事件                   |
| `onPanStart`        | funtion | 手指触摸图形时触发 0       |
| `onPan`             | funtion | 手指在图形上移动时触发     |
| `onPanEnd`          | funtion | 手指从图形上离开时触发     |
| `onTouchStart`      | funtion | 手指触摸图形时触发         |
| `onTouchMove`       | funtion | 手指在图形上移动时触发     |
| `onTouchEnd`        | funtion | 手指从图形上离开时触发     |
| `onTouchEndOutside` | funtion | 手指从图形外离开时触发     |
| `onPressStart`      | funtion | 手指在图形上开始按压时触发 |
| `onPress`           | funtion | 手指在图形上按压时触发     |
| `onPressEnd`        | funtion | 手指在图形上结束按压时触发 |
| `onSwipe`           | funtion | 手指快扫时触发             |
| `onPinchStart`      | funtion | 手指开始缩放时触发         |
| `onPinch`           | funtion | 手指缩放时触发             |
| `onPinchEnd`        | funtion | 手指结束缩放时触发         |
