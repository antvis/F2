import { jsx } from '../../jsx';
import Geometry from '../geometry';

export default (View) => {
  return class Point extends Geometry {
    getDefaultCfg() {
      return {
        geomType: 'point',
      };
    }

    render() {
      const { props, container } = this;
      const { coord } = props;
      const records = this.mapping();
      const clip = this.getClip();
      return <View {...props} coord={coord} records={records} clip={clip} />;
    }
  };
};
