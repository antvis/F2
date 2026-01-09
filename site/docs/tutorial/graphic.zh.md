---
title: 图形使用 - JSX
order: 9
---

在 F2 里，可以利用 JSX 和[图形标签 Shape](/tutorial/shape.zh.md)更方便构造自定义图形。

## 基础用法

### 创建自定义图形

```jsx
/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const Hello = () => {
  return (
    <group>
      <rect
        style={{
          x: 10,
          y: 10,
          width: 40,
          height: 40,
          lineWidth: '2px',
          stroke: '#000',
          fill: 'red',
        }}
      />
      <circle
        style={{
          cx: 80,
          cy: 30,
          r: 20,
          lineWidth: '2px',
          stroke: '#000',
          fill: 'red',
        }}
      />
      <text
        style={{
          x: 120,
          y: 30,
          text: '文本',
          fontSize: 20,
          fill: '#000',
        }}
      />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Hello />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

以上就可以利用标签绘制各种自定义元素。

## 使用组件

假如想让自定义图形走组件 Component 渲染，拥有生命周期，可以监测数据变化，可以参考[组件介绍](/tutorial/component.zh.md)。

### 使用 Class 组件

```jsx
/** @jsx jsx */
import { jsx, Canvas, Component } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

class CustomShape extends Component {
  render() {
    const { x, y, color } = this.props;
    return (
      <group>
        <rect
          style={{
            x,
            y,
            width: 50,
            height: 50,
            fill: color,
          }}
        />
        <text
          style={{
            x: x + 15,
            y: y + 30,
            text: '自定义',
            fontSize: 14,
            fill: '#fff',
          }}
        />
      </group>
    );
  }
}

