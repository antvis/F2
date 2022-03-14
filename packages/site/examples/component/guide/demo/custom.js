import { jsx, Canvas, Chart, Line, withGuide } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

const Guide = withGuide((props) => {
  const { points, style, animation } = props;

  const start = points[0] || {};
  const end = points[1] || {};

  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);

  return (
    <group>
      <text
        attrs={{
          x,
          y,
          text: '文本',
          stroke: 'red',
          strokeOpacity: 0.4,
        }}
      />
      <rect
        attrs={{
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

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Line x="genre" y="sold" />
      <Guide records={[data[2], data[3]]} style={{ fill: 'red', fillOpacity: 0.2 }} />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
