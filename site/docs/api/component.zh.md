---
title: 组件 - Component
order: 1
redirect_from:
  - /zh/docs/api
---

Component 是 F2 的基础组件类，提供了完整的生命周期管理和状态管理能力。所有自定义组件都应该继承自 Component 类。

## 何时使用

- 需要创建自定义的可复用组件
- 需要管理组件内部状态
- 需要利用生命周期钩子控制渲染流程

## TypeScript 类型定义

```typescript
interface ComponentProps {
  /** 组件的层级索引 */
  zIndex?: number;
}

interface ComponentState {
  [key: string]: any;
}

interface IContext {
  /** 像素转换函数 */
  px2hd: (value: any) => any;
  /** 主题配置 */
  theme: Record<string, any>;
  /** 画布布局信息 */
  layout: LayoutProps;
  [key: string]: any;
}

interface LayoutProps {
  left: number;
  top: number;
  width: number;
  height: number;
  [key: string]: any;
}

class Component<P extends ComponentProps = ComponentProps, S = ComponentState> {
  /** 组件属性 */
  props: P;
  /** 组件状态 */
  state: S;
  /** 上下文对象 */
  context: IContext;
  /** 子组件引用 */
  refs: { [key: string]: Component };
  /** 更新器 */
  updater: Updater<S>;
  /** 容器 Group */
  container: Group;
  /** 布局信息 */
  layout: LayoutProps;
  /** 子组件 */
  children: VNode | VNode[] | null;
  /** 是否已挂载 */
  isMounted: boolean;
  /** 是否启用动画 */
  animate: boolean;
  /** 动画控制器 */
  animator: Animator;
  /** 是否已销毁 */
  destroyed: boolean;
  /** 虚拟 DOM 节点 */
  _vNode: VNode;

  constructor(props: P, context?: IContext);
  willMount(): void;
  didMount(): void;
  shouldUpdate(nextProps: P): boolean;
  willReceiveProps(nextProps: P, context?: IContext): void;
  willUpdate(): void;
  didUpdate(): void;
  render(): JSX.Element | null;
  willUnmount(): void;
  didUnmount(): void;
  setState(partialState: Partial<S>, callback?: () => void): void;
  forceUpdate(callback?: () => void): void;
  setAnimate(animate: boolean): void;
  destroy(): void;
}
```

## Usage

```jsx
import { Component, jsx } from '@antv/f2';

class MyComponent extends Component {
  willMount() {
    console.log('组件即将挂载');
  }

  didMount() {
    console.log('组件已挂载');
    this.setState({ count: 1 });
  }

  render() {
    const { state } = this;
    const { count = 0 } = state;
    return (
      <text
        style={{
          text: `Count: ${count}`,
          x: '50px',
          y: '50px',
        }}
      />
    );
  }
}
```

## 实例属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `props` | `P` | 组件的属性对象，由父组件传入 |
| `state` | `S` | 组件的状态对象，通过 setState 更新 |
| `context` | `IContext` | 组件上下文，包含 px2hd、theme、layout 等信息 |
| `refs` | `{ [key: string]: Component }` | 子组件引用集合 |
| `updater` | `Updater<S>` | 组件更新控制器 |
| `container` | `Group` | 组件的容器 Group 对象 |
| `layout` | `LayoutProps` | 组件的布局信息 |
| `children` | `VNode \| VNode[] \| null` | 组件的子节点 |
| `isMounted` | `boolean` | 组件是否已挂载 |
| `animate` | `boolean` | 是否启用动画 |
| `animator` | `Animator` | 动画控制器 |
| `destroyed` | `boolean` | 组件是否已销毁 |
| `_vNode` | `VNode` | 虚拟 DOM 节点 |

## 生命周期方法

### 挂载阶段

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `constructor` | `props: P, context?: IContext` | - | 构造函数，初始化组件实例 |
| `willMount` | - | `void` | 组件即将挂载时调用，在 render 之前执行 |
| `render` | - | `JSX.Element \| null` | 渲染组件，返回 JSX 元素或 null |
| `didMount` | - | `void` | 组件挂载完成后调用，可以访问 DOM 和执行副作用 |

