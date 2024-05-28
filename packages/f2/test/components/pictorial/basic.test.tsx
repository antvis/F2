import { jsx } from '../../../src';
import { Canvas, Chart, Pictorial, Axis, Tooltip } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';
const context = createContext();

const data = [
  {
    x: '产品1',
    value: 4927,
  },
  {
    x: '产品2',
    value: 11607,
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
            y="value"
            symbol={({ xMin, xMax, yMin, yMax, px2hd }) => (
              <group>
                <image
                  style={{
                    x: xMin,
                    y: yMax - px2hd('20px') / 2,
                    width: xMax - xMin,
                    height: '20px',
                    src:
                      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/76LdyFixxEmUqrGG6rmCG/tuoyuanxingbeifen_32.png',
                  }}
                />
                <image
                  style={{
                    x: xMin,
                    y: yMin,
                    width: xMax - xMin,
                    height: yMax - yMin,
                    src:
                      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/mNyB6MXFwnxLMwzfEWHYt/juxingbeifen_6.png',
                  }}
                />
                <image
                  style={{
                    x: xMin,
                    y: yMin - px2hd('20px') / 2,
                    width: xMax - xMin,
                    height: '20px',
                    src:
                      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/VV9WVNGexcXLVYpQxjBFH/tuoyuanxingbeifen_13.png',
                  }}
                />
              </group>
            )}
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
            y="value"
            symbol={({ xMin, xMax, yMin, yMax, width, height, origin }) => (
              <group>
                <ellipse
                  style={{
                    cx: xMin + width / 2,
                    cy: yMax,
                    rx: width / 2,
                    ry: '20px',
                    fill: 'l(90) 0:#1f7eff 1:#64adff',
                  }}
                />
                <rect
                  style={{
                    x: xMin,
                    y: yMin,
                    width,
                    height,
                    fill: 'l(90) 0:#9cc1ff 1:#ecf5ff',
                    fillOpacity: 0.9,
                  }}
                />
                <ellipse
                  style={{
                    cx: xMin + width / 2,
                    cy: yMin,
                    rx: width / 2,
                    ry: '20px',
                    fill: 'l(90) 0:#1f7eff 1:#64adff',
                  }}
                />
              </group>
            )}
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
