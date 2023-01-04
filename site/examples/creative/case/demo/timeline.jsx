/** @jsx jsx */
import { jsx, Canvas, Timeline, Chart, Interval, Axis, Point, Treemap, Line } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
    { key: 'Sports', type: 'a', genre: 'Sports', sold: 5 },
    { key: 'Strategy', type: 'a', genre: 'Strategy', sold: 10 },
    { key: 'Action', type: 'a', genre: 'Action', sold: 20 },
    { key: 'Shooter', type: 'a', genre: 'Shooter', sold: 20 },
    { key: 'Other', type: 'a', genre: 'Other', sold: 40 },
  ];
  
  const data2 = [
    { date: '01-10', genre: 'Sports', sold: 50 },
    { date: '02-10', genre: 'Sports', sold: 40 },
    { date: '03-10', genre: 'Sports', sold: 60 },
    { date: '04-10', genre: 'Sports', sold: 40 },
    { date: '05-10', genre: 'Sports', sold: 60 },
    { date: '06-10', genre: 'Sports', sold: 50 },
  
    { date: '01-10', genre: 'Strategy', sold: 30 },
    { date: '02-10', genre: 'Strategy', sold: 50 },
    { date: '03-10', genre: 'Strategy', sold: 10 },
    { date: '04-10', genre: 'Strategy', sold: 30 },
    { date: '05-10', genre: 'Strategy', sold: 35 },
    { date: '06-10', genre: 'Strategy', sold: 25 },
  
    { date: '01-10', genre: 'Action', sold: 5 },
    { date: '02-10', genre: 'Action', sold: 10 },
    { date: '03-10', genre: 'Action', sold: 20 },
    { date: '04-10', genre: 'Action', sold: 10 },
    { date: '05-10', genre: 'Action', sold: 40 },
    { date: '06-10', genre: 'Action', sold: 50 },
  
    { date: '01-10', genre: 'Shooter', sold: 50 },
    { date: '02-10', genre: 'Shooter', sold: 40 },
    { date: '03-10', genre: 'Shooter', sold: 20 },
    { date: '04-10', genre: 'Shooter', sold: 30 },
    { date: '05-10', genre: 'Shooter', sold: 10 },
    { date: '06-10', genre: 'Shooter', sold: 5 },
  
    { date: '01-10', genre: 'Other', sold: 30 },
    { date: '02-10', genre: 'Other', sold: 40 },
    { date: '03-10', genre: 'Other', sold: 80 },
    { date: '04-10', genre: 'Other', sold: 60 },
    { date: '05-10', genre: 'Other', sold: 20 },
    { date: '06-10', genre: 'Other', sold: 10 },
  ];

const intervalRef = { current: null };
const treemapRef = {};
const pointRef = {};
const lineRef = {};
const pieRef = {};
const roseRef = {};
const { type, props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Timeline delay={200}>
      <Chart data={data}>
        <Axis field="genre" />
        <Axis field="sold" />
        <Interval
          ref={intervalRef}
          transformFrom={roseRef}
          x="genre"
          y="sold"
          color="genre"
          style={{
            radius: 10,
            stroke: '#fff',
          }}
        />
      </Chart>
      <Chart data={data}>
        <Axis field="genre" />
        <Axis field="sold" />
        <Point
          ref={pointRef}
          transformFrom={intervalRef}
          x="genre"
          y="sold"
          color="genre"
          size="sold"
        />
      </Chart>
      <Treemap
        transformFrom={pointRef}
        ref={treemapRef}
        data={data}
        color={{
          field: 'genre',
        }}
        value="sold"
      />
      <Chart
        data={data}
        coord={{
          type: 'polar',
          transposed: true,
        }}
      >
        <Interval
          ref={pieRef}
          transformFrom={treemapRef}
          x="type"
          y="sold"
          adjust="stack"
          color="genre"
          style={{
            radius: 10,
            lineWidth: '4px',
            stroke: '#fff',
          }}
        />
      </Chart>
      <Chart
        data={data}
        coord={{
          type: 'polar',
        }}
      >
        <Interval
          ref={roseRef}
          transformFrom={pieRef}
          x="genre"
          y="sold"
          color="genre"
          style={{
            radius: 10,
            lineWidth: '4px',
            stroke: '#fff',
          }}
        />
      </Chart>
      <Chart data={data2}>
        <Axis field="date" />
        <Axis field="sold" />
        <Line ref={lineRef} transformFrom={roseRef} x="date" y="sold" color="genre" size={2} />
      </Chart>
    </Timeline>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();