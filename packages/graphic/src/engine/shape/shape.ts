import { isNil } from '@antv/util';
import Element from '../element';

class Shape extends Element {

  // Shapes
  static Rect: any;
  static Image: any;
  static Circle: any;
  static Line: any;
  static Polygon: any;
  static Polyline: any;
  static Arc: any;
  static Sector: any;
  static Text: any;
  static Custom: any;
  static Marker: any;

  _attrs: any;



  _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false,
      isShape: true,
      attrs: {}
    };
  }

  getType() {
    return this._attrs.type;
  }

  drawInner(context) {
    const attrs = this.get('attrs');
    this.createPath(context);
    const originOpacity = context.globalAlpha;
    if (this.hasFill()) {
      const fillOpacity = attrs.fillOpacity;
      if (!isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
        context.fill();
        context.globalAlpha = originOpacity;
      } else {
        context.fill();
      }
    }
    if (this.hasStroke()) {
      const lineWidth = attrs.lineWidth;
      if (lineWidth > 0) {
        const strokeOpacity = attrs.strokeOpacity;
        if (!isNil(strokeOpacity) && strokeOpacity !== 1) {
          context.globalAlpha = strokeOpacity;
        }
        context.stroke();
      }
    }
  }

  getBBox() {
    let bbox = this._attrs.bbox;
    if (!bbox) {
      bbox = this.calculateBox();
      if (bbox) {
        bbox.x = bbox.minX;
        bbox.y = bbox.minY;
        bbox.width = bbox.maxX - bbox.minX;
        bbox.height = bbox.maxY - bbox.minY;
      }
      this._attrs.bbox = bbox;
    }
    return bbox;
  }

  calculateBox() {
    return null;
  }

  protected createPath(context) {}
}

export default Shape;
