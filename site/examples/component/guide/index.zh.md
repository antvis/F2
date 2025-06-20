---
title: 标注
order: 0
---

标注组件用于在图表中添加各种辅助标记和说明信息，帮助用户更好地理解和解读图表数据。通过添加文本、线条、图像等标注元素，可以突出重要信息点，提供额外的上下文说明。

## 代码演示

### 基础示例

- [文本标注](./demo/text.jsx)：在图表中添加文本标注信息。

```jsx
import { jsx, Canvas, Chart, Guide } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Guide>
        <Guide.Text
          position={['50%', '50%']}
          content="标注文本"
          style={{
            fill: '#999',
            fontSize: '12px',
            textAlign: 'center',
          }}
        />
      </Guide>
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [点标注](./demo/point.jsx)：添加点标记标注。
- [线标注](./demo/line.jsx)：添加线条标注。
- [自定义标注](./demo/custom.jsx)：自定义样式的标注组件。
- [图像标注](./demo/image.jsx)：使用图像作为标注。
- [阶梯线标注](./demo/linestep.jsx)：阶梯形线条标注。
- [动画标注](./demo/lottie.jsx)：带有动画效果的标注。

## 使用场景

标注组件适用于以下场景：

1. 突出显示关键数据点
2. 添加图表说明和注释
3. 标记异常值或特殊事件
4. 提供额外的上下文信息
