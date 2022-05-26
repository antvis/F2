import { jsx } from '../../../src/jsx';
import { Rect } from '../../../src/coord';
import { Canvas, Chart, Area, Line, Axis, Interval, Legend } from '../../../src';
import { createContext, delay } from '../../util';

const data = [
  {
    time: 'Jan.',
    tem: 1000,
  },
  {
    time: 'Feb.',
    tem: 2200,
  },
  {
    time: 'Mar.',
    tem: 2000,
  },
  {
    time: 'Apr.',
    tem: 2600,
  },
  {
    time: 'May.',
    tem: 2000,
  },
  {
    time: 'Jun.',
    tem: 2600,
  },
  {
    time: 'Jul.',
    tem: 2800,
  },
  {
    time: 'Aug.',
    tem: 2000,
  },
];

function formatterPercent(value) {
  value = value || 0;
  value = value * 100;
  return parseInt(value) + '%';
}

describe('面积图', () => {
  describe('基础面积图', () => {
    it('基础面积图', async () => {
      const context = createContext('基础面积图');
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            data={data}
            scale={{
              tem: {
                min: 0,
                tickCount: 5,
              },
              time: {
                range: [0, 1],
              },
            }}
          >
            <Axis field="time" />
            <Axis field="tem" />
            <Area x="time" y="tem" />
            <Line x="time" y="tem" />
          </Chart>
        </Canvas>
      );
      const chart = new Canvas(props);
      chart.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('带负值面积图', async () => {
      const context = createContext('带负值面积图');
      const data = [
        {
          month: 'Jan.',
          value: 6.06,
        },
        {
          month: 'Feb.',
          value: 82.2,
        },
        {
          month: 'Mar.',
          value: -22.11,
        },
        {
          month: 'Apr.',
          value: 21.53,
        },
        {
          month: 'May.',
          value: -21.74,
        },
        {
          month: 'Jun.',
          value: 73.61,
        },
        {
          month: 'Jul.',
          value: 53.75,
        },
        {
          month: 'Aug.',
          value: 60.32,
        },
      ];
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            data={data}
            scale={{
              month: {
                range: [0, 1],
              },
              value: {
                nice: false,
                min: -100,
                max: 100,
                tickCount: 5,
              },
            }}
          >
            <Axis field="month" />
            <Axis field="value" />
            <Area x="month" y="value" startOnZero={true} />
            <Line x="month" y="value" />
          </Chart>
        </Canvas>
      );
      const chart = new Canvas(props);
      chart.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('带负值面积图(x基线不为0)', async () => {
      const context = createContext('带负值面积图(x基线不为0)');
      const data = [
        {
          month: 'Jan.',
          value: 6.06,
        },
        {
          month: 'Feb.',
          value: 82.2,
        },
        {
          month: 'Mar.',
          value: -22.11,
        },
        {
          month: 'Apr.',
          value: 21.53,
        },
        {
          month: 'May.',
          value: -21.74,
        },
        {
          month: 'Jun.',
          value: 73.61,
        },
        {
          month: 'Jul.',
          value: 53.75,
        },
        {
          month: 'Aug.',
          value: 60.32,
        },
      ];
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            data={data}
            scale={{
              month: {
                range: [0, 1],
              },
              value: {
                tickCount: 5,
              },
            }}
          >
            <Axis field="month" />
            <Axis field="value" />
            <Area x="month" y="value" startOnZero={false} />
            <Line x="month" y="value" />
          </Chart>
        </Canvas>
      );
      const chart = new Canvas(props);
      chart.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('渐变填充面积图', async () => {
      const context = createContext('渐变填充面积图');
      const data = [
        {
          time: '2016-08-08 00:00:00',
          tem: 10,
        },
        {
          time: '2016-08-08 00:10:00',
          tem: 22,
        },
        {
          time: '2016-08-08 00:30:00',
          tem: 16,
        },
        {
          time: '2016-08-09 00:35:00',
          tem: 26,
        },
        {
          time: '2016-08-09 01:00:00',
          tem: 12,
        },
        {
          time: '2016-08-09 01:20:00',
          tem: 26,
        },
        {
          time: '2016-08-10 01:40:00',
          tem: 18,
        },
        {
          time: '2016-08-10 02:00:00',
          tem: 26,
        },
        {
          time: '2016-08-10 02:20:00',
          tem: 12,
        },
      ];
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            data={data}
            scale={{
              time: {
                type: 'timeCat',
                tickCount: 3,
              },
              tem: {
                min: 0,
              },
            }}
          >
            <Axis field="time" />
            <Axis field="tem" />
            <Area x="time" y="tem" color="l(90) 0:#1890FF 1:#f7f7f7" shape="smooth" />
            <Line x="time" y="tem" color="l(90) 0:#1890FF 1:#f7f7f7" shape="smooth" />
          </Chart>
        </Canvas>
      );
      const chart = new Canvas(props);
      chart.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('层叠面积图', () => {
    it('层叠面积图', async () => {
      const context = createContext('层叠面积图');
      const areaRef = { current: null };
      const data = [
        {
          value: 63.4,
          city: 'New York',
          date: '2011-10-01',
        },
        {
          value: 62.7,
          city: 'Alaska',
          date: '2011-10-01',
        },
        {
          value: 72.2,
          city: 'Austin',
          date: '2011-10-01',
        },
        {
          value: 58,
          city: 'New York',
          date: '2011-10-02',
        },
        {
          value: 59.9,
          city: 'Alaska',
          date: '2011-10-02',
        },
        {
          value: 67.7,
          city: 'Austin',
          date: '2011-10-02',
        },
        {
          value: 53.3,
          city: 'New York',
          date: '2011-10-03',
        },
        {
          value: 59.1,
          city: 'Alaska',
          date: '2011-10-03',
        },
        {
          value: 69.4,
          city: 'Austin',
          date: '2011-10-03',
        },
        {
          value: 55.7,
          city: 'New York',
          date: '2011-10-04',
        },
        {
          value: 58.8,
          city: 'Alaska',
          date: '2011-10-04',
        },
        {
          value: 68,
          city: 'Austin',
          date: '2011-10-04',
        },
        {
          value: 64.2,
          city: 'New York',
          date: '2011-10-05',
        },
        {
          value: 58.7,
          city: 'Alaska',
          date: '2011-10-05',
        },
        {
          value: 72.4,
          city: 'Austin',
          date: '2011-10-05',
        },
        {
          value: 58.8,
          city: 'New York',
          date: '2011-10-06',
        },
        {
          value: 57,
          city: 'Alaska',
          date: '2011-10-06',
        },
        {
          value: 77,
          city: 'Austin',
          date: '2011-10-06',
        },
        {
          value: 57.9,
          city: 'New York',
          date: '2011-10-07',
        },
        {
          value: 56.7,
          city: 'Alaska',
          date: '2011-10-07',
        },
        {
          value: 82.3,
          city: 'Austin',
          date: '2011-10-07',
        },
        {
          value: 61.8,
          city: 'New York',
          date: '2011-10-08',
        },
        {
          value: 56.8,
          city: 'Alaska',
          date: '2011-10-08',
        },
        {
          value: 78.9,
          city: 'Austin',
          date: '2011-10-08',
        },
        {
          value: 69.3,
          city: 'New York',
          date: '2011-10-09',
        },
        {
          value: 56.7,
          city: 'Alaska',
          date: '2011-10-09',
        },
        {
          value: 68.8,
          city: 'Austin',
          date: '2011-10-09',
        },
        {
          value: 71.2,
          city: 'New York',
          date: '2011-10-10',
        },
        {
          value: 60.1,
          city: 'Alaska',
          date: '2011-10-10',
        },
        {
          value: 68.7,
          city: 'Austin',
          date: '2011-10-10',
        },
        {
          value: 68.7,
          city: 'New York',
          date: '2011-10-11',
        },
        {
          value: 61.1,
          city: 'Alaska',
          date: '2011-10-11',
        },
        {
          value: 70.3,
          city: 'Austin',
          date: '2011-10-11',
        },
        {
          value: 61.8,
          city: 'New York',
          date: '2011-10-12',
        },
        {
          value: 61.5,
          city: 'Alaska',
          date: '2011-10-12',
        },
        {
          value: 75.3,
          city: 'Austin',
          date: '2011-10-12',
        },
        {
          value: 63,
          city: 'New York',
          date: '2011-10-13',
        },
        {
          value: 64.3,
          city: 'Alaska',
          date: '2011-10-13',
        },
        {
          value: 76.6,
          city: 'Austin',
          date: '2011-10-13',
        },
        {
          value: 66.9,
          city: 'New York',
          date: '2011-10-14',
        },
        {
          value: 67.1,
          city: 'Alaska',
          date: '2011-10-14',
        },
        {
          value: 66.6,
          city: 'Austin',
          date: '2011-10-14',
        },
        {
          value: 61.7,
          city: 'New York',
          date: '2011-10-15',
        },
        {
          value: 64.6,
          city: 'Alaska',
          date: '2011-10-15',
        },
        {
          value: 68,
          city: 'Austin',
          date: '2011-10-15',
        },
        {
          value: 61.8,
          city: 'New York',
          date: '2011-10-16',
        },
        {
          value: 61.6,
          city: 'Alaska',
          date: '2011-10-16',
        },
        {
          value: 70.6,
          city: 'Austin',
          date: '2011-10-16',
        },
        {
          value: 62.8,
          city: 'New York',
          date: '2011-10-17',
        },
        {
          value: 61.1,
          city: 'Alaska',
          date: '2011-10-17',
        },
        {
          value: 71.1,
          city: 'Austin',
          date: '2011-10-17',
        },
        {
          value: 60.8,
          city: 'New York',
          date: '2011-10-18',
        },
        {
          value: 59.2,
          city: 'Alaska',
          date: '2011-10-18',
        },
        {
          value: 70,
          city: 'Austin',
          date: '2011-10-18',
        },
        {
          value: 62.1,
          city: 'New York',
          date: '2011-10-19',
        },
        {
          value: 58.9,
          city: 'Alaska',
          date: '2011-10-19',
        },
        {
          value: 61.6,
          city: 'Austin',
          date: '2011-10-19',
        },
        {
          value: 65.1,
          city: 'New York',
          date: '2011-10-20',
        },
        {
          value: 57.2,
          city: 'Alaska',
          date: '2011-10-20',
        },
        {
          value: 57.4,
          city: 'Austin',
          date: '2011-10-20',
        },
        {
          value: 55.6,
          city: 'New York',
          date: '2011-10-21',
        },
        {
          value: 56.4,
          city: 'Alaska',
          date: '2011-10-21',
        },
        {
          value: 64.3,
          city: 'Austin',
          date: '2011-10-21',
        },
        {
          value: 54.4,
          city: 'New York',
          date: '2011-10-22',
        },
        {
          value: 60.7,
          city: 'Alaska',
          date: '2011-10-22',
        },
        {
          value: 72.4,
          city: 'Austin',
          date: '2011-10-22',
        },
        {
          value: 54.4,
          city: 'New York',
          date: '2011-10-23',
        },
        {
          value: 65.1,
          city: 'Alaska',
          date: '2011-10-23',
        },
        {
          value: 72.4,
          city: 'Austin',
          date: '2011-10-23',
        },
        {
          value: 54.8,
          city: 'New York',
          date: '2011-10-24',
        },
        {
          value: 60.9,
          city: 'Alaska',
          date: '2011-10-24',
        },
        {
          value: 72.5,
          city: 'Austin',
          date: '2011-10-24',
        },
        {
          value: 57.9,
          city: 'New York',
          date: '2011-10-25',
        },
        {
          value: 56.1,
          city: 'Alaska',
          date: '2011-10-25',
        },
        {
          value: 72.7,
          city: 'Austin',
          date: '2011-10-25',
        },
        {
          value: 54.6,
          city: 'New York',
          date: '2011-10-26',
        },
        {
          value: 54.6,
          city: 'Alaska',
          date: '2011-10-26',
        },
        {
          value: 73.4,
          city: 'Austin',
          date: '2011-10-26',
        },
        {
          value: 54.4,
          city: 'New York',
          date: '2011-10-27',
        },
        {
          value: 56.1,
          city: 'Alaska',
          date: '2011-10-27',
        },
        {
          value: 70.7,
          city: 'Austin',
          date: '2011-10-27',
        },
        {
          value: 42.5,
          city: 'New York',
          date: '2011-10-28',
        },
        {
          value: 58.1,
          city: 'Alaska',
          date: '2011-10-28',
        },
        {
          value: 56.8,
          city: 'Austin',
          date: '2011-10-28',
        },
        {
          value: 40.9,
          city: 'New York',
          date: '2011-10-29',
        },
        {
          value: 57.5,
          city: 'Alaska',
          date: '2011-10-29',
        },
        {
          value: 51,
          city: 'Austin',
          date: '2011-10-29',
        },
        {
          value: 38.6,
          city: 'New York',
          date: '2011-10-30',
        },
        {
          value: 57.7,
          city: 'Alaska',
          date: '2011-10-30',
        },
        {
          value: 54.9,
          city: 'Austin',
          date: '2011-10-30',
        },
        {
          value: 44.2,
          city: 'New York',
          date: '2011-10-31',
        },
        {
          value: 55.1,
          city: 'Alaska',
          date: '2011-10-31',
        },
        {
          value: 58.8,
          city: 'Austin',
          date: '2011-10-31',
        },
        {
          value: 49.6,
          city: 'New York',
          date: '2011-11-01',
        },
        {
          value: 57.9,
          city: 'Alaska',
          date: '2011-11-01',
        },
        {
          value: 62.6,
          city: 'Austin',
          date: '2011-11-01',
        },
        {
          value: 47.2,
          city: 'New York',
          date: '2011-11-02',
        },
        {
          value: 64.6,
          city: 'Alaska',
          date: '2011-11-02',
        },
        {
          value: 71,
          city: 'Austin',
          date: '2011-11-02',
        },
      ];
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            data={data}
            scale={{
              date: {
                range: [0, 1],
                type: 'timeCat',
                mask: 'MM-DD',
              },
              value: {
                max: 300,
                tickCount: 4,
              },
            }}
          >
            <Axis field="value" />
            <Axis field="date" />
            <Area x="date" y="value" color="city" adjust="stack" ref={areaRef} />
            <Line x="date" y="value" color="city" adjust="stack" />
            <Legend />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('区域图(存在空值)', async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/antfincdn/RJW3vmCf7v/area-none.json'
      );
      const data = await res.json();
      const context = createContext('区域图(存在空值)');
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            data={data}
            scale={{
              year: {
                tickCount: 5,
                range: [0, 1],
              },
            }}
          >
            <Axis field="value" />
            <Axis field="year" />
            <Area x="year" y="value" color="type" />
            <Line x="year" y="value" color="type" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('百分比层叠面积图', async () => {
      const context = createContext('百分比层叠面积图');
      const data = [
        {
          country: 'Asia',
          year: '1750',
          value: 502,
          percent: 0.6511024643320363,
        },
        {
          country: 'Africa',
          year: '1750',
          value: 106,
          percent: 0.13748378728923477,
        },
        {
          country: 'Europe',
          year: '1750',
          value: 163,
          percent: 0.21141374837872892,
        },
        {
          country: 'Asia',
          year: '1800',
          value: 635,
          percent: 0.671957671957672,
        },
        {
          country: 'Africa',
          year: '1800',
          value: 107,
          percent: 0.11322751322751323,
        },
        {
          country: 'Europe',
          year: '1800',
          value: 203,
          percent: 0.21481481481481482,
        },
        {
          country: 'Asia',
          year: '1850',
          value: 809,
          percent: 0.6764214046822743,
        },
        {
          country: 'Africa',
          year: '1850',
          value: 111,
          percent: 0.09280936454849498,
        },
        {
          country: 'Europe',
          year: '1850',
          value: 276,
          percent: 0.23076923076923078,
        },
        {
          country: 'Asia',
          year: '1900',
          value: 947,
          percent: 0.6364247311827957,
        },
        {
          country: 'Africa',
          year: '1900',
          value: 133,
          percent: 0.08938172043010753,
        },
        {
          country: 'Europe',
          year: '1900',
          value: 408,
          percent: 0.27419354838709675,
        },
        {
          country: 'Asia',
          year: '1950',
          value: 1402,
          percent: 0.6460829493087558,
        },
        {
          country: 'Africa',
          year: '1950',
          value: 221,
          percent: 0.10184331797235023,
        },
        {
          country: 'Europe',
          year: '1950',
          value: 547,
          percent: 0.252073732718894,
        },
        {
          country: 'Asia',
          year: '1999',
          value: 3634,
          percent: 0.7083820662768031,
        },
        {
          country: 'Africa',
          year: '1999',
          value: 767,
          percent: 0.14951267056530215,
        },
        {
          country: 'Europe',
          year: '1999',
          value: 729,
          percent: 0.14210526315789473,
        },
        {
          country: 'Asia',
          year: '2050',
          value: 5268,
          percent: 0.687548942834769,
        },
        {
          country: 'Africa',
          year: '2050',
          value: 1766,
          percent: 0.23048812320542938,
        },
        {
          country: 'Europe',
          year: '2050',
          value: 628,
          percent: 0.08196293395980161,
        },
      ];
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            data={data}
            scale={{
              year: {
                range: [0, 1],
              },
              percent: {
                formatter: (val) => formatterPercent(val),
                alias: 'percent(%)',
              },
            }}
          >
            <Axis field="percent" />
            <Axis field="year" />
            <Area x="year" y="percent" color="country" adjust="stack" />
            <Line x="year" y="percent" color="country" adjust="stack" />
            <Legend />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });
});
