import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';

export default View => {
  return class Line extends Geometry {
    constructor(props, context) {
      super(props, context);
      this._getShapeRanges();
    }

    // 获取 line 类型 shape range
    _getShapeRanges = () => {
      const { context } = this;
      const { theme } = context;
      const ranges = {
        ...this.ranges,
        shape: theme.shapes.line,
      };
      this.ranges = ranges;
      return ranges;
    }

    _convertPosition(mappedArray) {
      const { props } = this;
      const { coord } = props;

      for (let i = 0; i < mappedArray.length; i++) {
        const data = mappedArray[i];
        for (let j = 0; j < data.length; j++) {
          const record = data[j];
          const { x, y } = record;
          mix(record, coord.convertPoint({ x, y }));
        }
      }
      return mappedArray;
    }

    // 获取主题中默认 line shape 样式
    _getThemeShape(shape: string | undefined) {
      const { context } = this;
      const { theme } = context;
      const { line: lineShapeMap } = theme.shape;
      return mix({}, lineShapeMap.default, lineShapeMap[shape]);
    }

    // 合并优先级数据映射后的 style(color, size, shape) > props.style
    _mergeStyle(dataItem) {
      const { color, shape, size } = dataItem;
      // 'line' | 'smooth' | 'dash' 三种 shapes 映射到具体的 line attrs
      const themeStyle = this._getThemeShape(shape);
      return {
        ...themeStyle,
        size,
        color,
      };
    }

    parsePoints(dataArray) {
      const { props } = this;
      const { coord } = props;
      return dataArray.map(data => {
        const points = data;
        if (coord.isPolar) {
          points.push(data[0]);
        }
        const lineStyle = this._mergeStyle(data[0]);
        return {
          ...lineStyle,
          points,
        }
      });
    }

    render() {
      const { props } = this;
      const { style } = props;
      const { coord } = props;
      const mapped = this.mapping();
      const mappedArray = this.parsePoints(mapped);
      return (
        <View
          coord={ coord }
          mappedArray={ mappedArray }
          style={ style }
        />
      );
    }
  };
};
