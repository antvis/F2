import { isFunction } from '@antv/util';
import { Component, isEqual as equal, ShapeStyleProps } from '@antv/f-engine';
import { ChartChildProps } from '../../chart';

function isEqual(origin1, origin2, fields: string[]) {
  if (origin1 === origin2) {
    return true;
  }
  for (let i = 0, len = fields.length; i < len; i++) {
    const field = fields[i];
    if (origin1[field] !== origin2[field]) {
      return false;
    }
  }
  return true;
}

type StyleType = (record: any) => ShapeStyleProps;

export interface SelectionProps {
  selection?: {
    triggerOn?: 'click' | 'press' | string;
    type?: 'single' | 'multiple';
    defaultSelected?: any[];
    selectedStyle?: ShapeStyleProps | StyleType;
    unSelectedStyle?: ShapeStyleProps | StyleType;
    cancelable?: boolean;
    onChange?: Function;
  };
}

export interface SelectionState {
  selected: any[];
}

class Selection<
  P extends SelectionProps = SelectionProps,
  S extends SelectionState = SelectionState
> extends Component<P & ChartChildProps, S> {
  constructor(props: P, context) {
    super(props, context);

    const { selection } = props;
    if (!selection) return;
    const { defaultSelected } = selection;
    this.state.selected = defaultSelected;
  }

  didMount() {
    const { props, state } = this;
    const { selection, chart } = props;
    if (!selection) return;
    // 默认为 click
    const { triggerOn = 'click', onChange } = selection;
    chart.on(triggerOn, (ev) => {
      const { points, canvasX: x, canvasY: y } = ev;
      const point = triggerOn === 'click' ? { x, y } : points[0];
      const records = this.getSnapRecords(point);
      const { type = 'single', cancelable = true } = selection;

      if (!records || !records.length) {
        if (cancelable) {
          onChange && onChange({ selected: null })
          this.setState({
            selected: null,
          } as S);
        }
        return;
      }

      const { selected } = state;
      const origins = records.map((record) => record.origin);
      if (!selected || !selected.length) {
        onChange && onChange({ selected: origins })
        this.setState({
          selected: origins,
        } as S);
      }

      if (type === 'single') {
        if (!cancelable) {
          onChange && onChange({ selected: origins })
          this.setState({
            selected: origins,
          } as S);
          return;
        }
        const newSelected = [];
        records.forEach((record) => {
          if (!this.isSelected(record)) {
            newSelected.push(record.origin);
          }
        });
        onChange && onChange({ selected: newSelected })
        this.setState({
          selected: newSelected,
        } as S);
        return;
      }

      // 多选
      const scales = chart.getScales();
      const fields = Object.keys(scales);
      const selectedMap = {};
      selected.forEach((item) => {
        const key = fields.map((field) => item[field]).join('-');
        selectedMap[key] = item;
      });
      records.forEach((record) => {
        const { origin } = record;
        const key = fields.map((field) => origin[field]).join('-');
        selectedMap[key] = selectedMap[key] ? null : origin;
      });

      const newSelected = Object.keys(selectedMap)
        .map((key) => selectedMap[key])
        .filter(Boolean);

      onChange && onChange({ selected: newSelected })
      this.setState({
        selected: newSelected,
      } as S);
    });
  }

  willReceiveProps(nextProps: P): void {
    const { selection: nextSelection } = nextProps;
    const { selection: lastSelection } = this.props;
    if (!nextSelection || !lastSelection) {
      return;
    }
    const { defaultSelected: nextDefaultSelected } = nextSelection;
    const { defaultSelected: lastDefaultSelected } = lastSelection;
    if (!equal(nextDefaultSelected, lastDefaultSelected)) {
      this.state.selected = nextDefaultSelected;
    }
  }

  getSnapRecords(_point) {
    return null;
  }

  isSelected(record) {
    const { state, props } = this;
    const { selected } = state;
    if (!selected || !selected.length) {
      return false;
    }
    const { chart } = props;
    const scales = chart.getScales();
    const fields = Object.keys(scales);
    for (let i = 0, len = selected.length; i < len; i++) {
      const item = selected[i];
      if (isEqual(record.origin, item, fields)) {
        return true;
      }
    }
    return false;
  }

  getSelectionStyle(record) {
    const { state, props } = this;
    const { selected } = state;
    if (!selected || !selected.length) {
      return null;
    }
    const { selection } = props;
    const { selectedStyle, unSelectedStyle } = selection;

    const isSelected = this.isSelected(record);
    if (isSelected) {
      return isFunction(selectedStyle) ? selectedStyle(record) : selectedStyle;
    }
    return isFunction(unSelectedStyle) ? unSelectedStyle(record) : unSelectedStyle;
  }
}

export default Selection;
