F2 的 词云图

基于第三方库 [wordcloud2](https://github.com/timdream/wordcloud2.js) 的扩展

## Usage

```jsx

const data = [{
  word: 'series',
  weight: 274470,
}, ...].sort((a, b) => {
  return b.weight - a.weight;
});

const img = await new Promise((resolve) => {
  const img = new Image();
  img.src = 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/3fd5a3b2-a7d0-4c51-aede-c2c8bbaac8b8.png';

  img.onload = () => {
    resolve(img);
  }
});

<Canvas context={context}>
  <WordCloud
    data={data}
    maskShape={
      <group>
        <image
          style={{
            x: 0,
            y: 0,
            // img 需要先 load 完成
            img,
            width: 260,
            height: 200,
          }}
        />
      </group>
    }
  />
</Canvas>;
```
