import { JSX, jsx, Component } from '@antv/f2';
import WordCloud2 from './wordcloud2';

function checkSupported(ctx: CanvasRenderingContext2D) {
  if (!ctx) {
    return false;
  }
  if (!ctx.getImageData) {
    return false;
  }

  return true;
}

const settings = {
  list: [],
  fontFamily: '',
  fontWeight: '',
  color: 'random-dark',
  fontSize: '140px',
  minSize: 0,
  clearCanvas: true,

  gridSize: 8,
  drawOutOfBound: false,

  minRotation: -Math.PI / 2,
  maxRotation: Math.PI / 2,
  rotationSteps: 0,

  shuffle: true,
  rotateRatio: 0.1,

  shape: 'circle',
  ellipticity: 0.65,
};

export type CustomShape = (theta: number) => number;

export interface WordCloudProps {
  data: Record<string, any>;
  /**
   * @title 字体
   */
  fontFamily?: string;
  fontweight?: string | number;
  /**
   * @title 颜色主题
   */
  color?: 'random-dark' | 'random-light' | string;
  fontSize?: string | number;
  /**
   * @title 绘制云的形状
   */
  shape?:
    | 'circle'
    | 'cardioid'
    | 'diamond'
    | 'triangle-forward'
    | 'triangle'
    | 'pentagon'
    | 'star'
    | CustomShape;
  /**
   * @title shape 的平坦度
   */
  ellipticity?: number;
  /**
   * @title 遮罩的形状
   */
  maskShape?: JSX.Element;
}

class WordCloud extends Component<WordCloudProps> {
  isSupported: boolean;

  constructor(props, context) {
    super(props, context);

    // Check if WordCloud can run on this browser
    this.isSupported = checkSupported(context.ctx);
  }

  didMount() {
    const { context, props } = this;
    const { canvas } = context;
    const { maskShape } = props;
    this.resetContext();
    if (!maskShape) {
      this.layoutWord();
      return;
    }
    canvas.on('afterdraw', () => {
      if (this.state.list) return;
      this.layoutWord();
    });
  }
  render() {
    if (!this.isSupported) {
      return null;
    }
    const { state, props } = this;
    const { list } = state;
    if (list) {
      return (
        <group>
          {list.map((item) => {
            return (
              <text
                key={item.word}
                attrs={{
                  x: item.x,
                  y: item.y,
                  text: item.word,
                  fontFamily: item.fontFamily,
                  fontSize: item.fontSize,
                  fill: item.color,
                  fontWeight: item.fontWeight,
                  textBaseline: 'middle',
                  textAlign: 'center',
                  rotate: -item.rotate,
                }}
              />
            );
          })}
        </group>
      );
    }
    const { maskShape } = props;
    if (maskShape) {
      return maskShape;
    }
    return null;
  }

  resetContext() {
    const { context } = this;
    const { canvas, width, height } = context;
    const el = canvas.get('el');
    el.width = width;
    el.height = height;
  }

  revertContext() {
    const { context } = this;
    const { canvas, width, height } = context;

    canvas.changeSize(width, height);
  }

  // 计算布局
  layoutWord() {
    const { context, props } = this;
    const { ctx, theme, px2hd, width, height } = context;

    const { data, maskShape, fontSize = settings.fontSize } = props;
    if (!data || !data.length) return;

    const fontSizeRatio = px2hd(fontSize) / data[0].weight;
    const list = data.map((item) => {
      return {
        ...item,
        weight: item.weight * fontSizeRatio,
      };
    });

    const layoutList = WordCloud2(ctx, {
      ...settings,
      fontFamily: theme.fontFamily,
      list,
      width,
      height,
      clearCanvas: !maskShape,
      ...props,
    });
    this.revertContext();

    this.setState({
      list: layoutList,
    });
  }
}

export default WordCloud;
