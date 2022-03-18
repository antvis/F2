import { jsx } from '../../jsx';
import { isArray, isFunction, find } from '@antv/util';
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

    willReceiveProps(nextProps) {
      const { defaultItem: nextDefaultItem, chart } = nextProps;
      const { defaultItem: lastDefaultItem } = this.props;
      if (nextDefaultItem !== lastDefaultItem) {
        const point = chart.getPosition(nextDefaultItem);
        this.show(point);
      }
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
      const { chart, coord, onChange } = props;
      const snapRecords = chart.getSnapRecords(point);
      if (!snapRecords || !snapRecords.length) return;
      const legendItems = chart.getLegendItems();
      const { origin, xField, yField } = snapRecords[0];
      const xScale = chart.getScale(xField);
      const yScale = chart.getScale(yField);
      const showPoint = coord.convertPoint({
        x: xScale.scale(origin[xField]),
        y: yScale.scale(origin[yField]),
      });

      const records = snapRecords.map((record) => {
        const { origin, xField, yField } = record;
        let name = xScale.getText(origin[xField]);
        const value = yScale.getText(origin[yField]);
        if (legendItems && legendItems.length) {
          const item = find<any>(legendItems, (item) => {
            const { field, tickValue } = item;
            return origin[field] === tickValue;
          });
          if (item && item.name) {
            name = item.name;
          }
        }
        return {
          ...record,
          name,
          value,
        };
      });

      if (!isArray(records) || !records.length) {
        return;
      }
      this.setState({
        point: showPoint,
        records,
      });
      if (isFunction(onChange)) {
        onChange(records);
      }
    }

    hide() {
      this.setState({
        point: null,
        records: null,
      });
    }

    render() {
      const { props, state } = this;
      const { visible } = props;
      if (visible === false) {
        return null;
      }
      const { point, records } = state;
      if (!records || !records.length) return null;

      return <View {...props} point={point} records={records} />;
    }
  };
};
