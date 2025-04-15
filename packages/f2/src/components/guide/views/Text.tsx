import { jsx, TextStyleProps } from '@antv/f-engine';
import { GuideProps } from '../withGuide';
import { deepMix } from '@antv/util';

export interface TextGuideProps extends GuideProps {
  points?: { x: number; y: number }[] | null;
  content: string | number;
  /**
   * 文本标注位置, 
   * 目前该属性仅对 `Interval` 柱状图标注生效(非极坐标), 
   * 文本位置以柱子顶部中心点为基准, 支持如下配置
   * - `tc` - topCenter
   * - `tl` - topLeft
   * - `tr` - topRight
   * - `bc` - bottomCenter
   * - `bl` - bottomLeft
   * - `br` - bottomRight
   */
  placement?: 'tc' | 'tl' | 'tr' | 'bc' | 'bl' | 'br';
  style?: Partial<TextStyleProps> | ((record?) => Partial<TextStyleProps>);
  offsetX?: number | string;
  offsetY?: number | string;
  theme?: any;
}

export default (props: TextGuideProps, context) => {
  const { theme = {} } = props;
  const { points, style, offsetX, offsetY, content, animation } = deepMix({ ...theme.text }, props);
  const { x, y } = points[0] || {};

  if(isNaN(x) || isNaN(y)) return null;
  const offsetXNum = context.px2hd(offsetX);
  const offsetYNum = context.px2hd(offsetY);
  const posX = x + (offsetXNum || 0);
  const posY = y + (offsetYNum || 0);

  return (
    <text
      attrs={{
        text: `${content}`,
        x: posX,
        y: posY,
        ...style,
      }}
      animation={deepMix(
        {
          update: {
            easing: 'linear',
            duration: 450,
            property: ['x', 'y'],
          },
        },
        animation
      )}
    />
  );
};
