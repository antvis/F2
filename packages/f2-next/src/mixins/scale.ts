import ScaleController from '../controller/scale';

class ScaleMixin {
  data: any;
  scale: ScaleController;

  createScaleController(data) {
    return new ScaleController(data);
  }

  setScale(field: string, option: any = {}) {
    this.scale.setScale(field, option);
  }

  getScale(field: string) {
    return this.scale.getScale(field);
  }

}

export default ScaleMixin;
