---
title: 标注
order: 0
---

标注组件用于在图表中添加各种辅助标记和说明信息，帮助用户更好地理解和解读图表数据。通过添加文本、线条、图像等标注元素，可以突出重要信息点，提供额外的上下文说明。

## 代码演示

### 基础示例

- [文本标注](./demo/text.jsx)：在图表中添加文本标注信息。

  ```jsx
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Interval x="genre" y="sold" />
      {data.map((item) => {
        const { sold } = item;
        return (
          <TextGuide
            records={[item]}
            onClick={(ev) => {
              console.log('ev: ', ev.points);
            }}
            content={`${sold}`}
            style={{
              fill: '#000',
              fontSize: '24px',
            }}
            offsetY={-20}
            offsetX={-15}
          />
        );
      })}
    </Chart>
  </Canvas>
  ```

- [点标注](./demo/point.jsx)：添加点标记标注。

  ```jsx
  <PointGuide
    records={[{ x: '2024-01', y: 200 }]}
    style={{
      r: 4,
      fill: '#FF5733',
      stroke: '#fff',
      lineWidth: 2,
    }}
  />
  ```

- [线标注](./demo/line.jsx)：添加线条标注。

  ```jsx
  <LineGuide
    records={[
      { genre: 'min', sold: '50%' },
      { genre: 'max', sold: '50%' },
    ]}
    style={{
      stroke: '#1890FF',
      lineWidth: 2,
      lineDash: [4, 4],
    }}
  />
  ```

- [矩形标注](./demo/rect.jsx)：在图表中添加矩形面积。

  ```jsx
  <RectGuide
    records={[data[0], data[1]]}
    style={{ fill: 'yellow', fillOpacity: 0.5 }}
    offsetX="-24px"
    offsetY="24px"
  />
  ```

- [图像标注](./demo/image.jsx)：使用图像作为标注。

  ```jsx
  <ImageGuide
    records={[{ x: '2024-01', y: 200 }]}
    src="https://example.com/icon.png"
    width={24}
    height={24}
  />
  ```

- [标记标注](./demo/tag.jsx)

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

- [阶梯线标注](./demo/linestep.jsx)：阶梯形线条标注。

  ```jsx
  <LineGuide
    start={['2024-01', 100]}
    end={['2024-06', 200]}
    style={{
      stroke: '#52C41A',
      lineWidth: 2,
    }}
    shape="hv"
  />
  ```

- [动画标注](./demo/lottie.jsx)：带有动画效果的标注。

  ```jsx
  <LottieGuide
    records={[{ x: '2024-01', y: 200 }]}
    src="https://assets.lottiefiles.com/data.json"
    width={40}
    height={40}
    loop
  />
  ```

### 进阶用法

- [自定义标注](./demo/custom.jsx)：自定义样式的标注组件。

  ```jsx
  import { withGuide } from '@antv/f2';

  const Guide = withGuide((props) => {
    const { points, style, animation } = props;

    const start = points[0] || {};
    const end = points[1] || {};

    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);

    return (
      <group>
        <text
          style={{
            x,
            y,
            text: '文本',
            stroke: 'red',
            strokeOpacity: 0.4,
          }}
        />
        <rect
          style={{
            x,
            y,
            width: Math.abs(end.x - start.x),
            height: Math.abs(start.y - end.y),
            ...style,
          }}
          animation={animation}
        />
      </group>
    );
  });
  ```

## 使用场景

标注组件适用于以下场景：

1. 突出显示关键数据点
2. 添加图表说明和注释
3. 标记异常值或特殊事件
4. 提供额外的上下文信息
