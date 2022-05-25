import { jsx, Canvas, Component, Children, Timeline, Fragment } from '../../../../src';
import { createContext, delay } from '../../../util';

const LineWrapText = (props, context) => {
  const { attrs, width: maxWidth, textDecoration } = props;
  const { text } = attrs;
  const { measureText, px2hd } = context;

  const measureResult = measureText(text, attrs);
  let textWidth = measureResult.width;
  if (textWidth <= maxWidth) {
    return (
      <group>
        {textDecoration ? (
          <rect
            style={{
              top: measureResult.height - px2hd(textDecoration.height) + px2hd('2px'),
              width: textWidth,
            }}
            attrs={{
              ...textDecoration,
            }}
          />
        ) : null}

        <text
          style={{
            width: textWidth,
            height: measureResult.height,
          }}
          attrs={attrs}
        />
      </group>
    );
  }
  let result = '';
  const textArr = text.split('');
  for (let i = 0, len = textArr.length; i < len; i++) {
    const chart = textArr[i];
    const nextWidth = measureText(result + chart, attrs).width;
    result = nextWidth > maxWidth ? result + '\n' + chart : result + chart;
  }
  const resultMeasureResult = measureText(result, attrs);
  const lineText = result.split('\n');
  return (
    <group>
      {textDecoration ? (
        <group
          style={{
            height: 0,
          }}
        >
          {lineText.map((text) => {
            const { width, height } = measureText(text, attrs);
            return (
              <rect
                style={{
                  top: measureResult.height - px2hd(textDecoration.height) + px2hd('2px'),
                  width,
                  // 0.14 为 F2 默认的行高
                  height: height * 1.14,
                }}
                attrs={{
                  ...textDecoration,
                }}
              />
            );
          })}
        </group>
      ) : null}

      <text
        style={{
          top: 0,
          width: maxWidth,
          height: resultMeasureResult.height,
        }}
        attrs={{
          ...attrs,
          text: result,
        }}
      />
    </group>
  );
};

class ScrollBox extends Component {
  scroll = 0;
  getStyle() {
    const { props, context } = this;
    return context.px2hd(props.style);
  }
  didMount(): void {
    const { container, context } = this;

    const bbox = container.getBBox();
    const style = this.getStyle();

    const height = style.height ? style.height : context.height;
    this.scroll = bbox.height > height ? bbox.height - height : 0;
  }
  render() {
    const { props, context } = this;
    const { duration, children } = props;
    const style = this.getStyle();
    const width = style.width ? style.width : context.width;
    const childrenArray = Children.toArray(children);
    const childCount = childrenArray.length;

    return (
      <group
        style={{
          display: 'flex',
          width,
          ...style,
        }}
        attrs={{
          clip: (parentAttrs) => {
            const { x, y, width, height } = parentAttrs;
            return {
              type: 'rect',
              attrs: {
                x,
                y,
                width,
                height,
              },
            };
          },
        }}
        animation={{
          appear: {
            // 延迟一行的时间
            delay: duration,
            // 要提早一个到底，所以 - 2
            duration: duration * (childCount - 2),
            onFrame: (t: number) => {
              const { scroll } = this;
              if (!scroll) return;
              return {
                // 向上滚动
                matrix: [1, 0, 0, 1, 0, -scroll * t],
              };
            },
          },
        }}
      >
        {childrenArray.map((child, index) => {
          return (
            <group
              animation={{
                appear: {
                  delay: duration * index,
                  clip: {
                    type: 'rect',
                    easing: 'linear',
                    duration,
                    property: ['width'],
                    attrs: {
                      height: context.height,
                    },
                    start: {
                      width: 0,
                    },
                    end: {
                      width,
                    },
                    onFrame: () => {
                      return {
                        height: context.height + this.scroll,
                      };
                    },
                  },
                },
              }}
            >
              {Children.cloneElement(child, {
                width,
              })}
            </group>
          );
        })}
      </group>
    );
  }
}

const root = document.createElement('div');
document.body.appendChild(root);

root.innerHTML = `
<div style="background: #474a51;padding: 20px 0; ">
  <div style="width: 335px; height: 380px; margin: 0 auto; background: #fff; border-radius: 14px;">
    <canvas id="container" style="width: 100%;height: 100%"></canvas>
  </div>
</div>
`;
const context = (document.getElementById('container') as HTMLCanvasElement).getContext('2d');

const Header = (props, context) => {
  const { text } = props;
  const { width } = context;
  return (
    <group
      style={{
        display: 'flex',
        justifyContent: 'center',
        width,
        padding: [0, '20px'],
      }}
    >
      <group style={{ height: 0 }}>
        <text
          style={{
            top: '20px',
            alignSelf: 'center',
          }}
          attrs={{
            fontFamily: 'Arial',
            text: 'FORTUNE',
            fill: '#F5F5F5',
            fontSize: '100px',
            fontWeight: 'bold',
          }}
        />
      </group>
      <text
        style={{
          alignSelf: 'center',
          height: '160px',
        }}
        attrs={{
          fill: '#333',
          text,
          fontSize: '54px',
          fontWeight: 'bold',
        }}
      />
    </group>
  );
};

const TextRow1 = (props, context) => {
  const { width, item, index } = props;
  const { text } = item;
  // 文本内容左边的宽度
  const leftIndent = context.px2hd('138px');
  return (
    <group
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: '40px',
      }}
    >
      <text
        style={{
          top: '-5px',
          marginLeft: '40px',
          marginRight: '10px',
        }}
        attrs={{
          fill: '#333',
          text: `${index + 1}.`,
          fontSize: '60px',
          fontWeight: 'bold',
          fontStyle: 'italic',
        }}
      />
      <group>
        <LineWrapText
          width={width - leftIndent}
          attrs={{
            fill: '#333333',
            text,
            fontSize: '50px',
            fontWeight: 'bold',
          }}
          textDecoration={{
            height: '20px',
            fill: '#efedff',
          }}
        />
      </group>
    </group>
  );
};

