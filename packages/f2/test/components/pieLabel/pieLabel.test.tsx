import { jsx } from '../../../src';
import { Polar } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Interval, PieLabel } from '../../../src/components';
import { createContext, delay } from '../../util';

describe('PieLabel', () => {
  it('默认显示', async () => {
    const context = createContext('默认显示', { width: '300px', height: '150px' });
    const data = [
      {
        amount: 20,
        memo: 'Study',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Eat',
        const: 'const',
      },
      {
        amount: 20,
        memo: 'Sports',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Other',
        const: 'const',
      },
    ];
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            type: Polar,
            transposed: true,
            innerRadius: 0.3,
            radius: 0.5,
          }}
        >
          <Interval x="const" y="amount" adjust="stack" color="memo" />
          <PieLabel
            label1={(data) => {
              return {
                text: data.memo,
              };
            }}
            label2={(data) => {
              return {
                fill: '#000000',
                text: '$' + data.amount.toFixed(2),
              };
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(300);
    expect(context).toMatchImageSnapshot();
  });

  it('左边超过最大显示个数，第四象限显示在第一象限', async () => {
    const context = createContext('左边超过最大显示个数，第四象限显示在第一象限', {
      width: '300px',
      height: '150px',
    });
    const data = [
      {
        amount: 20,
        memo: 'Study',
        const: 'const',
      },
      {
        amount: 30,
        memo: 'Eat',
        const: 'const',
      },
      {
        amount: 20,
        memo: 'Basketball',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Football',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Volleyball',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Other',
        const: 'const',
      },
    ];
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            type: Polar,
            transposed: true,
            innerRadius: 0.3,
            radius: 0.5,
          }}
        >
          <Interval x="const" y="amount" adjust="stack" color="memo" />
          <PieLabel
            label1={(data) => {
              return {
                text: data.memo,
              };
            }}
            label2={(data) => {
              return {
                fill: '#000000',
                text: '$' + data.amount.toFixed(2),
              };
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(300);
    expect(context).toMatchImageSnapshot();
  });

  it('左边超过最大显示个数，第三象限显示在第二象限', async () => {
    const context = createContext('左边超过最大显示个数，第三象限显示在第二象限', {
      width: '300px',
      height: '150px',
    });
    const data = [
      {
        amount: 20,
        memo: 'Study',
        const: 'const',
      },
      {
        amount: 30,
        memo: 'Eat',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Basketball',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Football',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Volleyball',
        const: 'const',
      },
      {
        amount: 20,
        memo: 'Other',
        const: 'const',
      },
    ];
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            type: Polar,
            transposed: true,
            innerRadius: 0.3,
            radius: 0.5,
          }}
        >
          <Interval x="const" y="amount" adjust="stack" color="memo" />
          <PieLabel
            label1={(data) => {
              return {
                text: data.memo,
              };
            }}
            label2={(data) => {
              return {
                fill: '#000000',
                text: '$' + data.amount.toFixed(2),
              };
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(300);
    expect(context).toMatchImageSnapshot();
  });

  it('右边超过最大显示个数，第一象限显示在第四象限', async () => {
    const context = createContext('右边超过最大显示个数，第一象限显示在第四象限', {
      width: '300px',
      height: '150px',
    });
    const data = [
      {
        amount: 10,
        memo: 'Language',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Math',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Foreign',
        const: 'const',
      },
      {
        amount: 20,
        memo: 'Eat',
        const: 'const',
      },
      {
        amount: 30,
        memo: 'Sports',
        const: 'const',
      },
      {
        amount: 20,
        memo: 'Other',
        const: 'const',
      },
    ];
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            type: Polar,
            transposed: true,
            innerRadius: 0.3,
            radius: 0.5,
          }}
        >
          <Interval x="const" y="amount" adjust="stack" color="memo" />
          <PieLabel
            label1={(data) => {
              return {
                text: data.memo,
              };
            }}
            label2={(data) => {
              return {
                fill: '#000000',
                text: '$' + data.amount.toFixed(2),
              };
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(300);
    expect(context).toMatchImageSnapshot();
  });

  it('右边超过最大显示个数，第二象限显示在第三象限', async () => {
    const context = createContext('右边超过最大显示个数，第二象限显示在第三象限', {
      width: '300px',
      height: '150px',
    });
    const data = [
      {
        amount: 20,
        memo: 'Eat',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Language',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Math',
        const: 'const',
      },
      {
        amount: 10,
        memo: 'Foreign',
        const: 'const',
      },

      {
        amount: 30,
        memo: 'Sports',
        const: 'const',
      },
      {
        amount: 20,
        memo: 'Other',
        const: 'const',
      },
    ];
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            type: Polar,
            transposed: true,
            innerRadius: 0.3,
            radius: 0.5,
          }}
        >
          <Interval x="const" y="amount" adjust="stack" color="memo" />
          <PieLabel
            label1={(data) => {
              return {
                text: data.memo,
              };
            }}
            label2={(data) => {
              return {
                fill: '#000000',
                text: '$' + data.amount.toFixed(2),
              };
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(300);
    expect(context).toMatchImageSnapshot();
  });
});
