---
title: 标签标注 - TagGuide
---

## Usage 用法

```jsx
import { TagGuide } from '@antv/f2';

<TagGuide
  records={[{ genre: 'Sports', sold: 5 }]}
  content="标签内容"
  direct="tr"
  background={{ fill: '#fff' }}
  textStyle={{ fill: '#000' }}
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
- **direct: string**  
  可选值：'tl' | 'tc' | 'tr' | 'cl' | 'cr' | 'bl' | 'bc' | 'br'
- **background: Attrs**  
  背景样式
- **triggerRef: any**  
  tagGuide 实例
- **textStyle: TextAttr**  
  文本样式
