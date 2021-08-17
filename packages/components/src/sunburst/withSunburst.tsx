import { jsx } from "@ali/f2-jsx";
import Component from "../component";
import { partition, hierarchy } from "d3-hierarchy";
import { Category } from "@ali/f2-attr";
import { isInBBox, isFunction } from "@ali/f2x-util";
import { isArray } from "@antv/util";

function rootParent(data) {
  let d = data;
  while (d.depth > 1) {
    d = d.parent;
  }
  return d;
}

export default (View) => {
  return class Sunburst extends Component {
    color: Category;
    shapeTreeRef: any;


    // 根据做呗欧典
    findShapeByPoint(shapeTree, point: any, result = []) {
      const { _attrs = {} } = shapeTree || {};
      const { children, type, className } = _attrs;
      const canClick = className === 'canClick';

      if (type === "group") {
        if (children && children.length && !canClick) {
          for (let i = 0, len = children.length; i < len; i++) {
            this.findShapeByPoint(children[i], point, result);
          }
        } else if (canClick) {
          if (isInBBox(shapeTree.getBBox(), point) && canClick) {
            result.push(shapeTree);
          }
        }
      } else {
        if (isInBBox(shapeTree.getBBox(), point) && canClick) {
          result.push(shapeTree);
        }
      }
    }

    mount() {
      const { props, container } = this;
      const canvas = container.get("canvas");
      const { data, color, onClick } = props;

      this.shapeTreeRef = {};

      canvas.on("click", (ev) => {
        const { points } = ev;
        const targets = [];
        this.findShapeByPoint(this.shapeTreeRef.current, points[0], targets);
        // 如果点击绑定了多个元素，则默认用第一个
        const shape = targets[0]
        if (shape) {
          const { _attrs } = shape;
          ev.shape = _attrs;
          onClick && onClick(ev);
        }
      });

      this.color = new Category({
        ...color,
        data,
      });
    }

    _mapping(children) {
      const { color: colorAttr } = this;
      for (let i = 0, len = children.length; i < len; i++) {
        const node = children[i];
        const root = rootParent(node);
        const color = colorAttr.mapping(root.data[colorAttr.field]);
        node.color = color;
        // 递归处理
        if (node.children && node.children.length) {
          this._mapping(node.children);
        }
      }
    }

    _computeText = (text, attrs) => {
      const { container } = this;
      const group = container.addGroup();
      const shape = group.addShape("text", {
        attrs: {
          ...attrs,
          x: 0,
          y: 0,
          text: text,
        },
      });
      const bbox = shape.getBBox();
      shape.remove();
      return { width: bbox.width, height: bbox.height };
    };

    sunburst() {
      const { props } = this;
      const { data, value, sort = true } = props;

      const root = hierarchy({ children: data }).sum(function (d) {
        return d[value];
      });

      // 内置按value大小顺序排序，支持传入sort函数
      if (sort === true || isFunction(sort)) {
        const sortFn = isFunction(sort) ? sort : (a, b) => b[value] - a[value];
        root.sort(sortFn);
      }

      const nodes = partition()(root);
      const { children } = nodes;
      this._mapping(children);
      return nodes;
    }

    render() {
      const nodes = this.sunburst();
      const { props, _computeText } = this;
      return (
        <View
          ref={this.shapeTreeRef}
          {...props}
          nodes={nodes}
          computeText={_computeText}
        />
      );
    }
  };
};
