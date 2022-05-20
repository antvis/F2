import Canvas from '@antv/f2-react';
import { Chart, Interval, Axis, Legend, Timeline } from '@antv/f2';

const data = [
  [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 20 },
    { genre: 'Shooter', sold: 50 },
    { genre: 'Other', sold: 50 },
  ],
];

export default function App() {
  return (
    <div className="App">
      <Canvas pixelRatio={window.devicePixelRatio}>
        <Timeline delay={500}>
          {data.map((item, index) => {
            return (
              <Chart data={item} key={index}>
                <Legend />
                <Axis field="genre" />
                <Axis field="sold" />
                <Interval x="genre" y="sold" color="genre" />
              </Chart>
            );
          })}
        </Timeline>
      </Canvas>
    </div>
  );
}
