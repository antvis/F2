import { jsx } from '../../jsx';
import PolarX from './polar/polar-x';
import PolarY from './polar/polar-y';
import Top from './rect/top';
import Bottom from './rect/bottom';
import Right from './rect/right';
import Left from './rect/left';
import { PolarAxisProps, RectAxisProps } from './types';

export default (props: PolarAxisProps | RectAxisProps) => {
  const { isPolar } = props.coord;
  // 极坐标
  if (isPolar) {
    const { dimType } = props as PolarAxisProps;
    if (dimType === 'x') {
      return <PolarX { ...props } />;
    }
    return <PolarY { ...props } />;
  }

  const { position } = props as RectAxisProps;
  // 直角坐标
  if (position === 'right') {
    return <Right { ...props } />
  }
  if (position === 'left') {
    return <Left { ...props } />
  }
  if (position === 'top') {
    return <Top { ...props } />;
  }
  return <Bottom { ...props } />
}
