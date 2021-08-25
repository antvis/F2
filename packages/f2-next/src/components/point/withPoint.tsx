import { jsx } from '@jsx';
import Geometry from '../geometry';

export default View => {
  return class Point extends Geometry {
    render() {
      return <View />
    }
  }
}
