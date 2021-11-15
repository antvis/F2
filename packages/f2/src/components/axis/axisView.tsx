import { jsx } from '../../jsx';
import PolarX from './polar/polar-x';
import PolarY from './polar/polar-y';
import Top from './rect/top';
import Bottom from './rect/bottom';
import Right from './rect/right';
import Left from './rect/left';
import { PolarAxisProps, RectAxisProps } from './types';

function isPolar(props: PolarAxisProps | RectAxisProps): props is PolarAxisProps {
  return props.coord.isPolar;
}

export default (props: PolarAxisProps | RectAxisProps) => {
  // 极坐标
  if (isPolar(props)) {
    const { dimType } = props;
    if (dimType === 'x') {
      return <PolarX {...props} />;
    }
    return <PolarY {...props} />;
  }

  const { position } = props;
  // 直角坐标
  if (position === 'right') {
    return <Right {...props} />;
  }
  if (position === 'left') {
    return <Left {...props} />;
  }
  if (position === 'top') {
    return <Top {...props} />;
  }
  return <Bottom {...props} />;
};
