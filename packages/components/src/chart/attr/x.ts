import Position from './position';

class X extends Position {
  coord: any;

  constructor(cfg) {
    super(cfg);
    this.type = 'x';
  }
}

export default X;
