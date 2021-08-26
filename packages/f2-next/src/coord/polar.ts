import Base from './base';
import { Range, Option } from './types';

class Polar extends Base {

  type = 'polar';
  isPolar = true;
  startAngle: number;
  endAngle: number;

  update(option: Option) {
    super.update(option);

    const { width, height, startAngle = -Math.PI / 2, endAngle = Math.PI * 3 / 2 } = this;
    // 半径取宽高的最小值
    const radius = Math.min(width, height) / 2;
    // 极坐标下 x 表示弧度， y 代表 半径
    const x: Range = [startAngle, endAngle];
    const y: Range = [0, radius];

    this.x = x;
    this.y = y;
  }

  isCyclic() {
    const { startAngle, endAngle } = this;
    if ((endAngle - startAngle) < Math.PI * 2) {
      return false;
    }
    return true;
  }

  convertPoint(point: any) {
    const { center, transposed, x, y } = this;

    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';

    const [xStart, xEnd] = x;
    const [yStart, yEnd] = y;

    const angle = xStart + (xEnd - xStart) * point[xDim];
    const radius = yStart + (yEnd - yStart) * point[yDim];

    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  }
}

export default Polar;
