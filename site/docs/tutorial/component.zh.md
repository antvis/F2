---
title: 自定义组件
order: 9
---

F2 提供了完整的组件化能力，你可以创建自定义组件来扩展图表功能。组件结构基本保持和 React 一致，如果你了解 React，相信你一看就会。

## 为什么需要自定义组件

- **复用性**: 将常用的可视化元素封装成组件，在多处复用
- **模块化**: 将复杂的图表拆分成多个小组件，便于维护
- **扩展性**: 创建 F2 内置组件无法满足的特殊可视化需求

## 组件定义

### 基础结构

自定义组件需要继承 `Component` 基类并实现 `render` 方法：

```jsx
import { Component } from '@antv/f2';

class MyComponent extends Component {
  render() {
    const { props } = this;
    const { text, x, y } = props;
    return <text style={{ text, x, y }} />;
  }
}
```

### 完整生命周期

Component 提供完整的生命周期钩子：

```jsx
import { Component } from '@antv/f2';

class Hello extends Component {
  constructor(props) {
    super(props);
    // 初始化状态
    this.state = {
      count: 0,
    };
  }

  // 组件即将挂载
  willMount() {
    console.log('组件即将挂载');
  }

  // 组件挂载完成
  didMount() {
    console.log('组件已挂载');
    // 可以执行副作用操作，如动画、请求等
  }

  // 判断是否需要更新
  shouldUpdate(nextProps) {
    // 返回 false 跳过更新
    return true;
  }

  // 接收新属性
  willReceiveProps(nextProps) {
    console.log('即将接收新属性', nextProps);
  }

  // 组件即将更新
  willUpdate() {
    console.log('组件即将更新');
  }

  // 组件更新完成
  didUpdate() {
    console.log('组件已更新');
  }

  // 渲染组件
  render() {
    const { props, state } = this;
    const { color } = props;
    const { count } = state;
    return (
      <rect
        style={{
          x: 10,
          y: 10,
          width: 10,
          height: 10,
          fill: color,
        }}
      />
    );
  }

  // 组件即将卸载
  willUnmount() {
    console.log('组件即将卸载');
    // 清理资源，如取消事件监听等
  }

  // 组件卸载完成
  didUnmount() {
    console.log('组件已卸载');
  }
}
```

## 生命周期流程图

```
挂载阶段:
constructor() → willMount() → render() → didMount()

更新阶段:
willReceiveProps() → shouldUpdate() → willUpdate() → render() → didUpdate()

卸载阶段:
willUnmount() → didUnmount()
```

## 组件状态管理

### setState

使用 `setState` 更新组件状态：

```jsx
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick() {
    // 更新状态
    this.setState({
      count: this.state.count + 1,
    });

    // 或使用函数形式
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));

    // 可以传入回调函数
    this.setState(
      { count: this.state.count + 1 },
      () => {
        console.log('状态已更新', this.state.count);
      }
    );
  }

  render() {
    const { count } = this.state;
    return <text style={{ text: `Count: ${count}` }} />;
  }
}
```

### forceUpdate

强制组件更新，跳过 `shouldUpdate` 检查：

```jsx
class MyComponent extends Component {
  forceRefresh() {
    this.forceUpdate(() => {
      console.log('组件已强制更新');
    });
  }
}
```

## 组件属性

### 属性类型定义

使用 TypeScript 定义组件属性：

```tsx
interface MyComponentProps {
  title: string;
  value: number;
  color?: string;
}

class MyComponent extends Component<MyComponentProps> {
  render() {
    const { props } = this;
    const { title, value, color = 'red' } = props;
    return <text style={{ text: `${title}: ${value}`, fill: color }} />;
  }
}
```

### 默认属性值

```jsx
class MyComponent extends Component {
  static defaultProps = {
    color: 'red',
    size: 12,
  };

  render() {
    const { color, size } = this.props;
    return <text style={{ fill: color, fontSize: size }} />;
  }
}
```

## 使用上下文

组件可以通过 `this.context` 访问上下文信息：

```jsx
class ContextAwareComponent extends Component {
  didMount() {
    const { context } = this;
    const { px2hd, theme, layout } = context;

    // 像素单位转换
    const x = px2hd(100);

    // 访问主题
    const primaryColor = theme.primaryColor;

    // 访问布局信息
    const { width, height } = layout;
  }

  render() {
    const { context } = this;
    const { px2hd } = context;

    return (
      <text
        style={{
          x: px2hd(50),
          y: px2hd(50),
          text: 'Hello',
        }}
      />
    );
  }
}
```

### IContext 接口

