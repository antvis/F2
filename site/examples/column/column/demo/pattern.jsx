/** @jsx jsx */
import { Axis, Canvas, Chart, Interval, jsx } from '@antv/f2';

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

  const context = document.getElementById('container').getContext('2d');

  const { props } = (
    <Canvas context={context}>
      <Chart data={data}>
        <Axis field="year" />
        <Axis field="sales" />
        <Interval x="year" y="sales"  
        color={{
              range: [
                {
                  image: 'https://gw.alipayobjects.com/zos/rmsportal/cNOctfQVgZmwaXeBITuD.jpg',
                  repetition: 'repeat',
                },
              ],
            }}/>
      </Chart>
    </Canvas>
  );

  const canvas = new Canvas(props);

  canvas.render();

