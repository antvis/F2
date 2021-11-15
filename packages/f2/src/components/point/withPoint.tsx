import { jsx } from '../../jsx';
import Geometry from '../geometry';

export default (View) => {
  return class Point extends Geometry {
    constructor(props, context) {
      super(props, context);
      this.state = {
        selected: null,
      };
    }

    getDefaultCfg() {
      return {
        geomType: 'point',
      };
    }

    didMount() {
      this._initEvent();
    }

    _initEvent() {
      const { canvas } = this.context;

      canvas.on('press', ev => {
        const { points } = ev;
        this.onPressed(points[0]);
      });

      canvas.on('pressend', ev => {
        this.onPressEnd();
      });
    }

    onPressed(point) {
      const records = this.getSnapRecords(point);
      this.setState({
        selected: records,
      });
    }

    onPressEnd() {
      this.setState({
        selected: null,
      });
    }

    render() {
      const { props, state } = this;
      const { coord } = props;
      const records = this.mapping();
      return <View {...props} {...state} coord={coord} records={records} />;
    }
  };
};
