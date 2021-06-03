import { isNil } from '../../../util/common';
import Rect from './rect';

const imageCaches = {};

class ImageShape extends Rect {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = false;
    this._attrs.canStroke = false;
    this._attrs.loading = false;
    this._attrs.image = null;
    this._attrs.type = 'image';
  }

  draw(context) {
    // 如果图片还在loading中直接返回，等下次绘制
    if (this.get('loading')) {
      return;
    }

    // 如果已经有image对象，直接绘制，会调用createPath绘制
    const image = this.get('image');
    if (image) {
      super.draw(context);
      return;
    }

    const attrs = this.get('attrs');
    const { src } = attrs;

    if (src && window.Image) {
      const cacheImage = this.get('cacheImage');
      // 如果有缓存，则直接从缓存中拿
      if (cacheImage && imageCaches[src]) {
        this.set('image', imageCaches[src]);
        this.draw(context);
        return;
      }
      this.set('loading', true);
      const image = new Image();
      // 设置跨域, 等同于 image.crossOrigin = 'anonymous'
      image.crossOrigin = '';
      image.onload = () => {
        this.set('loading', false);
        this.set('image', image);
        this.draw(context);
      };
      // src 一定要在 crossOrigin 之后，否则 toDataURL 就会报 SecurityError
      image.src = src;

      // 设置全局缓存
      if (cacheImage) {
        imageCaches[src] = image;
      }
    }
  }

  createPath(context) {
    const image = this.get('image');
    this.drawImage(context, image);
  }

  drawImage(context, image) {
    const { attrs, destroyed } = this._attrs;
    if (destroyed) {
      return;
    }
    const { x, y, width, height, sx, sy, swidth, sheight, radius, fillOpacity } = attrs;
    if (radius) {
      context.save();
      this.createRadiusPath(context, x, y, width, height, radius);
      context.clip();
    }
    // 设置透明度
    const originOpacity = context.globalAlpha;
    if (!isNil(fillOpacity)) {
      context.globalAlpha = fillOpacity;
    }
    if (!isNil(sx) && !isNil(sy) && !isNil(swidth) && !isNil(sheight)) {
      context.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);
    } else {
      context.drawImage(image, x, y, width, height);
    }
    context.globalAlpha = originOpacity;
    if (radius) {
      // 因为 save 和 restore 会一定程度上影响绘图性能，所以只在必要是调用
      context.restore();
    }
  }
}

export default ImageShape;
