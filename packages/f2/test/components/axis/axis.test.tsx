import { jsx } from '../../../src';
import { Polar, Rect } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Interval, Axis, Line, Legend, Tooltip } from '../../../src/components';
import { createContext } from '../../util';
import valuationData from './data/valuation.json';

describe('Axis 轴', () => {
  // 基础
  it('文本换行', () => {
    const context = createContext('文本换行', {
      height: '300px',
      width: '400px',
    });

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
    const context = createContext('旋转', {
      height: '300px',
      width: '400px',
    });

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
              callback: function(val) {
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
    const context = createContext('label 回调', {
      height: '300px',
      width: '400px',
    });
    const { type, props } = (
      <Canvas context={context}>
        <Chart data={valuationData}>
          {/* <Axis field="index" /> */}
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
});
