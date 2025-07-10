---
title: 文本标注 - TextGuide
---

## Usage 用法

```jsx
import { TextGuide } from '@antv/f2';

<TextGuide
  records={[{ genre: 'Sports', sold: 5 }]}
  content="文本内容"
  offsetX={-15}
  offsetY={-20}
  style={{ fill: '#000', fontSize: '24px' }}
/>;
```

## Props

- **records: Array**  
  标注的数据项或比例值
- **content: string**  
  文本内容
- **offsetX: number**  
  x 轴偏移量
- **offsetY: number**  
  y 轴偏移量
- **style**  
  文本样式
