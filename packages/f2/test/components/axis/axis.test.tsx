import { jsx } from '../../../src';
import { Polar, Rect } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Interval, Axis, Line, Legend, Tooltip, Point, Area } from '../../../src/components';
import { createContext, delay } from '../../util';
import valuationData from './data/valuation.json';
import bubbleData from './data/bubble.json';

function numberToMoney(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

describe('Axis 轴', () => {
  // 基础
  it('文本换行', async () => {
    const context = createContext('文本换行');

    const data = [
      {
        time: 'Jan.\nJan',
        value: 551990,
      },
      {
        time: 'Feb.\nFeb',
        value: 513513,
      },
      {
        time: 'Mar.\nMar',
        value: 538780,
      },
      {
        time: 'Apr.\nApr',
        value: 419562,
      },
      {
        time: 'May.\nMay',
        value: 332167,
      },
      {
        time: 'Jun.\nJun',
        value: 297956,
      },
      {
        time: 'Jul.\nJul',
        value: 311760,
      },
      {
        time: 'Aug.\nAug',
        value: 330824,
      },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="time" />
          <Axis field="value" />
          <Interval x="time" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('旋转', async () => {
    const context = createContext('旋转');

    const data = [
      {
        Year: '1987',
        NumberNewMicroBrewery: 1,
        goal: 10,
      },
      {
        Year: '1989',
        NumberNewMicroBrewery: 1,
        goal: 10,
      },
      {
        Year: '1995',
        NumberNewMicroBrewery: 2,
        goal: 10,
      },
      {
        Year: '1996',
        NumberNewMicroBrewery: 2,
        goal: 10,
      },
      {
        Year: '1997',
        NumberNewMicroBrewery: 1,
        goal: 10,
      },
      {
        Year: '1998',
        NumberNewMicroBrewery: 3,
        goal: 10,
      },
      {
        Year: '1999',
        NumberNewMicroBrewery: 2,
        goal: 10,
      },
      {
        Year: '2006',
        NumberNewMicroBrewery: 1,
        goal: 10,
      },
      {
        Year: '2007',
        NumberNewMicroBrewery: 1,
        goal: 10,
      },
      {
        Year: '2008',
        NumberNewMicroBrewery: 1,
        goal: 10,
      },
      {
        Year: '2009',
        NumberNewMicroBrewery: 2,
        goal: 10,
      },
      {
        Year: '2010',
        NumberNewMicroBrewery: 3,
        goal: 10,
      },
      {
        Year: '2011',
        NumberNewMicroBrewery: 4,
        goal: 3,
      },
      {
        Year: '2012',
        NumberNewMicroBrewery: 5,
        goal: 10,
      },
      {
        Year: '2013',
        NumberNewMicroBrewery: 11,
        goal: 10,
      },
      {
        Year: '2014',
        NumberNewMicroBrewery: 20,
        goal: 21,
      },
      {
        Year: '2015',
        NumberNewMicroBrewery: 16,
        goal: 15,
      },
      {
        Year: '2016',
        NumberNewMicroBrewery: 13,
        goal: 10,
      },
      {
        Year: '2017',
        NumberNewMicroBrewery: 6,
        goal: 10,
      },
      {
        Year: '2018',
        NumberNewMicroBrewery: 1,
        goal: 10,
      },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis
            field="Year"
            style={{
              label: {
                // rotate: -Math.PI / 2,
                // @ts-ignore
                transform: 'rotate(-90deg)',
                align: 'end',
                textBaseline: 'middle',
              },
            }}
          />
          <Axis field="NumberNewMicroBrewery" />
          <Interval
            x="Year"
            y="NumberNewMicroBrewery"
            color={{
              field: 'NumberNewMicroBrewery',
              callback: function(val, child) {
                if (val > child.goal) {
                  return '#1890ff';
                }
                return '#66B5FF';
              },
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('label 回调', async () => {
    const context = createContext('label 回调');
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={valuationData}>
          <Axis
            field="index"
            style={{
              label: (text) => {
                return {
                  align: 'end',
                };
              },
            }}
          />
          <Axis
            field="value"
            formatter={(v) => {
              return v.toFixed(2) + '%';
            }}
            style={{
              label: (text) => {
                const number = parseInt(text);
                const cfg = {} as any;
                if (number > 0) {
                  cfg.text = '+' + text;
                  cfg.fill = '#F5222D';
                } else if (number === 0) {
                  cfg.fill = '#000';
                  cfg.fontWeight = 'bold';
                } else {
                  cfg.fill = '#52C41A';
                }
                return cfg;
              },
              labelOffset: '8px',
            }}
          />
          <Line x="index" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('刻度线', async () => {
    const context = createContext('tickLine');

    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={valuationData}>
          <Axis field="index" />
          <Axis
            field="value"
            formatter={(v) => {
              return v.toFixed(2) + '%';
            }}
            style={{
              tickLine: {
                length: 3,
              },
            }}
          />
          <Line x="index" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('label 回调参数', async () => {
    const context = createContext('label 回调参数');
    const labelMockCallback = jest.fn();
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={valuationData}>
          <Axis field="index" />
          <Axis
            field="value"
            formatter={(v) => {
              return v.toFixed(2) + '%';
            }}
            style={{
              label: labelMockCallback,
            }}
          />
          <Line x="index" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(0);
    expect(labelMockCallback.mock.calls[0][2].length).toBeGreaterThan(1);

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('grid样式', async () => {
    const context = createContext('grid样式');

    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={bubbleData}
          scale={{
            'Pro-Kopf-BIP (USD)': {
              formatter: function formatter(val) {
                return numberToMoney(val);
              },
            },
            'Anzahl Flüchtlinge': {
              formatter: function formatter(val) {
                return numberToMoney(val);
              },
            },
          }}
        >
          <Axis
            field="Pro-Kopf-BIP (USD)"
            style={{
              grid: {
                lineDash: null,
                stroke: '#e8e8e8',
                lineWidth: 1,
              },
              labelOffset: '50px',
            }}
          />
          <Axis
            field="Anzahl Flüchtlinge"
            style={{
              grid: {
                lineDash: null,
              },
            }}
          />
          <Point
            x="Pro-Kopf-BIP (USD)"
            y="Anzahl Flüchtlinge"
            color="#F04864"
            size={{
              type: 'linear',
              field: 'Einwohner',
              range: [5, 10],
            }}
            style={{
              fillOpacity: 0.7,
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('grid回调', async () => {
    const context = createContext('grid样式');
    const data = [
      {
        time: 'Jan',
        value: 551990,
        year: '2015',
      },
      {
        time: 'Feb',
        value: 513513,
        year: '2015',
      },
      {
        time: 'Mar',
        value: 538780,
        year: '2015',
      },
      {
        time: 'Apr',
        value: 419562,
        year: '2015',
      },
      {
        time: 'May',
        value: 332167,
        year: '2015',
      },
      {
        time: 'Jun',
        value: 297956,
        year: '2015',
      },
      {
        time: 'Jul',
        value: 311760,
        year: '2015',
      },
      {
        time: 'Aug',
        value: 330824,
        year: '2015',
      },
      {
        time: 'Sep',
        value: 265815,
        year: '2015',
      },
      {
        time: 'Oct',
        value: 327474,
        year: '2015',
      },
      {
        time: 'Nov',
        value: 468621,
        year: '2015',
      },
      {
        time: 'Dec',
        value: 489428,
        year: '2015',
      },
      {
        time: 'Jan',
        value: 531886,
        year: '2016',
      },
      {
        time: 'Feb',
        value: 434868,
        year: '2016',
      },
      {
        time: 'Mar',
        value: 485418,
        year: '2016',
      },
      {
        time: 'Apr',
        value: 462479,
        year: '2016',
      },
      {
        time: 'May',
        value: 361541,
        year: '2016',
      },
      {
        time: 'Jun',
        value: 351261,
        year: '2016',
      },
      {
        time: 'Jul',
        value: 403836,
        year: '2016',
      },
      {
        time: 'Aug',
        value: 334281,
        year: '2016',
      },
      {
        time: 'Sep',
        value: 329221,
        year: '2016',
      },
      {
        time: 'Oct',
        value: 378278,
        year: '2016',
      },
      {
        time: 'Nov',
        value: 454534,
        year: '2016',
      },
      {
        time: 'Dec',
        value: 573530,
        year: '2016',
      },
    ];

    function numberToMoney(n) {
      return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          scale={{
            value: {
              min: 0,
              formatter: function formatter(val) {
                return numberToMoney(val);
              },
            },
          }}
          coord="polar"
        >
          <Axis
            field="time"
            style={{
              label: {
                fontSize: 12,
              },
              grid: {
                stroke: 'rgb(113, 113, 112)',
                strokeOpacity: 0.4,
                lineDash: null,
              },
            }}
          />
          <Axis
            field="value"
            style={{
              label: null,
              grid: function grid(text, index, total) {
                if (index === total - 1) {
                  return {
                    stroke: 'rgb(113, 113, 112)',
                    strokeOpacity: 1,
                    lineDash: null,
                  };
                }

                return {
                  lineDash: null,
                  stroke: 'rgb(220, 220, 220)',
                  strokeOpacity: 0.4,
                };
              },
            }}
          />
          <Area
            x="time"
            y="value"
            color="year"
            style={{
              fillOpacity: 0.4,
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('箭头样式', async () => {
    const context = createContext('带箭头的坐标轴');
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={valuationData}>
          <Axis
            field="index"
            style={{
              line: {},
              symbol: { type: 'arrow' },
            }}
          />
          <Axis
            field="value"
            formatter={(v) => {
              return v.toFixed(2) + '%';
            }}
            style={{
              line: {},
              symbol: [
                {
                  type: 'circle',
                },
                {
                  type: 'arrow',
                },
              ],
            }}
          />
          <Line x="index" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('弧形网格线', async () => {
    const context = createContext('弧形网格线');
    const data = [
      {
        name: 'Samsung',
        percent: 21.2,
      },
      {
        name: 'Apple',
        percent: 14.6,
      },
      {
        name: 'Huawei',
        percent: 9.5,
      },
      {
        name: 'Oppo',
        percent: 6.8,
      },
      {
        name: 'Vivo',
        percent: 5.3,
      },
      {
        name: 'Others',
        percent: 42.7,
      },
    ];

    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data.reverse()}
          scale={{
            percent: {
              max: 100,
            },
          }}
          coord={{
            type: 'polar',
            transposed: true,
            endAngle: 2 * Math.PI,
            startAngle: Math.PI / 2,
            innerRadius: 0.3,
          }}
        >
          <Axis field="percent" visible={false} />
          <Axis
            field="name"
            style={{
              grid: {
                lineDash: null,
                // TODO:暂时有点问题
                // type: 'arc',
              },
              line: null,
              label: {
                fontSize: 12,
                fontWeight: 'bold',
                fill: '#E5875B',
              },
            }}
          />
          <Interval x="name" y="percent" color={['percent', ['#E5875B', '#C2832B']]} />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  // 基础
  it('传入 ticks ', async () => {
    const context = createContext('传入 ticks');

    const data = [
      {
        time: 'Jan',
        value: 551990,
      },
      {
        time: 'Feb',
        value: 513513,
      },
      {
        time: 'Mar',
        value: 538780,
      },
      {
        time: 'Apr',
        value: 419562,
      },
      {
        time: 'May',
        value: 332167,
      },
      {
        time: 'Jun',
        value: 297956,
      },
      {
        time: 'Jul',
        value: 311760,
      },
      {
        time: 'Aug',
        value: 330824,
      },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="time" ticks={['Jan', 'Apr', 'Aug']} />
          <Axis field="value" />
          <Interval x="time" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  // 定义宽高
  it('定义宽高', async () => {
    const context = createContext('定义宽高');
    const data = [
      {
        time: 'Jan',
        value: 551990,
      },
      {
        time: 'Feb',
        value: 513513,
      },
      {
        time: 'Mar',
        value: 538780,
      },
      {
        time: 'Apr',
        value: 419562,
      },
      {
        time: 'May',
        value: 332167,
      },
      {
        time: 'Jun',
        value: 297956,
      },
      {
        time: 'Jul',
        value: 311760,
      },
      {
        time: 'Aug',
        value: 330824,
      },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="time" style={{ height: '100px' }} />
          <Axis field="value" style={{ width: '100px' }} />
          <Interval x="time" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
