import { isString } from '@antv/util';
import { Linear, Category } from '../attr';
import { isArray } from '@antv/util';

class Attr {
  attrOptions: any;
  attrs: any;

  createAttrOption(option) {
    // FIXME:这个地方如果只想指定某个具体的值作为值域的话挺麻烦
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

  getAttr(attrName: string) {
    return this.attrs[attrName];
  }

  getAttrValue(attrName: string, record: any) {
    const attr = this.attrs[attrName];
    if (!attr) return null;
    const { field } = attr;
    return attr.mapping(record[field]);
  }
}

export default Attr;
