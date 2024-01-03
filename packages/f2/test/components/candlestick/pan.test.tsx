import { jsx } from '../../../src';
import { Canvas, Chart, Candlestick, Axis, ScrollBar } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';
const context = createContext();

const data = [
  {
    value: [559.8867, 556.0103, 551.9092, 566.5159],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-19',
  },
  {
    value: [560.3971, 561.7968, 555.862, 570.6991],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-16',
  },
  {
    value: [553.6004, 559.8932, 547.7492, 563.5916],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-15',
  },
  {
    value: [548.3811, 551.9996, 543.2821, 559.8399],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-14',
  },
  {
    value: [550.2547, 548.2714, 542.5419, 556.425],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-13',
  },
  {
    value: [554.7497, 550.9158, 542.1922, 559.8616],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-12',
  },
  {
    value: [551.3901, 555.6387, 546.2585, 562.8118],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-09',
  },
  {
    value: [554.5496, 551.7763, 545.2867, 559.3196],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-08',
  },
  {
    value: [559.5284, 554.6605, 550.6879, 565.1796],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-07',
  },
  {
    value: [568.3989, 559.5284, 556.1166, 574.7107],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-06',
  },
  {
    value: [566.1414, 568.6264, 559.138, 575.2344],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-05',
  },
  {
    value: [566.7634, 564.7859, 560.0398, 573.0916],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-02',
  },
  {
    value: [565.918, 565.0119, 558.7824, 576.4514],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-06-01',
  },
  {
    value: [577.9214, 566.3144, 561.2328, 584.5622],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-31',
  },
  {
    value: [583.5348, 577.4594, 567.5868, 591.1291],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-30',
  },
  {
    value: [585.0556, 584.1774, 576.7428, 594.1294],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-29',
  },
  {
    value: [575.7788, 585.4068, 571.5702, 592.0946],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-26',
  },
  {
    value: [579.1444, 576.5283, 568.68, 584.3184],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-25',
  },
  {
    value: [587.1258, 581.3535, 573.9319, 592.1913],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-24',
  },
  {
    value: [584.1688, 589.0106, 581.602, 599.1609],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-23',
  },
  {
    value: [581.4904, 583.3521, 574.509, 593.1842],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-22',
  },
  {
    value: [573.466, 581.7813, 569.0503, 587.688],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-19',
  },
  {
    value: [578.0325, 573.466, 569.2464, 583.177],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-18',
  },
  {
    value: [580.1243, 578.0325, 569.6653, 584.7727],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-17',
  },
  {
    value: [575.972, 581.054, 570.4904, 588.5912],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-16',
  },
  {
    value: [561.1129, 571.0043, 554.5373, 574.9384],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-15',
  },
  {
    value: [565.9743, 562.0121, 558.2763, 574.6912],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-12',
  },
  {
    value: [567.6747, 566.0309, 561.6097, 580.7117],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-11',
  },
  {
    value: [565.0152, 566.8245, 558.4564, 573.4964],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-10',
  },
  {
    value: [572.4006, 565.411, 560.9995, 578.2443],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-09',
  },
  {
    value: [577.0122, 572.9162, 565.4166, 583.7042],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-08',
  },
  {
    value: [591.865, 576.8968, 571.4538, 594.5864],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-05',
  },
  {
    value: [584.0125, 591.6283, 579.9117, 600.3571],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-05-04',
  },
  {
    value: [583.956, 585.8286, 573.3642, 593.3775],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-04-28',
  },
  {
    value: [573.7591, 585.1849, 568.4768, 592.3619],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-04-27',
  },
  {
    value: [566.4006, 574.161, 560.5094, 581.6949],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-04-26',
  },
  {
    value: [578.2053, 566.4572, 557.6606, 583.0088],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-04-25',
  },
  {
    value: [579.7089, 578.7262, 569.8245, 593.3505],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-04-24',
  },
  {
    value: [581.4119, 578.0326, 573.4298, 591.0253],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-04-21',
  },
  {
    value: [590.0756, 582.6354, 578.3248, 595.6262],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-04-20',
  },
  {
    value: [597.7922, 590.4889, 586.5978, 603.0003],
    symbol: '813701.CNS',
    factor: 'kline_day_candle',
    time: '2023-04-19',
  },
];

describe('candlestick', () => {
  it('swipe', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Axis
            field="time"
            type="timeCat"
            tickCount={3}
            style={{
              label: {
                align: 'auto',
              },
              tickLine: {
                length: 10,
                lineWidth: '10px',
                stroke: 'red',
              },
            }}
          />
          <Axis field="value" />
          <Candlestick x="time" y="value" />
          <ScrollBar mode="x" range={[0.3, 0.6]} swipe={true} swipeDuration={100} autoFit={true} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();

    await delay(20);
    await gestureSimulator(context.canvas, 'touchstart', { x: 210, y: 169 });
    await gestureSimulator(context.canvas, 'touchmove', { x: 200, y: 169 });
    await gestureSimulator(context.canvas, 'touchend', { x: 200, y: 169 });
    await delay(3000);
    expect(context).toMatchImageSnapshot();

    const { props: nextProps } = (
      <Canvas context={context} animate={false} pixelRatio={2}>
        <Chart data={[].concat(data).slice(0, 30)}>
          <Axis
            field="time"
            type="timeCat"
            tickCount={3}
            style={{
              label: {
                align: 'auto',
              },
              tickLine: {
                length: 10,
                lineWidth: '10px',
                stroke: 'red',
              },
            }}
          />
          <Axis field="value" />
          <Candlestick x="time" y="value" />
          <ScrollBar mode="x" range={[0.3, 0.8]} swipe={true} swipeDuration={100} autoFit={true} />
        </Chart>
      </Canvas>
    );

    await delay(100);
    await canvas.update(nextProps);
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
