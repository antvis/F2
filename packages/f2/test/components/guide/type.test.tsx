import { jsx } from '../../../src';
import { Polar, Rect } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import {
  LineGuide,
  TextGuide,
  PointGuide,
  ArcGuide,
  RectGuide,
  TagGuide,
  Interval,
  Line,
  Axis,
  Point,
} from '../../../src/components';
import { createContext, delay } from '../../util';

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
  { type: 'b', genre: 'Sports', sold: 5 },
  { type: 'b', genre: 'Strategy', sold: 10 },
  { type: 'b', genre: 'Action', sold: 20 },
  { type: 'b', genre: 'Shooter', sold: 20 },
  { type: 'b', genre: 'Other', sold: 40 },
];

describe('Guide', () => {
  it('TextGuide', () => {
    const context = createContext('TextGuide');
    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Interval
            x="genre"
            y="sold"
            color="genre"
            // adjust="stack"
          />
          {data.map((item) => {
            const { sold } = item;
            return (
              <TextGuide
                records={[item]}
                content={sold + '个'}
                style={{
                  fill: '#000',
                  fontSize: '20px',
                }}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('LineGuide', async () => {
    const context = createContext('LineGuide');
    const res = await fetch('https://gw.alipayobjects.com/os/antfincdn/m6tXpvS56l/guide-line.json');
    const data = await res.json();

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="month" tickCount={2} />
          <Axis field="PM" />
          <Line x="month" y="PM" />
          {data.map((item) => {
            return (
              <LineGuide
                records={[
                  { month: 'min', PM: 25 },
                  { month: 'max', PM: 25 },
                ]}
                style={{
                  stroke: '#d0502d',
                  lineWidth: 2,
                  lineCap: 'round',
                }}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('PointGuide', () => {
    const context = createContext('PointGuide');
    const { props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Interval
            x="genre"
            y="sold"
            color="genre"
            // adjust="stack"
          />
          {data.map((item) => {
            const { sold } = item;
            return (
              <PointGuide
                records={[item]}
                content={sold + '个'}
                style={{
                  r: 6,
                }}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('ArcGuide', () => {
    const context = createContext('ArcGuide');
    const { type, props } = (
      <Canvas context={context}>
        <Chart
          data={[
            {
              x: '1',
              y: 85,
            },
          ]}
          coord={{
            type: Polar,
            transposed: true,
            innerRadius: 0.8,
          }}
          scale={{
            y: {
              max: 100,
              min: 0,
            },
          }}
        >
          <ArcGuide
            records={[
              {
                x: 0,
                y: 0,
              },
              {
                x: 1,
                y: 99.98,
              },
            ]}
            style={{
              lineWidth: 11,
              stroke: '#ccc',
            }}
          />
          <Interval x="x" y="y" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('RectGuide', () => {
    const context = createContext('RectGuide');
    const data = [
      {
        date: '2018-05-14',
        pv: 709,
      },
      {
        date: '2018-05-15',
        pv: 936,
      },
      {
        date: '2018-05-16',
        pv: 627,
      },
      {
        date: '2018-05-17',
        pv: 872,
      },
      {
        date: '2018-05-18',
        pv: 824,
      },
      {
        date: '2018-05-19',
        pv: 258,
      },
      {
        date: '2018-05-20',
        pv: 59,
      },
      {
        date: '2018-05-21',
        pv: 880,
      },
      {
        date: '2018-05-22',
        pv: 995,
      },
      {
        date: '2018-05-23',
        pv: 842,
      },
    ];

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Line x="date" y="pv" />
          <Point x="date" y="pv" />
          <Axis field="date" tickCount={3} />
          <Axis field="pv" tickCount={5} />
          <RectGuide
            records={[
              { date: '2018-05-19', pv: 'max' },
              { date: '2018-05-20', pv: 'min' },
            ]}
            style={{
              fillOpacity: 0.1,
              fill: '#fa541c',
            }}
          />
          <TextGuide
            records={[{ date: '2018-05-19', pv: 'max' }]}
            content={'weekend'}
            style={{
              textAlign: 'start',
              textBaseline: 'top',
              fill: '#fa541c',
            }}
            offsetX={-8}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('TagGuide', async () => {
    const context = createContext('TagGuide');
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Line x="genre" y="sold" />
          <TagGuide records={[{ genre: 'Action', sold: 20 }]} direct="tc" content="20" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it('LineGuide in Category', async () => {
    const context = createContext('LineGuideInCategory');
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: -110 },
    ];
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" min={0} />
          <Interval x="genre" y="sold" color="genre" />
          <LineGuide
            records={[
              { genre: 'min', sold: 100 },
              { genre: 'max', sold: 100 },
            ]}
            style={{
              stroke: '#d0502d',
              lineWidth: 2,
              lineCap: 'round',
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
