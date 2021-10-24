// @ts-nocheck
import { jsx } from '../../../src';
import { Polar } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Interval, Legend, ArcGuide, TextGuide } from '../../../src/components';
import { createContext } from '../../util';

const data = [
  {
    name: '长津湖',
    percent: 0.4,
    a: '1',
  },
  {
    name: '我和我的父辈',
    percent: 0.2,
    a: '1',
  },
  {
    name: '失控玩家',
    percent: 0.18,
    a: '1',
  },
  {
    name: '宝可梦',
    percent: 0.15,
    a: '1',
  },
  {
    name: '峰爆',
    percent: 0.05,
    a: '1',
  },
  {
    name: '其他',
    percent: 0.02,
    a: '1',
  },
];

describe('饼图', () => {
  it('基础饼图', () => {
    const context = createContext('基础饼图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
            transposed: true,
          }}
          scale={{}}
        >
          <Interval
            x="a"
            y="percent"
            adjust="stack"
            color={{
              field: 'name',
              range: [
                '#1890FF',
                '#13C2C2',
                '#2FC25B',
                '#FACC14',
                '#F04864',
                '#8543E0',
              ],
            }}
          />
          <Legend position="right" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('基础环形图', () => {
    const data = [
      {
        name: '股票类',
        percent: 83.59,
        a: '1',
      },
      {
        name: '债券类',
        percent: 2.17,
        a: '1',
      },
      {
        name: '现金类',
        percent: 14.24,
        a: '1',
      },
    ];
    const context = createContext('基础环形图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
            transposed: true,
            innerRadius: 0.7,
            radius: 0.85,
          }}
          scale={{}}
        >
          <Interval
            x="a"
            y="percent"
            adjust="stack"
            color={{
              field: 'name',
              range: ['#FE5D4D', '#3BA4FF', '#737DDE'],
            }}
          />
          <Legend position="right" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('嵌套环形图', () => {
    const data = [
      {
        a: '1',
        b: 0.2,
        c: '1',
      },
      {
        a: '2',
        b: 0.5,
        c: '1',
      },
      {
        a: '3',
        b: 0.4,
        c: '1',
      },
      {
        a: '1',
        b: 0.8,
        c: '2',
      },
      {
        a: '2',
        b: 0.5,
        c: '2',
      },
      {
        a: '3',
        b: 0.6,
        c: '2',
      },
    ];
    const context = createContext('嵌套环形图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
            transposed: true,
            innerRadius: 0.5,
          }}
          scale={{}}
        >
          <Interval x="a" y="b" color="c" adjust="stack" />
          <Legend position="top" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('环形进度条', () => {
    const data = [
      {
        x: '1',
        y: 85,
      },
    ];
    const context = createContext('环形进度条');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
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
          <TextGuide
            records={[
              {
                x: '1',
                y: '25%',
              },
            ]}
            content={'85%'}
            style={{
              fill: '#1890FF',
            }}
          />
          <Interval x="x" y="y" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('南丁格尔玫瑰图', () => {
    const data = [
      {
        year: '2001',
        population: 41.8,
      },
      {
        year: '2002',
        population: 25.8,
      },
      {
        year: '2003',
        population: 31.7,
      },
      {
        year: '2004',
        population: 46,
      },
      {
        year: '2005',
        population: 28,
      },
    ];
    const context = createContext('南丁格尔玫瑰图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
          }}
          scale={{
            population: {
              min: 0
            }
          }}
        >
          <Interval x="year" y="population" color="year" />
          <Legend position="right" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
});
