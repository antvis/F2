import { each, isString, isNil, isFunction, upperFirst } from '@antv/util';
import * as Attrs from '../attr';
import equal from '../base/equal';
import { isArray } from '../util';
import ScaleController from './scale';

const { Identity, Linear, Category } = Attrs;

type AttrOption = {
  field: string | Record<any, any>;
  range?: any[];
};

class AttrController {
  private scaleController: ScaleController;
  // attr 实例的配置
  private options: any;
  // attr 实例
  attrs: any;

  constructor(scaleController: ScaleController) {
    this.scaleController = scaleController;
    this.options = {};
    this.attrs = {};
  }

  parseOption(option: AttrOption) {
    if (!option) {
      return {
        type: Identity,
      };
    }

    if (isString(option)) {
      return {
        field: option,
      };
    }

    if (isArray(option)) {
      return {
        field: option[0],
        range: option[1],
      };
    }

    return option;
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

    // linear & category
    let AttrConstructor = Category;

    if (isString(type)) {
      AttrConstructor = Attrs[upperFirst(type)] || Category;
    }

    if (isFunction(type)) {
      AttrConstructor = type;
    }

    return new AttrConstructor({
      ...option,
      scale,
    });
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
    const { attrs, options, scaleController } = this;

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

  getAttrValue(attrName: string, record: any) {
    const attr = this.attrs[attrName];

    if (!attr) return null;
    const { field, callback, scale } = attr;

    if (scale.type === 'identity') {
      return attr.mapping(field);
    }

    if (isFunction(callback)) {
      return callback(record[field]);
    }
    return attr.mapping(record[field]);
  }
}

export default AttrController;
