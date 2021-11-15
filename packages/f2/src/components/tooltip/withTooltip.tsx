import { jsx } from '../../jsx';
import Component from '../../base/component';

export default (View) => {
  return class Tooltip extends Component {
    constructor(props) {
      super(props);
      this.state = {
        records: null,
      };
    }

    didMount() {
      this._initEvent();
    }

    _initEvent() {
      const { context, props } = this;
      const { canvas } = context;
      const { triggerOn = 'press', triggerOff = 'pressend', alwaysShow = false } = props;

      canvas.on(triggerOn, (ev) => {
        const { points } = ev;
        this.show(points[0]);
      });

      canvas.on(triggerOff, (_ev) => {
        if (!alwaysShow) {
          this.hide();
        }
      });
    }

    show(point) {
      const { props } = this;
      const { chart } = props;
      const records = chart.getSnapRecords(point);
      this.setState({
        records,
      });
    }

    hide() {
      this.setState({
        records: null,
      });
    }
    render() {
      const { props, state } = this;
      const { visible } = props;
      if (visible === false) {
        return null;
      }
      return <View {...props} {...state} />;
    }
  };
};
