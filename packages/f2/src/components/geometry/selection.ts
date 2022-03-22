import { isFunction } from '@antv/util';
import Component from '../../base/component';
import { ShapeAttrs, Point } from '../../types';
import equal from '../../base/equal';

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

type StyleType = (record: any) => ShapeAttrs;

export interface SelectionProps {
  selection?: {
    triggerOn?: 'click' | 'press' | string;
    type?: 'single' | 'multiple';
    defaultSelected?: any[];
    selectedStyle?: ShapeAttrs | StyleType;
    unSelectedStyle?: ShapeAttrs | StyleType;
    cancelable?: boolean;
  };
  [k: string]: any;
}

export interface SelectionState {
  selected: any[];
}

class Selection<
  P extends SelectionProps = SelectionProps,
  S extends SelectionState = SelectionState
> extends Component<P, S> {
  constructor(props: P, context) {
    super(props, context);

    const { selection } = props;
    if (!selection) return;
    const { defaultSelected } = selection;
    this.state.selected = defaultSelected;
  }

  didMount() {
    const { props, state, container } = this;
    const canvas = container.get('canvas');
    const { selection, chart } = props;
    if (!selection) return;
    // 默认为 click
    const { triggerOn = 'click' } = selection;
    canvas.on(triggerOn, (ev) => {
      const { points } = ev;
      const records = this.getSnapRecords(points[0]);
      const { type = 'single', cancelable = true } = selection;
      if (!records || !records.length) {
        if (cancelable) {
          this.setState({
            selected: null,
          } as S);
        }
        return;
      }

      const { selected } = state;
      const origins = records.map((record) => record.origin);
      if (!selected || !selected.length) {
        this.setState({
          selected: origins,
        } as S);
      }

      if (type === 'single') {
        if (!cancelable) {
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

  getSnapRecords(_point: Point) {
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
