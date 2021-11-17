import {
  each,
  isString,
  isNil,
  isFunction,
  isNumber,
  upperFirst,
} from '@antv/util';
import * as Attrs from '../attr';
import equal from '../base/equal';
import { isArray } from '../util';
import ScaleController from './scale';

type AttrOption = {
  field?: string | Record<any, any>;
  range?: any[];
};

export type GroupAttr = 'color' | 'size' | 'shape';
export type Attr = GroupAttr | 'x' | 'y';

type AttrsRange = {
  [key: string]: any;
}

const { Identity, Linear, Category } = Attrs;
// 需要映射的属性名
const ATTRS = ['x', 'y', 'color', 'size', 'shape'];
// 分组处理的属性
const GROUP_ATTRS = ['color', 'size', 'shape'];

class AttrController {
  private scaleController: ScaleController;
  // attr 实例的配置
  private options: Record<Attr, AttrOption> | any;
  // attr 实例
  attrs: any;
  // 各Attr的值域
  attrsRange: any;

  constructor(scaleController: ScaleController, attrsRange: AttrsRange) {
    this.scaleController = scaleController;
    this.attrsRange = attrsRange;
    this.options = {};
    this.attrs = {};
  }

  parseOption(option: AttrOption, attrName: Attr) {
    if (!option) {
      return {
        type: 'identity',
      };
    }

    if (isString(option)) {
      return {
        field: option,
        type: 'category'
      };
    }

    if (isNumber(option)) {
      if (attrName === 'size') {
        return {
          type: 'identity',
          field: option,
        }
      }
    }

    if (isArray(option)) {
      return {
        field: option[0],
        range: option[1],
      };
    }

    return option;
  }

  getAttrOptions(props) {
    if (!props.x || !props.y) {
      throw new Error('x, y are required !');
    }
    const options = {};
    const ranges = this.attrsRange;
    ATTRS.forEach((attrName: Attr) => {
      if (!props[attrName]) return;
      const option = this.parseOption(props[attrName], attrName);
      if (!option.range) {
        option.range = ranges[attrName];
      }
      options[attrName] = option;
    });
    // @ts-ignore
    const { x, y } = options;

    // x, y 都是固定Linear 映射
    x.type = Linear;
    y.type = Linear;
    return options;
  }

  getDefaultAttrValues() {
    const { color, shape } = this.attrsRange;
    return {
      color: color[0],
      shape: shape && shape[0],
    };
  }

  getGroupScales() {
    const { attrs } = this;
    const scales = [];
    each(GROUP_ATTRS, (attrName) => {
      const attr = attrs[attrName];
      if (!attr) {
        return;
      }
      const { scale } = attr;
      if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
        scales.push(scale);
      }
    });
    return scales;
  }

  private createAttr(option) {
    const { type, field } = option;
    if (isNil(field) || type === Identity) {
      return new Identity(option);
    }
    const scale = this.scaleController.getScale(field);

    // identity
    if (scale && scale.type === 'identity') {
      return new Identity(option);
    }

    const attrOption = {
      ...option,
      data: this.scaleController.getData(),
      scale, // 默认使用数据字段的scale
    }

    // Attr的默认类型和scale类型保持一致
    let AttrConstructor = scale.isLinear ? Linear : Category;

    // custom Attr Constructor
    if (isFunction(type)) {
      AttrConstructor = type;
    }

    if (isString(type)) {
      // Category 分类属性创建自己的scale，不使用数据字段的
      if (type === 'category' || !Attrs[upperFirst(type)]) {
        AttrConstructor = Category;
        delete attrOption.scale;
      } else {
        AttrConstructor = Attrs[upperFirst(type)];
      }
    }

    return new AttrConstructor(attrOption);
  }

  create(options) {
    this.update(options);
  }

  update(nextOptions) {
    const { scaleController, options: lastOptions, attrs: lastAttrs } = this;
    const nextAttrs = {};
    each(nextOptions, (nextOption, attrName: string) => {
      const lastOption = lastOptions[attrName];
      if (equal(nextOption, lastOption)) {
        nextAttrs[attrName] = lastAttrs[attrName];
      }
      const { field, scale } = nextOption;
      if (field) {
        scaleController.setScale(field, scale);
      }
    });
    this.options = nextOptions;
    this.attrs = nextAttrs;
  }

  getAttr(attrName: string) {
    const { attrs, options } = this;

    const attr = attrs[attrName];
    if (attr) {
      return attr;
    }
    const option = options[attrName];
    if (!option) {
      return null;
    }
    const newAttr = this.createAttr(option);
    attrs[attrName] = newAttr;
    return newAttr;
  }

  getAttrs() {
    const { options, attrs } = this;
    each(options, (option, attrName: string) => {
      this.getAttr(attrName);
    });
    return attrs;
  }

  isGroupAttr(attrName: GroupAttr): boolean {
    return GROUP_ATTRS.indexOf(attrName) !== -1;
  }

  getAttrsByLinear() {
    const { attrs } = this;
    const attrNames = Object.keys(attrs);
    const linearAttrs = [];
    const nonlinearAttrs = [];

    attrNames.forEach((attrName) => {
      if (attrs[attrName].constructor === Linear) {
        linearAttrs.push(attrName);
      } else {
        nonlinearAttrs.push(attrName);
      }
    });

    return {
      linearAttrs,
      nonlinearAttrs
    }
  }
}

export default AttrController;
