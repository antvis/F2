/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, withLegend } from '@antv/f2';

// 自定义 Legend
const Legend = withLegend((props) => {
  const { items, itemWidth } = props;

  return (
    <group
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {items.map((item) => {
        const { color, name } = item;
        return (
          <group
            className="legend-item"
            style={{
              width: itemWidth,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            data-item={item}
          >
            <text
              attrs={{
                fill: color,
                text: name,
              }}
            />
          </group>
        );
      })}
    </group>
  );
});

const context = document.getElementById('container').getContext('2d');

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Legend />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
