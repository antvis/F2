import Position from './position';

class Y extends Position {
  coord: any;

  constructor(cfg) {
    super(cfg);
    this.type = 'y';
  }
}

export default Y;
