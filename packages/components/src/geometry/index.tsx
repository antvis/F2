import { isString, isArray, isFunction, each, upperFirst, isNil } from "@antv/util";
import Component from "../component";
import Chart from "../chart";
import * as Attr from "../chart/attr";
// import { isArray } from '@ali/f2x-util';

import { group as ArrayGroup } from "../chart/util/array";

const GROUP_ATTRS = ["color", "size", "shape"];

function parseFields(field) {
  if (isArray(field)) {
    return field;
  }
  if (isString(field)) {
    return field.split("*");
  }
  return [field];
}

class Geometry extends Component {
  // 标识是Geometry组件
  geometry = true;

  chart: Chart;
  attrs: any = {};
  attrOptions: any = {};
  groupedArray: any[];

  init(config) {
    super.init(config);

    const { chart, props } = this;
    const { theme, coord } = chart;
    const { position, color, size } = props;
    const [x, y] = parseFields(position);

    this.defineAttr("x", { field: x, coord });
    this.defineAttr("y", { field: y, coord });
    this.defineAttr("color", color, theme.colors);
    this.defineAttr("size", size, theme.sizes);
  }

  willMount() {
    this._initAttrs();
    this._processData();
    this._initEvent();
  }

  /**
   * 支持三种定义属性的方式
   * 1. attrs="field"
   * 2. attrs=["field", values]
   * 3. attrs=["field", (fieldValue)=>{}]
   */
  defineAttr(type, cfg, defaultValues?) {
    if (!cfg) {
      return;
    }
    const { attrOptions, chart } = this;
    const { scaleController } = chart;
    let attrCfg: any = {};
    if (isString(cfg)) {
      attrCfg.field = cfg;
      attrCfg.values = defaultValues;
    } else if (isArray(cfg)) {
      const field = cfg[0];
      const values = cfg[1];
      attrCfg.field = field;

      if (isFunction(values)) {
        attrCfg.callback = values;
      } else {
        attrCfg.values = values;
      }
    } else if (cfg) {
      attrCfg = cfg;
    }

    attrOptions[type] = attrCfg;

    // 添加到scale
    const { field } = attrCfg;
    if (!scaleController.getDef(field)) {
      scaleController.setDef(field, {});
    }
  }

  _initEvent() {
    // TODO: 目前Event仅作用于Geometry上，后续考虑做到Component上
    const { container, props } = this;
    const canvas = container.get('canvas');
    ["onPressStart", "onPress", "onPressEnd"].forEach((eventName) => {
      if (props[eventName]) {
        canvas.on(eventName.substr(2).toLowerCase(), (ev) => {
          ev.geometry = this;
          props[eventName](ev);
        });
      }
    });
  }

  getSnapRecords(point) {}


  _initAttrs() {
    const { attrs, attrOptions, chart } = this;
    const { scales } = chart;
    each(attrOptions, (option, type) => {
      const className = upperFirst(type);
      const Constructor = Attr[className];
      if (!Constructor) return;
      const { field } = option;
      // 添加scale
      option.scale = scales[field];
      const attr = new Constructor(option);
      attrs[type] = attr;
    });
  }

  _processData() {
    const { chart } = this;
    const { data } = chart.props;
    const groupedArray = this._groupData(data);

    this.groupedArray = groupedArray;
  }

  update(props) {
    super.update(props);

    this.init({
      container: this.container,
      layout: this.layout,
    });
    this._initAttrs();
    this._processData();
  }

  getXScale() {
    const { attrs } = this;
    return attrs["x"].scale;
  }

  getYScale() {
    const { attrs } = this;
    return attrs["y"].scale;
  }

  getAttr(attrKey) {
    const { attrs } = this;
    return attrs[attrKey];
  }

  _getGroupScales() {
    const { attrs } = this;
    const scales = [];
    each(GROUP_ATTRS, function (attrName) {
      const attr = attrs[attrName];
      if (attr) {
        const { scale } = attr;
        if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
          scales.push(scale);
        }
      }
    });
    return scales;
  }

  _groupData(data) {
    const groupScales = this._getGroupScales();
    if (!groupScales.length) {
      return [data];
    }

    const appendConditions = {};
    const names = [];
    groupScales.forEach((scale) => {
      const field = scale.field;
      names.push(field);
      // if (colDefs && colDefs[field] && colDefs[field].values) { // users have defined
      //   appendConditions[scale.field] = colDefs[field].values;
      // }
    });
    return ArrayGroup(data, names, appendConditions);
  }

  _mapping() {
    const { groupedArray, attrs } = this;
    const mappedArray = [];
    // 反序处理，为了让前面的显示在上面
    for (let i = groupedArray.length - 1; i >= 0; i--) {
      const data = groupedArray[i];
      if (data.length) {
        const mappedData = this._mappingData(data, attrs);
        mappedArray.push(mappedData);
      }
    }
    return mappedArray;
  }

  _saveOrigin(data) {
    const { chart } = this;
    const { theme } = chart;
    const mappedData = new Array(data.length);
    for (let i = 0, len = data.length; i < len; i++) {
      mappedData[i] = {
        // 设置默认样式
        color: theme.defaultColor,
        origin: data[i],
      };
    }
    return mappedData;
  }

  _mappingData(data, attrs) {
    const mappedData = this._saveOrigin(data);
    for (const type in attrs) {
      if (attrs.hasOwnProperty(type)) {
        const attr = attrs[type];
        const { scale } = attr;
        const { field } = scale;

        for (let i = 0, len = data.length; i < len; i++) {
          const record = data[i];
          const mappedRecord = mappedData[i];
          const value = record[field];
          const mappedValue = attr.mapping(value);
          mappedRecord[type] = mappedValue;
          mappedData[i] = mappedRecord;
        }
      }
    }
    return mappedData;
  }
}

export default Geometry;