| 属性 | 类型 | 说明 |
|------|------|------|
| `px2hd` | `(value: any) => any` | 像素单位转换函数 |
| `theme` | `Record<string, any>` | 主题配置对象 |
| `layout` | `{ left, top, width, height }` | 画布布局信息 |

## 组件使用

### 基础使用

```jsx
import { Canvas } from '@antv/f2';
import Hello from './hello';

<Canvas context={context}>
  <Hello color="red" />
</Canvas>
```

### 在图表中使用

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';
import DataLabel from './data-label';

<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
    <DataLabel field="sold" />
  </Chart>
</Canvas>
```

## 实用示例

### 数据标签组件

创建一个显示数据标签的组件：

```jsx
class DataLabel extends Component {
  render() {
    const { props, context } = this;
    const { data, xField, yField } = props;
    const { px2hd } = context;

    return (
      <group>
        {data.map((item) => {
          const x = px2hd(item[xField]);
          const y = px2hd(item[yField]);
          return (
            <text
              style={{
                text: String(item[yField]),
                x,
                y: y - 10,
                fill: '#000',
                fontSize: '12px',
                textAlign: 'center',
              }}
            />
          );
        })}
      </group>
    );
  }
}

// 使用
<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" />
    <DataLabel data={data} xField="genre" yField="sold" />
  </Chart>
</Canvas>
```

### 自定义图例组件

```jsx
class CustomLegend extends Component {
  render() {
    const { props } = this;
    const { items, onClick } = props;
    const { x = 10, y = 10 } = props;

    return (
      <group>
        {items.map((item, index) => (
          <g
            key={item.name}
            style={{
              transform: `translate(${x}, ${y + index * 30})`,
            }}
            onClick={() => onClick(item)}
          >
            <rect
              style={{
                width: 20,
                height: 20,
                fill: item.color,
              }}
            />
            <text
              style={{
                x: 30,
                y: 15,
                text: item.name,
              }}
            />
          </g>
        ))}
      </group>
    );
  }
}
```

### 条件渲染组件

```jsx
class ConditionalComponent extends Component {
  render() {
    const { props } = this;
    const { data, threshold } = props;

    const shouldRender = data.some(item => item.value > threshold);

    if (!shouldRender) {
      return null;
    }

    return <rect style={{ x: 0, y: 0, width: 100, height: 100, fill: 'red' }} />;
  }
}
```

### 动画组件

```jsx
class AnimatedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  didMount() {
    const { animate } = this.props;
    if (animate) {
      this.startAnimation();
    }
  }

  startAnimation() {
    let progress = 0;
    const timer = setInterval(() => {
      progress += 0.1;
      if (progress >= 1) {
        progress = 1;
        clearInterval(timer);
      }
      this.setState({ progress });
    }, 50);
  }

  render() {
    const { props, state } = this;
    const { progress } = state;
    const { maxValue } = props;

    const height = maxValue * progress;

    return (
      <rect
        style={{
          x: 0,
          y: 100 - height,
          width: 50,
          height,
          fill: 'blue',
        }}
      />
    );
  }

  willUnmount() {
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
```

## 组件通信

### 父子组件通信

```jsx
// 父组件
class ParentComponent extends Component {
  render() {
    return (
      <group>
        <ChildComponent
          data={this.props.data}
          onItemClick={this.handleItemClick}
        />
      </group>
    );
  }

  handleItemClick = (item) => {
    console.log('子组件被点击', item);
  };
}

// 子组件
class ChildComponent extends Component {
  render() {
    const { props } = this;
    const { data, onItemClick } = props;

    return (
      <group>
        {data.map((item) => (
          <rect
            key={item.id}
            style={{ x: item.x, y: item.y, width: 50, height: 50 }}
            onClick={() => onItemClick(item)}
          />
        ))}
      </group>
    );
  }
}
```

## 性能优化

### 使用 shouldUpdate

避免不必要的渲染：

```jsx
class OptimizedComponent extends Component {
  shouldUpdate(nextProps) {
    // 只有当关键属性变化时才更新
    return nextProps.value !== this.props.value;
  }

  render() {
    const { props } = this;
    return <text style={{ text: props.value }} />;
  }
}
```

### 避免在 render 中创建对象

```jsx
// 错误示例
class BadComponent extends Component {
  render() {
    const style = { color: 'red' }; // 每次渲染都创建新对象
    return <text style={style} />;
  }
}

// 正确示例
class GoodComponent extends Component {
  render() {
    return <text style={{ color: 'red' }} />;
  }
}
```

## 相关文档

- [Component API](/api/component.zh.md)
- [图形语法](/tutorial/grammar.zh.md)
- [图形属性](/tutorial/shape-attrs.zh.md)
