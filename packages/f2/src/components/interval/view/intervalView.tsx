import { jsx } from '@antv/f-engine';
import Rect from './rect';
import Polar from './polar';

export default (props) => {
  const { coord } = props;
  const { type: coordType } = coord;

  // 直角坐标系
  if (coordType === 'rect') {
    return <Rect {...props} />;
  }

  // 极坐标系
  return <Polar {...props} />;
};
