import { Axis, Canvas, Chart, Children, Component, jsx, Line, TagGuide } from '../../src';
import { createContext } from '../util';
import data from './data/line-race.json';

const countries = [
  'Finland',
  'France',
  'Germany',
  'Iceland',
  'Norway',
  'Poland',
  'Russia',
  // 'United Kingdom',
];

const chartData = data.filter((item) => {
  return countries.indexOf(item.country) >= 0;
});
const context = createContext('排名折线图');

const playerList = [
  {
    duration: 2000, // 设置当前关键帧动画持续时间
    keyframes: {
      Line: {
        // 需要在图表组件中声明的组件key
        props: {
          // 当前关键帧动画需要修改的属性
          animation: {
            appear: {
              easing: 'linear',
              duration: 2000,
            },
          },
        },
      },
      'TagGuide-buy': {
        hidden: true, // 当前关键帧动画需要修改的属性 将图层隐藏不显示
      },
      'TagGuide-sell': {
        hidden: true,
      },
    },
  },
  {},
];

class Player extends Component {
  index = 0;

  constructor(props, context) {
    super(props, context);
    this.state = {
      ...this.state,
      index: 0,
    };
  }

  didMount() {
    const { props, state } = this;
    const { index } = state;
    const { playerList } = props;
    const player = playerList[index];
    setTimeout(this.next, player.duration);
  }

  next = () => {
    const { state, props } = this;
    const { index } = state;
    const { loop, playerList, delay } = props;
    const count = playerList.length;

    const next = loop ? (index + 1) % count : index + 1;
    if (next < count) {
      setTimeout(() => {
        this.setState({
          index: next,
        });
      }, delay || 0);
    }
  };

  render() {
    const { state, props } = this;
    const { playerList, children } = props;
    const { index } = state;
    const player = playerList[index];
    if (!player) return children;
    const { keyframes } = player;

    if (!keyframes) return children;

    function renderChildren(children, keyframes) {
      return Children.map(children, (child) => {
        if (!child) return child;
        const { key, props } = child;
        const subChildren = renderChildren(props.children, keyframes);

        if (keyframes[key]) {
          if (keyframes[key].hidden) {
            return null;
          }
          return Children.cloneElement(child, {
            ...keyframes[key].props,
            children: subChildren,
          });
        }
        return Children.cloneElement(child, {
          children: subChildren,
        });
      });
    }

    return renderChildren(children, keyframes);
  }
}

describe('Chart', () => {
  it('Chart render', () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Player playerList={playerList}>
          <Chart
            data={chartData}
            style={{
              padding: ['30px', '140px', '30px', '30px'],
            }}
          >
            <Axis field="year" tickCount={5} />
            <Axis field="income" />
            <Line
              key="Line"
              x="year"
              y="income"
              color="country"
              animation={{
                appear: {
                  duration: 6000,
                },
              }}
            />
            <TagGuide key="TagGuide-buy" records={[chartData[200]]} content="买入" />
          </Chart>
        </Player>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });
});
