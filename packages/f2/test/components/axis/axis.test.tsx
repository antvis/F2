import { jsx } from '../../../src';
import { Polar, Rect } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Interval, Axis, Line, Legend, Tooltip, Point, Area } from '../../../src/components';
import { createContext } from '../../util';
import valuationData from './data/valuation.json';
import bubbleData from './data/bubble.json';

function numberToMoney(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

describe('Axis 轴', () => {
  // 基础
  it('文本换行', () => {
    const context = createContext('文本换行');

    const data = [
      {
        time: 'Jan.\n一月',
        value: 551990,
      },
      {
        time: 'Feb.\n二月',
        value: 513513,
      },
      {
        time: 'Mar.\n三月',
        value: 538780,
      },
      {
        time: 'Apr.\n四月',
        value: 419562,
      },
      {
        time: 'May.\n五月',
        value: 332167,
      },
      {
        time: 'Jun.\n六月',
        value: 297956,
      },
      {
        time: 'Jul.\n七月',
        value: 311760,
      },
      {
        time: 'Aug.\n八月',
        value: 330824,
      },
    ];
    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="time" />
          <Axis field="value" />
          <Interval x="time" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('旋转', () => {
    const context = createContext('旋转');

    const data = [
      {
        Year: '1987',
        NumberNewMicroBrewery: 1,
      },
      {
        Year: '1989',
        NumberNewMicroBrewery: 1,
      },
      {
        Year: '1995',
        NumberNewMicroBrewery: 2,
      },
      {
        Year: '1996',
        NumberNewMicroBrewery: 2,
      },
      {
        Year: '1997',
        NumberNewMicroBrewery: 1,
      },
      {
        Year: '1998',
        NumberNewMicroBrewery: 3,
      },
      {
        Year: '1999',
        NumberNewMicroBrewery: 2,
      },
      {
        Year: '2006',
        NumberNewMicroBrewery: 1,
      },
      {
        Year: '2007',
        NumberNewMicroBrewery: 1,
      },
      {
        Year: '2008',
        NumberNewMicroBrewery: 1,
      },
      {
        Year: '2009',
        NumberNewMicroBrewery: 2,
      },
      {
        Year: '2010',
        NumberNewMicroBrewery: 3,
      },
      {
        Year: '2011',
        NumberNewMicroBrewery: 4,
      },
      {
        Year: '2012',
        NumberNewMicroBrewery: 5,
      },
      {
        Year: '2013',
        NumberNewMicroBrewery: 11,
      },
      {
        Year: '2014',
        NumberNewMicroBrewery: 20,
      },
      {
        Year: '2015',
        NumberNewMicroBrewery: 16,
      },
      {
        Year: '2016',
        NumberNewMicroBrewery: 13,
      },
      {
        Year: '2017',
        NumberNewMicroBrewery: 6,
      },
      {
        Year: '2018',
        NumberNewMicroBrewery: 1,
      },
    ];
    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis
            field="Year"
            style={{
              label: {
                rotate: -Math.PI / 2,
                textAlign: 'end',
                textBaseline: 'middle',
              },
            }}
          />
          <Axis field="NumberNewMicroBrewery" />
          <Interval
            x="Year"
            y="NumberNewMicroBrewery"
            color={{
              // TODO: 这里颜色映射还有点问题
              field: 'NumberNewMicroBrewery',
              callback: function (val) {
                if (val === 20) {
                  return '#1890ff';
                }
                return '#66B5FF';
              },
            }}
          />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('label 回调', () => {
    const context = createContext('label 回调');
    const { type, props } = (
      <Canvas context={context}>
        <Chart data={valuationData}>
          <Axis field="index" />
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
            }}
          />
          <Line x="index" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('grid样式', () => {
    const context = createContext('grid样式');

    const { type, props } = (
      <Canvas context={context}>
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
            Einwohner: {
              type: 'category',
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
              field: 'Einwohner',
              // TODO:这里size好像映射反了
              range: [1, 5, 10, 15],
            }}
            style={{
              fillOpacity: 0.7,
            }}
          />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('grid回调', () => {
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

    const { type, props } = (
      <Canvas context={context}>
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
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('弧形网格线', () => {
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

    const { type, props } = (
      <Canvas context={context}>
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
            field="value"
            style={{
              grid: {
                lineDash: null,
                // TODO:暂时有点问题
                type: 'arc',
              },
              line: null,
              label: {
                fontSize: 12,
                fontWeight: 'bold',
                fill: '#E5875B',
              },
            }}
          />
          <Interval x="name" y="percent" color="#E5875B" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
});
