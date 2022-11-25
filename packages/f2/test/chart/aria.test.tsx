import { jsx, Canvas, Chart, Axis, Interval, Legend } from '../../src';
import { createContext, delay } from '../util';
const context = createContext('pattern', { width: '400px', height: '225px' });

const data = [
  {
    name: 'London',
    月份: 'Jan.',
    月均降雨量: 18.9,
  },
  {
    name: 'London',
    月份: 'Feb.',
    月均降雨量: 28.8,
  },
  {
    name: 'London',
    月份: 'Mar.',
    月均降雨量: 39.3,
  },
  {
    name: 'London',
    月份: 'Apr.',
    月均降雨量: 81.4,
  },
  {
    name: 'London',
    月份: 'May.',
    月均降雨量: 47,
  },
  {
    name: 'Berlin',
    月份: 'Jan.',
    月均降雨量: 12.4,
  },
  {
    name: 'Berlin',
    月份: 'Feb.',
    月均降雨量: 23.2,
  },
  {
    name: 'Berlin',
    月份: 'Mar.',
    月均降雨量: 34.5,
  },
  {
    name: 'Berlin',
    月份: 'Apr.',
    月均降雨量: 99.7,
  },
  {
    name: 'Berlin',
    月份: 'May.',
    月均降雨量: 52.6,
  },
  {
    name: 'Wales',
    月份: 'Jan.',
    月均降雨量: 20.4,
  },
  {
    name: 'Wales',
    月份: 'Feb.',
    月均降雨量: 10.2,
  },
  {
    name: 'Wales',
    月份: 'Mar.',
    月均降雨量: 24.5,
  },
  {
    name: 'Wales',
    月份: 'Apr.',
    月均降雨量: 39.7,
  },
  {
    name: 'Wales',
    月份: 'May.',
    月均降雨量: 72.6,
  },
];
const renderNoise = (attrShape, ctx) => {
  if (attrShape === 'circle') {
    for (let i = 0.5; i < 20; i += 10) {
      ctx.moveTo(3, i + 3);
      ctx.arc(3, i + 3, 1, 0, 2 * Math.PI);
      ctx.fillStyle = '#a1a1a1';
      ctx.fill();
      ctx.restore();

      ctx.moveTo(8, i + 7);
      ctx.arc(8, i + 7, 1, 0, 2 * Math.PI);
      ctx.fillStyle = '#a1a1a1';
      ctx.fill();
      ctx.restore();
    }
    return;
  }
  if (attrShape === 'rect') {
    for (let i = 0.5; i < 20; i += 10) {
      ctx.moveTo(0, i + 3);
      ctx.fillStyle = '#a1a1a1';
      ctx.fillRect(0, i + 3, 5, 2);
      ctx.restore();

      ctx.moveTo(5, i + 7);
      ctx.fillRect(5, i + 7, 5, 2);
      ctx.restore();
    }
    return;
  }
  for (let i = 0.5; i < 20; i += 10) {
    ctx.moveTo(0, i);
    ctx.lineTo(20, i + 15);
  }
};
const renderPattern = (color = '#fff', attrShape = 'line') => {
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 20;
  patternCanvas.height = 20;
  const ctx = patternCanvas.getContext('2d');
  ctx.strokeStyle = '#a1a1a1';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 20, 20);
  renderNoise(attrShape, ctx);

  ctx.stroke();
  return {
    image: patternCanvas,
    repetition: 'repeat',
  };
};

describe('Chart', () => {
  it('Chart render', async () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="月份" />
          <Axis field="月均降雨量" />
          <Interval
            x="月份"
            y="月均降雨量"
            color={[
              'name',
              [
                renderPattern('#1890FF', 'rect'),
                renderPattern('#2FC25B', 'circle'),
                renderPattern('#FACC14'),
              ],
            ]}
            adjust={{
              type: 'dodge',
              marginRatio: 0.05, // 设置分组间柱子的间距
            }}
          />
          <Legend />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
  });
});
