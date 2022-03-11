---
title: 时间轴 - Timeline
order: 3
redirect_from:
  - /zh/docs/api
---

提供组件事件播放的控制

## Usage

```jsx
import { Timeline, Canvas, Component } from '@antv/f2';

<Canvas context={context}>
  <Timeline delay={0}>
    <Component />
    <Component />
    ...
  </Timeline>
</Canvas>;
```

## Props

### delay: number

组件播放的间隔时间
