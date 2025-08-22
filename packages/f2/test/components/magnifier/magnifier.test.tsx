import { Canvas, jsx, Magnifier, Line, Chart, Component, Axis } from '../../../src';
import { createContext, delay } from '../../util';
// 优化后的固定数据，带有波动
const data = [
  {
    date: '2017-06-05',
    value: 116,
  },
  {
    date: '2017-06-06',
    value: 129,
  },
  {
    date: '2017-06-07',
    value: 135,
  },
  {
    date: '2017-06-08',
    value: 86,
  },
  {
    date: '2017-06-09',
    value: 73,
  },
  {
    date: '2017-06-10',
    value: 85,
  },
  {
    date: '2017-06-11',
    value: 73,
  },
  {
    date: '2017-06-12',
    value: 68,
  },
  {
    date: '2017-06-13',
    value: 92,
  },
  {
    date: '2017-06-14',
    value: 130,
  },
  {
    date: '2017-06-15',
    value: 245,
  },
  {
    date: '2017-06-16',
    value: 139,
  },
  {
    date: '2017-06-17',
    value: 115,
  },
  {
    date: '2017-06-18',
    value: 111,
  },
  {
    date: '2017-06-19',
    value: 309,
  },
  {
    date: '2017-06-20',
    value: 206,
  },
  {
    date: '2017-06-21',
    value: 137,
  },
  {
    date: '2017-06-22',
    value: 128,
  },
  {
    date: '2017-06-23',
    value: 85,
  },
  {
    date: '2017-06-24',
    value: 94,
  },
  {
    date: '2017-06-25',
    value: 71,
  },
  {
    date: '2017-06-26',
    value: 106,
  },
  {
    date: '2017-06-27',
    value: 84,
  },
  {
    date: '2017-06-28',
    value: 93,
  },
  {
    date: '2017-06-29',
    value: 85,
  },
  {
    date: '2017-06-30',
    value: 73,
  },
  {
    date: '2017-07-01',
    value: 83,
  },
  {
    date: '2017-07-02',
    value: 125,
  },
  {
    date: '2017-07-03',
    value: 107,
  },
  {
    date: '2017-07-04',
    value: 82,
  },
  {
    date: '2017-07-05',
    value: 44,
  },
  {
    date: '2017-07-06',
    value: 72,
  },
  {
    date: '2017-07-07',
    value: 106,
  },
  {
    date: '2017-07-08',
    value: 107,
  },
  {
    date: '2017-07-09',
    value: 66,
  },
  {
    date: '2017-07-10',
    value: 91,
  },
  {
    date: '2017-07-11',
    value: 92,
  },
  {
    date: '2017-07-12',
    value: 113,
  },
  {
    date: '2017-07-13',
    value: 107,
  },
  {
    date: '2017-07-14',
    value: 131,
  },
  {
    date: '2017-07-15',
    value: 111,
  },
  {
    date: '2017-07-16',
    value: 64,
  },
  {
    date: '2017-07-17',
    value: 69,
  },
  {
    date: '2017-07-18',
    value: 88,
  },
  {
    date: '2017-07-19',
    value: 77,
  },
  {
    date: '2017-07-20',
    value: 83,
  },
  {
    date: '2017-07-21',
    value: 111,
  },
  {
    date: '2017-07-22',
    value: 57,
  },
  {
    date: '2017-07-23',
    value: 55,
  },
  {
    date: '2017-07-24',
    value: 60,
  },
];

