import { withGeometry } from '../geometry/index';

export default View => {
  return class Interval extends withGeometry(View) {
    mount() {
      this.props = {
        ...this.props,
        type: 'interval',
      }
      super.mount();
    }
  }
}
