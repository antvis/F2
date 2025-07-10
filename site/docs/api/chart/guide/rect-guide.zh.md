---
title: 矩形标注 - RectGuide
---

## Usage 用法

```jsx
import { RectGuide } from '@antv/f2';

<RectGuide
  records={[{ genre: 'min', sold: 'min' }，{ genre: 'max', sold: 'max' }]}
  style={{ stroke: '#f00', lineWidth: 2 }}
  offsetX={0}
  offsetY={0}
/>;
```

## Props

- **records: Array**  
  矩形两个顶点对应的位置
- **offsetX: number**  
  x 轴偏移量
- **offsetY: number**  
  y 轴偏移量
- **style**  
  rect 样式
