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
      const { props } = this;
      const { coord } = props;
      const records = this.mapping();
      return <View {...props} coord={coord} records={records} />;
    }
  };
};
