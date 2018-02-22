const Shape = require('../shape');

class Custom extends Shape {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.createPath = null;
    this._attrs.type = 'custom';
  }

  createPath(context) {
    const createPath = this.get('createPath');
    if (createPath) {
      createPath(this, context);
    }
  }

  // TODO
  calculateBox() {
    return null;
  }
}
Shape.Custom = Custom;
module.exports = Custom;
