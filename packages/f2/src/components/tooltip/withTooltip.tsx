import {
  jsx,
  Component,
  isEqual,
  TextStyleProps,
  RectStyleProps,
  LineStyleProps,
} from '@antv/f-engine';
import { isArray, isFunction, find } from '@antv/util';
import { ChartChildProps } from '../../chart';

export interface DataRecord {
  origin: any;
  [k: string]: any;
}

export interface TooltipProps {
  /**
   * 是否显示
   */
  visible?: boolean;
  /**
   * 顶部边距
   */
  padding?: string;
  /**
   * 显示事件名，默认为 press
   */
  triggerOn?: 'press' | 'click';
  /**
   * 消失的事件名，默认为 pressend
   */
  triggerOff?: 'pressend';
  /**
   * 是否一直显示
   */
  alwaysShow?: boolean;
  /**
   * 是否显示十字线
   */
  showCrosshairs?: boolean;
  /**
   * 十字线类型
   */
  crosshairsType?: 'x' | 'y' | 'xy';
  /**
   * 十字线样式
   */
  crosshairsStyle?: LineStyleProps;
  /**
   * 是否显示辅助点
   */
  snap?: boolean;
  /**
   * 名称样式
   */
  nameStyle?: TextStyleProps;
  /**
   * 值样式
   */
  valueStyle?: TextStyleProps;
  /**
   * 背景样式
   */
  background?: RectStyleProps;
  /**
   * 是否显示
   */
  showItemMarker?: boolean;
  defaultItem?: any;
  custom?: boolean;
  tooltipMarkerStyle?: any;
  onChange?: any;
  /**
   *  tooltip 展示回调
   */
  onShow?: () => void;
  /**
   *  tooltip 隐藏回调
   */
  onHide?: () => void;
  showXTip?: boolean;
  /**
   * x 的位置点类型，record 表示按照数据取位置点，coord 表示按照坐标取位置点
   */
  xPositionType?: 'record' | 'coord';
  showYTip?: boolean;
  /**
   * x 的位置点类型，record 表示按照数据取位置点，coord 表示按照坐标取位置点
   */
  yPositionType?: 'record' | 'coord';
  showTooltipMarker?: boolean;
  customText?: any;
  markerBackgroundStyle?: any;
  [key: string]: any;
}

export interface TooltipState {
  records: DataRecord[];
}

export default (View) => {
  return class Tooltip<IProps extends TooltipProps = TooltipProps> extends Component<
    IProps & ChartChildProps,
    TooltipState
  > {
    constructor(props: IProps & ChartChildProps) {
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
      this._initShow();
      this._initEvent();
    }

    _initEvent() {
      const { chart, triggerOn = 'press', triggerOff = 'pressend' } = this.props;

      chart.on(triggerOn, this._triggerOn);
      chart.on(triggerOff, this._triggerOff);
    }

    willReceiveProps(nextProps) {
      const { defaultItem: nextDefaultItem, coord: nextCoord } = nextProps;
      const { defaultItem: lastDefaultItem, coord: lastCoord } = this.props;

      // 默认元素或坐标有变动，均需重新渲染
      if (!isEqual(nextDefaultItem, lastDefaultItem) || !isEqual(nextCoord, lastCoord)) {
        this._showByData(nextDefaultItem);
      }
    }

    _initShow() {
      const { props } = this;
      const { defaultItem } = props;
      this._showByData(defaultItem);
    }

    _showByData(dataItem) {
      if (!dataItem) return;
      const { props } = this;
      const { chart } = props;

      // 因为 tooltip 有可能在 geometry 之前，所以需要等 geometry render 完后再执行
      setTimeout(() => {
        const snapRecords = chart.getRecords(dataItem, 'xfield');
        this.showSnapRecords(snapRecords);
      }, 0);
    }
    _triggerOn = (ev) => {
      const { x, y } = ev;
      this.show({ x, y }, ev);
    };
    _triggerOff = () => {
      const {
        props: { alwaysShow = false },
      } = this;
      if (!alwaysShow) {
        this.hide();
      }
    };

    show(point, _ev?) {
      const { props } = this;
      const { chart } = props;
      const snapRecords = chart.getSnapRecords(point, true); // 超出边界会自动调整
      if (!snapRecords || !snapRecords.length) return;
      this.showSnapRecords(snapRecords);
    }

    showSnapRecords(snapRecords) {
      const { chart, onChange, onShow } = this.props;
      const legendItems = chart.getLegendItems();
      const { xField, yField } = snapRecords[0];
      const xScale = chart.getScale(xField);
      const yScale = chart.getScale(yField);
      // 如果之前没有records，视为首次出现
      const isInitShow = !this.state.records;

      const records = snapRecords.map((record) => {
        const { origin, xField, yField } = record;
        const value = isArray(origin[yField])
          ? origin[yField].map((v) => yScale.getText(v))
          : yScale.getText(origin[yField]);

        // 默认取 alias 的配置
        let name = yScale.alias;
        if (!name) {
          name = xScale.getText(origin[xField]);
          if (legendItems && legendItems.length) {
            const item = find<any>(legendItems, (item) => {
              const { field, tickValue } = item;
              return origin[field] === tickValue;
            });
            if (item && item.name) {
              name = item.name;
            }
          }
        }
        return {
          ...record,
          name,
          value: `${value}`,
        };
      });

      if (!isArray(records) || !records.length) {
        return;
      }
      this.setState({
        records,
      });
      if(isInitShow && isFunction(onShow)) {
        onShow();
      }
      if (isFunction(onChange)) {
        onChange(records);
      }
    }

    hide() {
      const { onHide } = this.props;
      this.setState({
        records: null,
      });
      if(isFunction(onHide)) {
        onHide();
      }
    }

    render() {
      const { props, state } = this;
      const { visible } = props;
      if (visible === false) {
        return null;
      }
      const { records } = state;

      return records && records.length && <View {...props} records={records} />;
    }
  };
};
