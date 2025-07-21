---
title: Shape 组件与图形标签
order: 2
---

Shape 组件用于自定义绘制各种基础图形（如 rect、circle、line、text 等），可灵活组合实现丰富的可视化效果。通过 `<text />` 元素，可以为自定义图形添加标签，实现数据标注、说明等功能。

## 代码演示

### 基础用法：为图形添加标签

- [基础图形标签](./demo/shape.jsx)：在自定义图形上添加文本标签。

```jsx
/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const Shape = () => (
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
    {/* 直接用 <text /> 添加标签 */}
    <text
      style={{
        x: 30,
        y: 35,
        text: '标签',
        fontSize: 14,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle',
      }}
    />
  </group>
);

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Shape />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## 使用场景

- 当前 f2 已有组件不满足，需要组合多种图形与文本，构建自定义图例、注释、装饰等
- withGuide、withLegend 等自定义场景
- 需要完全自定义标签内容和样式的场景

## 常用标签属性

- `x`, `y`：文本锚点坐标
- `text`：文本内容
- `fontSize`, `fill`, `fontWeight` 等：文本样式
- `textAlign`, `textBaseline`：对齐方式

更多属性详见：[Shape 图形属性](/tutorial/shape-attrs)
