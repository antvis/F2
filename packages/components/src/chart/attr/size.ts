import Base from './base';

class Size extends Base {
  gradient: any;

  constructor(cfg) {
    super(cfg);
    this.names = [ 'size' ];
    this.type = 'size';
    this.gradient = null;
  }
}

export default Size;
