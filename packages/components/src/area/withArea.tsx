import { jsx } from '@ali/f2-jsx';
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

    renderShape(props) {
      const { points } = props;
      let topPoints = [];
      let bottomPoints = [];
      points.forEach((point) => {
        bottomPoints.push(point[0]);
        topPoints.push(point[1]);
      });
      bottomPoints.reverse();
      topPoints = this.parsePoints(topPoints);
      bottomPoints = this.parsePoints(bottomPoints);
      const newPoints = topPoints.concat(bottomPoints);

      return <View { ...props } points={ newPoints } />
    } 
  }
}
