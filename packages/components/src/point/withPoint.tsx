import { withGeometry } from '../geometry/index';

export default View => {
  return class Point extends withGeometry(View) {
    mount() {
      this.props = {
        ...this.props,
        type: 'point',
      }
      super.mount();
    }
  }
}
