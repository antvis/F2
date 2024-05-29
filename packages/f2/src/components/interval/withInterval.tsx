import { jsx } from '@antv/f-engine';
import { deepMix, isFunction, isNil, mix } from '@antv/util';
import Geometry, { GeometryProps } from '../geometry';
import * as LabelViews from './label';
import { DataRecord } from '../../chart/Data';

type ZoomRatioCallback<TRecord> = (record: TRecord) => number | null | undefined;

export interface IntervalProps<TRecord extends DataRecord = DataRecord>
  extends GeometryProps<TRecord> {
  /**
   * 柱子的显示比例
   */
  sizeRatio?: number;
  /**
   * 柱子放大缩小的比例
   */
  sizeZoom?: number | ZoomRatioCallback<TRecord>;
  showLabel?: boolean;
  labelCfg?: any;
}

export default (Views) => {
  return class Interval<
    TRecord extends DataRecord = DataRecord,
    IProps extends IntervalProps<TRecord> = IntervalProps<TRecord>
  > extends Geometry<TRecord, IProps> {
    getDefaultCfg() {
      return {
        geomType: 'interval',
        justifyContent: true,
        startOnZero: true,
      };
    }

    getDefaultSize() {
      const { attrs, props, adjust, records } = this;
      const { coord, sizeRatio } = props;
      const { x } = attrs;
      const { scale } = x;
      const { values } = scale;

      if (sizeRatio) {
        return (1 / values.length) * sizeRatio;
      }

      const defaultWithRatio = {
        column: 1 / 2, // 直方图、柱图
        rose: 0.999999, // 玫瑰图
        multiplePie: 3 / 4, // 多饼图
      };

      const count = values.length;

      let ratio;
      if (coord.isPolar) {
        if (coord.transposed && count > 1) {
          ratio = defaultWithRatio.multiplePie;
        } else {
          ratio = defaultWithRatio.rose;
        }
      } else {
        ratio = defaultWithRatio.column;
      }

      const size = (1 / values.length) * ratio;

      // 分组时size要除以类别个数
      if (adjust && adjust.type === 'dodge') {
        return size / records.length;
      }

      return size;
    }

    mapping() {
      const records = super.mapping();
      const { props } = this;
      const { coord, sizeZoom } = props;
      const y0 = this.getY0Value();
      const defaultSize = this.getDefaultSize();

      for (let i = 0, len = records.length; i < len; i++) {
        const record = records[i];
        const { children } = record;
        for (let j = 0, len = children.length; j < len; j++) {
          const child = children[j];
          const { normalized, size: mappedSize, origin } = child;

          // 没有指定size，则根据数据来计算默认size
          if (isNil(mappedSize)) {
            const { x, y, size = defaultSize } = normalized;
            const zoomRatio = (isFunction(sizeZoom) ? sizeZoom(origin) : sizeZoom) ?? 1;
            mix(child, coord.convertRect({ x, y, y0, size: size * zoomRatio }));
          } else {
            const { x, y } = child;
            const rect = { size: mappedSize, x, y, y0 };
            mix(child, coord.transformToRect(rect));
          }

          mix(child.shape, this.getSelectionStyle(child));
        }
      }
      return records;
    }

    // 获取Y轴坐标零点的画布位置
    getPointY0() {
      const { props } = this;
      const { coord } = props;
      const y0 = this.getY0Value();
      const y0Point = coord.convertPoint({ y: y0, x: 0 });
      return y0Point?.y;
    }

    render() {
      const { props, state } = this;
      const { coord, shape = 'rect', animation, showLabel, labelCfg: customLabelCfg } = props;
      const View = isFunction(Views) ? Views : Views[shape as string];
      const LabelView = LabelViews[shape as string];
      const labelCfg = deepMix(
        {
          label: null,
          offsetX: 0,
          offsetY: 0,
        },
        customLabelCfg
      );

      if (!View) return null;
      const { selected } = state;

      const records = this.mapping();
      const pointY0 = this.getPointY0();
      const clip = this.getClip();
      return (
        <View
          coord={coord}
          records={records}
          selected={selected}
          shape={shape}
          animation={animation}
          showLabel={showLabel}
          labelCfg={labelCfg}
          LabelView={LabelView}
          y0={pointY0}
          clip={clip}
        />
      );
    }
  };
};
