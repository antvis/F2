---
title: 在 TypeScript 中使用
order: 10
---

在 TypeScript 中使用和在 JavaScript 中使用并没有任何区别，不过为了享受到严格的类型提示以及友好的自动补全，有以下建议：

## 创建 Chart 实例时传入数据记录的类型

```typescript
import F2 from '@antv/f2';

const data = [
  { name: 'a', value: 10 },
  { name: 'b', value: 5 },
]

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
})
```

## 数据映射时使用数组形式

```typescript
import F2 from '@antv/f2';

const data = [
  { name: 'a', value: 10 },
  { name: 'b', value: 5 },
]

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
})

// 数组形式可得到字段自动提示
chart.line().position(['name', 'value'])
```
