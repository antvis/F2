import { jsx } from '../../jsx';
import PolarX from './polar/polar-x';
import PolarY from './polar/polar-y';
import Top from './rect/top';
import Bottom from './rect/bottom';
import Right from './rect/right';
import Left from './rect/left';

export default (props: any) => {
  const { coord, dimType, position } = props;
  const { isPolar } = coord;
  // 极坐标
  if (isPolar) {
    if (dimType === 'x') {
      return <PolarX { ...props } />;
    }
    return <PolarY { ...props } />;
  }

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
