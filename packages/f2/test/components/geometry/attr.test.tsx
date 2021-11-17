import { jsx } from '../../../src';
import { Polar, Rect } from '../../../src/coord';
import { Canvas, Chart, Component } from '../../../src';
import { Interval, Axis, Point, Line, Area } from '../../../src/components';
import { createContext } from '../../util';

const data = [
  {
    year: '1951 年',
    sales: 38,
    type: 'companyA',
  },
  {
    year: '1952 年',
    sales: 52,
    type: 'companyA',
  },
  {
    year: '1956 年',
    sales: 61,
    type: 'companyA',
  },
  {
    year: '1957 年',
    sales: 145,
    type: 'companyA',
  },
  {
    year: '1958 年',
    sales: 48,
    type: 'companyA',
  },
  {
    year: '1959 年',
    sales: 38,
    type: 'companyA',
  },
  {
    year: '1960 年',
    sales: 38,
    type: 'companyA',
  },
  {
    year: '1962 年',
    sales: 38,
    type: 'companyA',
  },
  {
    year: '1951 年',
    sales: 60,
    type: 'companyB',
  },
  {
    year: '1952 年',
    sales: 72,
    type: 'companyB',
  },
  {
    year: '1956 年',
    sales: 58,
    type: 'companyB',
  },
  {
    year: '1957 年',
    sales: 112,
    type: 'companyB',
  },
  {
    year: '1958 年',
    sales: 52,
    type: 'companyB',
  },
  {
    year: '1959 年',
    sales: 22,
    type: 'companyB',
  },
  {
    year: '1960 年',
    sales: 47,
    type: 'companyB',
  },
  {
    year: '1962 年',
    sales: 35,
    type: 'companyB',
  },
];

