import { jsx } from '@ali/f2-jsx';
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
    renderShape(props) {
      const points = this.parsePoints(props.points);
      return <View { ...props } points={ points }/>
    }
  }
}
