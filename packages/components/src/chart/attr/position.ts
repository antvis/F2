import Base from './base';

class Position extends Base {
  coord: any;

  constructor(cfg) {
    super(cfg);
  }

  mapping(value) {
    const { scale, coord, type } = this;
    const point = coord.convertPoint({
      ...{ x: 0, y: 0 },
      [type]: scale.scale(value),
    });
    return point[type];
  }
}

export default Position;
