import { jsx } from '../../jsx';
import { isArray, isFunction, find } from '@antv/util';
import Component from '../../base/component';
import equal from '../../base/equal';
import { DataRecord, px, TextAttrs, LineAttrs, RectAttrs } from '../../types';
import { ChartChildProps } from '../../chart';

export interface TooltipProps extends ChartChildProps {
  /**
   * 顶部边距
   */
  padding?: px;
  /**
   * 显示事件名，默认为 press, 可以为 touchstart 等
   */
  triggerOn?: string;
  /**
   * 消失的事件名，默认为 pressend, 可以为 touchend 等
   */
  triggerOff?: string;
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
  crosshairsStyle?: LineAttrs;
  snap?: boolean;
  /**
   * 名称样式
   */
  nameStyle?: TextAttrs;
  /**
   * 值样式
   */
  valueStyle?: TextAttrs;
  /**
   * 背景样式
   */
  background?: RectAttrs;
}

export interface TooltipState {
  records: DataRecord[];
}

export default (View) => {
  return class Tooltip extends Component<TooltipProps, TooltipState> {
    constructor(props: TooltipProps) {
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

    willReceiveProps(nextProps) {
      const { defaultItem: nextDefaultItem, coord: nextCoord } = nextProps;
      const { defaultItem: lastDefaultItem, coord: lastCoord } = this.props;
      // 默认元素或坐标有变动，均需重新渲染
      if (
        !equal(nextDefaultItem, lastDefaultItem) 
      || !equal(nextCoord, lastCoord) 
       ) {
        this._showByData(nextDefaultItem);
      }
    }

    _initShow() {
      const { props } = this;
      const { defaultItem } = props;
      if (defaultItem) {
        this._showByData(defaultItem);
      }
    }

    _showByData(dataItem) {
      const { props } = this;
      const { chart } = props;
      // 因为 tooltip 有可能在 geometry 之前，所以需要等 geometry render 完后再执行
      setTimeout(() => {
        const point = chart.getPosition(dataItem);
        this.show(point);
      }, 0);
    }
    _triggerOn = (ev) => {
      const { points } = ev;
      this.show(points[0], ev);
    };
    _triggerOff = () => {
      const { props: {alwaysShow = false} } = this;
      if (!alwaysShow) {
        this.hide();
      }    
    };
    _initEvent() {
      const { context, props } = this;
      const { canvas } = context;
      const { triggerOn = 'press', triggerOff = 'pressend' } = props;

      canvas.on(triggerOn, this._triggerOn);
      canvas.on(triggerOff, this._triggerOff);
    }

    didUnmount(): void {
      this._clearEvents();
    }

    _clearEvents() {
      const { context, props } = this;
      const { canvas } = context;
      const { triggerOn = 'press', triggerOff = 'pressend' } = props;
      // 解绑事件
      canvas.off(triggerOn, this._triggerOn);
      canvas.off(triggerOff, this._triggerOff);
    }

    show(point, _ev?) {
      const { props } = this;
      const { chart, onChange } = props;
      const snapRecords = chart.getSnapRecords(point, true); // 超出边界会自动调整
      if (!snapRecords || !snapRecords.length) return;
      const legendItems = chart.getLegendItems();
      const { xField, yField } = snapRecords[0];
      const xScale = chart.getScale(xField);
      const yScale = chart.getScale(yField);

      const records = snapRecords.map((record) => {
        const { origin, xField, yField } = record;
        const value = yScale.getText(origin[yField]);

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
          value,
        };
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
