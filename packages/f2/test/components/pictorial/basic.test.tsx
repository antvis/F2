import { jsx } from '../../../src';
import { Canvas, Chart, Pictorial, Axis, Tooltip } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';
const context = createContext();

const symbol = (
  <image
    style={{
      src:
        'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/mNyB6MXFwnxLMwzfEWHYt/juxingbeifen_6.png',
    }}
  />
);

const symbolTop = (
  <image
    style={{
      src:
        'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/VV9WVNGexcXLVYpQxjBFH/tuoyuanxingbeifen_13.png',
    }}
  />
);

const symbolBottom = (
  <image
    style={{
      src:
        'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/76LdyFixxEmUqrGG6rmCG/tuoyuanxingbeifen_32.png',
    }}
  />
);
const data = [
  {
    x: '产品1',
    value: 4927,
    bValue: 0,
  },
  {
    x: '产品2',
    value: 11607,
    bValue: 0,
  },
];

describe('pictorial', () => {
  it('image symbol', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="value" min={0}></Axis>

          <Pictorial
            x="x"
            y="bValue"
            symbol={symbolBottom}
            symbolOffset={[0, '-50%']}
            symbolSize={['100%', '20px']}
          />

          <Pictorial x="x" y="value" symbol={symbol} />
          <Pictorial
            x="x"
            y="value"
            symbol={symbolTop}
            symbolSize={['100%', '20px']}
            symbolOffset={[0, '-50%']}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('ellipse symbol', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="value" min={0}></Axis>

          <Pictorial
            x="x"
            y="bValue"
            symbol={
              <ellipse
                style={{
                  fill: 'l(90) 0:#1f7eff 1:#64adff',
                }}
              />
            }
            symbolOffset={['50%', 0]}
            symbolSize={['100%', '40px']}
          />

          <Pictorial
            x="x"
            y="value"
            symbol={
              <rect
                style={{
                  fill: 'l(90) 0:#9cc1ff 1:#ecf5ff',
                  fillOpacity: 0.9,
                }}
              />
            }
          />
          <Pictorial
            x="x"
            y="value"
            symbol={
              <ellipse
                style={{
                  fill: 'l(90) 0:#1f7eff 1:#64adff',
                }}
              />
            }
            symbolSize={['100%', '40px']}
            symbolOffset={['50%', 0]}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