### 更新阶段

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `willReceiveProps` | `nextProps: P, context?: IContext` | `void` | 组件接收新 props 时调用，在 willMount 之前执行 |
| `shouldUpdate` | `nextProps: P` | `boolean` | 判断组件是否需要更新，返回 false 跳过更新 |
| `willUpdate` | - | `void` | 组件即将更新时调用，在 render 之前执行 |
| `didUpdate` | - | `void` | 组件更新完成后调用 |

### 卸载阶段

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `willUnmount` | - | `void` | 组件即将卸载时调用，用于清理资源 |
| `didUnmount` | - | `void` | 组件卸载完成后调用 |

## 实例方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `setState` | `partialState: Partial<S>, callback?: () => void` | `void` | 更新组件状态，触发重新渲染 |
| `forceUpdate` | `callback?: () => void` | `void` | 强制组件更新，跳过 shouldUpdate 检查 |
| `setAnimate` | `animate: boolean` | `void` | 设置组件是否启用动画 |
| `destroy` | - | `void` | 销毁组件，清理资源 |

## IContext 接口

上下文对象提供组件运行时所需的环境信息：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `px2hd` | `(value: any) => any` | 像素单位转换函数，将 px 转换为高清屏单位 |
| `theme` | `Record<string, any>` | 主题配置对象 |
| `layout` | `LayoutProps` | 画布布局信息，包含 left、top、width、height |

## 用法示例

### 基础组件

创建一个简单的文本组件：

```jsx
import { Component, jsx } from '@antv/f2';

class TextComponent extends Component {
  render() {
    const { props } = this;
    const { text, x = 0, y = 0 } = props;
    return (
      <text
        style={{
          text,
          x,
          y,
          fill: '#000',
          fontSize: '24px',
        }}
      />
    );
  }
}
```

### 状态管理

使用 setState 管理组件状态：

```jsx
class Counter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      count: 0,
    };
  }

  didMount() {
    // 模拟状态更新
    setTimeout(() => {
      this.setState({ count: 1 });
    }, 1000);
  }

  render() {
    const { state } = this;
    const { count } = state;
    return (
      <text
        style={{
          text: `Count: ${count}`,
          x: '50px',
          y: '50px',
        }}
      />
    );
  }
}
```

### 生命周期钩子

使用生命周期方法控制渲染流程：

```jsx
class LifecycleComponent extends Component {
  willMount() {
    console.log('组件即将挂载');
  }

  didMount() {
    console.log('组件已挂载');
    // 可以在这里执行副作用，如事件绑定、数据请求等
  }

  willReceiveProps(nextProps) {
    console.log('组件接收新 props', nextProps);
  }

  shouldUpdate(nextProps) {
    // 只有当特定属性变化时才更新
    return nextProps.value !== this.props.value;
  }

  willUpdate() {
    console.log('组件即将更新');
  }

  didUpdate() {
    console.log('组件已更新');
  }

  willUnmount() {
    console.log('组件即将卸载');
    // 在这里清理资源，如解绑事件、清除定时器等
  }

  didUnmount() {
    console.log('组件已卸载');
  }

  render() {
    const { props } = this;
    const { value } = props;
    return (
      <text
        style={{
          text: String(value),
          x: '50px',
          y: '50px',
        }}
      />
    );
  }
}
```

### 使用上下文

访问和利用上下文信息：

```jsx
class ContextComponent extends Component {
  render() {
    const { context, props } = this;
    const { px2hd, theme, layout } = context;
    const { text } = props;

    // 使用 px2hd 转换单位
    const size = px2hd('24px');
    const { width, height } = layout;

    // 使用主题颜色
    const color = theme.color || '#000';

    return (
      <text
        style={{
          text,
          x: width / 2,
          y: height / 2,
          fill: color,
          fontSize: size,
        }}
      />
    );
  }
}
```

