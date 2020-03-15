import Base from './base';

class Size extends Base {
  constructor(cfg) {
    super(cfg);
    this.names = [ 'size' ];
    this.type = 'size';
    this.gradient = null;
  }
}

export default Size;