const TextRow2 = (props, context) => {
  const { width, item, index } = props;
  const { text } = item;
  // 文本内容左边的宽度
  const leftIndent = context.px2hd('138px');
  return (
    <group
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: '80px',
      }}
    >
      <text
        style={{
          top: '-5px',
          marginLeft: '40px',
          marginRight: '10px',
        }}
        attrs={{
          fill: '#2D25FB',
          text: `${index + 1}.`,
          fontSize: '74px',
          fontWeight: 'bold',
          fontStyle: 'italic',
        }}
      />
      <group>
        <LineWrapText
          width={width - leftIndent}
          attrs={{
            fill: '#333333',
            text,
            fontSize: '36px',
            fontWeight: 500,
          }}
        />
      </group>
    </group>
  );
};

const TextRow3 = (props, context) => {
  const { width, item, index } = props;
  const { px2hd } = context;
  const { name, text, star } = item;
  // 文本内容左边的宽度
  const leftIndent = px2hd('138px');
  return (
    <group>
      <group
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingBottom: '40px',
        }}
      >
        <group
          style={{
            width: '90px',
            height: '44px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          attrs={{
            fill: '#EDEDFF',
            radius: '25px',
          }}
        >
          <text
            attrs={{
              fill: '#2D25FB',
              text: name,
              fontSize: '22px',
              fontWeight: 'bold',
            }}
          />
        </group>
        <group
          style={{
            paddingLeft: '20px',
            flex: 1,
          }}
        >
          {text.map((textItem) => {
            return (
              <group
                style={{
                  paddingBottom: '10px',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <LineWrapText
                  // 右边流出 image 的宽度
                  width={width - leftIndent - px2hd('46px')}
                  attrs={{
                    fill: '#333333',
                    text: textItem.text,
                    fontSize: '28px',
                  }}
                />
                {textItem.star ? (
                  <image
                    style={{
                      width: '46px',
                      height: '46px',
                    }}
                    attrs={{
                      src:
                        'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/401eb7ac-8cdc-4db9-993a-c2e88b720082.png',
                    }}
                  />
                ) : null}
              </group>
            );
          })}
          <line
            attrs={{
              lineWidth: 1,
              stroke: '#BCBCFF',
              lineDash: ['6px', '6px'],
            }}
          />
        </group>
      </group>
    </group>
  );
};

const data1 = [
  { text: '美联储加息落地美联储加息落地美联储加息落地美联储加息落地' },
  { text: '俄罗斯和乌克兰还在打仗巴拉巴拉' },
  { text: '基金亏了好多钱' },
  { text: '再来一行好滚动' },
  { text: '高度怎么这么高' },
  { text: '要编不下去了要编不下去了要编不下去了要编不下去了' },
];

const data2 = [
  { text: '电池原材料涨价显著政策引导下，新能源产业链有望重回将康格局。' },
  { text: '电池原材料涨价显著政策引导下，新能源产业链有望重回将康格局。' },
  { text: '电池原材料涨价显著政策引导下，新能源产业链有望重回将康格局。' },
  { text: '电池原材料涨价显著政策引导下，新能源产业链有望重回将康格局。' },
  { text: '电池原材料涨价显著政策引导下，新能源产业链有望重回将康格局。' },
];

const data3 = [
  { name: '周一', text: [{ text: '20:30美国2月商品贸易账（亿美元）' }] },
  { name: '周二', text: [{ text: '美国3月咨商会消费者心智指数', star: true }] },
  {
    name: '周三',
    text: [
      { text: '20:40美国四季度实际GDP年化季环比终值' },
      { text: '9:30中国3月官方综合PMI', star: true },
      { text: '14:26第三条财经事件在这里展示' },
    ],
  },
  { name: '周四', text: [{ text: '20:30美国2月商品贸易账（亿美元）' }] },
  { name: '周五', text: [{ text: '20:30美国2月商品贸易账（亿美元）' }] },
  { name: '周六', text: [{ text: '20:30美国2月商品贸易账（亿美元）', star: true }] },
];

const duration = 1000;

describe('文本卡片', () => {
  it('文本卡片', async () => {
    const { props } = (
      <Canvas context={context}>
        <Header text="下周关键财经事件" />
        <ScrollBox duration={duration} style={{ top: '150px', height: '560px' }}>
          {data3.map((item, index) => {
            return <TextRow3 index={index} item={item} />;
          })}
        </ScrollBox>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('样式2', async () => {
    const context = createContext('', {
      width: '300px',
      height: '280px',
    });
    const { props } = (
      <Canvas context={context}>
        <Header text="核心观点" />
        <ScrollBox duration={duration} style={{ top: '150px', height: '560px' }}>
          {data2.map((item, index) => {
            return <TextRow2 index={index} item={item} />;
          })}
        </ScrollBox>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('样式2', async () => {
    const context = createContext('', {
      width: '300px',
      height: '280px',
    });
    const { props } = (
      <Canvas context={context}>
        <Header text="一周热点" />
        <ScrollBox duration={duration} style={{ top: '150px', height: '560px' }}>
          {data1.map((item, index) => {
            return <TextRow1 index={index} item={item} />;
          })}
        </ScrollBox>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });
});