describe('Geometry - Attr', () => {
  /**
   * Color Attr
   * 如果接收一个参数，则可以是：
   * 1. 映射至颜色属性的数据源字段名，如果数据源中不存在这个字段名的话，则按照常量进行解析，这个时候会使用 F2 默认提供的颜色。
   * 2. 也可以直接指定某一个具体的颜色值 color，如 '#fff', 'white', 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' 等。
   */
  it('不传color', () => {
    const context = createContext('不传color', { width: '380px' });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Line x="year" y="sales" shape="type" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('color = {value}', () => {
    const context = createContext('color = {value} 传入一个颜色值', { width: '380px' });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Line x="year" y="sales" color="red" shape="type" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('color = {field}', () => {
    const context = createContext('color = {field} 传入一个分类域', { width: '380px' });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Line x="year" y="sales" size={3} color="type" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('color = {{ field, range }}', () => {
    const context = createContext('color = {{ field, range }} 传入分类域和值域', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Point
            x="year"
            y="sales"
            size={12}
            color={{
              field: 'type',
              range: ['blue', 'red'],
            }}
          />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('color = {{ type, field, range }}', () => {
    const context = createContext('color = {{ type, field, range }} 线性值域', { width: '380px' });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Point
            x="year"
            y="sales"
            size={12}
            color={{
              field: 'sales',
              range: ['blue', 'red'],
            }}
          />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);

    canvas.render();
  });
  
  it('数据更新后也更新值域', () => {
    class InjectTestComponent extends Component {
      didMount() {    
        setTimeout(() => {
          // expect: 这里播放动画
          this.props.chart.setState({
            zoomRange: [0, 0.99],
          });
        }, 1000);
      }
    }
    const context = createContext('数据更新后也更新值域', { width: '380px' });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Point
            x="year"
            y="sales"
            size={12}
            color={{
              type: 'linear',
              field: 'sales',
              range: ['blue', 'red'],
            }}
          />
          <InjectTestComponent />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
    setTimeout(() => {
      props.children.props.children[2].props.color.range = ['red', 'blue'];
      props.children.props.children[2].props.size = 24
      canvas.update(props);
    }, 300)
  });
  it('color = {{ type, field, callback }}', () => {
    const context = createContext('color = {{ type, field, callback }} 回调函数设置值域', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Point
            x="year"
            y="sales"
            size={12}
            color={{
              type: 'linear',
              field: 'sales',
              callback: (val) => {
                if (val > 70) {
                  return 'red';
                }
                return 'blue';
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
  it('color = {[ field, colors ]} ', () => {
    const context = createContext('color = {[ field, colors ]} 快捷设置', { width: '380px' });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Point x="year" y="sales" size={12} color={['type', ['blue', 'red']]} />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  /**
   * Size Attr
   * 如果接收一个参数，则可以是
   * 1. 数字常量，代表不同shape的size（如point影响半径、line/area影响线的粗细，interval影响柱状图的宽度
   * 2. 字段名，按字段的值做size大小的映射
   */
  it('不传size', () => {
    const context = createContext('不传size', { width: '380px' });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Interval x="year" y="sales" color="type" adjust="dodge" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('size = {value} 直接设置size', () => {
    const context = createContext('size = {value} 直接设置size', { width: '380px' });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Interval x="year" y="sales" size={16} color="type" adjust="dodge" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('size = {field}  用size大小来做分类', () => {
    const context = createContext('size = {field}  用size大小来做分类', { width: '380px' });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          {/* 用size大小来做分类 */}
          <Point x="year" y="sales" size="type" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it('size = {{ field, range }} 用size大小来做分类', () => {
    const context = createContext('size = {{ field, range }} 用size大小来做分类', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Interval
            x="year"
            y="sales"
            color="type"
            adjust="dodge"
            size={{
              field: 'type',
              range: [10, 20],
            }}
          />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('size = {{ type, field, range }} 数值越大，size越大', () => {
    const context = createContext('size = {{ type, field, range }} 数值越大，size越大', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Point
            x="year"
            y="sales"
            size={{
              // 数值越大，size越大
              type: 'linear',
              field: 'sales',
              range: [0, 40],
            }}
          />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('size = {{ type, field, callback }} 数值越大，size越大', () => {
    const context = createContext('size = {{ type, field, callback }} 数值越大，size越大', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Point
            x="year"
            y="sales"
            size={{
              // 数值越大，size越大
              type: 'linear', // 必须指定为连续型数据才能进行callback设置
              field: 'sales',
              callback: function(val) {
                if (val > 50) {
                  return 50;
                }
                return 10;
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

  it('size = {[ field, sizes ]} 用size大小来做分类', () => {
    const context = createContext('size = {{ type, field, callback }} 用size大小来做分类', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Point x="year" y="sales" size={['type', [10, 20]]} />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  /**
   * Shape Attr
   * 只支持接收一个参数，指定几何图像对象绘制的形状。
   */
  it('不传shape', () => {
    const context = createContext('不传shape', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Line x="year" y="sales" color="type" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('shape = {shape}', () => {
    const context = createContext('shape = {shape} 指定一种shape', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Line x="year" y="sales" color="type" shape="smooth" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('shape = {field}', () => {
    const context = createContext('shape = {field} 指定一个分类字段', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Line x="year" y="sales" color="type" shape="type" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('shape = {{ field, range }}', () => {
    const context = createContext('shape = {{ field, range }} 指定字段和值域', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Line
            x="year"
            y="sales"
            color="type"
            shape={{
              field: 'type',
              range: ['dash', 'smooth'],
            }}
          />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
  it('shape = {{ type, field, callback }}', () => {
    const context = createContext('shape = {{ type, field, callback }} 根据数据判断shape', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Line
            x="year"
            y="sales"
            size={'2px'}
            shape={{
              type: 'linear',
              field: 'type',
              callback: (type) => {
                if (type === 'companyB') {
                  return 'dash';
                }
                return 'line';
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
  it('shape = {[ field, shapes ]}', () => {
    const context = createContext('shape = {[ field, shapes ]} 数组传入', {
      width: '380px',
    });

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Line x="year" y="sales" size={'2px'} shape={['type', ['smooth', 'dash']]} />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
});
