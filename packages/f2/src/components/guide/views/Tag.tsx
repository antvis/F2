import { jsx, Component, computeLayout } from '@antv/f-engine';
import { GuideProps } from '../withGuide';

export interface TagGuideProps extends GuideProps {
  points?: { x: number; y: number }[] | null;
  canvasWidth?: number;
  canvasHeight?: number;
  offsetX?: number | string;
  offsetY?: number | string;
  autoAdjust?: boolean;
  /**
   * 箭头的方向
   */
  direct?: string;
  /**
   * 箭头的边长
   */
  side?: string | number;
  /**
   * 文字内容
   */
  content?: string;
  /**
   * 背景样式设置，见 group 绘图属性
   */
  background?: any;
  /**
   * 文字样式
   */
  textStyle?: any;
}

const defaultProps: Omit<TagGuideProps, 'records'> = {
  offsetX: 0,
  offsetY: 0,
  points: [],
  direct: 'tl',
  side: '8px',
  autoAdjust: true,
};

const defaultStyle = {
  container: {
    fill: '#1677FF',
    radius: '4px',
    padding: ['4px', '8px'],
  },
  text: {
    fontSize: '22px',
    fill: '#fff',
  },
  arrow: {
    fill: '#1677FF',
  },
};

const Label = ({ content, background, textStyle, animation = {} }) => {
  return (
    <rect
      style={{
        display: 'flex',
        fill: defaultStyle.container.fill,
        padding: defaultStyle.container.padding,
        radius: defaultStyle.container.radius,
        ...background,
      }}
      animation={animation}
    >
      <text
        style={{
          text: content,
          fontSize: defaultStyle.text.fontSize,
          fill: defaultStyle.text.fill,
          ...textStyle,
        }}
        animation={animation}
      />
    </rect>
  );
};
export default class Tag extends Component<TagGuideProps> {
  render() {
    const { props, context } = this;
    const { px2hd } = context;
    const cfg = { ...defaultProps, ...props };
    const {
      points,
      content,
      offsetX,
      offsetY,
      direct,
      side,
      autoAdjust,
      canvasWidth,
      canvasHeight,
      background,
      textStyle,
      animation,
    } = px2hd(cfg);
    const { x, y } = points[0] || {};
    if (isNaN(x) || isNaN(y)) return null;

    const offsetXNum = context.px2hd(offsetX);
    const offsetYNum = context.px2hd(offsetY);
    let posX = x + (offsetXNum || 0);
    let posY = y + (offsetYNum || 0);

    const { layout } = computeLayout(
      this,
      <Label content={content} background={background} textStyle={textStyle} />
    );

    const { width: guideWidth, height: guideHeight } = layout;

    const _getDirect = (point) => {
      let newDirect = direct;
      const { x, y } = point;

      let vertical = newDirect[0];
      let horizontal = newDirect[1];

      // adjust for vertical direction
      if (vertical === 't' && y - side - guideHeight < 0) {
        vertical = 'b';
      } else if (vertical === 'b' && y + side + guideHeight > canvasHeight) {
        vertical = 't';
      }
      // adjust for horizontal direction
      const diff = vertical === 'c' ? side : 0;
      if (horizontal === 'l' && x - diff - guideWidth < 0) {
        horizontal = 'r';
      } else if (horizontal === 'r' && x + diff + guideWidth > canvasWidth) {
        horizontal = 'l';
      } else if (horizontal === 'c') {
        if (guideWidth / 2 + x + diff > canvasWidth) {
          horizontal = 'l';
        } else if (x - guideWidth / 2 - diff < 0) {
          horizontal = 'r';
        }
      }

      newDirect = vertical + horizontal;
      return newDirect;
    };

    const _getArrowPoints = (direct) => {
      let arrowPoints = [];

      if (direct === 'tl') {
        arrowPoints = [
          { x: guideWidth, y: guideHeight - 1 },
          { x: guideWidth, y: guideHeight + side },
          { x: guideWidth - side, y: guideHeight - 1 },
        ];

        posX -= guideWidth || 0;
        posY = posY - (guideHeight || 0) - side;
      } else if (direct === 'cl') {
        arrowPoints = [
          { x: guideWidth, y: guideHeight / 2 - side },
          { x: guideWidth, y: guideHeight / 2 + side },
          { x: guideWidth + side, y: guideHeight / 2 },
        ];
        posX = posX - (guideWidth || 0) - side;
        posY -= guideHeight / 2 || 0;
      } else if (direct === 'bl') {
        arrowPoints = [
          { x: guideWidth, y: -side },
          { x: guideWidth, y: 1 },
          { x: guideWidth - side, y: 1 },
        ];
        posX = posX - (guideWidth || 0);
        posY += side;
      } else if (direct === 'bc') {
        arrowPoints = [
          { x: guideWidth / 2, y: -side },
          { x: guideWidth / 2 - side, y: 1 },
          { x: guideWidth / 2 + side, y: 1 },
        ];
        posX = posX - (guideWidth / 2 || 0);
        posY = posY + side;
      } else if (direct === 'br') {
        arrowPoints = [
          { x: 0, y: -side },
          { x: 0, y: 1 },
          { x: +side, y: 1 },
        ];
        posY += side;
      } else if (direct === 'cr') {
        arrowPoints = [
          { x: -side, y: guideHeight / 2 },
          { x: 0, y: guideHeight / 2 - side },
          { x: 0, y: guideHeight / 2 + side },
        ];
        posX += side;
        posY -= guideHeight / 2 || 0;
      } else if (direct === 'tr') {
        arrowPoints = [
          { x: 0, y: guideHeight + side },
          { x: 0, y: guideHeight - 1 },
          { x: side, y: guideHeight - 1 },
        ];
        posY = posY - (guideHeight || 0) - side;
      } else if (direct === 'tc') {
        arrowPoints = [
          { x: guideWidth / 2, y: guideHeight + side },
          { x: guideWidth / 2 - side, y: guideHeight - 1 },
          { x: guideWidth / 2 + side, y: guideHeight - 1 },
        ];
        posX -= guideWidth / 2 || 0;
        posY = posY - guideHeight - side;
      }

      return arrowPoints;
    };
    const dr = autoAdjust ? _getDirect(points[0]) : direct;
    const arrowPoints = _getArrowPoints(dr);

    return (
      <group
        style={{
          x: posX,
          y: posY,
        }}
      >
        <Label
          content={content}
          background={background}
          textStyle={textStyle}
          animation={animation}
        />
        <polygon
          style={{
            points: arrowPoints.map((d) => [d.x, d.y]),
            fill: background?.fill || defaultStyle.arrow.fill,
          }}
          animation={animation}
        />
      </group>
    );
  }
}
