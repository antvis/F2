F2 的 算法库

常用算法扩展包

## Usage

```jsx
import dataSample from '@antv/f2-algorithm';

const sampleData = dataSample({
  data,
  sampling: 'nearest',
  rate: 7,
});

<Canvas pixelRatio={1}>
  <Chart data={sampleData}>
    <Line x="date" y="value" />
  </Chart>
</Canvas>;
```
