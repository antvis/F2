import { withGeometry } from '../geometry/index';

export default View => {
  return class Area extends withGeometry(View) {
    mount() {
      this.props = {
        ...this.props,
        type: 'area',
      }
      super.mount();
    }
  }
}
