import Base from './base';
import { Range, Option } from './types';
import { Vector2, Matrix } from '@antv/f2-graphic';

interface PolarOption extends Option {
  radius: number; // 内半径比例
  innerRadius: number; // 半径 0~1 默认为1
}

class Polar extends Base {
  type = 'polar';
  isPolar = true;
  startAngle: number;
  endAngle: number;
  radius: number; // 半径
  innnerRadius: number; // 内半径

  option: PolarOption;

  update(option: PolarOption) {
    super.update(option);

    if (!this.option) {
      this.option = option;
    }

    const { radius: radiusRatio = 1, innerRadius: innerRadiusRatio = 0 } = this.option;

    const { width, height, startAngle = -Math.PI / 2, endAngle = (Math.PI * 3) / 2 } = this;
    // 半径取宽高的最小值
    const radius = radiusRatio * (Math.min(width, height) / 2);
    // 极坐标下 x 表示弧度， y 代表 半径
    const x: Range = [startAngle, endAngle];
    const y: Range = [innerRadiusRatio * radius, radius];

    this.x = x;
    this.y = y;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.radius = radius;
    this.innnerRadius = innerRadiusRatio * radius;
    return this;
  }

  isCyclic() {
    const { startAngle, endAngle } = this;
    if (endAngle - startAngle < Math.PI * 2) {
      return false;
    }
    return true;
  }

  convertPoint(point) {
    const { center, transposed, x, y } = this;

    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';

    const [xStart, xEnd] = x;
    const [yStart, yEnd] = y;

    const angle = xStart + (xEnd - xStart) * point[xDim];
    const radius = yStart + (yEnd - yStart) * point[yDim];

    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  }

  invertPoint(point) {
    const { center, transposed, x, y } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';

    const [xStart, xEnd] = x;
    const [yStart, yEnd] = y;

    const m = [1, 0, 0, 1, 0, 0];
    Matrix.rotate(m, m, xStart);

    let startV = [1, 0];
    Vector2.transformMat2d(startV, startV, m);
    startV = [startV[0], startV[1]];

    const pointV = [point.x - center.x, point.y - center.y];
    if (Vector2.zero(pointV)) {
      return {
        x: 0,
        y: 0,
      };
    }

    let theta = Vector2.angleTo(startV, pointV, xEnd < xStart);
    if (Math.abs(theta - Math.PI * 2) < 0.001) {
      theta = 0;
    }
    const l = Vector2.length(pointV);
    let percentX = theta / (xEnd - xStart);
    percentX = xEnd - xStart > 0 ? percentX : -percentX;
    const percentY = (l - yStart) / (yEnd - yStart);
    const rst = {};
    rst[xDim] = percentX;
    rst[yDim] = percentY;
    return rst;
  }
}

export default Polar;