### 强制更新

使用 forceUpdate 强制组件更新：

```jsx
class ForceUpdateComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
    };
  }

  didMount() {
    // 模拟外部数据变化
    setTimeout(() => {
      this.state.data.push({ value: 1 });
      // 跳过 shouldUpdate 检查，强制更新
      this.forceUpdate();
    }, 1000);
  }

  render() {
    const { state } = this;
    const { data } = state;
    return (
      <text
        style={{
          text: `Data length: ${data.length}`,
          x: '50px',
          y: '50px',
        }}
      />
    );
  }
}
```

### 动画控制

使用 setAnimate 控制组件动画：

```jsx
class AnimatedComponent extends Component {
  didMount() {
    // 禁用动画
    this.setAnimate(false);
  }

  render() {
    const { props } = this;
    const { x, y } = props;
    return (
      <rect
        style={{
          x,
          y,
          width: '100px',
          height: '100px',
          fill: 'red',
        }}
      />
    );
  }
}
```

### 条件渲染

根据状态或属性进行条件渲染：

```jsx
class ConditionalComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: true,
    };
  }

  didMount() {
    // 2秒后隐藏组件
    setTimeout(() => {
      this.setState({ visible: false });
    }, 2000);
  }

  render() {
    const { state, props } = this;
    const { visible } = state;
    const { text } = props;

    if (!visible) {
      return null;
    }

    return (
      <text
        style={{
          text,
          x: '50px',
          y: '50px',
        }}
      />
    );
  }
}
```

### 与图表结合

在图表中使用自定义组件：

```jsx
import { Chart, Component, jsx } from '@antv/f2';

// 自定义数据标签组件
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
                text: String(item.value),
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

// 使用自定义组件
const App = () => {
  const data = [
    { genre: 'Action', value: 100 },
    { genre: 'Comedy', value: 80 },
  ];

  return (
    <Canvas pixelRatio={window.devicePixelRatio}>
      <Chart data={data}>
        <interval x="genre" y="value" />
        <DataLabel data={data} xField="genre" yField="value" />
      </Chart>
    </Canvas>
  );
};
```

## ComponentProps 属性

Component 基类支持的属性：

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `zIndex` | `number` | `0` | 组件的层级索引，用于控制渲染顺序，值越大越靠前 |

## 常见问题

### setState 更新后看不到变化

确保在 render 方法中使用 `this.state` 而不是 `this.props`。setState 是异步的，如果需要在状态更新后执行操作，可以使用回调函数：

```jsx
this.setState({ count: 1 }, () => {
  console.log('状态已更新', this.state.count);
});
```

### 组件不更新

检查 `shouldUpdate` 方法是否返回了 `false`。如果实现了 shouldUpdate，确保在需要更新时返回 true。

### 内存泄漏

在 `willUnmount` 中清理所有副作用，包括：

- 解绑事件监听器
- 清除定时器
- 取消网络请求

```jsx
willUnmount() {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.handler) {
    window.removeEventListener('resize', this.handler);
  }
}
```

### 访问不到最新状态

由于 setState 是异步的，在回调或事件处理函数中访问状态时可能获取的不是最新值。可以使用函数式 setState：

```jsx
this.setState((prevState) => ({
  count: prevState.count + 1,
}));
```

## 最佳实践

1. **在 constructor 中初始化状态**：避免在 render 或其他方法中直接修改 state
2. **使用 setState 更新状态**：永远不要直接修改 this.state
3. **合理使用 shouldUpdate**：对于性能敏感的场景，可以通过 shouldUpdate 优化渲染
4. **及时清理资源**：在 willUnmount 中清理所有副作用
5. **避免在 render 中执行副作用**：副作用操作应该放在 didMount 或 didUpdate 中
6. **使用 context 访问环境信息**：通过 context 获取 px2hd、theme 等信息，而不是直接引入
