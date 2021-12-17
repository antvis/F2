import ScaleController from '../controller/scale';
import Chart from '../chart';

class ScaleMixin {
  data: any;
  chart: Chart;
  scale: ScaleController;

  createScaleController(data) {
    return new ScaleController(data, this.chart);
  }

  setScale(field: string, option: any = {}) {
    this.scale.setScale(field, option);
  }

  getScale(field: string) {
    return this.scale.getScale(field);
  }
}

export default ScaleMixin;
