import { isString } from '@antv/util';
import { Linear, Category } from '../attr';
import { isFunction } from '@antv/util';

class Attr {
  attrOptions: any;
  attrs: any;

  createAttrOption(option) {
    if (!option) return null;
    if (isString(option)) {
      return {
        field: option,
      }
    }
    return option;
  }

  createAttr(option) {
    const { type, scale } = option;
    const { values } = scale;
    const firstValue = values[0];
    const AttrConstructor = type ? type : typeof firstValue === 'number' ? Linear : Category;
    return new AttrConstructor(option);
  }

  // 设置属性映射的值域
  setAttrRange(attrName: string, range) {
    const attr = this.attrs[attrName];
    attr.range = range;
  }

  // 获取属性映射的值域
  getAttrRange(attrName) {
    const attr = this.attrs[attrName];
    if(!attr) return;
    return attr.range;
  }

  getAttr(attrName: string) {
    return this.attrs[attrName];
  }

  getAttrOption(attrName: string) {
    return this.attrOptions[attrName];
  }

  getAttrValue(attrName: string, record: any) {
    const attr = this.attrs[attrName];
    if (!attr) return null;
    const { field, callback } = attr;
    if(isFunction(callback)) {
      return callback(record[field]);
    }
    return attr.mapping(record[field]);
  }
}

export default Attr;
