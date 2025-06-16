---
title: 辅助线标注 - LineGuide
---

## 用法

```jsx
import { LineGuide } from '@antv/f2';

<LineGuide
  records={[{ genre: 'min', sold: 'max' }]}
  style={{ stroke: '#f00', lineWidth: 2 }}
  offsetX={0}
  offsetY={0}
/>
```

## Props

- **records: Array**  
  标注的数据项或比例值
- **offsetX: number**  
  x 轴偏移量
- **offsetY: number**  
  y 轴偏移量
- **style**  
  线样式