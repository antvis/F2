import { jsx } from '../../../index';
import { px } from '../../../types';

interface TagGuideProps {
  points?: { x: number; y: number }[] | null;
  canvasWidth?: number;
  canvasHeight?: number;
  guideBBox?: any;
  offsetX?: number;
  offsetY?: number;
  autoAdjust?: boolean;
  /**
   * 箭头的方向
   */
  direct?: string;
  /**
   * 箭头的边长
   */
  side?: px;
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
  /**
   * tagGuide ref
   */
  triggerRef?: any;
}

const defaultProps: TagGuideProps = {
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

export default (props: TagGuideProps, context) => {
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
    guideBBox,
    background,
    textStyle,
    triggerRef,
  } = px2hd(cfg);
  const { x, y } = points[0] || {};
  const { width: guideWidth, height: guideHeight } = guideBBox || {};

  const offsetXNum = context.px2hd(offsetX);
  const offsetYNum = context.px2hd(offsetY);
  let posX = x + (offsetXNum || 0);
  let posY = y + (offsetYNum || 0);

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
        { x: posX, y: posY - side - 1 },
        { x: posX, y: posY },
        { x: posX - side, y: posY - side - 1 },
      ];

      posX -= guideWidth / 2 || 0;
      posY = posY - side;
    } else if (direct === 'cl') {
      arrowPoints = [
        { x: posX - side - 1, y: posY - side },
        { x: posX - side - 1, y: posY + side },
        { x: posX, y: posY },
      ];
      posX = posX - (guideWidth / 2 || 0) - side;
      posY += (guideHeight / 2 || 0) - 1;
    } else if (direct === 'bl') {
      arrowPoints = [
        { x: posX, y: posY },
        { x: posX, y: posY + side + 1 },
        { x: posX - side, y: posY + side + 1 },
      ];
      posX = posX - (guideWidth / 2 || 0);
      posY += (guideHeight || 0) + side - 1;
    } else if (direct === 'bc') {
      // 有问题
      arrowPoints = [
        { x: posX, y: posY },
        { x: posX - side, y: posY + side + 1 },
        { x: posX + side, y: posY + side + 1 },
      ];
      posY += (guideHeight || 0) + side - 1;
    } else if (direct === 'br') {
      arrowPoints = [
        { x: posX, y: posY },
        { x: posX, y: posY + side + 1 },
        { x: posX + side, y: posY + side + 1 },
      ];
      posX += guideWidth / 2 || 0;
      posY += (guideHeight || 0) + side - 1;
    } else if (direct === 'cr') {
      arrowPoints = [
        { x: posX, y: posY },
        { x: posX + side, y: posY - side },
        { x: posX + side, y: posY + side },
      ];
      posX += (guideWidth / 2 || 0) + side;
      posY += guideHeight / 2 || 0;
    } else if (direct === 'tr') {
      arrowPoints = [
        { x: posX, y: posY },
        { x: posX, y: posY - side - 1 },
        { x: posX + side, y: posY - side - 1 },
      ];
      posX += guideWidth / 2 || 0;
      posY = posY - side;
    } else if (direct === 'tc') {
      arrowPoints = [
        { x: guideWidth / 2, y: guideHeight + side },
        { x: guideWidth / 2 - side, y: guideHeight - 1 },
        { x: guideWidth / 2 + side, y: guideHeight - 1 },
      ];
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
        fill: defaultStyle.container.fill,
        radius: defaultStyle.container.radius,
        padding: defaultStyle.container.padding,
        ...background,
      }}
      ref={triggerRef}
    >
      <rect
        style={{
          display: 'flex',
          fill: defaultStyle.container.fill,
          padding: defaultStyle.container.padding,
          radius: defaultStyle.container.radius,
          ...background,
        }}
      >
        <text
          style={{
            text: content,
            fontSize: defaultStyle.text.fontSize,
            fill: defaultStyle.text.fill,
            ...textStyle,
          }}
        />
      </rect>
      {guideBBox && (
        <polygon
          style={{
            points: arrowPoints.map((d) => [d.x, d.y]),
            fill: background?.fill || defaultStyle.arrow.fill,
          }}
        />
      )}
    </group>
  );
};
