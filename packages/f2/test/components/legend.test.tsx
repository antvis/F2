import React from 'react';
import { jsx, Component, Canvas, Chart } from '../../src';
import { Line, Axis, Tooltip, Legend } from '../../src/components';
import { createContext } from '../util';

const { offsetWidth } = document.body;
const height = offsetWidth * 0.75;

describe('图例', () => {
  it('自定义图例样式', () => {
    const context = createContext('自定义图例样式');
    const chartRef = { current: null };
    const lineRef = { current: null };
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
            <Chart ref={chartRef} data={data} scale={{}}>
              <Axis
                field="date"
                tickCount={3}
                style={{
                  label: { align: 'between' },
                }}
              />
              <Axis field="value" tickCount={5} />
              <Line ref={lineRef} x="date" y="value" lineWidth="4px" color="type" shape="type" />
              <Tooltip />
              <Legend
                position="bottom"
                marker="square"
                // 自定义图例样式
                style={{
                  justifyContent: 'space-around',
                }}
              />
            </Chart>
          </Canvas>
        );

        // @ts-ignore
        const canvas = new type(props);
        canvas.render();
      });
  });
});
