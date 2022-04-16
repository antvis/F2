/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Tooltip, Axis } from '@antv/f2';
import { processUserOpt, processAnimationTypeCfg } from '@antv/f2';

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
  {
    year: '1959 年',
    sales: 38,
  },
  {
    year: '1960 年',
    sales: 38,
  },
  {
    year: '1962 年',
    sales: 38,
  },
];

// 普通配置无需处理
const duration = 1000;
// 差异化配置需经processUserOpt方法处理
const delay = processUserOpt(data, {
  xField: 'year',
  fields: ['year'],
  unit: 500,
});

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        sales: {
          tickCount: 5,
        },
      }}
    >
      <Axis field="year" />
      <Axis field="sales" />
      <Interval
        x="year"
        y="sales"
        animation={{
          // item为固定参数，无需手动配置
          appear: (item) => {
            // 将处理过的配置以对象形式传入，与普通动画配置方式类似
            return processAnimationTypeCfg({ delay, duration, easing: 'elasticOut' }, item);
          },
          update: {},
        }}
      />
      <Tooltip />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
