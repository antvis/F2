import Position from './position';

interface IAttrX {
  coord: any;
}

class X extends Position implements IAttrX {
  constructor(cfg) {
    super(cfg);
    this.type = 'x';
  }
}

export default X;
