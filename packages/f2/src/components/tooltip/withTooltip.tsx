import { jsx } from '../../jsx';
import { isArray, isFunction } from '@antv/util';
import Component from '../../base/component';

export default (View) => {
  return class Tooltip extends Component {
    constructor(props) {
      super(props);
      this.state = {
        records: null,
      };
    }

    updateCoord() {
      const { props, context } = this;
      const { padding = '10px', chart } = props;

      chart.updateCoordFor(this, { position: 'top', width: 0, height: context.px2hd(padding) });
    }

    willMount(): void {
      this.updateCoord();
    }

    didMount() {
      const { props } = this;
      const { chart, defaultItem } = props;
      if (defaultItem) {
        const point = chart.getPosition(defaultItem);
        this.show(point);
      }
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
      const { chart, onChange } = props;
      const snapRecords = chart.getSnapRecords(point);

      const records = snapRecords.map((record) => {
        const { origin, xField, yField, x, y, color } = record;
        const xScale = chart.getScale(xField);
        const yScale = chart.getScale(yField);
        const xText = xScale.getText(origin[xField]);
        const yText = yScale.getText(origin[yField]);

        return { origin, x, y, color, xField, yField, xText, yText };
      });

      if (!isArray(records) || !records.length) {
        return;
      }
      this.setState({
        records,
      });
      if (isFunction(onChange)) {
        onChange(records);
      }
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
      const { records } = state;
      if (!records || !records.length) return null;

      return <View {...props} records={records} />;
    }
  };
};
