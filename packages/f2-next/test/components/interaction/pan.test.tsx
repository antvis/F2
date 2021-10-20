// @ts-nocheck
import { jsx } from '../../../src';
import { Polar, Rect } from '../../../src/coord';
import { Canvas, Chart, Component } from '../../../src';
import { Interval, Axis, Legend, Tooltip, Line } from '../../../src/components';
import { createContext } from '../../util';

class Interaction {}

class CustomInteraction extends Interaction {}

class InjectTestComponent extends Component {
  didMount() {
    const interactionContext = this.props.chart.interaction.context;
    window.interactionContext = interactionContext;
    // debug:
    interactionContext.doZoom(0.5, 0.5, 1.5);
    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        // interactionContext.doZoom(0.5, 0.5, 1.5)
        interactionContext.start();
        interactionContext.doMove(-0.001 * i);
      }, i * 100);
    }
  }
}

describe('Interaction 交互', () => {
  it.only('平移和缩放', async () => {
    const context = createContext('基础柱状图', {
      width: '500px',
      height: '300px',
    });
    const chartRef = { current: null };
    const res = await fetch(
      'https://gw.alipayobjects.com/os/antfincdn/KbnoL5QgL0/index.json'
    );
    const data = await res.json();
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={
            {
              // type: Polar,
              // transposed: true,
              // left: 100,
              // top: 100,
              // right: 100,
              // bottom: 100,
            }
          }
          scale={{
            // genre: {},
            reportDateTimestamp: {
              range: [0, 1],
              mask: 'MM-DD',
            },
          }}
          interactions={[
            {
              type: 'pan', // 平移
              // ...cfg
            },
            // {
            //   type: 'pinch', // 缩放
            //   // ...cfg
            // },
            // {
            //   type: 'interval-select', // 直方图选择
            //   // ...cfg
            // },
            // {
            //   type: "ddd", // 自定义交互
            //   xxx: CustomInteraction,
            // }
          ]}
        >
          {/* <Legend /> */}
          <Axis field="reportDateTimestamp" type="timeCat" />
          <Axis field="rate" />
          {/* <Axis field="genre" position="top"/> */}
          {/* <Axis field="sold" position="right" /> */}
          <Line
            x="reportDateTimestamp"
            y="rate"
            color="codeType"
            // adjust="stack"
          />
          <InjectTestComponent />
          {/* <Tooltip /> */}
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
});
