---
title: 图片标注 - ImageGuide
---

## Usage 用法

```jsx
import { ImageGuide } from '@antv/f2';

<ImageGuide
  records={[{ genre: 'Sports', sold: 5 }]}
  src="https://example.com/image.png"
  attrs={{ width: 24, height: 24 }}
  offsetX={0}
  offsetY={0}
/>;
```

## Props

- **records: Array**  
  标注的数据项或比例值
- **src: string**  
  图片地址
- **attrs**  
  图片属性
- **offsetX: number**  
  x 轴偏移量
- **offsetY: number**  
  y 轴偏移量
