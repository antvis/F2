import { jsx } from '../../jsx';
import Component from '../../base/component';

export default View => {
  return class Tooltip extends Component {

    chart: any;

    constructor(props, context?, updater?) {
      super(props, context, updater);
      this.state = {
        records: null
      }
    }

    mount() {
      this._initEvent();
    }

    _initEvent() {
      const { props } = this;
      const canvas = props.canvas.canvas;

      canvas.on('press', (ev) => {
        const { points } = ev;
        this.show(points[0]);
      });

      canvas.on('pressend', (ev) => {
        this.hide();
      });
    }

    show(point) {
      const { chart } = this;
      const records = chart.getSnapRecords(point);
      this.setState({
        records,
      });
    }

    hide() {
      this.setState({
        records: null
      });
    }
    render() {
      const { props, state } = this;
      const { visible } = props;
      if (visible === false) {
        return null;
      }
      return (
        <View
          { ...props }
          { ...state }
        />
      );
    }
  }
}
