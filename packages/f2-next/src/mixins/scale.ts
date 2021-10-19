import ScaleController from '../controller/scale';

class ScaleMixin {
  data: any;
  scale: ScaleController;

  createScaleController(data) {
    return new ScaleController(data);
  }

  // setData(data) {
  //   this.scale.data = data;
  // }

  setScale(field: string, option: any = {}) {
    this.scale.scale(field, option);
  }

  getScale(field: string) {
    return this.scale.getScale(field);
  }

  updateScales(data) {
    this.scale.data = data;
    this.scale.updateScales(data);
  }
}

export default ScaleMixin;
