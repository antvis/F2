import { jsx } from '@jsx';
import Geometry from '../geometry';

export default View => {
  return class Area extends Geometry {
    render() {
      return <View />;
    }
  }
}
