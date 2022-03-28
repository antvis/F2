/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  {
    year: '1951 年',
    sales: 38,
  },
  {
    year: '1952 年',
    sales: 52,
  },
  {
    year: '1956 年',
    sales: 61,
  },
  {
    year: '1957 年',
    sales: 145,
  },
  {
    year: '1958 年',
    sales: 48,
  },
];

const img = new Image();
img.src = 'https://gw.alipayobjects.com/zos/rmsportal/cNOctfQVgZmwaXeBITuD.jpg';

img.onload = function() {
  const pattern = context.createPattern(img, 'repeat');

  const context = document.getElementById('container').getContext('2d');
  const { props } = (
    <Canvas context={context}>
      <Chart data={data}>
        <Axis field="year" />
        <Axis field="sales" />
        <Interval x="year" y="sales" color={pattern} />
      </Chart>
    </Canvas>
  );

  const canvas = new Canvas(props);

  canvas.render();
};
