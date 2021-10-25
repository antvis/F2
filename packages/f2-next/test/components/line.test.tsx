import { jsx } from '../../src/jsx';
import { createContext } from '../util';
import { Canvas, Chart, Line, Axis } from '../../src';
import { Polar, Rect } from '../../src/coord';

const colorCallback = jest.fn();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'b' },
  { genre: 'Other', sold: 150, type: 'b' },
];

const data2 = [
  {
    item: 'Design',
    user: '用户 A',
    score: 70,
  },
  {
    item: 'Design',
    user: '用户 B',
    score: 30,
  },
  {
    item: 'Development',
    user: '用户 A',
    score: 60,
  },
  {
    item: 'Development',
    user: '用户 B',
    score: 70,
  },
  {
    item: 'Marketing',
    user: '用户 A',
    score: 50,
  },
  {
    item: 'Marketing',
    user: '用户 B',
    score: 60,
  },
  {
    item: 'Users',
    user: '用户 A',
    score: 40,
  },
  {
    item: 'Users',
    user: '用户 B',
    score: 50,
  },
  {
    item: 'Test',
    user: '用户 A',
    score: 60,
  },
  {
    item: 'Test',
    user: '用户 B',
    score: 70,
  },
  {
    item: 'Language',
    user: '用户 A',
    score: 70,
  },
  {
    item: 'Language',
    user: '用户 B',
    score: 50,
  },
  {
    item: 'Technology',
    user: '用户 A',
    score: 70,
  },
  {
    item: 'Technology',
    user: '用户 B',
    score: 40,
  },
  {
    item: 'Support',
    user: '用户 A',
    score: 60,
  },
  {
    item: 'Support',
    user: '用户 B',
    score: 40,
  },
];

const crossData = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Sports', sold: 115, type: 'b' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Action', sold: 350, type: 'b' },
];

describe('Line', () => {
  const context = createContext();
  it('Line color callback', () => {
    const { type, props } = (
      <Canvas context={context}>
        <Chart
          data={data}
          scale={{
            sold: { min: 0 },
          }}
          coord={{
            type: Rect,
          }}
        >
          <Line
            x="genre"
            y="sold"
            color={{
              field: 'type',
              callback: () => {
                colorCallback()
                return 'red'
              },
            }}
            smooth={true}
            // shape="line"
            lineDash={[4, 4]}
          />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();

    // expect(colorCallback.mock.calls.length).not.toBe(0);
  });

  it('Line use order', () => {
    const context = createContext();
    const { type, props } = (
      <Canvas context={context}>
        <Chart
          data={crossData}
          scale={{
            sold: { min: 0 },
          }}
          coord={{
            type: Rect,
          }}
        >
          <Line
            x="type"
            y="sold"
            order={['genre', ['Sports', 'Action']]}
            color={'genre'}
          />
          <Axis field="type" />
          <Axis field="sold" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const chart = new type(props);
    console.log('chart: ', chart);
    chart.render();
    expect(
      chart.children.component.children[0].component.container._attrs
        .children[0]._attrs.children[0]._attrs.children[0]._attrs.attrs
        .strokeStyle
    ).toBe('#1890FF');
  });

  it('polar', () => {
    const context = createContext();
    const { type, props } = (
      <Canvas context={context}>
        <Chart
          data={data2}
          scale={{
            score: { min: 0, type: 'linear' },
            item: { type: 'cat' },
          }}
          coord={{
            type: Polar,
          }}
        >
          <Line x="item" y="score" color={'user'} />
          <Axis field="item" />
          <Axis field="score" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    // const { container } = canvas;
    canvas.render();

    // x计算准确
    // expect(
    //   container._attrs.children[0]._attrs.children[0]._attrs.children[0]._attrs.children[0]._attrs.attrs.points.map(
    //     (i) => i.x
    //   )
    // ).toStrictEqual([
    //   179.5, 247.88437708312455, 252.03258514404297, 213.69218854156227, 179.5,
    //   145.30781145843773, 155.32247161865234, 162.40390572921885, 179.5,
    // ]);
  });
});
