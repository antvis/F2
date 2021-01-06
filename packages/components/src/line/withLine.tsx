// @ts-nocheck
import { withGeometry } from '../geometry/index';

export default View => {
  return class Line extends withGeometry(View) {
    mount() {
      this.props = {
        ...this.props,
        type: 'line',
      }
      super.mount();
    }
  }
}
