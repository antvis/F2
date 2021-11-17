import Shape, { ShapeProp } from './shape';

export interface CustomProp extends ShapeProp {
  createPath?: Function;
  calculateBox?: Function;
}

class Custom extends Shape<CustomProp> {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.createPath = null;
    this._attrs.type = 'custom';
  }

  createPath(context) {
    const createPath = this.get('createPath');
    createPath && createPath.call(this, context);
  }

  calculateBox() {
    const calculateBox = this.get('calculateBox');
    return calculateBox && calculateBox.call(this);
  }
}
export default Custom;
