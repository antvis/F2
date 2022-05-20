import Shape, { ShapeProp } from './shape';
import { RectAttrs } from '../../types';
import { isNumber, isArray, isNil } from '@antv/util';

export interface RectProp extends ShapeProp {
  attrs?: RectAttrs;
}

function parsePadding(padding: number | number[]) {
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;

  if (isNumber(padding)) {
    top = bottom = left = right = padding;
  } else if (isArray(padding)) {
    top = padding[0];
    right = !isNil(padding[1]) ? padding[1] : padding[0];
    bottom = !isNil(padding[2]) ? padding[2] : padding[0];
    left = !isNil(padding[3]) ? padding[3] : right;
  }

  return [top, right, bottom, left];
}

// 为了处理radius 大于 width 或 height 的场景
function parseRadius(radius, width, height) {
  radius = parsePadding(radius);
  // 都为0
  if (!radius[0] && !radius[1] && !radius[2] && !radius[3]) {
    return radius;
  }
  const minWidth = Math.max(radius[0] + radius[1], radius[2] + radius[3]);
  const minHeight = Math.max(radius[0] + radius[3], radius[1] + radius[2]);
  const scale = Math.min(width / minWidth, height / minHeight);
  if (scale < 1) {
    return radius.map((r) => r * scale);
  }
  return radius;
}

class Rect<T extends RectProp = RectProp> extends Shape<T> {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'rect';
  }

  getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      radius: 0,
      lineWidth: 0,
    };
  }

  createRadiusPath(context, x, y, width, height, radius) {
    radius = parseRadius(radius, width, height);
    context.moveTo(x + radius[0], y);
    context.lineTo(x + width - radius[1], y);
    context.arc(x + width - radius[1], y + radius[1], radius[1], -Math.PI / 2, 0, false);
    context.lineTo(x + width, y + height - radius[2]);
    context.arc(x + width - radius[2], y + height - radius[2], radius[2], 0, Math.PI / 2, false);
    context.lineTo(x + radius[3], y + height);
    context.arc(x + radius[3], y + height - radius[3], radius[3], Math.PI / 2, Math.PI, false);
    context.lineTo(x, y + radius[0]);
    context.arc(x + radius[0], y + radius[0], radius[0], Math.PI, (Math.PI * 3) / 2, false);
    context.closePath();
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { x, y, width, height, radius } = attrs;

    context.beginPath();
    if (!radius || !(width * height)) {
      context.rect(x, y, width, height);
    } else {
      this.createRadiusPath(context, x, y, width, height, radius);
    }
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, width, height } = attrs;
    return {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height,
    };
  }
}

export default Rect;
