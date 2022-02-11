import ScaleController, { ScaleOption } from '../controller/scale';

class ScaleMixin {
  // eslint-disable-next-line
  data: any;
  scale: ScaleController;

  createScaleController(data) {
    return new ScaleController(data);
  }

  setScale(field: string, option: ScaleOption = {}) {
    this.scale.setScale(field, option);
  }

  getScale(field: string) {
    return this.scale.getScale(field);
  }
}

export default ScaleMixin;
