---
title: 自定义 View
order: 1
---

在 F2 中， 为了让显示更加灵活和自定义，我们把所有的组件都进行了高阶组件（HOC）的封装，形成了 `withXXX` 的逻辑封装，下面以 `Legend` 为例，来演示下如何实现自定义 view

## Legend 的使用

```jsx
import { Canvas, Chart, Legend } from '@antv/f2';

<Canvas context={context}>
  <Chart data={data}>
    ...
    <Legend position="top" />
    ...
  </Chart>
</Canvas>;
```

上面这个使用大家应该都不陌生，但是除了 `Legend` 之外，还是有 `withLegend` 和 `LegendView` 这 2 个对象，而 `Legend = withLegend(LegendView)`, 所以我们只要定义自己的 `LegendView` 就能达到自定义 View 的效果

## 定义 view

```jsx
const CustomLegendView = (props) => {
  const { items } = props;
  return (
    <group
      style={{
        flexDirection: 'row',
      }}
    >
      {items.map((item) => {
        const { name, color } = item;
        return (
          <text
            attrs={{
              text: name,
              fill: color,
            }}
          />
        );
      })}
    </group>
  );
};
```

## 使用自定义 view

```jsx
import { Canvas, Chart, withLegend } from '@antv/f2';

// 自定义 View
const CustomLegendView = (props) => {
  const { items } = props;
  return (
    <group
      style={{
        flexDirection: 'row',
      }}
    >
      {items.map((item) => {
        const { name, color } = item;
        return (
          <text
            attrs={{
              text: name,
              fill: color,
            }}
          />
        );
      })}
    </group>
  );
};

// 使用自定义 view 的组件
const Legend = withLegend(CustomLegendView);

<Canvas context={context}>
  <Chart data={data}>
    ...
    <Legend position="top" />
    ...
  </Chart>
</Canvas>;
```

## 完整示例

- [自定义 Legend](/zh/examples/component/legend#custom)
