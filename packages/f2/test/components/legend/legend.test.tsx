import { clone, values } from '@antv/util';
import { jsx, Component, Canvas, Chart, Tooltip } from '../../../src';
import { Line, Axis, Legend } from '../../../src/components';
import { createContext } from '../../util';

const { offsetWidth } = document.body;
const height = offsetWidth * 0.75;

describe('图例', () => {
  it('自定义图例样式', () => {
    const context = createContext('自定义图例样式');
    fetch('https://gw.alipayobjects.com/os/antfincdn/OVMtvjbnut/series-line.json')
      .then((res) => res.json())
      .then((data) => {
        const { type, props } = (
          <Canvas
            context={context}
            pixelRatio={window.devicePixelRatio}
            width={offsetWidth}
            height={height}
          >
            <Chart data={data} scale={{}}>
              <Axis
                field="date"
                tickCount={3}
                style={{
                  label: { align: 'between' },
                }}
              />
              <Axis field="value" tickCount={5} />
              <Line x="date" y="value" lineWidth="4px" color="type" shape="type" />
              <Tooltip showCrosshairs snap />
              <Legend
                position="bottom"
                // position="left"
                marker="square"
                // 自定义图例样式
                style={{
                  justifyContent: 'space-around',
                  alignItems: 'stretch',
                }}
                triggerMap={{
                  press: (items, records, legend) => {
                    const map = {};
                    items.forEach((item) => (map[item.name] = clone(item)));
                    records.forEach((record) => {
                      map[record.type].value = record.value;
                    });
                    legend.setItems(values(map));
                  },
                  pressend: (items, records, legend) => {
                    legend.setItems(items);
                  },
                }}
              />
            </Chart>
          </Canvas>
        );

        const canvas = new Canvas(props);
        canvas.render();
      });
  });
});
