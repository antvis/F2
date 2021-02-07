import { jsx } from '@ali/f2-jsx';
import PolarX from './polar/polar-x';
import PolarY from './polar/polar-y';
import Bottom from './rect/bottom';
import Right from './rect/right';
import Left from './rect/left';

export default (props: any) => {
  const { isPolar, dimType, position } = props;
  // 极坐标
  if (isPolar) {
    if (dimType === 'x') {
      return <PolarX { ...props } />;
    }
    return <PolarY { ...props } />;
  }

  // 直角坐标
  if (dimType === 'y') {
    if (position === 'right') {
      return <Right { ...props } />
    }
    return <Left { ...props } />
  }
 
  if (position === 'top') {
    return null;
  }
  return <Bottom { ...props } />
}
