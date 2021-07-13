import Base from './base';

class Opacity extends Base {
  gradient: any;
  constructor(cfg) {
    super(cfg);
    this.names = [ 'opacity' ];
    this.type = 'opacity';
    this.gradient = null;
  }
}

export default Opacity;
