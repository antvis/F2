import { clone, values } from '@antv/util';
import { jsx, Component, Canvas, Chart, Tooltip, Geometry } from '../../../src';
import { Line, Axis, Legend } from '../../../src/components';
import { createContext, delay } from '../../util';

describe('自定义', () => {
  it('自定义图例样式', async () => {
    const context = createContext('自定义图例样式');
    const res = await fetch(
      'https://gw.alipayobjects.com/os/antfincdn/OVMtvjbnut/series-line.json'
    );
    const data = await res.json();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Legend />
          <Axis
            field="date"
            tickCount={3}
            style={{
              label: { align: 'between' },
            }}
          />
          <Axis field="value" tickCount={5} />
          <Line x="date" y="value" lineWidth="4px" color="type" shape="type" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });
});
