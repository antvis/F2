import { isNil } from '../../../util/common';
import Rect from './rect';

class ImageShape extends Rect {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = false;
    this._attrs.canStroke = false;
    this._attrs.loading = false;
    this._attrs.image = null;
    this._attrs.type = 'image';
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { src } = attrs;

    if (this.get('loading')) {
      return;
    }

    const image = this.get('image');

    if (image) {
      this.drawImage(context, image);
    } else {
      if (src && Image) {
        this.set('loading', true);
        const image = new Image();
        image.src = src;
        // 设置跨域
        image.crossOrigin = 'Anonymous';
        image.onload = () => {
          this.set('loading', false);
          this.set('image', image);
          this.drawImage(context, image);
        };
      }
    }
  }

  drawImage(context, image) {
    const { attrs, destroyed } = this._attrs;
    if (destroyed) {
      return;
    }
    const { x, y, width, height, sx, sy, swidth, sheight, radius } = attrs;
    if (radius) {
      context.save();
      this.createRadiusPath(context, x, y, width, height, radius);
      context.clip();
    }
    if (!isNil(sx) && !isNil(sy) && !isNil(swidth) && !isNil(sheight)) {
      context.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);
    } else {
      context.drawImage(image, x, y, width, height);
    }
    if (radius) {
      // 因为 save 和 restore 会一定程度上影响绘图性能，所以只在必要是调用
      context.restore();
    }
  }
}

export default ImageShape;
