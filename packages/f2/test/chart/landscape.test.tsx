import { jsx, Canvas, Chart, Axis, Interval, Tooltip } from '../../src';
import { createContext, delay, gestureSimulator } from '../util';
const context = createContext('', {
  width: '100%',
  height: '100%',
});

const containerEl = document.createElement('div');
containerEl.style.width = '470px';
containerEl.style.height = '300px';
containerEl.style.transformOrigin = 'left top';
containerEl.style.transform = 'translate(300px, 0) rotate(90deg)';

document.body.appendChild(containerEl);
containerEl.appendChild(context.canvas);

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
];

describe.skip('横屏', () => {
  it('横屏显示', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1} landscape={true}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip
            snap
            showTooltipMarker
            markerBackgroundStyle={{ fill: 'l(90) 0:#ffffff 0.5:#7ec2f3 1:#1890ff', opacity: 0.3 }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 270, y: 70 });
    await delay(500);
    expect(context).toMatchImageSnapshot();
  });
});
