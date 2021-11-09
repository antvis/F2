import { jsx } from '../../src/jsx';
import { createContext } from '../util';
import { Canvas, Chart, Interval, Axis, Line } from '../../src';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
  { genre: 'Shooter', sold: 300, type: 'b' },
  { genre: 'Other', sold: 160, type: 'b' }
];

describe.skip('Axis', () => {
  it('render', () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart data={data} end={{ x: 180, y: 400 }}>
          <Axis
            field="genre"
            // position="top"
            // tickLine={{
            //   length: '10px',
            //   stroke: '#000',
            //   lineWidth: '4px',
            // }}
          />
          <Axis field="sold" />
          <Line x="genre" y="sold" color="type" size="type" smooth />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();

    // chart.update(props);

    const container = chart.container._attrs.children[0];

    expect(container.get('children').length).toBe(3);
    expect(
      container
        .get('children')[0]
        .get('children')[0]
        .get('children').length
    ).toBe(11);

    // const children = container.get('children')[0].get('children')[0].get('children');
    // expect(children[5].get('children')[0].get('attrs').y).toBe(0);
  });

  it('render with Transposed Coord', () => {
    const { type, props } = (
      <Chart data={data} context={context} pixelRatio={window.devicePixelRatio}>
        {/* <Coord transposed={true} /> */}
        <Axis field="genre" />
        <Axis field="sold" />
        <Interval position={`genre*sold`} />
      </Chart>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();

    const container = chart.container;

    expect(container.get('children').length).toBe(4);
    // Y轴的文案符合预期
    expect(
      container.get('children')[1]._attrs.children['0']._attrs.children[10]
        ._attrs.attrs.text
    ).toBe('Other');
  });

  it('using ticks param', () => {
    const config = (
      <Chart data={data} context={context} pixelRatio={window.devicePixelRatio}>
        {/* <Coord transposed={true} /> */}
        {/* TODO ticks 待实现 */}
        <Axis field="genre" ticks={['Other']} />
        <Axis field="sold" />
        <Interval position={`genre*sold`} />
      </Chart>
    );
    expect(config.props.children[1].props.ticks.length).toBe(1);
  });

  it('render label using textAligns', () => {
    const { type, props } = (
      <Chart data={data} context={context} pixelRatio={window.devicePixelRatio}>
        {/* <Coord /> */}
        <Axis
          field="genre"
          style={{
            label: {
              fill: '#CCCCCC',
              fontSize: '22px',
              align: 'between'
            }
          }}
        />
        <Axis field="sold" />
        <Interval position={`genre*sold`} />
      </Chart>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();

    const container = chart.container;

    expect(container.get('children').length).toBe(4);

    expect(
      container._attrs.children[1]._attrs.children[0]._attrs.children[6]._attrs
        .attrs.textAlign
    ).toBe('start');
    expect(
      container._attrs.children[1]._attrs.children[0]._attrs.children[7]._attrs
        .attrs.textAlign
    ).toBe('center');
    expect(
      container._attrs.children[1]._attrs.children[0]._attrs.children[10]._attrs
        .attrs.textAlign
    ).toBe('end');
  });
});

describe.skip('Axis rect transposed', () => {
  it('render', () => {
    const { type, props } = (
      <Chart data={data} context={context} pixelRatio={window.devicePixelRatio}>
        {/* <Coord transposed={true} /> */}
        <Axis field="genre" visible={true} />
        <Axis field="sold" visible={true} />
        <Interval position="genre*sold" />
      </Chart>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();
  });
});

describe.skip('Axis polar', () => {
  it('render', () => {
    const { type, props } = (
      <Chart data={data} context={context} pixelRatio={window.devicePixelRatio}>
        {/* <Coord type="polar" transposed={false} /> */}
        <Axis field="genre" visible={true} />
        <Axis
          field="sold"
          visible={true}
          // tickLine={{
          //   length: '10px',
          //   stroke: '#000',
          //   lineWidth: '4px',
          // }}
        />
        <Line position="genre*sold" />
      </Chart>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();
  });
});
