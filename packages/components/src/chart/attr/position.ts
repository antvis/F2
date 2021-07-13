import Base from './base';

interface IBase {
  coord: any;
}

class Position extends Base implements IBase {
  coord: any;

  constructor(cfg) {
    super(cfg);
    this.coord = cfg.coord
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