const Page = () => {
  return (
    <group>
      <CustomShape x={10} y={10} color="#1890ff" />
      <CustomShape x={80} y={10} color="#f5222d" />
      <CustomShape x={150} y={10} color="#52c41a" />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Page />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 使用函数组件

```jsx
/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const CustomRect = ({ x, y, width, height, color, text }) => {
  return (
    <group>
      <rect
        style={{
          x,
          y,
          width,
          height,
          fill: color,
          stroke: '#000',
          lineWidth: 2,
        }}
      />
      <text
        style={{
          x: x + width / 2 - 20,
          y: y + height / 2,
          text,
          fontSize: 16,
          fill: '#fff',
        }}
      />
    </group>
  );
};

const App = () => {
  return (
    <group>
      <CustomRect x={10} y={10} width={80} height={50} color="#1890ff" text="蓝色" />
      <CustomRect x={110} y={10} width={80} height={50} color="#f5222d" text="红色" />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <App />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## 传递数据

### 通过 props 传递数据

```jsx
/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const Bar = ({ data, index, x }) => {
  const { name, value } = data;
  const height = value * 2;
  const y = 200 - height;

  return (
    <group>
      <rect
        style={{
          x,
          y,
          width: 40,
          height,
          fill: index % 2 === 0 ? '#1890ff' : '#f5222d',
        }}
      />
      <text
        style={{
          x: x + 10,
          y: y - 10,
          text: `${value}`,
          fontSize: 12,
          fill: '#000',
        }}
      />
      <text
        style={{
          x: x + 5,
          y: 220,
          text: name,
          fontSize: 12,
          fill: '#666',
        }}
      />
    </group>
  );
};

const Chart = ({ data }) => {
  return (
    <group>
      {data.map((item, index) => (
        <Bar key={index} data={item} index={index} x={10 + index * 60} />
      ))}
    </group>
  );
};

const data = [
  { name: 'A', value: 30 },
  { name: 'B', value: 50 },
  { name: 'C', value: 40 },
  { name: 'D', value: 60 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} width={400} height={300}>
    <Chart data={data} />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 使用 state 管理状态

```jsx
/** @jsx jsx */
import { jsx, Canvas, Component } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

class InteractiveShape extends Component {
  state = {
    color: '#1890ff',
    scale: 1,
  };

  handleClick = () => {
    this.setState({
      color: this.state.color === '#1890ff' ? '#f5222d' : '#1890ff',
    });
  };

  render() {
    const { x, y } = this.props;
    const { color, scale } = this.state;
    const size = 50 * scale;

    return (
      <group
        style={{
          x,
          y,
          cursor: 'pointer',
        }}
        onTap={this.handleClick}
      >
        <rect
          style={{
            x: -size / 2,
            y: -size / 2,
            width: size,
            height: size,
            fill: color,
          }}
        />
        <text
          style={{
            x: -15,
            y: 5,
            text: '点击',
            fontSize: 14,
            fill: '#fff',
          }}
        />
      </group>
    );
  }
}

const Page = () => {
  return (
    <group>
      <InteractiveShape x={100} y={100} />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} width={300} height={300}>
    <Page />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## 使用坐标变换

### 旋转和缩放

```jsx
/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const RotatedRect = ({ x, y, angle, color }) => {
  return (
    <group
      style={{
        x,
        y,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <rect
        style={{
          x: -25,
          y: -25,
          width: 50,
          height: 50,
          fill: color,
        }}
      />
    </group>
  );
};

const App = () => {
  return (
    <group>
      <RotatedRect x={100} y={100} angle={0} color="#1890ff" />
      <RotatedRect x={200} y={100} angle={45} color="#f5222d" />
      <RotatedRect x={300} y={100} angle={90} color="#52c41a" />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} width={400} height={300}>
    <App />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## 使用渐变和纹理

### 线性渐变

```jsx
/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const GradientRect = () => {
  return (
    <rect
      style={{
        x: 50,
        y: 50,
        width: 200,
        height: 100,
        fill: 'linear-gradient(90deg, #1890ff, #f5222d)',
      }}
    />
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} width={300} height={200}>
    <GradientRect />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 径向渐变

```jsx
/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const GradientCircle = () => {
  return (
    <circle
      style={{
        cx: 150,
        cy: 100,
        r: 80,
        fill: 'radial-gradient(circle at center, #fff, #1890ff)',
      }}
    />
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} width={300} height={200}>
    <GradientCircle />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## 与图表结合

### 自定义图表元素

```jsx
/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const Page = () => {
  return (
    <Chart data={data} scale={{ sold: { min: 0 } }}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" />
      {/* 自定义标题 */}
      <text
        style={{
          x: 150,
          y: 30,
          text: '游戏销量统计',
          fontSize: 18,
          fill: '#000',
          textAlign: 'center',
        }}
      />
    </Chart>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} width={300} height={300}>
    <Page />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## 常见问题

### 如何让自定义图形支持交互？

在 group 或图形标签上添加事件处理器：

```jsx
<group
  style={{ cursor: 'pointer' }}
  onTap={() => console.log('点击了图形')}
  onPress={() => console.log('按住了图形')}
>
  <rect style={{ x: 10, y: 10, width: 50, height: 50, fill: 'blue' }} />
</group>
```

### 如何让自定义图形具有动画效果？

使用 `animation` 属性：

```jsx
<rect
  style={{
    x: 10,
    y: 10,
    width: 50,
    height: 50,
    fill: 'blue',
    animation: {
      appear: {
        easing: 'linear',
        duration: 1000,
        property: ['y', 'height'],
        start: { y: 200, height: 0 },
        end: { y: 10, height: 50 },
      },
    },
  }}
/>
```

### 如何在自定义图形中使用图表的计算逻辑？

参考 [自定义 View](/tutorial/advanced/custom-view.md)。

## 相关文档

- [图形标签](/tutorial/shape.zh.md)
- [绘图属性](/tutorial/shape-attrs.zh.md)
- [图形动画](/tutorial/animation.zh.md)
- [图形事件](/tutorial/event.zh.md)
- [组件介绍](/tutorial/component.zh.md)
- [自定义 View](/tutorial/advanced/custom-view.md)
