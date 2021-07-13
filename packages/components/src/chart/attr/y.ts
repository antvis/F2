import Position from './position';

interface IAxisY {
  coord: any;
}

class Y extends Position implements IAxisY {

  constructor(cfg) {
    super(cfg);
    this.type = 'y';
  }
}

export default Y;
