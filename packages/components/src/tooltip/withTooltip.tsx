import { jsx } from '@ali/f2-jsx';
import Component from '../component';

export default View => {
  return class Tooltip extends Component {
    // mount() {
    //   console.log(this.props.geometryRef.current);
    // }
    render() {
      const { props } = this;
      const { visible } = props;
      if (visible === false) {
        return null;
      }
      const { records } = props;
      return (
        <View
          records={ records }
          { ...props }
        />
      );
    }
  }
}
