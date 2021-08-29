import ScaleController from '../controller/scale';

class ScaleMixin {

  data: any;
  scale: ScaleController;

  createScale() {
    return new ScaleController();
  }

  setScale(field: string, option: any = {}) {
    this.scale.scale(field, option);
  }

  getScale(field: string) {
    return this.scale.getScale(field);
  }

  updateScales() {
    const { data } = this;
    this.scale.updateScales(data);
  }
}

export default ScaleMixin;
