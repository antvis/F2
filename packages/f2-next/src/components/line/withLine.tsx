import { jsx } from '../../jsx';
import { mix } from '@antv/util';
import Geometry from '../geometry';

export default View => {
  return class Line extends Geometry {
    _getAttrsRange() {
      const { context } = this;
      const { theme } = context;

      // 构造各属性的值域
      const ranges = {
        color: theme.colors,
        size: theme.sizes,
        shape: theme.shapes.line,
      };

      return ranges;
    }

    _getAttrsDefaultValue() {
      const { context } = this;
      const { theme } = context;
      return {
        color: theme.colors[0],
        size: theme.sizes[0],
        shape: theme.shapes.line[0],
      };
    }

    _mappingAttrs(dataArray) {
      const { x, y, ...attrs } = this.attrs;
      const attrNames = Object.keys(attrs);
      const attrNamesLength = attrNames.length;

      // 设置各属性的值域
      const attrsRange = this._getAttrsRange();
      for (let key = 0; key < attrNamesLength; key++) {
        const attrName = attrNames[key];

        if (!this.getAttrRange(attrName)) {
          this.setAttrRange(attrName, attrsRange[attrName]);
        }
      }

      // 默认值
      const defaultValues = this._getAttrsDefaultValue();
      const dataArrayLength = dataArray.length;
      const mappedArray = new Array(dataArrayLength);
      for (let i = 0; i < dataArrayLength; i++) {
        const data = dataArray[i];

        // 图形属性映射，因为每组里面这些属性的值都是相同的，所以只需要映射第一个就可以了
        const attrsValue = {};
        for (let key = 0; key < attrNamesLength; key++) {
          const attrName = attrNames[key];
          attrsValue[attrName] = this.getAttrValue(attrName, data[0]);
        }

        // 生成映射后的数据对象
        const mappedData = new Array(data.length);
        for (let i = 0, len = data.length; i < len; i++) {
          const record = data[i];
          const result = {
            ...record,
            ...defaultValues,
            ...attrsValue,
          };
          mappedData[i] = result;
        }
        mappedArray[i] = mappedData;
      }
      return mappedArray;
    }

    mapping() {
      const originMapped = super.mapping();
      const mappedArray = this._mappingAttrs(originMapped);
      this.mappedArray = mappedArray;
      return mappedArray;
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

    parsePoints(dataArray) {
      const { props } = this;
      const { coord } = props;
      return dataArray.map(data => {
        const { color, shape, size } = data[0];
        const points = data;
        if (coord.isPolar) {
          points.push(data[0]);
        }
        const extLineAttrs: any = {};
        switch (shape) {
          case 'line':
            break;
          case 'dash':
            extLineAttrs.lineDash = [4, 4];
            break;
          case 'smooth':
            extLineAttrs.smooth = true;
            break;
          default:
            break;
        }
        return {
          color,
          size,
          points,
          ...extLineAttrs,
        }
      });
    }

    render() {
      const { props } = this;
      const { smooth, lineWidth } = props;
      const { coord } = props;
      const mapped = this.mapping();
      const mappedArray = this.parsePoints(mapped);
      return (
        <View
          coord={ coord }
          mappedArray={ mappedArray }
          smooth={smooth}
          lineWidth={lineWidth}
        />
      );
    }
  };
};