describe('Magnifier', () => {
  it('basic render', async () => {
    const context = createContext('Magnifier basic render', {
      width: '500px',
      height: '200px',
    });
    const magnifierRef = { current: null };
    const { props } = (
      <Canvas context={context}>
        <Chart
          data={data}
          style={{
            padding: ['50px', '50px', '50px', '50px'],
          }}
        >
          <Line x="date" y="value" color="rgb(208,178,136)" />
          <Magnifier
            ref={magnifierRef}
            focusRange={[data.length - 8, data.length - 1]}
            frameStyle={{
              background: '#fff',
              boxShadow: '0 2px 8px rgba(24,144,255,0.15)',
            }}
          ></Magnifier>
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);

    const magnifierComponent = magnifierRef.current;
    const { focusRange } = magnifierComponent.props;
    expect(focusRange).toEqual([42, 49]);
    const { focusDataArray } = magnifierComponent.createFocusAttrController();
    expect(focusDataArray[0].children.length).toBe(8);

    expect(context).toMatchImageSnapshot();
  });

  it('smooth', async () => {
    const context = createContext('Magnifier smooth line', {
      width: '500px',
      height: '200px',
    });
    const { props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Line x="date" y="value" color="#1890FF" shape="smooth" />
          <Magnifier
            focusRange={[data.length - 18, data.length - 14]}
            radius={'80px'}
            frameStyle={{
              background: '#fff',
              boxShadow: '0 2px 8px rgba(24,144,255,0.15)',
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

  it('lines render', async () => {
    const context = createContext('Magnifier lines render', {
      width: '500px',
      height: '200px',
    });
    const { props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Line x="date" y="value" color="rgb(208,178,136)" />
          <Magnifier
            focusRange={[data.length - 9, data.length - 1]}
            referenceLines={[
              {
                records: [
                  { date: 'min', value: 50 },
                  { date: 'max', value: 50 },
                ],
              },
            ]}
            frameStyle={{
              background: '#fff',
              boxShadow: '0 2px 8px rgba(24,144,255,0.15)',
            }}
          ></Magnifier>
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('动态折线图', async () => {
    const context = createContext('动态折线图');
    const demoData = [];

    // 添加数据，模拟数据，可以指定当前时间的偏移的秒
    function getRecord(offset?) {
      offset = offset || 0;
      return {
        time: new Date().getTime() + offset * 1000,
        value: Math.random() + 10,
      };
    }
    demoData.push(getRecord(-3));
    demoData.push(getRecord(-2));
    demoData.push(getRecord(-1));

    const lineRef = { current: null };

    class DynamicLine extends Component {
      constructor(props) {
        super(props);
        this.state = {
          data: demoData,
        };
      }

      didMount() {
        setTimeout(() => {
          const { data } = this.state;
          let newData = [].concat(data);
          for (let i = 0; i <= 10; i++) {
            newData.push(getRecord(i));
          }
          this.setState({ data: newData });
        }, 20);
      }

      render() {
        const { data } = this.state;

        return (
          <Chart
            data={data}
            scale={{
              time: {
                type: 'timeCat',
              },
              value: {
                range: [0, 0.7],
              },
            }}
          >
            <Line x="time" y="value" />
            <Magnifier focusRange={[data.length - 9, data.length - 1]} ref={lineRef}></Magnifier>
            <Axis field="value" />
            <Axis field="time" />
          </Chart>
        );
      }
    }
    const { props } = (
      <Canvas context={context} animate={false}>
        <DynamicLine />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    const container = lineRef.current.container;
    const polyline = container.children[0].children[0].childNodes[1];

    expect(polyline.getAttribute('points').length).toBe(3);

    await delay(200);
    const newPolyline = container.children[0].children[0].childNodes[1];

    expect(newPolyline.getAttribute('points').length > 3).toBe(true);
  });

  it('分组折线图', async () => {
    const context = createContext('Magnifier 分组折线图', {
      width: '600px',
      height: '300px',
    });

    const groupData = [
      { date: '2017-01-01', type: 'A', value: 160 },
      { date: '2017-01-02', type: 'A', value: 150 },
      { date: '2017-01-03', type: 'A', value: 145 },
      { date: '2017-01-04', type: 'A', value: 140 },
      { date: '2017-01-05', type: 'A', value: 135 },
      { date: '2017-01-06', type: 'A', value: 130 },
      { date: '2017-01-07', type: 'A', value: 125 },
      { date: '2017-01-08', type: 'A', value: 120 },
      { date: '2017-01-09', type: 'A', value: 115 },
      { date: '2017-01-10', type: 'A', value: 110 },
      { date: '2017-01-01', type: 'B', value: 125 },
      { date: '2017-01-02', type: 'B', value: 115 },
      { date: '2017-01-03', type: 'B', value: 108 },
      { date: '2017-01-04', type: 'B', value: 105 },
      { date: '2017-01-05', type: 'B', value: 98 },
      { date: '2017-01-06', type: 'B', value: 95 },
      { date: '2017-01-07', type: 'B', value: 88 },
      { date: '2017-01-08', type: 'B', value: 85 },
      { date: '2017-01-09', type: 'B', value: 80 },
      { date: '2017-01-10', type: 'B', value: 75 },
      { date: '2017-01-01', type: 'C', value: 105 },
      { date: '2017-01-02', type: 'C', value: 95 },
      { date: '2017-01-03', type: 'C', value: 88 },
      { date: '2017-01-04', type: 'C', value: 85 },
      { date: '2017-01-05', type: 'C', value: 78 },
      { date: '2017-01-06', type: 'C', value: 75 },
      { date: '2017-01-07', type: 'C', value: 68 },
      { date: '2017-01-08', type: 'C', value: 65 },
      { date: '2017-01-09', type: 'C', value: 60 },
      { date: '2017-01-10', type: 'C', value: 55 },
    ];

    const magnifierRef = { current: null };
    const { props } = (
      <Canvas context={context}>
        <Chart
          data={groupData}
          style={{
            padding: ['50px', '50px', '50px', '50px'],
          }}
          scale={{
            date: {
              type: 'timeCat',
            },
            value: {
              min: 0,
            },
          }}
        >
          <Line x="date" y="value" color="type" />
          <Axis field="value" />
          <Axis field="date" />
          <Magnifier
            ref={magnifierRef}
            focusRange={[0, 9]} // 聚焦前10个数据点
            radius={'100px'}
            frameStyle={{
              background: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '2px solid #1890FF',
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);

    const magnifierComponent = magnifierRef.current;
    const { focusRange } = magnifierComponent.props;
    expect(focusRange).toEqual([0, 9]);

    const { focusDataArray } = magnifierComponent.createFocusAttrController();
    // 验证聚焦数据包含所有三个系列的前10个数据点
    expect(focusDataArray.length).toBe(3); // 3个系列 × 10个数据点

    // 验证聚焦数据包含所有三个类型
    const types = Array.from(new Set(focusDataArray.map((item) => item.key)));
    expect(types).toEqual(['A', 'B', 'C']);

    expect(context).toMatchImageSnapshot();
  });

  it('offsetX and offsetY', async () => {
    const context = createContext('Magnifier offsetX/offsetY', {
      width: '500px',
      height: '200px',
    });
    const magnifierRef = { current: null };
    const { props } = (
      <Canvas context={context}>
        <Chart
          data={data}
          style={{
            padding: ['50px', '50px', '50px', '50px'],
          }}
        >
          <Line x="date" y="value" color="rgb(208,178,136)" />
          <Magnifier
            ref={magnifierRef}
            focusRange={[data.length - 8, data.length - 1]}
            offsetX={'-100px'}
            offsetY={'20px'}
            frameStyle={{
              background: '#fff',
              boxShadow: '0 2px 8px rgba(24,144,255,0.15)',
            }}
          ></Magnifier>
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();
    await delay(800);
    expect(context).toMatchImageSnapshot();
  });
});
