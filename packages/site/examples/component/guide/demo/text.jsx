/** @jsx jsx */
import { Canvas, Chart, Interval, jsx, TextGuide } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

const { props } = (
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
);

const chart = new Canvas(props);
chart.render();
