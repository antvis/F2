---
title: 组件介绍 - Component
order: 9
---

组件结构基本保持和 React 一致，如果你了解 React ，相信你一看就会

## 组件定义

```jsx
import { Component } from '@antv/f2';

class Hello extends Component {
  constructor(props) {
    super(props);
  }
  willMount() {}
  didMount() {}
  shouldUpdate() {
    return true;
  }
  willReceiveProps(props) {}
  willUpdate() {}
  didUpdate() {}
  render() {
    const { color } = this.props;
    return <rect attrs={{ x: 10, y: 10, width: 10, height: 10, fill: color }} />;
  }
  didUnmount() {}
}
```

## 组件使用

```jsx
import { Canvas } from '@antv/f2';
import Hello from './hello';

<Canvas>
  <Hello color="red" />
</Canvas>;
```
