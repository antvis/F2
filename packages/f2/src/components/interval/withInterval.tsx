import { jsx } from '../../jsx';
import { mix, isNil, deepMix } from '@antv/util';
import Geometry from '../geometry';
import * as LabelViews from './label';

export default (Views) => {
  return class Interval extends Geometry {
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
      const { coord } = props;
      const y0 = this.getY0Value();
      const defaultSize = this.getDefaultSize();

      for (let i = 0, len = records.length; i < len; i++) {
        const record = records[i];
        const { children } = record;
        for (let j = 0, len = children.length; j < len; j++) {
          const child = children[j];
          const { normalized, size: mappedSize } = child;

          // 没有指定size，则根据数据来计算默认size
          if (isNil(mappedSize)) {
            const { x, y, size = defaultSize } = normalized;
            mix(child, coord.convertRect({ x, y, y0, size }));
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

    render() {
      const { props, state } = this;
      const { coord, shape = 'rect', animation, showLabel, labelCfg: customLabelCfg } = props;
      const View = Views[shape];
      const LabelView = LabelViews[shape];
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
        />
      );
    }
  };
};
